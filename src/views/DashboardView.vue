<!-- src/views/DashboardView.vue -->
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
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-lg">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Dashboard</a></li>
            <li><a>Estudiantes</a></li>
            <li><a>Profesores</a></li>
            <li><a>Cursos</a></li>
          </ul>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span class="text-xl font-bold">Unidad Educativa</span>
        </div>
      </div>
      
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a class="btn btn-ghost">Dashboard</a></li>
          <li><a class="btn btn-ghost">Estudiantes</a></li>
          <li><a class="btn btn-ghost">Profesores</a></li>
          <li><a class="btn btn-ghost">Cursos</a></li>
        </ul>
      </div>
      
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full bg-primary flex items-center justify-center">
              <span class="text-primary-content font-semibold">
                {{ currentUser?.name?.charAt(0).toUpperCase() }}
              </span>
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li class="menu-title">
              <span>{{ currentUser?.name }}</span>
            </li>
            <li><router-link to="/profile">Mi Perfil</router-link></li>
            <li><a>Configuración</a></li>
            <li><hr class="my-1" /></li>
            <li><a @click="handleLogout" class="text-error">Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Welcome Banner -->
      <div class="hero bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl mb-8">
        <div class="hero-content text-center py-12">
          <div class="max-w-md">
            <h1 class="text-4xl font-bold mb-4">
              ¡Bienvenido, {{ currentUser?.name }}! 👋
            </h1>
            <p class="text-lg opacity-90">
              Sistema de Gestión Académica - Dashboard Principal
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat bg-base-100 rounded-2xl shadow-lg">
          <div class="stat-figure text-primary">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div class="stat-title">Estudiantes</div>
          <div class="stat-value">1,248</div>
          <div class="stat-desc">↗︎ 12% más que el mes pasado</div>
        </div>

        <div class="stat bg-base-100 rounded-2xl shadow-lg">
          <div class="stat-figure text-secondary">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div class="stat-title">Profesores</div>
          <div class="stat-value">89</div>
          <div class="stat-desc">↗︎ 3 nuevos este mes</div>
        </div>

        <div class="stat bg-base-100 rounded-2xl shadow-lg">
          <div class="stat-figure text-accent">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="stat-title">Cursos</div>
          <div class="stat-value">24</div>
          <div class="stat-desc">↗︎ 2 cursos activos</div>
        </div>

        <div class="stat bg-base-100 rounded-2xl shadow-lg">
          <div class="stat-figure text-info">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="stat-title">Asistencia</div>
          <div class="stat-value">95%</div>
          <div class="stat-desc">↗︎ Promedio mensual</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Acciones Rápidas</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <button class="btn btn-outline btn-primary flex-col h-20">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nuevo Estudiante
                </button>
                <button class="btn btn-outline btn-secondary flex-col h-20">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nuevo Curso
                </button>
                <button class="btn btn-outline btn-accent flex-col h-20">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ver Reportes
                </button>
                <button class="btn btn-outline btn-info flex-col h-20">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6v10a2 2 0 01-2 2h-4a2 2 0 01-2-2V7z" />
                  </svg>
                  Asistencia
                </button>
                <button class="btn btn-outline btn-success flex-col h-20">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Calificaciones
                </button>
                <button class="btn btn-outline btn-warning flex-col h-20">
                  <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Configuración
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- User Info Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Mi Información</h2>
            <div class="flex items-center space-x-4 mt-4">
              <div class="avatar">
                <div class="w-16 rounded-full bg-primary flex items-center justify-center">
                  <span class="text-primary-content text-2xl font-bold">
                    {{ currentUser?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-lg">{{ currentUser?.name }}</h3>
                <p class="text-base-content/70">{{ currentUser?.email }}</p>
                <p class="text-sm text-success">✅ Conectado</p>
              </div>
            </div>
            <div class="card-actions justify-end mt-4">
              <router-link to="/profile" class="btn btn-primary btn-sm">
                Ver Perfil
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Actividad Reciente</h2>
          <div class="space-y-4 mt-4">
            <div class="flex items-center space-x-4 p-3 bg-base-200 rounded-lg">
              <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-medium">Nuevo estudiante registrado</p>
                <p class="text-sm text-base-content/70">María García se unió al sistema</p>
              </div>
              <span class="text-sm text-base-content/50">Hace 2 horas</span>
            </div>

            <div class="flex items-center space-x-4 p-3 bg-base-200 rounded-lg">
              <div class="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-medium">Curso actualizado</p>
                <p class="text-sm text-base-content/70">Matemáticas - Nivel 3 fue modificado</p>
              </div>
              <span class="text-sm text-base-content/50">Hace 5 horas</span>
            </div>

            <div class="flex items-center space-x-4 p-3 bg-base-200 rounded-lg">
              <div class="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-medium">Reporte generado</p>
                <p class="text-sm text-base-content/70">Informe mensual de asistencia</p>
              </div>
              <span class="text-sm text-base-content/50">Ayer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>