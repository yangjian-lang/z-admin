<template>
    <div class="rank_container">
        <Title name="热门景区排行"></Title>
        <div style="padding: 0 20px;">
            <div class="header">
                <span class="rank">排名</span>
                <span class="scenic_area">景区</span>
                <span class="order_count">预约数量</span>
            </div>
            <div class="content">
                <div class="name">
                    <span class="top">TOP 1</span>
                    <span class="top">TOP 2</span>
                    <span class="top">TOP 3</span>
                    <span>TOP 4</span>
                    <span>TOP 5</span>
                </div>
                <div class="chart" ref="charts"></div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import Title from '../bottom_left/components/Title.vue'
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'

    let charts = ref()
    const datas = ref([
        { name: "峨眉山", percent: "30", total: "10000", finished: "3.00w" },
        { name: "稻城亚丁", percent: "40", total: "10000", finished: "4.00w" },
        { name: "九寨沟", percent: "50", total: "25000", finished: "5.00w" },
        { name: "万里长城", percent: "50", total: "30000", finished: "6.00w" },
        { name: "北京故宫", percent: "80", total: "64000", finished: "8.00w" }
    ]);


    onMounted(() => {
        const yData = datas.value.map(item => item.name);
        const zData = datas.value.map(item => item.finished);
        const pData = datas.value.map(item => item.percent);
        // 设置等长的背景柱状图
        const maxData = new Array(yData.length).fill(100);
        let myChart = echarts.init(charts.value)
        let option = {
            grid: {
                left: "26%",
                right: "20%",
                bottom: "4%",
                top: "0%",
                containLabel: false
            },
            xAxis: [
                {
                    show: true
                },
                {
                    show: false,
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    show: true,
                    data: yData,
                    offset: 40,
                    position: "left",
                    axisLabel: { // 景区名称
                        lineHeight: 0,
                        fontSize: 14,
                        color: "#fff",
                        formatter: "{value}",
                        align: 'center',

                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                {
                    show: true,
                    data: zData,
                    offset: 30,
                    position: "right",
                    axisLabel: {
                        lineHeight: 0,
                        verticalAlign: "bottom",
                        fontSize: 14,
                        color: "#fff",
                        formatter: "{value}",
                        align: 'center',
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: "进度",
                    show: true,
                    type: "bar",
                    barGap: "-100%",
                    xAxisIndex: 1,
                    barWidth: 12,
                    itemStyle: {
                        borderRadius: 30,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#0A7782', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#81EFF3', // 0% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        }
                    },
                    label: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}%',
                        offset: [-10, 2],
                        color: '#fff',
                        fontSize: 12
                    },
                    labelLine: {
                        show: false
                    },
                    z: 2,
                    data: pData,
                    animationDelay: 1000,
                    animationDuration: 1000,
                },
                {
                    name: "百分比",
                    z: 1,
                    show: true,
                    type: "bar",
                    xAxisIndex: 1,
                    barGap: "-100%",
                    barWidth: 12,
                    itemStyle: {
                        borderRadius: 30,
                        color: "rgba(13, 55, 78, .5)"
                    },
                    label: {
                        show: false,
                    },
                    data: maxData
                }
            ]
        }
        myChart.setOption(option)
    })
</script>

<style scoped lang="scss">
    .rank_container {
        background: url(@/assets/image/screen_main_IB.png) no-repeat;
        background-size: 100% 100%;

        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            height: 40px;
            background-color: #13205B;
            border: 1px solid #2D4188;
            margin-top: 45px;
            color: #FFAD47;
            font-size: 14px;
            font-weight: bold;

            .rank {
                margin-left: 30px;
            }

            .scenic_area {
                margin: 0 100px 0 52px;
            }
        }

        .content {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            margin-top: 20px;
            padding-left: 12px;

            .name {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 15px;
                width: 15%;
                height: 220px;
                font-weight: bold;
                color: rgba(255, 255, 255, .5);
                padding-top: 12px;

                span {
                    margin-bottom: 27.5px;
                }

                .top {
                    color: #FFAD47;
                }
            }

            .chart {
                width: 82%;
                height: 220px;
            }
        }
    }
</style>