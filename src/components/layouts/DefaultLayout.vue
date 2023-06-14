<template>
    <div>
        <DefaultHeader />
        <RouterView />
        <DefaultFooter />
    </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import DefaultHeader from '../includes/DefaultHeader.vue';
import DefaultFooter from '../includes/DefaultFooter.vue';

</script>