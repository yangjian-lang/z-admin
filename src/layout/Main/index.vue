<template>
    <router-view v-slot="{ Component }">
        <!-- 一级路由的子路由的进出动画 -->
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting.ts'

const layoutSettingStore = useLayoutSettingStore()
let flag = ref(true) // 当前组件是否存在

// 监听layoutSettingStore仓库中的refresh变量的变化判断用户是否点击刷新
watch(() => layoutSettingStore.refresh, () => {
    flag.value = false // 销毁组件
    nextTick(() => { // 组件挂载完毕后
        flag.value = true // 挂载组件
    })
})
</script>

<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all 1s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>