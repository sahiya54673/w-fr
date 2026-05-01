import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to add the auth token to headers
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  if (userInfo && userInfo.token) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return req;
});

export const fetchProducts = (params = {}) => API.get('/products', { params });
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users', formData);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchOrderById = (id) => API.get(`/orders/${id}`);
export const fetchMyOrders = () => API.get('/orders/myorders');

export default API;
