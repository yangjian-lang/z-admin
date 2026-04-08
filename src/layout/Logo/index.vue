<template>
    <div class="logo_container" v-if="setting.logoHidden" @click="handleLogo">
        <!-- <img :class="[{max_img : isFold ? false : true },{min_img : isFold ? true : false }]"
            :src="isFold?setting.minLogo:setting.logo" alt="logo"> -->
        <img v-if="isFold" class="min_img" :src="setting.minLogo" alt="logo">
        <img v-else class="max_img" :src="setting.logo" alt="logo">

    </div>
</template>

<script setup lang="ts">
    // 引入logo配置文件
    import setting from '@/setting';
    import { useRouter } from 'vue-router'

    const $router = useRouter()
    defineProps(['isFold'])

    const handleLogo = () => {
        $router.push('/home')
    }
</script>

<style scoped lang="scss">
    .logo_container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
        transition: all 0.5s ease;
        cursor: pointer;

        .max_img {
            width: 140px;
        }

        .min_img {
            width: 14px;
        }

    }
</style>