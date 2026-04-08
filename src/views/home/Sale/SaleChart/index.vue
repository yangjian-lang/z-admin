<template>
    <div id="saleChart" ref="charts"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, watch } from 'vue'
let charts = ref()
let chartData = ref([100, 122, 200, 334, 390, 330, 220, 300, 122, 200, 334, 390, 330])

const title = defineProps(['title'])

onMounted(() => {
    setTimeout(() => {
        renderChart()
    }, 50);
})

watch(title, (nVal) => {
    if (nVal.title == 'interview') {
        chartData.value = [200, 300, 120, 225, 124, 450, 150, 200, 135, 410, 135, 200, 100]
    } else if (nVal.title == 'sales') {
        chartData.value = [100, 122, 200, 334, 390, 330, 220, 300, 122, 200, 334, 390, 330]
    }
    renderChart() // 重新创建图标实例
})
// 图表实例
const renderChart = () => {
    // 获取echarts实例对象
    let myChart = echarts.init(charts.value);
    // 绘制图表
    myChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '40%',
                data: chartData.value
            }
        ]
    });
}
</script>
<style scoped lang="scss">
#saleChart {
    width: 100%;
    height: 400px;
}
</style>