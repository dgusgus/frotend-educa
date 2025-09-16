// src/modules/auth/api/auth.api.ts
import { apiRequest } from '../../../api/client'
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  AuthUser 
} from '../types'

export const authApi = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiRequest.post<AuthResponse>('/auth/login', credentials)
    return response.data.data!
  },

  /**
   * Registrar nuevo usuario
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiRequest.post<AuthResponse>('/auth/register', userData)
    return response.data.data!
  },

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<AuthUser> {
    const response = await apiRequest.get<AuthUser>('/auth/profile')
    return response.data.data!
  },

  /**
   * Verificar el estado del servidor (health check)
   */
  async healthCheck(): Promise<{ status: string; token?: string }> {
    const response = await apiRequest.get<{ status: string; token?: string }>('/health')
    return response.data.data!
  },
}