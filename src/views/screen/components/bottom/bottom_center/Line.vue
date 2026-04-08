<template>
    <div class='line_container'>
        <Title name="未来30天游客量趋势图"></Title>
        <div class="chart" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import Title from '../bottom_left/components/Title.vue'
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()
// let len = ref(0)
let xLabel = ref(['08/18', '08/21', '08/24', '08/27', '08/30', '09/02', '09/05', '09/08', '09/11', '09/14', '09/17'])
let data = ref(["18000", "3589", "18000", "7600", "14625", "8625", "21568", "9826", "13568", "7953", "14523"])

onMounted(() => {
    let myChart = echarts.init(charts.value)
    let option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'transparent',
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(126,199,255,0)' // 0% 处的颜色
                        }, {
                            offset: 0.5,
                            color: 'rgba(126,199,255,1)' // 100% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(126,199,255,0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
            },
        },
        grid: {
            top: '18%',
            left: '10%',
            right: '5%',
            bottom: '22%',
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: '#233653'
                },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
                textStyle: {
                    color: '#7ec7ff',
                    padding: 16,
                    fontSize: 14
                },
                formatter: function (data: any) {
                    return data
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#192a44'
                },
            },
            axisTick: {
                show: false,
            },
            data: xLabel.value
        }],
        yAxis: [{
            nameTextStyle: {
                color: "#7ec7ff",
                fontSize: 16,
                padding: 10
            },
            min: 0,
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#192a44'
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#233653"
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#7ec7ff',
                    padding: 16
                },
                formatter: function (value: any) {
                    if (value === 0) {
                        return value
                    }
                    return value
                }
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2,
                    color: "rgba(25,163,223,1)", // 线条颜色
                },
                borderColor: 'rgba(0,0,0,.4)',
            },
            itemStyle: {
                color: "rgba(25,163,223,1)",
                borderColor: "#646ace",
                borderWidth: 2

            },
            tooltip: {
                show: false,
            },
            areaStyle: { //区域填充样式
                normal: {
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(25,163,223,.3)"
                    },
                    {
                        offset: 1,
                        color: "rgba(25,163,223, 0)"
                    }
                    ], false),
                    shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
            },
            data: data.value
        }]
    }
    myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.line_container {
    background: url(@/assets/image/screen_main_IB.png) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;

    .chart {
        height: 230px;
        width: 100%;
        /* background-color: antiquewhite; */
    }
}
</style>