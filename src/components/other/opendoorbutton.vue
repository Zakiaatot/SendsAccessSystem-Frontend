<template>
    <div class="button">
        <a-button long type="primary" status="success" :disabled="!online" @click="opendoorclick" :loading="loading">
            {{msg}}
        </a-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { opendoor } from '../../axios'
import { Notification } from '@arco-design/web-vue'
const msg = ref('开门')
const client = defineProps({ clientname: String, online: Boolean })
const loading = ref(false)
const opendoorclick = async () => {
    loading.value = true
    msg.value = '请稍等...'
    const result = await opendoor({ clientname: client.clientname })
    if (result.code === 0) {
        Notification.error({ content: result.msg.message ? result.msg.message : result.msg, position: 'bottomRight' })
    } else {
        if (result.msg.status === 'busy') {
            Notification.warning({ content: '门已开着', position: 'bottomRight' })
        } else if (result.msg.status === 'open') {
            Notification.success({ content: '开门成功', position: 'bottomRight' })
        }
    }
    msg.value = '请勿频繁操作哦'
    setTimeout(() => {
        loading.value = false
        msg.value = '开门'
    }, 5000)
}
</script>

<style scoped>
.button {
    margin: 20px auto;
    width: 260px;
}
</style>