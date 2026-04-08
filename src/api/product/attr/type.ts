// 返回数据的数据类型
// 返回数据共有的数据类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}

export interface category1Data {
    id: number,
    name: string
}
export interface category2Data {
    category1Id: number,
    id: number,
    name: string
}
export interface category3Data {
    category2Id: number,
    id: number,
    name: string
}
// 一级列表的接口返回的数据类型
export interface resCategory1 extends ResData {
    data: category1Data[]
}
// 二级列表的接口返回的数据类型
export interface resCategory2 extends ResData {
    data: category2Data[]
}

// 三级列表的接口返回的数据类型
export interface resCategory3 extends ResData {
    data: category3Data[]
}

interface attrValueListData {
    id: number,
    valueName: string,
    attrId: number
}
export interface attrListData {
    id: number,
    attrName: string,
    categoryId: number,
    categoryLevel: number,
    attrValueList: attrValueListData[],
}
// 属性列表接口返回的数据类型
export interface resAttrList extends ResData {
    data: attrListData[]
}

// 添加|修改|删除属性返回数据类型
export interface resAttrData extends ResData {
    data: null
}

// 添加|修改属性携带参数的数据类型
export interface attrInfo {
    attrName: string,
    attrValueList: attrValueListData[],
    categoryId: number | null,
    categoryLevel: number,
    id: number
}