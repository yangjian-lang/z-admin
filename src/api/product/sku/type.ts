// 用于管理sku的数据类型

// 返回数据通用参数类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}

// sku平台属性值列表参数类型
interface skuAttrValueListType {
    attrId: number,
    valueId: number
}
// sku销售属性值列表参数类型
interface skuSaleAttrValueListType {
    saleAttrId: number,
    saleAttrValueId: number
}
// 保存sku信息携带参数类型
export interface saveSkuInfo {
    skuName: string,
    price: string,
    weight: string,
    skuDesc: string,
    skuAttrValueList: skuAttrValueListType[],
    skuSaleAttrValueList: skuSaleAttrValueListType[],
    skuDefaultImg: string,
    spuId: number,
    tmId: number,
    category3Id: number
}

//  保存sku信息|上架|下架|删除返回参数类型
export interface resSaveSkuInfo extends ResData {
    data: null
}

// sku列表data参数类型
export interface resSkuListBySpuIdData {
    category3Id: number,
    id: number,
    isSale: number,
    price: string | number,
    skuAttrValueList: null,
    skuDefaultImg: string,
    skuDesc: string,
    skuImageList: null,
    skuName: string,
    skuSaleAttrValueList: null,
    spuId: number,
    tmId: number,
    weight: string
}
// 通过spuId获取的sku列表返回参数类型
export interface resSkuListBySpuId extends ResData {
    data: resSkuListBySpuIdData[]
}

// sku分页列表数据类型
export interface resSkuList extends ResData {
    data: {
        countId: null | boolean,
        current: number,
        hitCount: boolean,
        maxLimit: null | boolean,
        optimizeCountSql: boolean,
        pages: number,
        records: resSkuListBySpuIdData[],
        searchCount: boolean,
        size: number,
        total: number
    }
}
interface skuImageListType {
    id: number,
    skuId: number,
    imgName: string,
    imgUrl: string,
    spuImgId: number,
    isDefault: number
}
interface skuAttrValueListType {
    id: number,
    attrId: number,
    valueId: number,
    skuId: number,
    attrName: string,
    valueName: string
}
interface skuSaleAttrValueListType {
    id: number,
    skuId: number,
    spuId: number,
    saleAttrValueId: number,
    saleAttrId: number,
    saleAttrName: string,
    saleAttrValueName: string
}
// 获取sku信息数据类型
export interface resSku extends ResData {
    data: {
        id: number,
        spuId: null,
        price: number,
        skuName: string,
        skuDesc: string,
        weight: string,
        tmId: number,
        category3Id: number,
        skuDefaultImg: string,
        isSale: number,
        skuImageList: skuImageListType[],
        skuAttrValueList: skuAttrValueListType[],
        skuSaleAttrValueList: skuSaleAttrValueListType[]
    }
}