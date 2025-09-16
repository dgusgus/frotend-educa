// src/modules/auth/types.ts

// Tipos de entrada (input)
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

// Tipos de respuesta del backend
export interface AuthUser {
  id: string
  email: string
  name: string
  createdAt: Date | string
}

export interface AuthResponse {
  user: AuthUser
  token: string
}

// Estados del store
export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Tipos de formulario (para validación)
export interface LoginFormData {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  acceptTerms: boolean
}