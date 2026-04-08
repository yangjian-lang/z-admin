<template>
  <div class="detail_container">
    <div class="title_container">
      <span class="title">{{ title }}</span>
      <el-icon color="#ddd" size="16">
        <InfoFilled />
      </el-icon>
    </div>
    <div class="content_container">
      <span class="count">{{ count }}</span>
      <span class="weekCount">{{ weekCount }}</span>
      <el-icon v-if="isUp" color="#FF6161">
        <CaretBottom />
      </el-icon>
      <el-icon v-else color="#45CD47">
        <CaretTop />
      </el-icon>
    </div>
    <div id="searchChart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import $bus from '@/bus/index.ts'

let myChart = ref()
let detail = defineProps(['title', 'count', 'weekCount', 'isUp', 'chartData'])
onMounted(() => {
  setTimeout(() => {
    renderChart(detail.chartData)
  }, 50)
  $bus.on('changeSearchChart', (data) => {
    renderChart(data)
  })
})
onBeforeUnmount(() => {
  myChart.value.dispose() // 销毁图表
  $bus.off('changeSearchUserchart')
})
// 图表实例
const renderChart = (data: any) => {
  // 获取echarts实例对象
  myChart.value = echarts.init(document.getElementById('searchChart'))
  // 绘制图表
  myChart.value.setOption({
    xAxis: {
      show: false,
      type: 'category',
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        name: '销量',
        smooth: true, //将直线变为曲线
        type: 'line',
        data: data,
        // 拐点的样式
        itemStyle: {
          opacity: 0,
        },
        // 线段的样式
        lineStyle: {
          color: '#5FA4E0',
        },
        // 填充的样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#5FA4E0', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(95,164,224,0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
    grid: {
      top: 0,
      left: -30,
      right: 0,
      bottom: 0,
    },
  })
}
</script>

<style scoped lang="scss">
.detail_container {
  padding-bottom: 24px;

  .title_container {
    display: flex;
    align-items: center;
    margin-top: 24px;

    .title {
      margin-right: 10px;
      color: #999;
    }
  }

  .content_container {
    margin-top: 24px;
    margin-bottom: 30px;

    .count {
      font-size: 30px;
      margin-right: 40px;
    }

    .weekCount {
      color: #999;
      font-size: 15px;
      margin-right: 5px;
    }
  }

  #searchChart {
    height: 200px;
  }
}
</style>