// src/modules/auth/store/auth.store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api/auth.api'
import { env } from '../../../core/config/env'
import type { AuthUser, LoginCredentials, RegisterData } from '../types'

export const useAuthStore = defineStore('auth', () => {
  // Estado reactivo
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters computados
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Inicialización - cargar token del localStorage
  const initializeAuth = () => {
    const storedToken = localStorage.getItem(env.JWT_TOKEN_KEY)
    if (storedToken) {
      token.value = storedToken
      // Intentar obtener el perfil del usuario
      fetchProfile()
    }
  }

  // Acciones
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authApi.login(credentials)
      
      // Guardar en el estado
      user.value = response.user
      token.value = response.token
      
      // Persistir token en localStorage
      localStorage.setItem(env.JWT_TOKEN_KEY, response.token)
      
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Error al iniciar sesión'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authApi.register(userData)
      
      // Guardar en el estado
      user.value = response.user
      token.value = response.token
      
      // Persistir token en localStorage
      localStorage.setItem(env.JWT_TOKEN_KEY, response.token)
      
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Error al registrarse'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchProfile = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null

      const userProfile = await authApi.getProfile()
      user.value = userProfile
      
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Error al obtener perfil'
      // Si falla, limpiar la sesión
      logout()
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = (): void => {
    // Limpiar estado
    user.value = null
    token.value = null
    error.value = null
    
    // Limpiar localStorage
    localStorage.removeItem(env.JWT_TOKEN_KEY)
  }

  const clearError = (): void => {
    error.value = null
  }

  // Inicializar al crear el store
  initializeAuth()

  return {
    // Estado
    user,
    token,
    isLoading,
    error,
    
    // Getters
    isAuthenticated,
    
    // Acciones
    login,
    register,
    fetchProfile,
    logout,
    clearError,
    initializeAuth,
  }
})