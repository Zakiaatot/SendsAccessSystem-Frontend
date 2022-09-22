<template>
    <h1 class="title">管理员设定</h1>
    <div class="logout">
        <a-button long status="danger" @click="adminlogout" :loading="isloading">Logout</a-button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../../../stores/admin.js'
import { Notification } from '@arco-design/web-vue'
import { ref } from 'vue'
//logout
const isloading=ref(false)
const router = useRouter()
const adminlogout = async () => {
    const admin = useAdminStore()
    isloading.value=true
    const result = await admin.adminlogout()
    isloading.value=false
    if (result.code === 0) return Notification.error(result.msg)
    return Notification.success(result.msg), router.push('/')
}
</script>

<style scoped>
.title {
    text-align: center;
    color: var(--color-text-1);
}

.logout {
    text-align: center;
    width: 320px;
    margin: 50px auto;
}
</style>