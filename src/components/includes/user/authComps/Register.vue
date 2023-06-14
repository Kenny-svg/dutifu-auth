<template>
  <div class="flex justify-center mx-auto md:w-9/12">
    <div class="w-10/12 md:w-5/12">
      <h1 class="text-sm text-secondary">Sign up for free!</h1>
      <h1 class="font-bold text-primary text-2xl mb-10">Get Started</h1>
      <div class="flex gap-8">
        <div>
          <button
            :class="{
              'btn-primary text-primary border-primary flex items-center relative':
                activeTab === 'form1',
            }"
            @click="toggleTab('form1')"
            class="btn-primary text-gray-300 border-gray-300 flex items-center -z-40"
          >
            <i
              v-if="activeTab === 'form1'"
              class="bi bi-check-circle-fill absolute top-0 right-2 z-50 transform -translate-y-1/2 translate-x-1/2 -mr-2 mt-1 text-xl text-primary"
            ></i>
            <i class="bi bi-person mx-2"></i>
            Regular user
          </button>
        </div>

        <div>
          <button
            :class="{
              'btn-primary text-primary border-primary flex items-center relative':
                activeTab === 'form2',
            }"
            @click="toggleTab('form2')"
            class="btn-primary text-gray-300 border-gray-300 flex items-center -z-40"
          >
            <i
              v-if="activeTab === 'form2'"
              class="bi bi-check-circle-fill absolute top-0 right-2 z-50 transform -translate-y-1/2 translate-x-1/2 -mr-2 mt-1 text-xl text-primary"
            ></i>
            <i class="bi bi-person mx-2"></i>
            Service provider
          </button>
        </div>
      </div>
      <div v-if="activeTab === 'form1'" class="mt-10">
        <RegisterUserForm />
      </div>
      <div v-if="activeTab === 'form2'" class="mt-10">
        <ServiceProviderForm />
      </div>
    </div>
  </div>
</template>
<script setup>
import RegisterUserForm from "../authPages/authDefaults/RegisterUserForm.vue";
import ServiceProviderForm from "../authPages/authDefaults/ServiceProviderForm.vue";
import { ref } from "vue";
const activeTab = ref("form1");

const toggleTab = (service) => {
  activeTab.value = service;
};
</script>
