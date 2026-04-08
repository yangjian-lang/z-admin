// 用于管理sku相关的api接口
import request from "@/utils/request"
import type { saveSkuInfo, resSaveSkuInfo, resSkuListBySpuId, resSkuList, resSku } from './type'

enum API {
    SAVE_SPU_INFO = '/admin/product/saveSkuInfo',//保存sku信息
    FIND_SKU_BY_SPUID = '/admin/product/findBySpuId/', // 通过spuId获取sku
    SKU_LIST = '/admin/product/list/', // 获取sku分页列表
    ON_SALE = '/admin/product/onSale/', // 上架
    CANCEL_SALE = '/admin/product/cancelSale/',//下架
    DELETE_SKU = '/admin/product/deleteSku/', // 删除sku
    GET_SKU = '/admin/product/getSkuInfo/',//获取sku
}

// 获取spu列表数据
export const reqSaveSkuInfo = (data: saveSkuInfo) => request.post<any, resSaveSkuInfo>(API.SAVE_SPU_INFO, data)

// 通过spuId获取sku
export const reqGetSkuBySpuId = (spuId: number) => request.get<any, resSkuListBySpuId>(API.FIND_SKU_BY_SPUID + `${spuId}`)

// 获取sku分页列表
export const reqGetSkuList = (page: number, limit: number) => request.get<any, resSkuList>(API.SKU_LIST + `${page}/${limit}`)

// 上架sku商品
export const reqOnSale = (skuId: number) => request.get<any, resSaveSkuInfo>(API.ON_SALE + `${skuId}`)

// 下架sku商品
export const reqCancelSale = (skuId: number) => request.get<any, resSaveSkuInfo>(API.CANCEL_SALE + `${skuId}`)

// 删除sku
export const reqDeleteSku = (skuId: number) => request.delete<any, resSaveSkuInfo>(API.DELETE_SKU + `${skuId}`)

// 获取sku信息
export const reqGetSku = (skuId: number) => request.get<any, resSku>(API.GET_SKU + `${skuId}`)