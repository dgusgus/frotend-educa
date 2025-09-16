<!-- src/views/ProfileView.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../modules/auth/store/auth.store'
import { useRouter } from 'vue-router'

// Composables
const authStore = useAuthStore()
const router = useRouter()

// Computed
const currentUser = computed(() => authStore.user)

// Métodos
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Header -->
    <div class="bg-base-100 shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="goBack" class="btn btn-ghost btn-circle">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-2xl font-bold">Mi Perfil</h1>
          </div>
          <button @click="handleLogout" class="btn btn-outline btn-error">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center">
              <!-- Avatar -->
              <div class="avatar">
                <div class="w-24 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <span class="text-primary-content text-3xl font-bold">
                    {{ currentUser?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>
              
              <!-- User Info -->
              <h2 class="text-2xl font-bold">{{ currentUser?.name }}</h2>
              <p class="text-base-content/70 mb-4">{{ currentUser?.email }}</p>
              
              <div class="flex justify-center space-x-2 mb-4">
                <div class="badge badge-primary">Admin</div>
                <div class="badge badge-success">Activo</div>
              </div>
              
              <!-- Stats -->
              <div class="stats stats-vertical shadow">
                <div class="stat">
                  <div class="stat-title">Miembro desde</div>
                  <div class="stat-value text-sm">
                    {{ new Date(currentUser?.createdAt || '').toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) }}
                  </div>
                </div>
                
                <div class="stat">
                  <div class="stat-title">Último acceso</div>
                  <div class="stat-value text-sm">Ahora</div>
                </div>
              </div>
              
              <!-- Actions -->
              <div class="card-actions justify-center mt-6">
                <button class="btn btn-primary">Editar Perfil</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Cards -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Personal Information -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Información Personal</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label class="label">
                    <span class="label-text font-medium">Nombre Completo</span>
                  </label>
                  <div class="input input-bordered flex items-center">
                    <svg class="w-4 h-4 opacity-70 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ currentUser?.name }}
                  </div>
                </div>
                
                <div>
                  <label class="label">
                    <span class="label-text font-medium">Email</span>
                  </label>
                  <div class="input input-bordered flex items-center">
                    <svg class="w-4 h-4 opacity-70 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ currentUser?.email }}
                  </div>
                </div>
                
                <div>
                  <label class="label">
                    <span class="label-text font-medium">ID de Usuario</span>
                  </label>
                  <div class="input input-bordered flex items-center font-mono text-sm">
                    <svg class="w-4 h-4 opacity-70 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {{ currentUser?.id }}
                  </div>
                </div>
                
                <div>
                  <label class="label">
                    <span class="label-text font-medium">Estado</span>
                  </label>
                  <div class="flex items-center space-x-2">
                    <div class="badge badge-success">✅ Activo</div>
                    <div class="badge badge-info">🔓 Verificado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Settings -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Configuración de Cuenta</h3>
              
              <div class="space-y-4 mt-4">
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">Notificaciones por Email</span>
                    <input type="checkbox" class="toggle toggle-primary" checked />
                  </label>
                </div>
                
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">Notificaciones Push</span>
                    <input type="checkbox" class="toggle toggle-primary" />
                  </label>
                </div>
                
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">Modo Oscuro</span>
                    <input type="checkbox" class="toggle toggle-primary" />
                  </label>
                </div>
                
                <div class="divider"></div>
                
                <div class="flex flex-wrap gap-2">
                  <button class="btn btn-primary">Cambiar Contraseña</button>
                  <button class="btn btn-outline">Exportar Datos</button>
                  <button class="btn btn-outline btn-error">Eliminar Cuenta</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Log -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Actividad Reciente</h3>
              
              <div class="space-y-3 mt-4">
                <div class="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                  <div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium">Inicio de sesión exitoso</p>
                    <p class="text-sm text-base-content/70">Ahora - IP: 192.168.1.1</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                  <div class="w-8 h-8 bg-info/20 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium">Perfil actualizado</p>
                    <p class="text-sm text-base-content/70">Hace 2 días</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                  <div class="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium">Intento de acceso fallido</p>
                    <p class="text-sm text-base-content/70">Hace 1 semana - IP: 203.0.113.1</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                  <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium">Cuenta creada</p>
                    <p class="text-sm text-base-content/70">
                      {{ new Date(currentUser?.createdAt || '').toLocaleDateString('es-ES') }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-outline btn-sm">Ver Todo</button>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Seguridad</h3>
              
              <div class="space-y-4 mt-4">
                <div class="alert alert-info">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Tu cuenta está protegida con autenticación JWT</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="stat bg-base-200 rounded-lg">
                    <div class="stat-title">Sesiones Activas</div>
                    <div class="stat-value text-lg">1</div>
                    <div class="stat-desc">Esta sesión</div>
                  </div>
                  
                  <div class="stat bg-base-200 rounded-lg">
                    <div class="stat-title">Último Cambio</div>
                    <div class="stat-value text-lg">Nunca</div>
                    <div class="stat-desc">Contraseña</div>
                  </div>
                </div>
                
                <div class="flex flex-wrap gap-2 mt-4">
                  <button class="btn btn-warning btn-sm">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Cambiar Contraseña
                  </button>
                  <button class="btn btn-outline btn-sm">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Habilitar 2FA
                  </button>
                  <button class="btn btn-ghost btn-sm text-error">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Todas las Sesiones
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Información del Sistema</h3>
              
              <div class="overflow-x-auto mt-4">
                <table class="table table-zebra">
                  <tbody>
                    <tr>
                      <td class="font-medium">ID de Usuario</td>
                      <td class="font-mono text-sm">{{ currentUser?.id }}</td>
                    </tr>
                    <tr>
                      <td class="font-medium">Email</td>
                      <td>{{ currentUser?.email }}</td>
                    </tr>
                    <tr>
                      <td class="font-medium">Fecha de Registro</td>
                      <td>{{ new Date(currentUser?.createdAt || '').toLocaleString('es-ES') }}</td>
                    </tr>
                    <tr>
                      <td class="font-medium">Rol</td>
                      <td>
                        <div class="badge badge-primary">Administrador</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="font-medium">Estado de Cuenta</td>
                      <td>
                        <div class="badge badge-success">Activa</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones suaves */
.card {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.stat:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

.badge {
  transition: transform 0.2s ease;
}

.badge:hover {
  transform: scale(1.05);
}
</style>