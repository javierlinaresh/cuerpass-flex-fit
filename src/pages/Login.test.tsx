import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test/test-utils'
import Login from './Login'

// Mock the useAuth hook
const mockLogin = vi.fn()
const mockNavigate = vi.fn()

vi.mock('@/contexts/AuthContext', async () => {
  const actual = await vi.importActual('@/contexts/AuthContext')
  return {
    ...actual,
    useAuth: () => ({
      login: mockLogin,
      user: null,
      isAuthenticated: false,
      register: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
    }),
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

describe('Login', () => {
  beforeEach(() => {
    mockLogin.mockClear()
    mockNavigate.mockClear()
    mockLogin.mockResolvedValue(true)
  })

  it('should render login form correctly', () => {
    render(<Login />)

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })

  it('should handle successful login', async () => {
    render(<Login />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123', 'user')
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('should show loading state during login', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)))
    
    render(<Login />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('Iniciando...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    })
  })

  it('should handle login failure', async () => {
    mockLogin.mockRejectedValue(new Error('Login failed'))
    
    render(<Login />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'wrongpassword', 'user')
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  it('should require email and password fields', () => {
    render(<Login />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')

    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should have links to register and partner login', () => {
    render(<Login />)

    expect(screen.getByText('Regístrate aquí')).toBeInTheDocument()
    expect(screen.getByText('¿Eres socio comercial? Ingresa aquí')).toBeInTheDocument()
  })

  it('should prevent form submission with empty fields', async () => {
    render(<Login />)

    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' })
    fireEvent.click(submitButton)

    expect(mockLogin).not.toHaveBeenCalled()
  })
})