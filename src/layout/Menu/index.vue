<template>
    <template v-for="route in routeList" :key="route.path">
        <!-- 有子集但只有一个 -->
        <template v-if="route.children && route.children.length < 2">
            <el-menu-item :index="route.children[0].path" v-if="!route.meta.hidden">
                <el-icon>
                    <component :is="route.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ route.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 无子集 -->
        <template v-if="!route.children">
            <el-menu-item :index="route.path" v-if="!route.meta.hidden">
                <el-icon>
                    <component :is="route.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ route.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子集且有多个 -->
        <template v-if="route.children && route.children.length > 1">
            <el-sub-menu :index="route.path" v-if="!route.meta.hidden">

                <template #title>
                    <el-icon>
                        <component :is="route.meta.icon"></component>
                    </el-icon>
                    <span>{{ route.meta.title }}</span>
                </template>
                <Menu :routeList="route.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts">
defineProps(['routeList'])
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped lang="scss"></style>