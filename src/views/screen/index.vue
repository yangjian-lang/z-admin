<template>
  <div class="screen_container">
    <div class="screen" ref="screen">
      <!-- 顶部导航区域 -->
      <Top :now="now"></Top>
      <!-- 底部内容区域 -->
      <div class="bottom_container">
        <div class="bottom_left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="bottom_center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="bottom_right">
          <Rank class="rank"></Rank>
          <Visitor class="visitor"></Visitor>
          <Channel class="channel"></Channel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from './components/top/Top.vue'
import Tourist from './components/bottom/bottom_left/Tourist.vue'
import Sex from './components/bottom/bottom_left/Sex.vue'
import Age from './components/bottom/bottom_left/Age.vue'
import Map from './components/bottom/bottom_center/Map.vue'
import Line from './components/bottom/bottom_center/Line.vue'
import Rank from './components/bottom/bottom_right/Rank.vue'
import Visitor from './components/bottom/bottom_right/Visitor.vue'
import Channel from './components/bottom/bottom_right/Channel.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'

let screen = ref() // 获取数据大屏dom的根节点
let now = ref('') // 当前时间
let timer = ref<any>(0) // 用于记录当前时间的定时器，组件卸载时销毁
onMounted(() => {
  // 页面一加载就自适应一下宽高
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  // 获取当前时间
  now.value = getDate()
  // 实时更新时间
  timer.value = setInterval(() => {
    now.value = getDate()
  }, 1000)
})
onBeforeUnmount(() => {
  // 销毁计时器
  clearInterval(timer.value)
})
// 数据大屏自适应宽高的解决方法
const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w
  let wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 视窗变化时触发，控制元素缩放
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
// 返回当前时间
const getDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss')
</script>

<style scoped lang="scss">
.screen_container {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/image/screen-bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    /* 缩放参考点 */
    transform-origin: left top;

    .bottom_container {
      display: flex;
      flex-direction: row;

      .bottom_left {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        height: 1000px;

        .tourist {
          flex: 1.5;
        }

        .sex {
          flex: 1;
          margin: 20px 0;
        }

        .age {
          flex: 1;
        }
      }

      .bottom_center {
        display: flex;
        flex-direction: column;
        flex: 1.8;
        width: 100%;
        margin: 0 20px;

        .map {
          flex: 2.5;
        }

        .line {
          flex: 1;
          margin-top: 24px;
        }
      }

      .bottom_right {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;

        .rank {
          flex: 1.3;
        }

        .visitor {
          flex: 1;
          margin: 20px 0;
        }

        .channel {
          flex: 1;
        }
      }
    }
  }
}
</style>