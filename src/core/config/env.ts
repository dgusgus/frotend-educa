// src/core/config/env.ts
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  NODE_ENV: import.meta.env.MODE || 'development',
  JWT_TOKEN_KEY: 'auth_token',
} as const

export type EnvConfig = typeof env