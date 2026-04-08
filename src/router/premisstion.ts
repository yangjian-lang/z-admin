// 路由鉴权
import router from '@/router'

import setting from '@/setting' // 引入设置文件
import store from '@/store' // 引入大仓库
import useUserStore from '@/store/modules/user' //引入小仓库
const userStore = useUserStore(store) // 获取小仓库

// @ts-ignore
import nprogress from 'nprogress' // 引入进度条插件
import 'nprogress/nprogress.css' // 引入进度条插件的样式

// 添加全局前置路由
// @ts-ignore
router.beforeEach(async (to, from, next) => {
    document.title = setting.title + '-' + to.meta.title // 文档标题
    nprogress.start() // 进度条开始
    const token = userStore.token
    const nickName = userStore.nickName
    if (token) { // 登录之后
        if (to.path == '/login') { // 去登录页定向到根路径
            next('/')
        } else { // 去其他页面都放行
            if (nickName) { // 以获取到用户信息,直接放行
                next()
            } else { // 为获取到用户信息，先获取用户信息在放行
                try {
                    await userStore.getUserInfo()
                    // 如果是异步路由，已获取到用户信息但路由未加载完毕，此时会导致页面白屏
                    next({ ...to }) // 解决上述问题
                } catch (error) {
                    // token过期
                    // 退出登录
                    await userStore.logout()
                    next({ path: '/login', query: { redirect: to.path } })
                }

            }
        }
    } else { // 未登录
        if (to.path == '/login') { // 去登录页放行
            next()
        } else { // 去其他页面都定向到登录页并将要去的页面路径作为query参数传递过去
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
// 添加全局后置路由
router.afterEach(() => {
    nprogress.done() // 进度条结束
})