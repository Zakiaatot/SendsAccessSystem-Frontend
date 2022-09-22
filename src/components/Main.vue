<template>
    <router-view name="body" v-slot="{ Component }">
        <transition enter-active-class="animate__animated animate__bounceIn animate__fast"
            leave-active-class="animate__animated animate__bounceOut animate__fast" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup>
</script>

<style scoped>
</style>