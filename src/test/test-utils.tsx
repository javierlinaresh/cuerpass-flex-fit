import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'
import { TooltipProvider } from '@/components/ui/tooltip'

interface AllProvidersProps {
  children: React.ReactNode
}

const AllProviders = ({ children }: AllProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock user for testing
export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  credits: 10,
  type: 'user' as const,
}

export const mockPartner = {
  id: '2',
  name: 'Test Gym',
  email: 'gym@example.com',
  credits: 0,
  type: 'partner' as const,
}

export const mockBusiness = {
  id: '1',
  name: 'Test Gym',
  type: 'Gimnasio',
  category: 'gimnasios',
  rating: 4.5,
  reviews: 100,
  image: 'https://example.com/image.jpg',
  location: 'Test Location',
  phone: '+1234567890',
  hours: 'Mon-Fri: 6AM-10PM',
  description: 'Test gym description',
  services: [
    {
      name: 'Day Pass',
      credits: 3,
      description: 'Full gym access',
    },
  ],
  features: ['WiFi', 'Parking'],
  amenities: ['Pool', 'Sauna'],
  gallery: ['https://example.com/gallery1.jpg'],
}