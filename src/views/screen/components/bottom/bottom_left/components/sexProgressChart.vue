<template>
    <div class="chart" ref="charts"></div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'

    let charts = ref()
    onMounted(() => {
        let myChart = echarts.init(charts.value)
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
                    name: '男女比例',
                    type: 'bar',
                    data: [58],
                    barWidth: 12, // 柱状图宽度
                    color: '#007AFE',
                    showBackground: true,
                    backgroundStyle: {
                        color: '#FF4B7A',
                        borderRadius: 20
                    },
                    itemStyle: {
                        borderRadius: 20
                    }
                }
            ],

            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        })
    })
</script>

<style scoped lang="scss">
    .chart {
        width: 300px;
        height: 12px;
    }
</style>