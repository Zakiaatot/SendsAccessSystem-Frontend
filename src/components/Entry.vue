<template>
    <div class="Entry">
        <a-layout>
            <HeadVue></HeadVue>
            <MainVue></MainVue>
            <FootVue></FootVue>
        </a-layout>
    </div>
</template>

<script setup>
import HeadVue from './Head.vue'
import FootVue from './Foot.vue'
import MainVue from './Main.vue'
import { useAdminStore } from '../stores/admin.js'
import { onBeforeMount } from 'vue'

//checkadminlog
onBeforeMount(async () => {
    const admin = useAdminStore()
    admin.adminchecklog()
})
</script>

<style scoped>
.Entry {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.arco-layout {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}
</style>
