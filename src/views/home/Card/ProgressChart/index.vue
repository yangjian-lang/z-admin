<template>
    <div id="progressChart" ref='charts'></div>
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
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [
            {
                name: '支付笔数',
                type: 'bar',
                data: [78],
                barWidth: 30, // 柱状图宽度
                color: '#7FDCB4',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(0,0,0,.05)'
                },
                // 文本
                label: {
                    show: true,
                    position: 'right',
                    color: '#7FDCB4',
                    fontSize: 15
                }
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
<style scoped>
#progressChart {
    width: 100%;
    height: 100%;
}
</style>