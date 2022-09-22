<template>
    <a-layout-content>
        <a-tabs type="capsule" size="large" :animation="true" default-active-key="1" lazy-load>
            <a-tab-pane key="1" title="客户端信息">
                <ClientInfo></ClientInfo>
            </a-tab-pane>
            <a-tab-pane key="2" title="用户信息">
                <UserInfo></UserInfo>
            </a-tab-pane>
            <a-tab-pane key="3" title="日志信息">
                <ServerLog></ServerLog>
            </a-tab-pane>
            <a-tab-pane key="4" title="管理员设定">
                <AdminSetting></AdminSetting>
            </a-tab-pane>
        </a-tabs>
    </a-layout-content>
</template>

<script setup>
import UserInfo from "./Admin/UserInfo.vue"
import ClientInfo from "./Admin/ClientInfo.vue"
import AdminSetting from "./Admin/AdminSetting.vue"
import ServerLog from "./Admin/ServerLog.vue"
</script>

<style scoped>
.arco-layout-content {
    height: 100%;
    overflow-y: hidden;
}

:deep(.arco-tabs-nav-tab-list) {
    margin: 0 auto;
}

:deep(.arco-tabs-nav-size-large.arco-tabs-nav-type-line .arco-tabs-tab) {
    font-size: 16px;
}

:deep(.arco-tabs) {
    margin-top: 20px;
}
</style>