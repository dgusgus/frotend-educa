// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Estilos
import './assets/main.css'

// Crear la aplicación
const app = createApp(App)

// Configurar Pinia (store)
const pinia = createPinia()
app.use(pinia)

// Configurar Router
app.use(router)

// Configuraciones globales
app.config.globalProperties.$env = import.meta.env

// Montar la aplicación
app.mount('#app')