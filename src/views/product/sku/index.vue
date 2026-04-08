<template>
    <div class="sku_container">
        <el-card>
            <!-- sku表格 -->
            <el-table :data="productStore.skuList" border stripe size="large" max-height="1100">
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                <!-- 名称 -->
                <el-table-column prop="skuName" label="名称" width="width" align="center"></el-table-column>
                <!-- 描述 -->
                <el-table-column prop="skuDesc" label="描述" width="width" align="center"></el-table-column>
                <!-- 图片 -->
                <el-table-column prop="prop" label="图片" width="200" align="center">
                    <template #="{ row }">
                        <img style="width: 100px;height: 100px;" v-if="row.skuDefaultImg" :src="row.skuDefaultImg"
                            alt="sku图片">
                        <span v-else>暂无图片</span>
                    </template>
                </el-table-column>
                <!-- 重量 -->
                <el-table-column prop="weight" label="重量(g)" width="width" align="center"></el-table-column>
                <!-- 价格 -->
                <el-table-column prop="price" label="价格(原)" width="width" align="center"></el-table-column>
                <!-- 操作 -->
                <el-table-column fixed="right" prop="prop" label="操作" width="300" align="center">
                    <template #="{ row }">
                        <el-button v-if="!row.isSale" size="default" icon="Top"
                            @click="handleOnOrCancelSale(row)"></el-button>
                        <el-button v-else size="default" icon="Bottom" @click="handleOnOrCancelSale(row)"></el-button>
                        <el-button type="primary" size="default" icon="Edit" @click="handleEdit"></el-button>
                        <el-button type="info" size="default" icon="InfoFilled" @click="handleSkuInfo(row)"></el-button>
                        <el-popconfirm :title="`确定删除${row.skuName}吗？`" @confirm="handleDeleteSku(row.id)">
                            <template #reference>
                                <el-button type="danger" size="default" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination style="margin-top: 20px;" v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[8,
                16, 24, 32]" background layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
        <!-- sku弹出框 -->
        <el-drawer v-model="skuDrawer" title="商品详情">
            <div class="drawer_container">
                <!-- 名称 -->
                <div class="container">
                    <span class="title">名称</span>
                    <span class="content">{{ productStore.skuInfo.skuName }}</span>
                </div>
                <!-- 描述 -->
                <div class="container">
                    <span class="title">描述</span>
                    <span class="content">{{ productStore.skuInfo.skuDesc }}</span>
                </div>
                <!-- 价格 -->
                <div class="container">
                    <span class="title">价格</span>
                    <span class="content">{{ productStore.skuInfo.price }}.00</span>
                </div>
                <!-- 平台属性 -->
                <div class="container">
                    <span class="title">平台属性</span>
                    <div class="attr_container">
                        <span class="attr" v-for="attr in productStore.skuInfo.skuAttrValueList" :key="attr.id">
                            {{ attr.valueName }}
                        </span>
                    </div>
                </div>
                <!-- 销售属性 -->
                <div class="container">
                    <span class="title">销售属性</span>
                    <div class="attr_container">
                        <span class="attr" v-for="saleAttr in productStore.skuInfo.skuSaleAttrValueList"
                            :key="saleAttr.id">{{ saleAttr.saleAttrValueName }}</span>
                    </div>
                </div>
                <!-- 商品图片 -->
                <div class="container">
                    <span class="title">商品图片</span>
                    <div style="width: 60%;" v-if="imgList.length > 0">
                        <el-carousel trigger="click" height="400px">
                            <el-carousel-item v-for="item in imgList" :key="item.id">
                                <img style="width: 100%;height: 100%;" :src="item.imgUrl" :alt="item.imgName">
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                </div>

            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import useProductStore from '@/store/modules/product'
import { ElMessage } from 'element-plus'
import { reqDeleteSku } from '@/api/product/sku/index'

const productStore = useProductStore()
let pageNo = ref<Number>(1)
let limit = ref<Number>(8)
let total = ref<Number>(0)
let skuDrawer = ref<any>(false) // sku信息侧边弹出
let imgList = ref<any>([]) // sku图片列表

onMounted(async () => {
    await productStore.getSkuPageLsit(pageNo.value, limit.value)
    total.value = productStore.total
})
// pageNo变化时
const handleCurrentChange = (val: any) => {
    pageNo.value = val
    productStore.getSkuPageLsit(pageNo.value, limit.value)
}

// limit变化时
const handleSizeChange = (val: any) => {
    limit.value = val
    productStore.getSkuPageLsit(pageNo.value, limit.value)
}
// 点击上架或下架
const handleOnOrCancelSale = async (row: any) => {
    if (!row.isSale) { // 未上架
        // 点击上架
        await productStore.skuOnSale(row.id)
        ElMessage.success('上架成功')
        productStore.getSkuPageLsit(pageNo.value, limit.value)
    } else { // 已上架
        // 点击下架
        await productStore.skuCancelSale(row.id)
        ElMessage.success('下架成功')
        productStore.getSkuPageLsit(pageNo.value, limit.value)
    }
}
// 点击编辑
const handleEdit = () => {
    ElMessage.info('程序员在努力的更新中...')
}
// 点击sku信息
const handleSkuInfo = async (row: any) => {
    skuDrawer.value = true
    await productStore.getSku(row.id)

    nextTick(() => {
        imgList.value = productStore.skuInfo.skuImageList
    })
}
// 点击删除
const handleDeleteSku = async (skuId: any) => {
    const result = await reqDeleteSku(skuId)
    if (result.code == 200) {
        ElMessage.success('删除成功')
        productStore.getSkuPageLsit(pageNo.value, limit.value)
    } else {
        ElMessage.error('删除失败')
    }
}
onBeforeUnmount(() => {
    // 组件销毁前清空仓库中的相关数据
    productStore.clearState()
})
</script>

<style scoped lang="scss">
.sku_container {
    width: 100%;

    .drawer_container {
        font-size: 16px;

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: start;
            margin-bottom: 30px;

            .title {
                font-weight: bold;
                width: 80px;
                line-height: 24px;
                display: inline-block;
                text-align: right;
                margin-right: 60px;
                color: #666;
            }

            .content {
                color: #333;
                line-height: 24px;
                width: 78%;
            }

            .attr_container {
                width: 80%;

                .attr {
                    background-color: #ecf5ff;
                    display: inline-block;
                    padding: 6px 10px;
                    color: #409eff;
                    border-radius: 4px;
                    margin-right: 12px;
                    font-size: 14px;
                    margin-bottom: 12px;
                }
            }




        }

    }
}
</style>