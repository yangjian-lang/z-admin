// 发送请求携带的参数类型
// 登录接口需要携带的参数类型
export interface loginForm {
    username: string,
    password: string
}

// 返回数据的数据类型
// 返回数据共有的数据类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}
// 登录接口返回的数据类型,继承ResData的数据类型
export interface loginResData extends ResData {
    data: string,
}

// 获取用户数据接口返回data的数据类型，不用对外暴露
interface userInfoResDataType {
    name: string,
    avatar: string,
    buttons: string[],
    roles: string[],
    routes: string[]
}
// 获取用户数据接口返回的数据类型
export interface userInfoResData extends ResData {
    data: userInfoResDataType,
}

// 退出登录接口返回的数据类型
export interface logoutResData extends ResData {
    data: null,
}