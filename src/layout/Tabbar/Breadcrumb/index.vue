<template>
    <!-- 收起/展开左侧菜单图标 -->
    <el-icon class="icon" @click="handleFold">
        <Fold v-show="!layoutSettingStore.isFold" />
        <Expand v-show="layoutSettingStore.isFold" />
    </el-icon>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

const $route = useRoute()
const layoutSettingStore = useLayoutSettingStore()

// 折叠|展开左侧菜单
const handleFold = () => {
    layoutSettingStore.isFold = !layoutSettingStore.isFold
}
</script>

<style scoped lang="scss">
.icon {
    margin-right: 10px;
    cursor: pointer;
}
</style>