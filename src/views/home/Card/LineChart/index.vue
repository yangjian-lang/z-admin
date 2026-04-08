<template>
    <div id="lineChart" ref="charts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
let charts = ref<any>()

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
                name: '销量',
                smooth: true, //将直线变为曲线
                type: 'line',
                data: [23, 19, 36, 10, 10, 20, 16, 33, 14],
                // 拐点的样式
                itemStyle: {
                    opacity: 0
                },
                // 线段的样式
                lineStyle: {
                    color: '#8C9DFA'
                },
                // 填充的样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#8C9DFA' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(140,157,250,0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }

            }
        ],

        grid: {
            top: 0,
            left: -30,
            right: 0,
            bottom: 0
        }
    });

}
</script>

<style scoped lang="scss">
#lineChart {
    height: 100%;
    width: 100%;
}
</style>