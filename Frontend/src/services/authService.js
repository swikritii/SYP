import { apiClient } from './apiClient';

export const authService = {
  async login(email, password) {
    return await apiClient.post('/login', { email, password });
  },

  async signup(name, email, password) {
    return await apiClient.post('/signup', { name, email, password });
  },
};
