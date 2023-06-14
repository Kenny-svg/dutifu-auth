<template>
    <div>
        <DefaultAuthHeader />
        <RouterView />
        <DefaultAuthFooter />
    </div>    
</template>
<script setup>
import { RouterView } from 'vue-router'
import DefaultAuthHeader from '../includes/user/authPages/authDefaults/DefaultAuthHeader.vue'
import DefaultAuthFooter from '../includes/user/authPages/authDefaults/DefaultAuthFooter.vue'
import { useAuthStore } from '../../store/authStore';
import { ref } from 'vue';
import {useRouter} from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const authState = authStore.initialState
const loginStatus = ref(authState.status.loggedIn)

if(loginStatus.value) {
    router.push('/')
}
</script>