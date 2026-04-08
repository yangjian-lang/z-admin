<template>
    <div class='water_polp_chart' ref="charts"></div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import * as echarts from 'echarts'
    import 'echarts-liquidfill' // 引入水球图拓展

    let charts = ref()
    onMounted(() => {
        let myChart = echarts.init(charts.value)

        let option = {
            series: [
                {
                    type: 'liquidFill',
                    radius: '70%', // 控制中间圆球的尺寸（此处可以理解为距离外圈圆的距离控制）
                    center: ['50%', '50%'],
                    data: [
                        0.6,
                        {
                            value: 0.6,
                            direction: 'left', //波浪方向
                        },
                    ], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'rgba(62, 208, 255, 1)', // 球体本景色
                    },
                    amplitude: '6%', //波浪的振幅
                    // 修改波浪颜色
                    // color: ['#0286ea', 'l#0b99ff'], // 每个波浪不同颜色，颜色数组长度为对应的波浪个数
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: '#6CDEFC',
                                },
                                {
                                    offset: 0,
                                    color: '#429BF7',
                                },
                            ],
                            globalCoord: false,
                        },
                    ],
                    label: {
                        normal: {
                            formatter: '预留量/60%',
                            fontSize: 14,
                            color: 'rgba(255,255,255,1)',
                            position: ['50%', '20%'],
                            fontWeight: 400,
                        },
                    },
                    outline: {
                        show: false,
                    },
                },
                {
                    type: 'pie',
                    z: 1,
                    center: ['50%', '50%'],
                    radius: ['72%', '73.5%'], // 控制外圈圆的粗细
                    hoverAnimation: false,
                    data: [
                        {
                            name: '',
                            value: 500,
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: '#00AFFF',
                            },
                            emphasis: {
                                labelLine: {
                                    show: false,
                                },
                                itemStyle: {
                                    color: '#00AFFF',
                                },
                            },
                        },
                    ],
                },
                {
                    //外发光
                    type: 'pie',
                    z: 1,
                    zlevel: -1,
                    radius: ['70%', '90.5%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    clockWise: false,
                    itemStyle: {
                        normal: {
                            borderWidth: 20,
                            color: 'rgba(224,242,255,.05)',
                        },
                    },
                    label: {
                        show: false,
                    },
                    data: [100],
                },
                {
                    //底层外发光
                    type: 'pie',
                    z: 1,
                    zlevel: -2,
                    radius: ['70%', '100%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    clockWise: false,
                    itemStyle: {
                        normal: {
                            borderWidth: 20,
                            color: 'rgba(224,242,255,.05)',
                        },
                    },
                    data: [100],
                },
                {
                    type: 'pie',
                    zlevel: 0,
                    silent: true,
                    radius: ['78%', '80%'],
                    z: 1,
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: pie(),
                },
            ],
        }
        myChart.setOption(option)
    })

    const pie = () => {
        let dataArr = [];
        for (var i = 0; i < 150; i++) {
            if (i % 2 === 0) {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 50,
                    itemStyle: {
                        normal: {
                            color: '#00AFFF',
                            borderWidth: 0,
                            borderColor: 'rgba(0,0,0,0)',
                        },
                    },
                });
            } else {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                            borderColor: 'rgba(0,0,0,0)',
                        },
                    },
                });
            }
        }
        return dataArr;
    }
</script>

<style scoped lang="scss">
    .water_polp_chart {
        margin-top: 20px;
        width: 100%;
        height: 240px;
        /* background-color: red; */
    }
</style>












<!-- <template>
    <div class='water_polp_chart' ref="charts"></div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import * as echarts from 'echarts'
    import 'echarts-liquidfill' // 引入水球图拓展

    let charts = ref()
    onMounted(() => {
        let myChart = echarts.init(charts.value)
        myChart.setOption({
            title: {
                text: ''
            },
            xAxis: {},
            yAxis: {},
            series: {
                type: 'liquidFill',
                data: [0.6, 0.5, 0.4],
                color: ['#23C6D9', '#23C6D9', '#23C6D9'],
                animationDuration: 800,
                animationDurationUpdate: 800,
                radius: '80%', // 大小
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: '#23C6D9',
                    color: '#090B3C'
                },
                label: {
                    formatter: '预留量',
                    fontSize: 14,
                    color: '#fff',
                    position: ['50%', '20%'],
                    fontWeight: 300
                },
                outline: {
                    show: true,
                    borderDistance: 10,
                    itemStyle: {
                        color: 'none',
                        borderColor: '#23C6D9',
                        borderWidth: 5,
                    }
                },
            },
            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },

        })
    })
</script>

<style scoped lang="scss">
    .water_polp_chart {
        width: 100%;
        height: 280px;
        /* background-color: red; */
    }
</style> -->