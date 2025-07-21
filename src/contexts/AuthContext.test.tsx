import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import { mockUser, mockPartner } from '@/test/test-utils'

// Mock the logger
vi.mock('@/utils/logger', () => ({
  logger: {
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('AuthContext', () => {
  it('should provide initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should login user successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      const success = await result.current.login('test@example.com', 'password', 'user')
      expect(success).toBe(true)
    })
    
    expect(result.current.user).toBeDefined()
    expect(result.current.user?.type).toBe('user')
    expect(result.current.user?.email).toBe('test@example.com')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should login partner successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      const success = await result.current.login('gym@example.com', 'password', 'partner')
      expect(success).toBe(true)
    })
    
    expect(result.current.user).toBeDefined()
    expect(result.current.user?.type).toBe('partner')
    expect(result.current.user?.credits).toBe(0)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should register user successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }
    
    await act(async () => {
      const success = await result.current.register(userData)
      expect(success).toBe(true)
    })
    
    expect(result.current.user).toBeDefined()
    expect(result.current.user?.name).toBe('John Doe')
    expect(result.current.user?.credits).toBe(10) // Welcome credits
    expect(result.current.user?.type).toBe('user')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should register partner successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    const partnerData = {
      businessName: 'Test Gym',
      email: 'gym@example.com',
      password: 'password123',
    }
    
    await act(async () => {
      const success = await result.current.register(partnerData)
      expect(success).toBe(true)
    })
    
    expect(result.current.user).toBeDefined()
    expect(result.current.user?.name).toBe('Test Gym')
    expect(result.current.user?.credits).toBe(0) // Partners get 0 credits
    expect(result.current.user?.type).toBe('partner')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should logout successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })
    
    expect(result.current.isAuthenticated).toBe(true)
    
    // Then logout
    act(() => {
      result.current.logout()
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')
  })
})