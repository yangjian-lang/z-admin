// 用于管理角色相关的api接口
import request from "@/utils/request";
import type { resRoleList, resRoleListRecordsType, resRole } from './type'

enum API {
    ROLE_LIST = '/admin/acl/role/', // 角色分页列表
    ADD_ROLE_URL = '/admin/acl/role/save', // 添加角色
    EDIT_ROLE_URL = '/admin/acl/role/update', // 编辑角色
    DELETE_ROLE_URL = '/admin/acl/role/remove/', // 删除角色
}

// 获取角色分页列表
export const reqGetRoleList = (page: number, limit: number, keyword: string | null) => request.get<any, resRoleList>(API.ROLE_LIST + `${page}/${limit}/?roleName=${keyword}`)

// 添加角色
export const reqAddRole = (data: resRoleListRecordsType) => request.post<any, resRole>(API.ADD_ROLE_URL, data)

// 编辑角色
export const reqEditRole = (data: resRoleListRecordsType) => request.put<any, resRole>(API.EDIT_ROLE_URL, data)

// 删除角色
export const reqDeleteRole = (id: number) => request.delete<any, resRole>(API.DELETE_ROLE_URL + `${id}`)

