// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { useAuthStore } from '../modules/auth/store/auth.store'

// Importación de vistas
import LoginView from '../modules/auth/pages/LoginView.vue'

// Definir rutas
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresGuest: true, // Solo usuarios no autenticados
      title: 'Iniciar Sesión'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      requiresAuth: true, // Solo usuarios autenticados
      title: 'Dashboard'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Mi Perfil'
    }
  },
  // Ruta 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Página no encontrada'
    }
  }
]

// Crear instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guards de navegación
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Actualizar el título de la página
  if (to.meta.title) {
    document.title = `${to.meta.title} - Unidad Educativa`
  }
  
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Si no está autenticado, redirigir al login
      next({ 
        name: 'login',
        query: { redirect: to.fullPath } // Guardar la ruta de destino
      })
      return
    }
    
    // Si está autenticado pero no tiene datos del usuario, intentar obtenerlos
    if (!authStore.user) {
      try {
        await authStore.fetchProfile()
      } catch (error) {
        // Si falla, redirigir al login
        next({ name: 'login' })
        return
      }
    }
  }
  
  // Verificar si la ruta es solo para invitados (no autenticados)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Si ya está autenticado, redirigir al dashboard
    next({ name: 'dashboard' })
    return
  }
  
  // Continuar con la navegación
  next()
})

// Guard para manejar errores de autenticación
router.onError((error) => {
  console.error('Router error:', error)
  
  // Si es un error 401, limpiar sesión y redirigir al login
  if (error.message.includes('401')) {
    const authStore = useAuthStore()
    authStore.logout()
    router.push('/login')
  }
})

export default router

// Tipos para las rutas
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    title?: string
    roles?: string[]
  }
}