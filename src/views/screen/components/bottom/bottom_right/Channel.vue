<template>
    <div class="channel_container">
        <Title name="预约渠道数据统计"></Title>
        <div class="chart" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import Title from '../bottom_left/components/Title.vue'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()
const list1 = ref([
    { value: 40, name: '大众点评 - 40%' },
    { value: 10, name: '携程 - 10%' },
    { value: 20, name: '飞猪 - 20%' },
    { value: 30, name: '其他平台 - 30%' }
])
onMounted(() => {
    let myChart = echarts.init(charts.value)
    let option = <any>{
        title: {
            text: '100%',
            top: '38%',
            left: 'center',
            textStyle: {
                fontSize: 32,
                color: '#ffffff'
            },
            subtext: '渠道统计',
            subtextStyle: {
                color: 'rgba(223, 245, 252, 1)'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        // 可动态生成颜色集合
        color: ['rgba(241, 196, 71, 1)', null, 'rgba(251, 109, 48, 1)', null, 'rgba(239, 61, 119, 1)', null, '#007AFE', null],
        series: [
            {
                name: '项目规模占比',
                type: 'pie',
                radius: ['60%', '70%'],
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 14,
                },
                data: addBlank(list1.value)
            },
            {
                type: 'pie',
                radius: ['75%', '75.5%'],
                label: {
                    show: false
                },
                data: addBlank(list1.value)
            }
        ]
    }
    myChart.setOption(option)
})
const addBlank = (list: any) => {
    const ret = []
    for (let _list of list) {
        ret.push(_list)
        ret.push({
            name: '',
            value: 1
        })
    }
    return ret
}
</script>

<style scoped lang="scss">
.channel_container {
    background: url(@/assets/image/screen_main_IB.png) no-repeat;
    background-size: 100% 100%;

    .chart {
        width: 100%;
        height: 240px;
    }
}
</style>