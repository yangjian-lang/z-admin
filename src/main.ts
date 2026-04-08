import { createApp } from 'vue'

import store from './store'
import router from './router'
import App from './App.vue'

import '@/styles/index.scss' // 引入全局样式
import ElementPlus from 'element-plus' // 引入element-plus
import 'element-plus/dist/index.css' // 引入element-plus的样式
import 'element-plus/theme-chalk/dark/css-vars.css' // 引入暗黑模式的样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入element-plus的所有图标
// import * as dayjs from 'dayjs'
// import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
// import 'dayjs/locale/zh-cn' // 导入本地化语言

// dayjs.extend(isLeapYear) // 使用插件
// dayjs.locale('zh-cn') // 使用本地化语言
// 通过“ // @ts-ignore ”可让tslint不对其进行校验
// // @ts-ignore
// import { zhCn } from 'element-plus/dist/locale/zh-cn.mjs'
import '@/router/premisstion' // 引入路由鉴权
import CategoryList from '@/components/CategoryList.vue' // 引入三级联动组件
import Search from '@/components/Search.vue' // 引入搜索组件

const app = createApp(App)
app.use(store)
app.use(router)
app.component('CategoryList', CategoryList) // 将三级联动注册为全局组件
app.component('Search', Search) // 将搜索注册为全局组件

// 在引入 ElementPlus 时，可以传入一个包含 size 和 zIndex 属性的全局配置对象。
// size 用于设置表单组件的默认尺寸; zIndex 用于设置弹出组件的层级，zIndex 的默认值为 2000; locale 用于设置国际化的默认语言，默认是英语
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
// 对所有图标进行注册，可以直接当做全局组件进行使用
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// console.log(import.meta.env);
app.mount('#app')