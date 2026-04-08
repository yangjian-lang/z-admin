// 引入路由的数据类型
import type { RouteRecordRaw } from 'vue-router'
import type { recordsDataType } from '@/api/product/trademark/type'
// import type { attrListData } from '@/api/product/attr/type'
import type { recordsType } from '@/api/product/spu/type'
import type { resSkuListBySpuIdData } from '@/api/product/sku/type'
import type { resUserListRecordsType } from '@/api/acl/user/type'
import type { resRoleListRecordsType } from '@/api/acl/role/type'

// 用于定义仓库中数据的数据类型
// 用户管理仓库的数据类型
export interface userStore {
    token: string | null,
    routeList: RouteRecordRaw[],
    nickName: string,
    avatar: string,
}

// 框架仓库的数据类型
export interface layoutSettingStore {
    isFold: boolean,
    refresh: boolean
}

// 商品管理仓库的数据类型
export interface productStore {
    trademarkList: recordsDataType[],
    total: number,
    pages: number,
    pageNo: number,
    limit: number,
    attrList: any[],
    category1Id: number | null,
    category2Id: number | null,
    category3Id: number | null,
    attrTableLoading: boolean,
    spuList: recordsType[],
    skuList: resSkuListBySpuIdData[],
    skuInfo: any
}

// 权限管理仓库的数据类型
export interface aclStore {
    keyword: string | null,
    userList: resUserListRecordsType[],
    page: number,
    limit: number,
    pages: number,
    total: number,
    tableIsLoading: boolean,
    roleList: resRoleListRecordsType[]
}