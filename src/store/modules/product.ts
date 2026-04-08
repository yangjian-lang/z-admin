import { defineStore } from 'pinia'
import { reqGetTrademarkList, reqAddTrademark, reqEditTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import { reqGetAttrList, reqSaveAttrInfo } from '@/api/product/attr'
import { reqGetSpuList, reqSaveSpuInfo, reqEditSpuInfo, reqDeleteSpu } from '@/api/product/spu'
import { reqSaveSkuInfo, reqGetSkuBySpuId, reqGetSkuList, reqOnSale, reqCancelSale, reqGetSku } from '@/api/product/sku/index'
import type { productStore } from './types/type'
import type { addTrademarkForm, editTrademarkForm } from '@/api/product/trademark/type'
import type { attrInfo } from '@/api/product/attr/type'
import type { saveSpuInfo } from '@/api/product/spu/type'
import type { saveSkuInfo } from '@/api/product/sku/type'

const useProductStore = defineStore('product', {
    state: (): productStore => {
        return {
            trademarkList: [], // 品牌列表数据
            total: 0, // 总共多少条数据
            pages: 0, // 总共多少页
            pageNo: 1, // 当前页码
            limit: 3, // 一页展示多少条数据
            attrList: [], // 属性列表
            category1Id: 0, // 一级id
            category2Id: 0, // 二级id
            category3Id: 0, // 三级id
            attrTableLoading: false,// 属性列表展示加载动画
            spuList: [], // spu列表数据
            skuList: [], // sku列表数据
            skuInfo: {}, // sku详情
        }
    },
    actions: {
        // 清除仓库数据
        clearState() {
            this.trademarkList = []
            this.total = 0
            this.pages = 0
            this.pageNo = 1
            this.limit = 3
            this.attrList = []
            this.category1Id = 0
            this.category2Id = 0
            this.category3Id = 0
            this.attrTableLoading = false
            this.spuList = []
        },
        // 获取品牌列表数据
        async getTrademarkList(page: number, limit: number) {
            const result = await reqGetTrademarkList(page, limit)
            if (result.code == 200) {
                this.trademarkList = result.data.records
                this.total = result.data.total
                this.pages = result.data.pages
                return 'ok'
            } else {
                return Promise.reject('获取品牌列表失败')
            }
        },
        // 添加品牌
        async addTrademark(data: addTrademarkForm) {
            const result = await reqAddTrademark(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('添加失败')
            }
        },
        // 编辑品牌
        async editTrademark(data: editTrademarkForm) {
            const result = await reqEditTrademark(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('修改失败')
            }
        },
        // 删除品牌
        async deleteTrademark(id: number) {
            const result = await reqDeleteTrademark(id)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('删除失败')
            }
        },
        // 获取属性列表
        async getAttrList() {
            this.attrTableLoading = true // 开启表格加载动画
            const result = await reqGetAttrList(this.category1Id, this.category2Id, this.category3Id)
            if (result.code == 200) {
                this.attrList = result.data
                this.attrTableLoading = false // 关闭表格加载动画
                return 'ok'
            } else {
                return Promise.reject('获取失败')
            }
        },
        // 添加|修改属性
        async saveAttrInfo(data: attrInfo) {
            const result = await reqSaveAttrInfo(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('保存失败')
            }
        },
        // 获取spu列表数据
        async getSpuList() {
            if (this.category3Id) {
                this.attrTableLoading = true
                const result = await reqGetSpuList(this.pageNo, this.limit, this.category3Id)
                if (result.code == 200) {
                    this.attrTableLoading = false
                    this.total = result.data.total
                    this.pages = result.data.pages
                    this.spuList = result.data.records
                }
            }
        },
        // 保存spu信息
        async saveSpuInfo(data: saveSpuInfo) {
            const result = await reqSaveSpuInfo(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('保存失败')
            }
        },
        // 修改spu信息
        async editSpuInfo(data: saveSpuInfo) {
            const result = await reqEditSpuInfo(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('修改失败')
            }
        },
        // 删除spu
        async deleteSpu(spuId: number) {
            const result = await reqDeleteSpu(spuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('删除失败')
            }
        },
        // 保存sku信息
        async saveSkuInfo(data: saveSkuInfo) {
            const result = await reqSaveSkuInfo(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('保存失败')
            }
        },
        // 通过spuId获取sku列表
        async getSkuList(spuId: number) {
            const result = await reqGetSkuBySpuId(spuId)
            if (result.code == 200) {
                this.skuList = result.data
                return 'ok'
            } else {
                return Promise.reject('获取失败')
            }
        },
        // 获取sku分页列表数据
        async getSkuPageLsit(page: any, limit: any) {
            const result = await reqGetSkuList(page, limit)
            if (result.code == 200) {
                this.skuList = result.data.records
                this.total = result.data.total
                this.pages = result.data.pages
            }
        },
        // sku上架
        async skuOnSale(skuId: number) {
            const result = await reqOnSale(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('上架失败')
            }
        },
        // sku下架
        async skuCancelSale(skuId: number) {
            const result = await reqCancelSale(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('下架失败')
            }
        },
        // 获取sku信息
        async getSku(skuId: number) {
            const result = await reqGetSku(skuId)
            if (result.code == 200) {
                this.skuInfo = result.data
                return 'ok'
            } else {
                return Promise.reject('获取失败')
            }
        }
    },
    getters: {

    }
})

export default useProductStore