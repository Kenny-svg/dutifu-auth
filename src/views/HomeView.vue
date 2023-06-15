<template>
  <div>
    <main class="mt-24 mb-20">
      <h3 class="text-primary text-3xl font-bold text-center">main section</h3>
      <div v-for="user in users" :key="user.id">{{ user.id }}</div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/authStore";
const authStore = useAuthStore();
const users = authStore.getUser();
</script>

<style lang="scss" scoped></style>
