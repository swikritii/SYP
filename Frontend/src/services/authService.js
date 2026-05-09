import { apiClient } from './apiClient';

export const authService = {
  async login(email, password) {
    return await apiClient.post('/login', { email, password });
  },

  async signup(name, email, password, role) {
    return await apiClient.post('/signup', { name, email, password, role });
  },

  async forgotPassword(email) {
    return await apiClient.post('/forgot-password', { email });
  },

  async resetPassword(token, newPassword) {
    return await apiClient.post('/reset-password', { token, newPassword });
  },
};
