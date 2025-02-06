// src/store/auth.ts
import axios from "axios";
import { useStorage } from "@vueuse/core";
import { useToast } from "vue-toastification"; // Import useToast

interface User {
  id: number;
  email: string;
  name: string;
}

export const useAuth = () => {
const user = useStorage<User | null>("user", null, undefined, {
  serializer: {
    read: (v) => (v ? JSON.parse(v) : null),
    write: (v) => JSON.stringify(v),
  },
});

  const token = useStorage<string | null>("token", null);
  const toast = useToast();

  if (token.value) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string; user: User }>(
        "http://localhost:8000/api/login",
        { email, password }
      );
      user.value =response.data.user;
      token.value = response.data.token;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      toast.success("Login successful!");
      return response;
    } catch (error) {
      window.location.href = "/";
      console.error("Login failed:", error);
      toast.error("Login failed! Please try again.");
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;

    delete axios.defaults.headers.common["Authorization"];
    toast.info("You have logged out.");
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>("http://localhost:8000/api/user");
      user.value =response.data;
      toast.success("User data fetched successfully!");
    } catch (error) {
      console.error("User fetch failed:", error);
      toast.error("Failed to fetch user data.");
    }
  };

  const checkTokenValidity = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/check-token",
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Token is valid");
      }
    } catch (error) {
      console.error("Token is invalid or expired");
      toast.error("Session expired. Please log in again.");
      logout();
    }
  };

  return {
    user,
    token,
    login,
    logout,
    fetchUser,
    checkTokenValidity, // Expose the token check function
  };
};
