// 返回数据的数据类型
// 返回数据共有的数据类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}

// 用户列表的records数据类型
export interface resUserListRecordsType {
    id: number,
    name: string,
    password: string,
    phone: null | number,
    roleName: string,
    username: string,
    createTime: string,
    updateTime: string
}
// 用户列表返回数据的类型
export interface resUserList extends ResData {
    data: {
        countId: null | number,
        current: number,
        hitCount: boolean,
        maxLimit: null | number,
        optimizeCountSql: boolean,
        orders: [],
        pages: number,
        records: resUserListRecordsType[],
        searchCount: boolean,
        size: number,
        total: number
    }
}
// 新增用户携带参数类型
export interface SaveUser {
    name: string,
    username: string,
    password: string
}
// 新增用户|分配角色返回参数类型
export interface ResUser extends ResData {
    data: null
}
// 角色列表数据类型
export interface rolesType {
    id: number,
    roleName: string,
    remark: null,
    createTime: string,
    updateTime: string
}
// 当前用户可分配的角色列表返回数据类型
export interface resAssignRoleList extends ResData {
    data: {
        assignRoles: rolesType[],
        allRolesList: rolesType[]
    }
}
// 分配角色需要携带的参数
export interface doAssignRole {
    userId: any,
    roleIdList: any
}

// 修改用户需要携带的参数
export interface editUser {
    id: number,
    name: string,
    username: string
}