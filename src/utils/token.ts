// 封装本地存错和读取数据的方法

// 存储数据
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token) //将token存储到本地，持久化储存
}

// 读取数据
export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN') // 从本地获取token
}

// 删除数据
export const REMOVE_TOKEN = () => {
    return localStorage.removeItem('TOKEN')
}