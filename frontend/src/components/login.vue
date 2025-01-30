<template>
  <div>
    <form @submit.prevent="submitLogin">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
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
