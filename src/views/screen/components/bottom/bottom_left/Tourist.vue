<template>
    <div class="tourist_container">
        <!-- 头部标题区域 -->
        <Title name="实时游客统计"></Title>
        <div class="order_count">可预约总量<span>999999</span>人</div>
        <div class="tourist_count">
            <span class="tourist_item" v-for="(item,index) in touristCount" :key="index">
                {{item}}
            </span>
        </div>
        <div class="water_polo_chart">
            <WaterPoloChart></WaterPoloChart>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from './components/Title.vue'
    import WaterPoloChart from './components/waterPoloChart.vue'
    import { ref } from 'vue'
    let touristCount = ref(['2', '1', '6', '9', '0', '8', '人'])
</script>

<style scoped lang="scss">
    .tourist_container {
        background: url(@/assets/image/screen_main_IB.png) no-repeat;
        background-size: 100% 100%;

        .order_count {
            font-size: 16px;
            color: #fff;
            text-align: right;
            margin-right: 20px;

            span {
                color: #ffb700;
                font-family: 'Times New Roman';
                font-weight: bold;
                margin: 0 6px;
            }
        }

        .tourist_count {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            margin-top: 30px;
            padding: 0 20px;

            .tourist_item {
                display: inline-block;
                width: 65px;
                height: 40px;
                background: url(@/assets/image/screen_tourist_num_bg.png) no-repeat;
                background-size: 100% 100%;
                text-align: center;
                line-height: 40px;
                color: #29fcff;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>