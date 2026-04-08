// 用于管理spu相关的api接口
import request from "@/utils/request";
import { resSpuData, resBaseSaleAttrList, saveSpuInfo, resSpuInfoData, spuImageListType, spuSaleAttrListType } from './type'

enum API {
    SPU_LIST = '/admin/product/', // spu列表数据
    BASE_SALE_ATTR_LIST = '/admin/product/baseSaleAttrList', // 主要销售属性列表
    SAVE_SPU_INFO = '/admin/product/saveSpuInfo', // 保存spu信息
    EDIT_SPU_INFO = '/admin/product/updateSpuInfo', // 修改spu信息
    SPU_IMG_LIST = '/admin/product/spuImageList/', // 获取spu图片列表
    SPU_ATTR_LIST = '/admin/product/spuSaleAttrList/', // 获取销售数据列表
    DELETE_SPU='/admin/product/deleteSpu/', // 删除spu
}

// 获取spu列表数据
export const reqGetSpuList = (page: number, limit: number, category3Id: number | null) => request.get<any, resSpuData>(API.SPU_LIST + `${page}/${limit}?category3Id=${category3Id}`)

// 获取主要销售属性列表
export const reqGetBaseSaleAttrList = () => request.get<any, resBaseSaleAttrList>(API.BASE_SALE_ATTR_LIST)

// 保存spu信息
export const reqSaveSpuInfo = (data: saveSpuInfo) => request.post<any, resSpuInfoData>(API.SAVE_SPU_INFO, data)

// 修改spu信息
export const reqEditSpuInfo = (data: saveSpuInfo) => request.post<any, resSpuInfoData>(API.EDIT_SPU_INFO, data)

// 获取spu图片列表
export const reqGetSpuImgList = (id: number) => request.get<any, spuImageListType>(API.SPU_IMG_LIST + `${id}`)

// 获取销售属性列表
export const reqGetSpuAttrList = (id: number) => request.get<any, spuSaleAttrListType>(API.SPU_ATTR_LIST + `${id}`)

// 删除spu
export const reqDeleteSpu = (spuId:number) => request.delete<any, resSpuInfoData>(API.DELETE_SPU+`${spuId}`)