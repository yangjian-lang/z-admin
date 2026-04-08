<template>
    <div id="barChart" ref='charts'></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
let charts = ref()

onMounted(() => {
    setTimeout(() => {
        renderChart()
    }, 50);
})
// 图表实例
const renderChart = () => {
    // 获取echarts实例对象
    let myChart = echarts.init(charts.value);
    // 绘制图表
    myChart.setOption({
        xAxis: {
            show: false,
            type: 'category'
        },
        yAxis: {
            show: false
        },
        series: [
            {
                name: '支付笔数',
                type: 'bar',
                data: [45, 20, 36, 25, 48, 18, 56, 33, 15, 26, 75, 52, 16, 10],
            }
        ],

        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    });
}
</script>
<style scoped lang="scss">
#barChart {
    width: 100%;
    height: 100%;
}
</style>