<!-- src/modules/auth/components/LoginForm.vue -->
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.store'
import type { LoginFormData } from '../types'

// Props y emits
interface Props {
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Iniciar Sesión',
  subtitle: 'Accede a tu cuenta'
})

// Composables
const router = useRouter()
const authStore = useAuthStore()

// Estado del formulario
const formData = reactive<LoginFormData>({
  email: '',
  password: '',
  remember: false
})

const formErrors = reactive({
  email: '',
  password: '',
  general: ''
})

const isSubmitting = ref(false)
const showPassword = ref(false)

// Validaciones
const validateEmail = (email: string): string => {
  if (!email) return 'El email es requerido'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido'
  return ''
}

const validatePassword = (password: string): string => {
  if (!password) return 'La contraseña es requerida'
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
  return ''
}

const validateForm = (): boolean => {
  formErrors.email = validateEmail(formData.email)
  formErrors.password = validatePassword(formData.password)
  formErrors.general = ''
  
  return !formErrors.email && !formErrors.password
}

// Manejo del submit
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isSubmitting.value = true
    
    await authStore.login({
      email: formData.email,
      password: formData.password
    })

    // Redirigir al dashboard o página principal
    router.push('/dashboard')
    
  } catch (error: any) {
    formErrors.general = error.response?.data?.error || 'Error al iniciar sesión'
  } finally {
    isSubmitting.value = false
  }
}

// Limpiar errores cuando el usuario escribe
const clearFieldError = (field: keyof typeof formErrors) => {
  formErrors[field] = ''
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ props.title }}
      </h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {{ props.subtitle }}
      </p>
    </div>

    <!-- Formulario -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          autocomplete="email"
          required
          :class="[
            'input input-bordered w-full',
            formErrors.email ? 'input-error' : ''
          ]"
          placeholder="tu@ejemplo.com"
          @input="clearFieldError('email')"
        />
        <p v-if="formErrors.email" class="mt-1 text-sm text-error">
          {{ formErrors.email }}
        </p>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Contraseña
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
            :class="[
              'input input-bordered w-full pr-12',
              formErrors.password ? 'input-error' : ''
            ]"
            placeholder="••••••••"
            @input="clearFieldError('password')"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            @click="showPassword = !showPassword"
          >
            <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          </button>
        </div>
        <p v-if="formErrors.password" class="mt-1 text-sm text-error">
          {{ formErrors.password }}
        </p>
      </div>

      <!-- Remember me -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember"
            v-model="formData.remember"
            type="checkbox"
            class="checkbox checkbox-primary checkbox-sm"
          />
          <label for="remember" class="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Recordarme
          </label>
        </div>
        <a href="#" class="text-sm text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <!-- Error general -->
      <div v-if="formErrors.general" class="alert alert-error">
        <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ formErrors.general }}</span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="btn btn-primary w-full"
      >
        <span v-if="isSubmitting" class="loading loading-spinner loading-sm"></span>
        {{ isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
      </button>
    </form>

    <!-- Footer -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-primary hover:underline font-medium">
          Regístrate aquí
        </router-link>
      </p>
    </div>
  </div>
</template>