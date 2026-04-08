<template>
  <!-- 功能按钮区域 -->
  <!-- 刷新按钮 -->
  <el-tooltip effect="dark" content="刷新" placement="bottom">
    <el-button
      size="default"
      circle
      icon="Refresh"
      @click="updataRefresh"
    ></el-button>
  </el-tooltip>
  <!-- 全屏展示|退出全屏按钮 -->
  <el-tooltip content="全屏" placement="bottom">
    <el-button
      size="default"
      circle
      icon="FullScreen"
      @click="fullScreen"
      v-show="!isFull"
    ></el-button>
  </el-tooltip>
  <el-tooltip content="退出全屏" placement="bottom">
    <el-button
      size="default"
      circle
      icon="Aim"
      @click="fullScreen"
      v-show="isFull"
    ></el-button>
  </el-tooltip>
  <!-- 设置按钮 -->
  <el-popover placement="top" title="主题设置" :width="200" trigger="click">
    <template #reference>
      <el-button size="default" circle icon="Setting"></el-button>
    </template>
    <template #default>
      <el-form size="large" style="margin-top: 30px">
        <el-form-item label="主题颜色">
          <el-color-picker
            size="default"
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            @change="handleColorChange"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            size="default"
            v-model="dark"
            class="mt-2"
            inline-prompt
            active-icon="Moon"
            inactive-icon="Sunny"
            @change="handleDarkChange"
          />
        </el-form-item>
      </el-form>
    </template>
  </el-popover>

  <!-- 用户头像 -->
  <img
    v-if="userStore.avatar"
    class="user_img"
    :src="userStore.avatar"
    alt="头像"
  />
  <div v-else class="user_img"></div>

  <!-- 下拉菜单 -->
  <el-dropdown size="large">
    <span style="cursor: pointer">
      {{ userStore.nickName }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

let isFull = ref(false) // 是否全屏
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

let color = ref<any>('rgba(30, 144, 255, 1)') // 当前的主题色
const predefineColors = ref([
  // 预定义的主题色
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let dark = ref(false) // 是否开启暗黑模式
onMounted(() => {
  // 从本地读取上次储存的主题色
  color.value = localStorage.getItem('COLOR') || 'rgba(30, 144, 255, 1)'
  handleColorChange()
})
// 刷新页面
const updataRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏显示
const fullScreen = () => {
  let full = document.fullscreenElement // 获取当前是否全屏显示 true：全屏 | false：非全屏
  if (full) {
    // 全屏
    document.exitFullscreen() // 退出全屏
    isFull.value = false
  } else {
    // 非全屏
    document.documentElement.requestFullscreen() // 进入全屏
    isFull.value = true
  }
}
// 更换主题色
const handleColorChange = () => {
  const html = document.documentElement
  // 设置 css 变量
  html.style.setProperty('--el-color-primary', color.value)
  html.style.setProperty('--el-color-warning', color.value)

  // 在本地存储该颜色，在下次加载页面时读取储存的颜色
  localStorage.setItem('COLOR', color.value)
}
// 切换暗黑模式
const handleDarkChange = () => {
  let html = document.documentElement // 获取根节点
  dark.value ? (html.className = 'dark') : (html.className = '') // 根据暗黑模式的切换给根节点动态添加dark类名
}
// 退出登录
const logout = async () => {
  // 必须等退出登录接口返回成功信息才能执行跳转，所以要用 async,await
  await userStore.logout() // 通知仓库退出登录
  // 跳转登录页面，并将当前点击的路由地址传递过去，使其下次登录时还在上次退出前的页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss">
.user_img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 10px;
}
</style>
<style >
.custom-popover {
  z-index: 1000; /* 设置一个较高的 z-index 值 */
}
</style>