// 用来管理用户相关的接口
import request from "@/utils/request";
// 引入参数类型文件
import type { loginForm, loginResData, userInfoResData, logoutResData } from './type'

enum API {
    LOGIN_URL = "/admin/acl/index/login", // 登录地址
    USER_INFO_URL = "/admin/acl/index/info", // 获取用户信息
    LOGOUT_URL = "/admin/acl/index/logout", // 退出登录

}

// 登录接口
export const reqLogin = (data: loginForm) => request.post<any, loginResData>(API.LOGIN_URL, data)

// 获取用户信息接口
export const reqGetUserInfo = () => request.get<any, userInfoResData>(API.USER_INFO_URL)

// 退出登录
export const reqLogout = () => request.post<any, logoutResData>(API.LOGOUT_URL)