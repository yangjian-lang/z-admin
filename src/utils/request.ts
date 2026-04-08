import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'

const request = axios.create({
    baseURL: 'http://sph-api.atguigu.cn', // import.meta.env.VITE_APP_BASE_API
    timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    config.headers.token = userStore.token // 携带token发送请求
    return config;
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    let message = '';
    const status = error.response.status

    switch (status) {
        case 401:
            message = "Token过期"
            break;
        case 403:
            message = "无权访问"
            break;
        case 404:
            message = "请求地址错误"
            break;
        case 500:
            message = "服务器出现问题"
            break;
        default:
            message = "网络错误"
            break;
    }
    // 错误提示信息
    ElMessage.error(message)

    return Promise.reject(error);
});

export default request
