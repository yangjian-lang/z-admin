<template>
    <div class="addsku_container">
        <el-card>
            <el-form size="large" :model="skuForm" :rules="skuRules" ref="skuForms" label-width="80">
                <!-- SKU名称 -->
                <el-form-item label="SKU名称" prop="skuName">
                    <el-input v-model="skuForm.skuName" placeholder="请输入SKU名称" />
                </el-form-item>
                <!-- 价格(元) -->
                <el-form-item label="价格(元)" prop="price">
                    <el-input v-model="skuForm.price" placeholder="请输入价格" />
                </el-form-item>
                <!-- 重量(g) -->
                <el-form-item label="重量(g)" prop="weight">
                    <el-input v-model="skuForm.weight" placeholder="请输入重量" />
                </el-form-item>
                <!-- SKU描述 -->
                <el-form-item label="SKU描述">
                    <el-input v-model="skuForm.skuDesc" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                        placeholder="请输入SKU描述" />
                </el-form-item>
                <!-- 平台属性 -->
                <el-form-item label="平台属性" v-if="productStore.attrList.length > 0">
                    <template v-for="attr in productStore.attrList" :key="attr.id">
                        <div>
                            <span class="attr_name">{{ attr.attrName }}</span>
                            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择" size="large">
                                <el-option v-for="attrValue in attr.attrValueList" :key="attrValue.id"
                                    :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" />
                            </el-select>
                        </div>
                    </template>
                </el-form-item>
                <!-- 销售属性 -->
                <el-form-item label="销售属性" v-if="spuSaleAttrList.length > 0">
                    <template v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                        <div>
                            <span class="attr_name">{{ saleAttr.saleAttrName }}</span>
                            <el-select v-model="saleAttr.saleAttrIdAndSaleAttrValueId" placeholder="请选择" size="large">
                                <el-option v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"
                                    :label="saleAttrValue.saleAttrValueName"
                                    :value="`${saleAttr.id}:${saleAttrValue.id}`" />
                            </el-select>
                        </div>
                    </template>
                </el-form-item>
                <!-- 图片名称 -->
                <el-form-item label="图片名称">
                    <el-table :data="spuImgList" border stripe ref="spuTableImgDom">
                        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column label="图片" width="300" align="center">
                            <template #=row>
                                <img style="width: 100px;height: 100px;" :src="row.imgUrl" alt="row.imgName">
                            </template>
                        </el-table-column>
                        <el-table-column label="名称" prop="imgName" width="width" align="center"></el-table-column>
                        <el-table-column label="操作" prop="prop" width="200" align="center">
                            <template #=row>
                                <el-button v-if="!row.isDefault" type="primary" size="large"
                                    @click="selectDefaultImg(row)">设为默认</el-button>
                                <el-button v-else size="large">默认图片</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <!-- 保存、取消按钮 -->
                <el-form-item>
                    <el-button type="primary" size="large" @click="handleSaveSku">保存</el-button>
                    <el-button size="large" @click="handleCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { reqGetSpuImgList, reqGetSpuAttrList } from '@/api/product/spu'
import useProductStore from '@/store/modules/product'
import { ElMessage } from 'element-plus'
import $bus from '@/bus'

const productStore = useProductStore()

const spuInfo = defineProps(['spuInfo'])
let skuForm = reactive<any>({
    skuName: '', // sku名称
    price: '', // 价格
    weight: '', // 重量
    skuDesc: '', // sku描述
    skuAttrValueList: [], // 平台属性列表
    skuSaleAttrValueList: [], // 销售属性列表
    skuDefaultImg: '', // 默认图片地址
    spuId: null,
    tmId: null,
    category3Id: null
})
let skuForms = ref() // 获取form根节点
//表单验证规则
const skuRules = {
    skuName: [
        { required: true, message: 'SKU名称不能为空', trigger: 'change' }
    ],
    price: [
        { required: true, message: '价格不能为空', trigger: 'change' }
    ],
    weight: [
        { required: true, message: '重量不能为空', trigger: 'change' },

    ]
}
let spuImgList = ref<any>([]) // spu图片列表
let spuSaleAttrList = ref<any>([]) // spu销售属性列表
let spuTableImgDom = ref<any>() // 获取spu图片table根节点

onMounted(async () => {
    if (spuInfo.spuInfo) {
        getSpuSaleAttrList(spuInfo.spuInfo.id)
        getSpuImgList(spuInfo.spuInfo.id)
        productStore.getAttrList()
        // 获取父组件传过来的部分数据
        skuForm.spuId = spuInfo.spuInfo.id
        skuForm.tmId = spuInfo.spuInfo.tmId
        skuForm.category3Id = spuInfo.spuInfo.category3Id
    }
})
// 点击设置默认图片
const selectDefaultImg = (row: any) => {
    row.isDefault = true // 将当前点击项设为默认
    spuImgList.value.map((item: any) => { // 将非选中的图片设置为非默认
        if (item !== row) {
            item.isDefault = false
        }
    })
    if (row.isDefault) {
        skuForm.skuDefaultImg = row.imgUrl // 将选中的默认图片地址保存下来
    }
}
// 点击保存
const handleSaveSku = async () => {
    await skuForms.value.validate() // 等待表单验证通过后在执行下面代码
    // 整理参数
    // 整理平台属性参数
    let attrList = productStore.attrList
    attrList.forEach(item => {
        if (item.attrIdAndValueId) {
            const [attrId, valueId] = item.attrIdAndValueId.split(':')
            skuForm.skuAttrValueList.push({
                attrId,
                valueId
            })

        }
    })
    // 整理销售属性数据
    let saleAttrList = spuSaleAttrList.value
    saleAttrList.forEach((item: any) => {
        if (item.saleAttrIdAndSaleAttrValueId) {
            const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndSaleAttrValueId.split(':')
            skuForm.skuSaleAttrValueList.push({
                saleAttrId,
                saleAttrValueId
            })
        }
    })
    // 收集数据
    const data = skuForm
    try {
        await productStore.saveSkuInfo(data)
        // 通知父组件将页面状态切换为'list'
        $bus.emit('cancel')
        ElMessage.success('保存成功')
        productStore.getSpuList() // 重新获取spu列表
    } catch (error) {
        ElMessage.error(error)
    }


}
// 点击取消
const handleCancel = () => {
    // 通知父组件将页面状态切换为'list'
    $bus.emit('cancel')
}
// 获取销售属性列表
const getSpuSaleAttrList = async (id: number) => {
    const result: any = await reqGetSpuAttrList(id)
    if (result.code == 200) {
        spuSaleAttrList.value = result.data
    }
}
// 获取spu图片列表
const getSpuImgList = async (id: number) => {
    const result: any = await reqGetSpuImgList(id)
    if (result.code == 200) {
        let imgList = result.data
        spuImgList.value = imgList.map((item: any) => {
            item.isDefault = false
            return item
        })
    }
}
</script>

<style scoped lang=scss>
.addsku_container {
    width: 100%;
    margin-top: 20px;

    .attr_name {
        width: 100px;
        display: inline-block;
        margin: 0 10px 20px 0;
        text-align: right;
    }
}
</style>