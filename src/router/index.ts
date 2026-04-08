// @ts-ignore
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
    history: createWebHashHistory(),// 路由模式
    routes: constantRoute,
    // 滚动行为
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    },
})

export default router