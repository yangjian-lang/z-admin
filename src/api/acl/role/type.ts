// 返回数据的数据类型
// 返回数据共有的数据类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}

// 用户列表的records数据类型
export interface resRoleListRecordsType {
    id: number,
    roleName: string,
    remark: null | string,
    createTime: string,
    updateTime: string
}
// 用户列表返回数据的类型
export interface resRoleList extends ResData {
    data: {
        countId: null | number,
        current: number,
        hitCount: boolean,
        maxLimit: null | number,
        optimizeCountSql: boolean,
        orders: [],
        pages: number,
        records: resRoleListRecordsType[],
        searchCount: boolean,
        size: number,
        total: number
    }
}
// 添加角色返回参数类型
export interface resRole extends ResData {
    data: null
}