// src/store/auth.ts
import { ref } from 'vue';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
  // Add any additional user fields you expect to use
}

export const useAuth = () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string, user: User }>(
        'http://localhost:8000/api/login',
        { email, password }
      );

      user.value = response.data.user;
      token.value = response.data.token;

      localStorage.setItem('token', token.value);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>('http://localhost:8000/api/user');
      user.value = response.data;
    } catch (error) {
      console.error('User fetch failed:', error);
    }
  };

  return {
    user,
    token,
    login,
    logout,
    fetchUser
  };
};
