<template>
    <h1 class="title">客户端信息</h1>
    <div class="progress">
        <a-progress type="circle" :percent="(5-time)/5" :status="progressstatus" />
        <div>{{time}}s</div>
    </div>
    <a-card title="506" hoverable>
        <icon-cloud size="100px" :class="conf[506].isOnline?animationclass:null" />
        <div>状态：{{conf[506].isOnline?"在线":"离线"}}</div>
        <opendoorbutton clientname="506" :online="conf[506].isOnline"></opendoorbutton>
    </a-card>
    <a-card title="507" hoverable>
        <icon-cloud size="100px" :class="conf[507].isOnline?animationclass:null" />
        <div>状态：{{conf[507].isOnline?"在线":"离线"}}</div>
        <opendoorbutton clientname="507" :online="conf[507].isOnline"></opendoorbutton>
    </a-card>
</template>

<script setup>
import { IconCloud } from '@arco-design/web-vue/es/icon'
import { Notification } from '@arco-design/web-vue'
import { onBeforeUnmount, reactive, ref } from 'vue'
import { checkclient } from '../../../../axios/index.js'
import opendoorbutton from '../../../../components/other/opendoorbutton.vue'
const time = ref(5)
const progressstatus = ref()
const animationclass = "animate__animated animate__heartBeat animate__delay-1s animate__infinite"
const conf = reactive({
    506: {
        isOnline: false
    },
    507: {
        isOnline: false
    }
})
const getdata = async (openmsg) => {
    const result = await checkclient()
    if (result.code === 0) {

        if (openmsg) Notification.error({ content: result.msg.message ? result.msg.message : result.msg, position: 'bottomRight' })
        progressstatus.value = 'danger'
    }
    else {
        if (openmsg) Notification.success({ content: '获取客户端数据成功', position: 'bottomRight' })
        progressstatus.value = 'success'
        for (let j in conf) {
            conf[j].isOnline = false
            for (let i in result.msg) {
                if (i == j && result.msg[i].connection) {
                    conf[j].isOnline = true
                }
            }
        }
    }
}
getdata(true)
const checkregular = setInterval(async () => {
    if (time.value === 0) {
        await getdata()
        time.value = 5
    } else {
        time.value -= 1
    }
}, 1000)

onBeforeUnmount(() => {
    clearInterval(checkregular)
})
</script>

<style scoped>
.title {
    text-align: center;
    color: var(--color-text-1);
}

.arco-card {
    margin: 40px auto;
    width: 370px;
}

:deep(.arco-card-header) {
    text-align: center;
}

:deep(.arco-card-body) {
    text-align: center;
    font-size: 16px;
}

.progress {
    text-align: center;
}
</style>