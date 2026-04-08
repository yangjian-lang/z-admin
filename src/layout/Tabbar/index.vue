<template>
    <div class="tabbar_container">
        <!-- 左侧区域 -->
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <!-- 右侧区域 -->
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from './Breadcrumb/index.vue'
    import Setting from './Setting/index.vue'

</script>

<style scoped lang="scss">
    .tabbar_container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;

        .tabbar_left {
            display: flex;
            align-items: center;
        }

        .tabbar_right {
            display: flex;
            align-items: center;
        }
    }
</style>