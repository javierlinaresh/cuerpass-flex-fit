// Business/Center types
export interface Service {
  name: string;
  credits: number;
  description: string;
  instructor?: string;
  barber?: string;
  therapist?: string;
  coach?: string;
  stylist?: string;
  esthetician?: string;
}

export interface Business {
  id: string;
  name: string;
  type: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  phone: string;
  hours: string;
  description: string;
  services: Service[];
  features: string[];
  amenities: string[];
  gallery: string[];
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  type: 'user' | 'partner';
}

// Form data types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name?: string;
  businessName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Payment types
export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface Plan {
  name: string;
  price: number;
  credits: number;
  duration: string;
  features: string[];
}