// 返回数据的数据类型
// 返回数据共有的数据类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}

export interface resPermissionListData {
    id: number,
    pid: any,
    name: number,
    code: string | null,
    toCode: string | null,
    type: number,
    status: null,
    level: number,
    children: resPermissionListData[],
    select: boolean
}
// 菜单列表参数类型
export interface resPermissionList extends ResData {
    data: resPermissionListData[]
}

// 给角色分配权限需要携带的参数
export interface doAssign {
    permissionIdList: number[],
    roleId: number
}
// 分配权限返回参数类型
export interface resPermission extends ResData {
    data: null
}
// 新增菜单携带参数类型
export interface AddPermission {
    id: number,
    name: string,
    code: string,
    pid: number,
    level: number,
    toCode: string,
    type: number
}