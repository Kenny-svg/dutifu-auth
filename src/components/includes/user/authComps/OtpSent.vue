<template>

<div class="text-center mt-10 text-sm text-secondary">
    <div class="flex justify-center items-center">
    <div>
     <i class="bi bi-envelope-check text-primary text-5xl rounded-full  p-4 bg-gray-100 mx-auto"></i>
    </div>
</div>
    <h1 class="mt-10">An OTP has been sent to {{ email }}</h1>
     <h1>Check your email to get the code</h1>

     <button @click="handlesubmit" class="btn-primary mt-5 mb-10 px-8 bg-primary text-white">Next</button>
     
</div>
</template>
<script setup>
import {useRouter, useRoute} from 'vue-router'

const route = useRoute()
const email = route.params.id

const router = useRouter()
const handlesubmit = () => {
    router.push(`/otp_verification/${email}`);
   }
</script>