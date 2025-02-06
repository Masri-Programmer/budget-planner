<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
      <form @submit.prevent="submitLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Password</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../auth.ts";
import { useRouter } from "vue-router";

const { login } = useAuth();
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");

const submitLogin = async () => {
  try {
    await login(email.value, password.value);
    router.push("/dashboard");
  } catch (error) {
    alert("Login failed!");
  }
};
</script>
