<template>
    <div class="sex_container">
        <Title name="性别比例"></Title>
        <div class="content">
            <div class="man">
                <div class="name">男士</div>
                <img src="@/assets/image/screen_man.png" alt="男士">
            </div>
            <div class="woman">
                <div class="name">女士</div>
                <img src="@/assets/image/screen_woman.png" alt="女士">
            </div>
        </div>
        <div class="title">
            <span>男士：58%</span>
            <span>女士：42%</span>
        </div>
        <div class="chart">
            <SexProgressChart></SexProgressChart>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from './components/Title.vue'
    import SexProgressChart from './components/sexProgressChart.vue'
</script>

<style scoped lang="scss">
    .sex_container {
        background: url(@/assets/image/screen_main_IB.png) no-repeat;
        background-size: 100% 100%;

        .content {
            display: flex;
            flex-direction: row;
            padding-top: 30px;
            justify-content: center;

            .man {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: url(@/assets/image/screen_man_bg.png) no-repeat;
                background-size: 100% 100%;
                width: 100px;
                height: 110px;
                margin-right: 50px;
                color: #007AFE;
            }

            .woman {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: url(@/assets/image/screen_woman_bg.png) no-repeat;
                background-size: 100% 100%;
                width: 100px;
                height: 110px;
                color: #FF4B7A;
            }

            .name {
                font-size: 14px;
                margin-top: 2px;
                margin-bottom: 16px;
            }
        }

        .title {
            font-size: 12px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            padding: 0 100px;
        }

        .chart {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 5px;
        }
    }
</style>