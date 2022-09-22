<template>
    <a-layout-content>
        <h1 class="title">管理员登录</h1>
        <a-form layout="vertical" class="adminloginform" :model="adminloginform" @submit-success="submit">
            <a-form-item field="name" label="Name" :rules="rules.name" validate-trigger="input" show-colon>
                <a-input placeholder="Please enter your name..." v-model="adminloginform.name" allow-clear
                    :input-attrs="{autocomplete:'on'}">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item field="password" label="Password" :rules="rules.password" validate-trigger="input" show-colon>
                <a-input-password placeholder="Please enter your password..." v-model="adminloginform.password"
                    allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item field="isRemeber">
                <a-checkbox v-model="adminloginform.isRemeber">
                    Remember Login?
                </a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" class="submit" long type="outline" shape="round" size="large"
                    :loading="loading" v-heart-beat.click>{{msg}}
                </a-button>
            </a-form-item>
        </a-form>
    </a-layout-content>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAdminStore } from '../../../stores/admin.js'
import { Notification } from '@arco-design/web-vue'
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'
const msg = ref('Submit')
const loading = ref(false)
const router = useRouter()
const adminloginform = reactive({
    name: '',
    password: '',
    isRemeber: false
})
const rules = {
    name: [{ required: true, message: "Name is Required" }, { minLength: 6, message: 'Name must be greater than 6' }],
    password: [{ required: true, message: "Password is Required" }, { minLength: 6, message: 'Password must be greater than 6' }]
}
const submit = async () => {
    loading.value = true
    msg.value = 'Waitting...'
    const admin = useAdminStore()
    const result = await admin.adminlogin(adminloginform)
    loading.value = false
    msg.value = 'Submit'
    if (result.code === 0) return Notification.error(result.msg)
    return Notification.success(result.msg), router.push('/admin')
}
</script>

<style scoped>
.title {
    text-align: center;
    color: var(--color-text-1);
    margin-top: 40px;
    font-size: 24px;
}

.adminloginform {
    width: 320px;
    margin: 0 auto;
    margin-top: 60px;
}

.submit {
    margin: 30px auto;
}
</style>