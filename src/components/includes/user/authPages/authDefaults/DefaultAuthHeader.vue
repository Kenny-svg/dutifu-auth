<template>
  <header class="fixed top-0 w-full z-50">
    <div
      class="bg-white text-secondary py-3.5 px-6 md:flex justify-between items-center"
    >
      <div class="flex items-center">
        <!-- <img class="w-20" alt="brand logo" src="logo.svg" /> -->
        <img class="w-20" alt="brand logo" :src="image" />
      </div>

      <span
        @click="menuOpen()"
        class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl"
      >
        <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
      </span>

      <ul
        class="md:flex md:items-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute bg-white md:w-auto w-full top-14 duration-700 ease-in z-50 text-uppercase"
        :class="[open ? 'left-0' : 'left-[-100%]']"
      >
        <li
          class="md:mx-4 md:my-0 my-6 font-normal"
          v-for="link in Links"
          :key="link"
        >
          <a :href="link.link" class="text-sm text-secondary">{{
            link.name
          }}</a>
        </li>
        <router-link to="/login">
          <li class="text-primary md:mx-4">Login</li>
        </router-link>

        <li class="font-bold text-primary md:mx-4">
          <router-link to="/register">
            <button class="btn-primary">Sign up</button>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../../../../store/authStore";
import image from "../../../../../assets/logo.svg";

const authStore = useAuthStore();
const userStatus = ref(authStore.initialState.status.loggedIn);
let open = ref(false);
let Links = [
  { name: "Business Directory", link: "/" },
  { name: "Features", link: "/profile" },
  { name: "Pricing", link: "/about" },
  { name: "Blog", link: "/blo" },
];
const menuOpen = () => {
  open.value = !open.value;
};
</script>
