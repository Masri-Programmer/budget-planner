// src/store/auth.ts
import axios from "axios";
import { useStorage } from "@vueuse/core";

interface User {
  id: number;
  email: string;
  name: string;
}

export const useAuth = () => {
  const user = useStorage<User | null>("user", null);
  const token = useStorage<string | null>("token", null);

  if (token.value) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string; user: User }>(
        "http://localhost:8000/api/login",
        { email, password }
      );
      user.value = response.data.user;
      token.value = response.data.token;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      return response;
    } catch (error) {
      window.location.href = "/"
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;

    delete axios.defaults.headers.common["Authorization"];
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>("http://localhost:8000/api/user");
      user.value = response.data;
    } catch (error) {
      console.error("User fetch failed:", error);
    }
  };

  return {
    user,
    token,
    login,
    logout,
    fetchUser,
  };
};
