import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config
})

// 响应拦截器（修复后）
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        // 重点：加判断！！！
        let message = ''
        if (error.response) {
            // 有响应状态码
            const status = error.response.status
            switch (status) {
                case 401:
                    message = 'Token过期'
                    break
                case 403:
                    message = '无权访问'
                    break
                case 404:
                    message = '请求地址错误'
                    break
                case 500:
                    message = '服务器出现问题'
                    break
                default:
                    message = '网络错误'
            }
        } else {
            // 无响应（服务器挂了/网络异常）
            message = '网络异常或服务器连接失败'
        }

        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default request