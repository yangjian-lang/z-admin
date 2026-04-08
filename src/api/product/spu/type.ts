// 返回数据的数据类型
// 返回数据共有的数据类型
export interface ResData {
    code: number,
    message: string,
    ok: boolean
}

export interface recordsType {
    id: number,
    spuName: string,
    description: string,
    category3Id: number,
    tmId: number,
}
interface resSpuDataType {
    records: recordsType[],
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
}
// spu列表数据返回参数类型
export interface resSpuData extends ResData {
    data: resSpuDataType
}

interface resBaseSaleAttrListData {
    id: number,
    name: string
}
// 主要销售属性列表返回参数类型
export interface resBaseSaleAttrList extends ResData {
    data: resBaseSaleAttrListData[]
}

// spu信息的spu图片列表参数类型
export interface spuImageListType {
    id: number | null,
    imgName: string,
    imgUrl: string,
    spuId: number | null
}
// 销售属性值列表参数类型
interface spuSaleAttrValueListType {
    id: number | null,
    baseSaleAttrId: number,
    saleAttrName: string | null,
    saleAttrValueName: string,
    spuId: number | null
}
// spu信息的销售属性列表参数类型
export interface spuSaleAttrListType {
    id: number | null,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuId: number | null,
    spuSaleAttrValueList: spuSaleAttrValueListType[]
}
// 保存spu信息需要携带的参数类型
export interface saveSpuInfo {
    spuName: string,
    description: string,
    category3Id: any,
    tmId: number,
    spuImageList: spuImageListType[],
    spuSaleAttrList: spuSaleAttrListType[]
}

// 保存spu信息返回的参数类型
export interface resSpuInfoData extends ResData {
    data: null
}