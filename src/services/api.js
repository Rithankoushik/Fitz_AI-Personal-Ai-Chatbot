import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  signup: async (email, password, name) => {
    const response = await api.post('/auth/signup', { email, password, name })
    return response.data
  },
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
}

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/me')
    return response.data
  },
  
  updateProfile: async (userData) => {
    const response = await api.put('/users/me', userData)
    return response.data
  },
}

// AI API
export const aiAPI = {
  classifyImage: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post('/ai/classify-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },
  
  generatePlan: async (formData) => {
    const response = await api.post('/ai/generate-plan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },
  
  chat: async (message, planId = null) => {
    const response = await api.post('/ai/chat', { message, plan_id: planId })
    return response.data
  },
}

// Plans API
export const plansAPI = {
  createPlan: async (planData) => {
    const response = await api.post('/plans/', planData)
    return response.data
  },
  
  getPlans: async () => {
    const response = await api.get('/plans/')
    return response.data
  },
  
  getPlan: async (planId) => {
    const response = await api.get(`/plans/${planId}`)
    return response.data
  },
  
  deletePlan: async (planId) => {
    const response = await api.delete(`/plans/${planId}`)
    return response.data
  },
}

// Food API
export const foodAPI = {
  searchFood: async (query, limit = 20) => {
    const response = await api.get('/food/search', {
      params: { query, limit }
    })
    return response.data
  },
  
  logFood: async (foodData) => {
    const response = await api.post('/food/log', foodData)
    return response.data
  },
  
  getDailyLog: async (date = null) => {
    const params = date ? { target_date: date } : {}
    const response = await api.get('/food/daily', { params })
    return response.data
  },
  
  deleteFoodLog: async (logId, mealType, foodIndex) => {
    const response = await api.delete(`/food/log/${logId}`, {
      params: { meal_type: mealType, food_index: foodIndex }
    })
    return response.data
  },
}

export default api

