<template>
    <div class="spu_container">
        <CategoryList :isShowList="isShowList"></CategoryList>
        <el-card style="margin-top: 20px;" v-if="pageStatus == 'list' ? true : false">
            <el-button :disabled="!productStore.category3Id" class="add_spu" type="primary" icon="Plus" size="large"
                @click="handleAddSpu">添加SPU</el-button>
            <el-table v-loading="productStore.attrTableLoading" :data="productStore.spuList" border stripe>
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="120" align="center" />
                <!-- spu名称 -->
                <el-table-column prop="spuName" label="SPU名称" width="width" align="center" />
                <!-- spu描述 -->
                <el-table-column prop="description" label="SPU描述" width="width" align="center" />
                <el-table-column prop="prop" label="操作" width="300px" align="center">
                    <template #="{ row }">
                        <!-- 添加sku -->
                        <el-tooltip effect="light" content="添加SKU" placement="bottom-start" :show-after="1000">
                            <el-button @click="handleAddSku(row)" style="margin: 10px 0;" type="primary" icon="Plus"
                                size="default" />
                        </el-tooltip>
                        <!-- 编辑spu -->
                        <el-tooltip effect="light" content="修改SPU" placement="bottom-start" :show-after="1000">
                            <el-button icon="Edit" type="warning" size="default" @click="handleEditSpu(row)" />
                        </el-tooltip>
                        <!-- 查看sku列表 -->
                        <el-tooltip effect="light" content="查看SKU列表" placement="bottom-start" :show-after="1000">
                            <el-button icon="View" type="info" size="default" @click="handleLookSku(row)"></el-button>
                        </el-tooltip>
                        <!-- 删除spu -->

                        <el-tooltip effect="light" content="删除SPU" placement="bottom-start" :show-after="1000">
                            <span style="margin-left: 12px;" slot="content">
                                <el-popconfirm :title="`确定删除${row.spuName}吗？`" @confirm="handleDeleteSpu(row)">
                                    <template #reference>
                                        <el-button icon="Delete" type="danger" size="default"></el-button>
                                    </template>
                                </el-popconfirm>
                            </span>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination style="margin-top: 20px;" v-model:current-page="productStore.pageNo"
                v-model:page-size="productStore.limit" :page-sizes="[3, 5, 7, 9]" background
                layout="prev, pager, next, jumper, ->, sizes, total" :total="productStore.total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
        <AddSpu v-if="pageStatus == 'addSpu' ? true : false" :spuInfo="spuInfo"></AddSpu>
        <AddSku v-if="pageStatus == 'addSku' ? true : false" :spuInfo="spuInfo"></AddSku>
        <!-- sku列表弹出表格 -->
        <el-dialog v-model="skuDialog" title="SKU列表" @close="handleDialogClose">
            <el-table v-loading="skuTableLoading" class="sku_list_table" :data="skuList" border stripe max-height="780">
                <el-table-column prop="skuName" label="SKU名称" width="width" align="center" />
                <el-table-column prop="price" label="SKU价格" width="width" align="center" />
                <el-table-column prop="weight" label="SKU重量" width="width" align="center" />
                <el-table-column prop="prop" label="SKU图片" width="width" align="center">
                    <template #="{ row }">
                        <img v-if="row.skuDefaultImg" class="sku_default_img" :src="row.skuDefaultImg" alt="sku图片">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import AddSpu from './AddSpu.vue'
import AddSku from './AddSku.vue'

import { ref, onMounted, computed, onBeforeUnmount, reactive } from 'vue'
import useProductStore from '@/store/modules/product'
import $bus from '@/bus'
import { ElMessage } from 'element-plus'

const productStore = useProductStore()
let spuInfo = reactive({}) // spu信息
let pageStatus = ref('list') // 当前页面展示的状态；list：默认状态，显示spu列表 | addSpu：显示添加spu组件 | addSku：显示添加sku组件
let isShowList = computed<Boolean>(() => {// 是否展示spu列表
    if (pageStatus.value == 'list') {
        return true
    } else {
        return false
    }
})
let skuList = ref<any>([]) // sku列表
let skuDialog = ref<any>(false) // skuk列表展示
let skuTableLoading = ref<any>(false) // sku列表表格刷新动画

onMounted(() => {
    $bus.on('cancel', () => {
        pageStatus.value = "list"
    })
})
onBeforeUnmount(() => {
    $bus.off('cancel')
    // 组件销毁前清空仓库中的相关数据
    productStore.clearState()
})
// 点击添加spu按钮
const handleAddSpu = () => {
    pageStatus.value = 'addSpu'
    spuInfo = {} // 清空缓存数据
}
// 点击添加sku
const handleAddSku = (row: any) => {
    spuInfo = row
    pageStatus.value = 'addSku'
}
// pageNo变化时
const handleCurrentChange = (val: any) => {
    productStore.pageNo = val
    productStore.getSpuList()
}
// limit变化时
const handleSizeChange = (val: any) => {
    productStore.limit = val
    productStore.getSpuList()
}
// 点击修改spu
const handleEditSpu = (row: any) => {
    spuInfo = row
    pageStatus.value = 'addSpu'
}
// 点击查看sku列表
const handleLookSku = async (row: any) => {
    skuTableLoading.value = true
    skuDialog.value = true
    await productStore.getSkuList(row.id)
    skuList.value = productStore.skuList
    skuTableLoading.value = false
}
// 当前sku的弹出框关闭时
const handleDialogClose = () => {
    skuDialog.value = false
    // 清空sku列表的数据
    skuList.value = []
}
// 点击删除spu
const handleDeleteSpu = async (row: any) => {
    try {
        await productStore.deleteSpu(row.id)
        ElMessage.success('删除成功')
        productStore.getSpuList()
    } catch (error) {
        ElMessage.error(error)
    }


}
</script>

<style scoped lang="scss">
.spu_container {
    width: 100%;

    .add_spu {
        margin-bottom: 20px;
    }

    .sku_list_table {
        font-size: 15px;
        color: #444;

        .sku_default_img {
            width: 100px;
            height: 100px;
            margin: 10px 0;
        }
    }
}
</style>