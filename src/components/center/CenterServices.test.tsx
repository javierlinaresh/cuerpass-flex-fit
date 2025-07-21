import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/test/test-utils'
import CenterServices from './CenterServices'
import { mockBusiness } from '@/test/test-utils'

describe('CenterServices', () => {
  const mockOnReservation = vi.fn()

  beforeEach(() => {
    mockOnReservation.mockClear()
  })

  it('should render services correctly', () => {
    render(
      <CenterServices 
        center={mockBusiness} 
        onReservation={mockOnReservation} 
      />
    )

    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument()
    expect(screen.getByText('Day Pass')).toBeInTheDocument()
    expect(screen.getByText('Full gym access')).toBeInTheDocument()
    expect(screen.getByText('3 créditos')).toBeInTheDocument()
  })

  it('should call onReservation when reserve button is clicked', () => {
    render(
      <CenterServices 
        center={mockBusiness} 
        onReservation={mockOnReservation} 
      />
    )

    const reserveButton = screen.getByText('Reservar')
    fireEvent.click(reserveButton)

    expect(mockOnReservation).toHaveBeenCalledWith(mockBusiness.services[0])
    expect(mockOnReservation).toHaveBeenCalledTimes(1)
  })

  it('should render instructor information when available', () => {
    const businessWithInstructor = {
      ...mockBusiness,
      services: [
        {
          ...mockBusiness.services[0],
          instructor: 'John Doe',
        },
      ],
    }

    render(
      <CenterServices 
        center={businessWithInstructor} 
        onReservation={mockOnReservation} 
      />
    )

    expect(screen.getByText('Instructor: John Doe')).toBeInTheDocument()
  })

  it('should render multiple services', () => {
    const businessWithMultipleServices = {
      ...mockBusiness,
      services: [
        {
          name: 'Day Pass',
          credits: 3,
          description: 'Full gym access',
        },
        {
          name: 'Personal Training',
          credits: 5,
          description: '1-on-1 training session',
          coach: 'Jane Smith',
        },
      ],
    }

    render(
      <CenterServices 
        center={businessWithMultipleServices} 
        onReservation={mockOnReservation} 
      />
    )

    expect(screen.getByText('Day Pass')).toBeInTheDocument()
    expect(screen.getByText('Personal Training')).toBeInTheDocument()
    expect(screen.getByText('3 créditos')).toBeInTheDocument()
    expect(screen.getByText('5 créditos')).toBeInTheDocument()
    expect(screen.getByText('Coach: Jane Smith')).toBeInTheDocument()
  })

  it('should handle empty services array', () => {
    const businessWithNoServices = {
      ...mockBusiness,
      services: [],
    }

    render(
      <CenterServices 
        center={businessWithNoServices} 
        onReservation={mockOnReservation} 
      />
    )

    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument()
    expect(screen.queryByText('Reservar')).not.toBeInTheDocument()
  })
})