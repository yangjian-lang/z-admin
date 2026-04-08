<template>
    <div class="container">
        <!-- 头部区域 -->
        <div class="header">
            <span>销售额类别占比</span>
            <el-radio-group v-model="channel" size="large" @change="handleRadio">
                <el-radio-button label="全部渠道" />
                <el-radio-button label="线上" />
                <el-radio-button label="门店" />
            </el-radio-group>
        </div>
        <!-- 图表区域 -->
        <div id="PieChart"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, onBeforeUnmount } from 'vue'
let channel = ref('全部渠道')
let myChart = ref()
let chartData = ref([
    { value: 300, name: '视频广告' },
    { value: 484, name: '联盟广告' },
    { value: 580, name: '邮件营销' },
    { value: 735, name: '直接访问' },
    { value: 1048, name: '搜索引擎' }
])
onMounted(() => {
    setTimeout(() => {
        renderChart(chartData.value)
    }, 50);
})
onBeforeUnmount(() => {
    myChart.value.dispose() // 销毁图表
})
// 切换选项卡
const handleRadio = (val: string) => {
    if (val == '全部渠道') {
        chartData.value = [
            { value: 300, name: '视频广告' },
            { value: 484, name: '联盟广告' },
            { value: 580, name: '邮件营销' },
            { value: 735, name: '直接访问' },
            { value: 1048, name: '搜索引擎' }
        ]
    } else if (val == '线上') {
        chartData.value = [
            { value: 400, name: '联盟广告' },
            { value: 389, name: '直接访问' },
            { value: 653, name: '搜索引擎' },
            { value: 1425, name: '视频广告' },
            { value: 125, name: '邮件营销' }
        ]
    } else if (val == '门店') {
        chartData.value = [
            { value: 246, name: '直接访问' },
            { value: 1056, name: '邮件营销' },
            { value: 348, name: '搜索引擎' },
            { value: 582, name: '视频广告' },
            { value: 765, name: '联盟广告' }
        ]
    }
    renderChart(chartData.value)
}
// 图表实例
const renderChart = (data: any) => {
    // 获取echarts实例对象
    myChart.value = echarts.init(document.getElementById('PieChart'));
    // 绘制图表
    myChart.value.setOption({
        title: {
            text: '',
            subtext: '',
            textStyle: {
                fontSize: 20,
                color: '#999',
                fontWeight: 'normal',
                lineHeight: 30,
            },
            subtextStyle: {
                fontSize: 40,
                color: '#666',
            },
            left: 'center',
            top: 120
        },
        tooltip: {
            trigger: 'item'
        },
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        series: [
            {
                name: '销售额类别占比',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outside'
                },
                labelLine: {
                    show: true,
                },
                data: data
            },
        ]
    })
    // 绑定事件
    myChart.value.on('mouseover', (params: any) => {
        const { name, value } = params.data
        myChart.value.setOption({
            title: {
                text: name,
                subtext: value
            }
        })
    });
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
}

#PieChart {
    width: 100%;
    height: 330px;
}
</style>