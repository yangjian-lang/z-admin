// 用于管理属性相关的api接口
import request from "@/utils/request";
import { resCategory1, resCategory2, resCategory3, resAttrList, resAttrData, attrInfo } from './type'

enum API {
    CATEGORY1 = '/admin/product/getCategory1', // 一级列表数据
    CATEGORY2 = '/admin/product/getCategory2/', // 二级列表数据
    CATEGORY3 = '/admin/product/getCategory3/', // 三级列表数据
    ATTR_LIST = '/admin/product/attrInfoList/', // 属性列表数据
    DELETE_ATTR = '/admin/product/deleteAttr/', // 删除属性
    SAVEATTRINFO = '/admin/product/saveAttrInfo', // 添加|修改属性
}

// 获取一级列表数据
export const reqGetCategory1 = () => request.get<any, resCategory1>(API.CATEGORY1)

// 获取二级列表数据
export const reqGetCategory2 = (category1Id: number) => request.get<any, resCategory2>(API.CATEGORY2 + `${category1Id}`)

// 三级列表数据
export const reqGetCategory3 = (category2Id: number) => request.get<any, resCategory3>(API.CATEGORY3 + `${category2Id}`)

// 属性列表数据
export const reqGetAttrList = (category1Id: number | null, category2Id: number | null, category3Id: number | null) => request.get<any, resAttrList>(API.ATTR_LIST + `${category1Id}/${category2Id}/${category3Id}`)

// 添加|修改属性
export const reqSaveAttrInfo = (data: attrInfo) => request.post<any, resAttrData>(API.SAVEATTRINFO, data)
// 删除属性
export const reqDeleteAttr = (attrId: number) => request.delete<any, resAttrData>(API.DELETE_ATTR + `${attrId}`)

