<template>
  <div class="flex justify-center mx-auto md:w-9/12">
    <div class="mt-10 w-10/12 md:w-5/12">
      <h1 class="font-bold text-primary text-2xl mt-5">Reset your password</h1>
      <p class="text-sm text-secondary mt-5">Set your new pasword</p>
      <ResetPasswordForm />
    </div>
  </div>
</template>
<script setup>
import ResetPasswordForm from "../authPages/authDefaults/ResetPasswordForm.vue";
</script>
