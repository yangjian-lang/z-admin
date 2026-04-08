<template>
    <div class="container">
        <h1>404</h1>
        <h4>页面未找到，请单击下方按钮返回首页！</h4>
        <el-button class="btn" @click="goHome">返回首页</el-button>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'

    const $router = useRouter()
    const goHome = () => {
        $router.push('/home')
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10%;

        h1 {
            font-size: 300px;
            font-weight: bolder;
            color: #333;
        }

        h4 {
            font-size: 16px;
            font-size: #666;
            margin-top: 100px;
            margin-bottom: 40px;
        }

        .btn {
            width: 240px;
            height: 50px;
            color: #fff;
            background-color: rgb(0, 157, 255);
            font-size: 16px;
            transition: all 0.3s;

            &:hover {
                background-color: rgb(0, 127, 230)
            }
        }


    }
</style>