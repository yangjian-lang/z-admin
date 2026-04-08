import { defineStore } from 'pinia'
import { reqLogin, reqGetUserInfo, reqLogout } from '@/api/user'
import type { loginForm, loginResData, userInfoResData, logoutResData } from '@/api/user/type' // 引入数据类型
import type { userStore } from './types/type' // 引入数据类型
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token' // 引入封装好的储存token和读取token的方法
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import router from '@/router'
import { cloneDeep } from 'lodash' // 引入深拷贝函数

const filterAsyncRoute = (asyncRoutes: any, routes: any) => {
    return asyncRoutes.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}
const useUserStore = defineStore('user', {
    state: (): userStore => {
        return {
            token: GET_TOKEN(), // 从本地获取token
            routeList: constantRoute, // 获取路由列表（常量路由）
            nickName: '', // 昵称
            avatar: '', // 头像
        }
    },
    actions: {
        // 登录
        async login(data: loginForm) {
            const result: loginResData = await reqLogin(data)
            if (result.code == 200) {
                this.token = result.data // 将token暂存在仓库
                SET_TOKEN(result.data) //将token存储到本地，持久化储存
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 获取用户信息
        async getUserInfo() {
            const result: userInfoResData = await reqGetUserInfo()
            if (result.code == 200) {
                this.nickName = result.data.name
                this.avatar = result.data.avatar
                const asyncRoutes = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes) // 获取开放权限的异步路由
                this.routeList = [...constantRoute, ...asyncRoutes, anyRoute] // 显示开放权限的导航
                // 动态添加异步路由和任意路由
                const routes = [...asyncRoutes, anyRoute]
                routes.forEach(route => router.addRoute(route))
                return 'ok'
            } else {
                return Promise.reject('获取用户信息失败')
            }
        },
        // 退出登录
        async logout() {
            const result: logoutResData = await reqLogout()
            if (result.code == 200) {
                // 退出登录成功
                // 清除仓库储存的信息
                this.token = ''
                this.nickName = ''
                this.avatar = ''
                // 清除本地储存的token
                REMOVE_TOKEN()
                return 'ok'
            } else {
                Promise.reject('退出登录失败')
            }

        }
    },
    getters: {

    }
})

export default useUserStore