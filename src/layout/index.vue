<template>
    <div class="layput_container">
        <!-- 左侧菜单区域 -->
        <div class="layput_slider" :class="{ fold: layoutSettingStore.isFold ? true : false }">
            <Logo :isFold="layoutSettingStore.isFold"></Logo>
            <!-- 菜单区域 -->
            <el-scrollbar class="scrollbar">
                <!-- 
                    :default-active="$route.path"
                    刷新页面时展开菜单显示当前选中项
                -->
                <el-menu :collapse="layoutSettingStore.isFold" background-color="#001529" text-color="#fff"
                    @select="goRoute" :default-active="$route.path">
                    <Menu :routeList="userStore.routeList"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 头部导航区域 -->
        <div class="layout_tabbar" :class="{ fold: layoutSettingStore.isFold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <!-- 主要内容区域 -->
        <div class="layout_main" :class="{ fold: layoutSettingStore.isFold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import Main from './Main/index.vue'
import Tabbar from './Tabbar/index.vue'

import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

const $router = useRouter()

const goRoute = (path: any) => {
    $router.push(path)
}
</script>

<style scoped lang="scss">
.layput_container {
    width: 100vw;
    height: 100vh;

    // 左侧菜单区域
    .layput_slider {
        width: $base-slider-width;
        height: 100vh;
        background-color: $base-slider-bgcolor;
        transition: all 0.5s ease;

        &.fold {
            width: $base-slider-min-width;
        }

        .scrollbar {
            height: calc(100vh - $base-tabbar-height);

            .el-menu {
                border-right: 0px solid #fff;
            }
        }
    }

    // 头部导航区域
    .layout_tabbar {
        position: absolute;
        top: 0;
        left: $base-slider-width;
        // background-color: #fff;
        width: calc(100vw - $base-slider-width);
        height: $base-tabbar-height;
        box-shadow: 0 2px 10px rgb(0 0 0 / 6%);
        z-index: 999;
        padding: 0 20px;
        transition: all 0.5s ease;

        &.fold {
            width: calc(100vw - $base-slider-min-width);
            left: $base-slider-min-width;
        }
    }

    // 主要内容区域
    .layout_main {
        display: flex;
        position: absolute;
        top: $base-tabbar-height;
        left: $base-slider-width;
        width: calc(100vw - $base-slider-width);
        height: calc(100vh - $base-tabbar-height);
        // background-color: #f5f5f5;
        padding: 20px;
        box-sizing: border-box;
        overflow: auto;
        transition: all 0.5s ease;

        &.fold {
            width: calc(100vw - $base-slider-min-width);
            left: $base-slider-min-width;
        }
    }
}
</style>