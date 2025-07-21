import { User, RegisterData, LoginData, Business } from '@/types'
import { logger } from '@/utils/logger'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
const API_TIMEOUT = 10000

// Token management
const TOKEN_KEY = 'cuerpass_token'
const REFRESH_TOKEN_KEY = 'cuerpass_refresh_token'

export const tokenManager = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  removeToken: (): void => localStorage.removeItem(TOKEN_KEY),
  
  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string): void => localStorage.setItem(REFRESH_TOKEN_KEY, token),
  removeRefreshToken: (): void => localStorage.removeItem(REFRESH_TOKEN_KEY),
  
  clearAll: (): void => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}

// API Error types
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// HTTP client with interceptors
class APIClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string, timeout: number) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token = tokenManager.getToken()

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshed = await this.refreshToken()
          if (refreshed) {
            // Retry the original request
            return this.request(endpoint, options)
          } else {
            tokenManager.clearAll()
            throw new APIError('Authentication expired', 401, 'TOKEN_EXPIRED')
          }
        }
        
        const errorData = await response.json().catch(() => ({}))
        throw new APIError(
          errorData.message || 'Request failed',
          response.status,
          errorData.code
        )
      }

      return response.json()
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      
      logger.error('API request failed', error)
      throw new APIError('Network error', 0, 'NETWORK_ERROR')
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = tokenManager.getRefreshToken()
    if (!refreshToken) return false

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })

      if (response.ok) {
        const { token, refreshToken: newRefreshToken } = await response.json()
        tokenManager.setToken(token)
        tokenManager.setRefreshToken(newRefreshToken)
        return true
      }
    } catch (error) {
      logger.error('Token refresh failed', error)
    }

    return false
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Create API client instance
const apiClient = new APIClient(API_BASE_URL, API_TIMEOUT)

// Authentication API
export const authAPI = {
  async login(data: LoginData & { userType?: 'user' | 'partner' }): Promise<{
    user: User
    token: string
    refreshToken: string
  }> {
    try {
      const response = await apiClient.post<{
        user: User
        token: string
        refreshToken: string
      }>('/auth/login', data)
      
      tokenManager.setToken(response.token)
      tokenManager.setRefreshToken(response.refreshToken)
      
      return response
    } catch (error) {
      // Fallback to mock for development
      if (import.meta.env.DEV && error instanceof APIError && error.code === 'NETWORK_ERROR') {
        return this.mockLogin(data)
      }
      throw error
    }
  },

  async register(data: RegisterData): Promise<{
    user: User
    token: string
    refreshToken: string
  }> {
    try {
      const response = await apiClient.post<{
        user: User
        token: string
        refreshToken: string
      }>('/auth/register', data)
      
      tokenManager.setToken(response.token)
      tokenManager.setRefreshToken(response.refreshToken)
      
      return response
    } catch (error) {
      // Fallback to mock for development
      if (import.meta.env.DEV && error instanceof APIError && error.code === 'NETWORK_ERROR') {
        return this.mockRegister(data)
      }
      throw error
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      logger.error('Logout API call failed', error)
    } finally {
      tokenManager.clearAll()
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me')
  },

  // Mock implementations for development
  async mockLogin(data: LoginData & { userType?: 'user' | 'partner' }): Promise<{
    user: User
    token: string
    refreshToken: string
  }> {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    
    const mockUser: User = {
      id: '1',
      name: data.userType === 'partner' ? 'Gimnasio Gold\'s' : 'Juan Pérez',
      email: data.email,
      credits: data.userType === 'user' ? 15 : 0,
      type: data.userType || 'user'
    }
    
    const mockToken = 'mock-jwt-token-' + Date.now()
    const mockRefreshToken = 'mock-refresh-token-' + Date.now()
    
    return {
      user: mockUser,
      token: mockToken,
      refreshToken: mockRefreshToken
    }
  },

  async mockRegister(data: RegisterData): Promise<{
    user: User
    token: string
    refreshToken: string
  }> {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name || data.businessName || 'New User',
      email: data.email,
      credits: data.businessName ? 0 : 10, // Partners get 0, users get 10 welcome credits
      type: data.businessName ? 'partner' : 'user'
    }
    
    const mockToken = 'mock-jwt-token-' + Date.now()
    const mockRefreshToken = 'mock-refresh-token-' + Date.now()
    
    return {
      user: newUser,
      token: mockToken,
      refreshToken: mockRefreshToken
    }
  }
}

// Business API
export const businessAPI = {
  async getBusinesses(): Promise<Business[]> {
    try {
      return apiClient.get<Business[]>('/businesses')
    } catch (error) {
      if (import.meta.env.DEV && error instanceof APIError && error.code === 'NETWORK_ERROR') {
        return this.getMockBusinesses()
      }
      throw error
    }
  },

  async getBusiness(id: string): Promise<Business> {
    try {
      return apiClient.get<Business>(`/businesses/${id}`)
    } catch (error) {
      if (import.meta.env.DEV && error instanceof APIError && error.code === 'NETWORK_ERROR') {
        return this.getMockBusiness(id)
      }
      throw error
    }
  },

  async makeReservation(businessId: string, serviceId: string): Promise<{ success: boolean }> {
    try {
      return apiClient.post<{ success: boolean }>('/reservations', {
        businessId,
        serviceId
      })
    } catch (error) {
      if (import.meta.env.DEV && error instanceof APIError && error.code === 'NETWORK_ERROR') {
        return { success: true }
      }
      throw error
    }
  },

  // Mock data for development
  getMockBusinesses: (): Business[] => [
    {
      id: '1',
      name: 'Gold\'s Gym Las Mercedes',
      type: 'Gimnasio',
      category: 'gimnasios',
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
      location: 'Av. Principal de Las Mercedes, Caracas',
      phone: '+58 212 993-4567',
      hours: 'Lunes a Viernes: 6:00 AM - 10:00 PM\nSábados: 7:00 AM - 8:00 PM\nDomingos: 8:00 AM - 6:00 PM',
      description: 'Gimnasio premium con equipos de última tecnología, clases grupales y entrenamientos personalizados.',
      services: [
        { name: 'Day Pass Completo', credits: 3, description: 'Acceso completo al gimnasio por un día' },
        { name: 'Solo Cardio', credits: 2, description: 'Acceso únicamente a equipos cardiovasculares' },
        { name: 'Clase Grupal', credits: 2, description: 'Acceso a una clase grupal' },
        { name: 'Entrenamiento Personal', credits: 5, description: 'Sesión de 1 hora con entrenador personal' }
      ],
      features: ['WiFi Gratis', 'Estacionamiento', 'Vestuarios Premium', 'Aire Acondicionado'],
      amenities: ['🚿 Duchas', '🏊‍♂️ Piscina', '🧘‍♀️ Área de Yoga', '💪 Zona de Pesas', '🏃‍♂️ Caminadoras'],
      gallery: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583500178690-f7320ed5ea28?w=400&h=300&fit=crop'
      ]
    }
  ],

  getMockBusiness: (id: string): Business => {
    const businesses = businessAPI.getMockBusinesses()
    const business = businesses.find(b => b.id === id)
    if (!business) {
      throw new APIError('Business not found', 404, 'BUSINESS_NOT_FOUND')
    }
    return business
  }
}

export default apiClient