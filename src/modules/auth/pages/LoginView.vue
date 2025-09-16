<!-- src/modules/auth/pages/LoginView.vue -->
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.store'
import LoginForm from '../components/LoginForm.vue'

import { env } from '../../../core/config/env'

// Composables
const router = useRouter()
const authStore = useAuthStore()

const isDev = env.NODE_ENV === 'development'

// Si ya está autenticado, redirigir
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (isAuth) {
    router.push('/dashboard')
  }
}, { immediate: true })

onMounted(() => {
  // Limpiar cualquier error previo
  authStore.clearError()
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4 sm:px-6 lg:px-8">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
    
    <!-- Content -->
    <div class="relative w-full max-w-md">
      <!-- Logo o branding -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <svg class="w-8 h-8 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-base-content">
          Unidad Educativa
        </h1>
        <p class="text-base-content/70 mt-2">
          Sistema de Gestión Académica
        </p>
      </div>

      <!-- Card container -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <LoginForm 
            title="Bienvenido"
            subtitle="Ingresa tus credenciales para acceder"
          />
        </div>
      </div>

      <!-- Development helper -->
      <div v-if="isDev" class="mt-6 p-4 bg-base-200 rounded-lg text-center">
        <p class="text-sm text-base-content/70 mb-2">
          🚀 Desarrollo - Credenciales de prueba:
        </p>
        <code class="text-xs bg-base-300 px-2 py-1 rounded">
          admin@edu.com / admin123
        </code>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones suaves */
.card {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>