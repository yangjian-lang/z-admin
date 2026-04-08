// 品牌管理相关的接口
import request from "@/utils/request";
import { trademarkListData, addTrademarkForm, resTrademarkData, editTrademarkForm, resTrademark } from './type'

enum API {
    TRADEMARK_LIST = '/admin/product/baseTrademark/', // 品牌分页列表
    ADD_TRADEMARK = '/admin/product/baseTrademark/save', // 添加品牌
    EDIT_TRADEMARK = '/admin/product/baseTrademark/update', // 编辑品牌
    DELETE_TRADEMARK = '/admin/product/baseTrademark/remove/', // 删除品牌 
    GET_TRADEMARK = '/admin/product/baseTrademark/getTrademarkList', // 品牌列表
}

// 品牌分页列表接口
export const reqGetTrademarkList = (page: number, limit: number) => request.get<any, trademarkListData>(API.TRADEMARK_LIST + `${page}/${limit}`)

// 添加品牌接口
export const reqAddTrademark = (data: addTrademarkForm) => request.post<any, resTrademarkData>(API.ADD_TRADEMARK, data)

// 编辑品牌
export const reqEditTrademark = (data: editTrademarkForm) => request.put<any, resTrademarkData>(API.EDIT_TRADEMARK, data)

// 删除品牌
export const reqDeleteTrademark = (id: number) => request.delete<any, resTrademarkData>(API.DELETE_TRADEMARK + `${id}`)

// 品牌列表
export const reqGetTrademark = () => request.get<any, resTrademark>(API.GET_TRADEMARK)