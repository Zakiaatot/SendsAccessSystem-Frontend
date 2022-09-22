<template>
    <a-layout-header class="head animate__animated animate__fadeInDown">
        <a-row justify="space-between" class="headrow">
            <a-col :xs="12" :sm="6" class="logospace">
                <a href="/" v-jello.hover>
                    <img src="../assest/SendsAccessSystem.webp" alt="SendsLogo"
                        class="logo animate__animated animate__flip" />
                </a>
            </a-col>
            <a-col :xs="0" :sm="6" class="navspace">
            </a-col>
            <a-col :xs="8" :sm="6" class="otherspace">
                <div style="display: inline-block;" v-flash.click>
                    <a-switch checked-color="#373739"
                        class="darkswitch animate__animated animate__swing animate__delay-1s" v-model="isDark">
                        <template #checked-icon>
                            <icon-moon-fill />
                        </template>
                        <template #unchecked-icon>
                            <icon-sun-fill />
                        </template>
                    </a-switch>
                </div>
            </a-col>
        </a-row>
    </a-layout-header>
</template>

<script setup>
import { IconSunFill, IconMoonFill } from '@arco-design/web-vue/es/icon'
import { useDark } from '@vueuse/core'

const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
})

</script>

<style scoped>
.head {
    height: 60px;
    border-bottom: 1px solid var(--color-border-2);
    overflow: hidden;
}

.headrow,
.arco-row>.arco-col {
    height: 100%;
}

.logospace {
    text-align: center;
}

.logospace a {
    display: block;
    height: 100%;
}

.logo {
    height: 24px;
    margin: 18px 0;
}

.otherspace {
    text-align: center;
}

.darkswitch {
    margin: 18px 0;
}

:deep(.arco-switch-checked .arco-switch-handle) {
    color: rgb(255, 239, 97);
}

:deep(.arco-switch-handle) {
    background-color: var(--color-bg-1);
}

:deep(.arco-switch-handle) {
    color: rgb(242, 141, 0);
}
</style>