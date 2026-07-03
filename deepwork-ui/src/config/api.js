import axios from 'axios';

// Get API base URL from environment variables with production fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://deepwork-ai-backend.onrender.com/api'
    : 'http://localhost:8081/api');

console.log('🔗 API Base URL:', API_BASE_URL); // Debug log

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 600000, // 10 minutes for large file uploads
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 400:
          console.error('Bad Request:', error.response.data);
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error occurred');
          break;
        default:
          console.error('An error occurred:', error.message);
      }
    } else if (error.request) {
      console.error('No response from server. Please check your connection.');
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const meetingsAPI = {
  getAll: () => apiClient.get('/meetings'),
  
  getById: (id) => apiClient.get(`/meetings/${id}`),
  
  upload: (formData, onUploadProgress) => 
    apiClient.post('/meetings/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    }),
  
  create: (data) => apiClient.post('/meetings', data),
  
  delete: (id) => apiClient.delete(`/meetings/${id}`),
};

export const tasksAPI = {
  getAll: () => apiClient.get('/tasks'),
};

export const summariesAPI = {
  getById: (id) => apiClient.get(`/summaries/${id}`),
};

export default apiClient;
