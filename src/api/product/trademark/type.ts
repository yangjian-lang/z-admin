// 发送请求携带的参数类型

// 返回数据的数据类型
// 返回数据共有的数据类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}
// 返回数据中records属性的数据类型
export interface recordsDataType {
    createTime: string,
    id: number,
    tmName: string,
    logoUrl: string,
    updateTime: string
}
// 返回数据的data属性的数据类型
interface trademarkListDataType {
    countId: number,
    current: number,
    hitCount: boolean,
    maxLimit: number,
    optimizeCountSql: boolean,
    orders: [],
    pages: number,
    records: recordsDataType[],
    searchCount: boolean,
    size: number,
    total: number,
}
// 登录接口返回的数据类型,继承ResData的数据类型
export interface trademarkListData extends ResData {
    data: trademarkListDataType,
}

// 添加品牌需要携带的参数类型
export interface addTrademarkForm {
    tmName: string,
    logoUrl: string
}

// 添加品牌接口返回数据的类型
export interface resTrademarkData extends ResData {
    data: null
}

// 修改品牌需要携带的参数类型
export interface editTrademarkForm {
    id: number,
    tmName: string,
    logoUrl: string
}

// 品牌列表返回数据类型
export interface resTrademark extends ResData {
    data: editTrademarkForm[]
}