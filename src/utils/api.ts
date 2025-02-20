import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const BOT_URL = import.meta.env.VITE_BOT_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL:  BASE_URL,
  headers: {
    'Content-type': 'application/json',
  }
});
export const botApi = axios.create({
  baseURL:  BOT_URL,
  headers: {
    'Content-type': 'application/json',
  }
});

export default api
