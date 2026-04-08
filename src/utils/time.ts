// 获取当前时间 | 判断现在是 早上|上午|下午|晚上
export const getTime = () => {
    let message = '' // 登录成功后提示信息
    const hours = new Date().getHours() // 获取当前小时
    if (hours >= 5 && hours <= 9) {
        message = '早上'
    } else if (hours <= 12) {
        message = '上午'
    } else if (hours <= 18) {
        message = '下午'
    } else {
        message = '晚上'
    }
    return message
}