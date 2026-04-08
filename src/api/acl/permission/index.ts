// 用于管理菜单相关的api接口
import request from "@/utils/request";
import type { resPermissionList, doAssign, resPermission, AddPermission } from './type'

enum API {
    PERMISSION_LIST_URL = '/admin/acl/permission/toAssign/', // 根据角色id获取菜单
    DO_ASSIGN_URL = '/admin/acl/permission/doAssignAcl',// 给角色分配权限
    GET_PERMISSION_LIST_URL = '/admin/acl/permission', // 获取菜单
    SAVE_PERMISSION_URL = '/admin/acl/permission/save', // 新增菜单
    EDIT_PERMISSION_URL = '/admin/acl/permission/update', // 编辑菜单
    DELETE_PERMISSION_URL = '/admin/acl/permission/remove/',// 删除菜单
}

// 根据角色id获取菜单
export const reqGetPermissionListByRoleId = (roleId: number) => request.get<any, resPermissionList>(API.PERMISSION_LIST_URL + `${roleId}`)

// 给角色分配权限
export const reqGetDoAssign = (data: doAssign) => request.post<any, resPermission>(API.DO_ASSIGN_URL, data)

// 获取菜单列表
export const reqGetPermissionList = () => request.get<any, resPermissionList>(API.GET_PERMISSION_LIST_URL)

// 新增菜单
export const reqSavePermission = (data: AddPermission) => request.post<any, resPermission>(API.SAVE_PERMISSION_URL, data)

// 编辑菜单
export const reqEditPermission = (data: AddPermission) => request.put<any, resPermission>(API.EDIT_PERMISSION_URL, data)

// 删除菜单
export const reqDeletePermission = (id: number) => request.delete<any, resPermission>(API.DELETE_PERMISSION_URL + `${id}`)