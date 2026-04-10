<template>
    <div class="addspu_container">
        <el-card>
            <el-form size="large" :model="spuForm" :rules="spuRules" ref="spuForms" label-width="96">
                <!-- SPU名称 -->
                <el-form-item label="SPU名称" prop="spuName">
                    <el-input v-model="spuForm.spuName" placeholder="请输入SPU名称"></el-input>
                </el-form-item>
                <!-- SPU品牌 -->
                <el-form-item label="SPU品牌" prop="tmId">
                    <el-select v-model="spuForm.tmId" placeholder="请选择品牌" size="large">
                        <el-option v-for="item in tmList" :key="item.id" :label="item.tmName" :value="item.id" />
                    </el-select>
                </el-form-item>
                <!-- SPU描述 -->
                <el-form-item label="SPU描述">
                    <el-input v-model="spuForm.description" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                        placeholder="请输入SPU描述" />
                </el-form-item>
                <!-- SPU图标 -->
                <el-form-item label="SPU图标">
                    <el-upload v-model:file-list="spuImageList" action="/api/admin/product/fileUpload"
                        list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :headers="{ token: localStorage.getItem('token') }">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>

                    <el-dialog v-model="dialogVisible" width="32%">
                        <img class="dialog_img" :src="dialogImageUrl" />
                    </el-dialog>
                </el-form-item>
                <!-- SPU销售属性 -->
                <el-form-item label="SPU销售属性">
                    <!-- 添加属性选择框 -->
                    <el-select v-model="spuSaleAttrId" :placeholder="spuAttrPlaceholder" size="large">
                        <el-option v-for="item in attrList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                    <!-- 添加属性按钮 -->
                    <el-button :disabled="!spuSaleAttrId" type="primary" size="large" icon="Plus" style="margin-left: 20px;"
                        @click="handleAddSpuAttr">添加属性</el-button>
                    <!-- 属性表格 -->
                    <el-table style="margin-top: 20px;" :data="spuSaleAttrList" border stripe>
                        <!-- 序号 -->
                        <el-table-column type="index" label="序号" width="120" align="center" />
                        <!-- 销售属性名称 -->
                        <el-table-column prop="saleAttrName" label="销售属性名称" width="200" align="center" />
                        <!-- 销售属性值 -->
                        <el-table-column prop="prop" label="销售属性值" width="width" align="left">
                            <template #="{ row }">
                                <el-tag style="margin-right: 10px;" v-for="(item, index) in row.spuSaleAttrValueList"
                                    :key="index" closable :disable-transitions="false" @close="handleClose(item, row)">
                                    {{ item.saleAttrValueName }}
                                </el-tag>
                                <el-input v-if="row.flag" ref="InputRef" v-model="valueName" size="default"
                                    placeholder="请输入属性值" style="display: inline;" @blur="handleInputConfirm(row)" />
                                <el-button v-else size="default" icon="Plus" @click="handleAddSpuAttrValueName(row)" />
                            </template>
                        </el-table-column>
                        <!-- 操作 -->
                        <el-table-column prop="prop" label="销售属性值" width="200" align="center">
                            <template #="{ row }">
                                <el-button type="danger" size="default" icon="Delete"
                                    @click="deleteSpuAttr(row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="spuSaleAttrList.length < 1" type="primary" size="large"
                        @click=handleSave>保存</el-button>
                    <el-button size="large" @click="handleCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqGetTrademark } from "@/api/product/trademark"
import { reqGetBaseSaleAttrList, reqGetSpuImgList, reqGetSpuAttrList } from '@/api/product/spu'
import { onMounted, ref, reactive, computed, nextTick } from 'vue';
import { ElMessage } from 'element-plus'
import $bus from '@/bus'
import useProductStore from '@/store/modules/product'

const productStore = useProductStore()
const spuInfo = defineProps(['spuInfo'])
let tmList = ref<any>([]) // 品牌列表
let attrList = ref<any>([]) // 销售属性列表
let attrListCopy = ref<any>([]) // 备份销售属性列表
let spuForm = reactive<any>({ // spu表单
    spuName: "", // spu名称
    tmId: null, // 所属品牌id
    description: "", // spu描述
    category3Id: 0, // 三级列表id   
    id: 0
})
let spuForms = ref<any>() // 获取form根节点
//表单验证规则
const spuRules = {
    spuName: [
        { required: true, message: 'spu名称不能为空', trigger: 'change' },
    ],
    tmId: [
        { required: true, message: '品牌不能为空', trigger: 'change' },
    ],
}
let spuImageList = ref<any>([])// 上传的spu图片列表
let spuSaleAttrId = ref<any>(null) // spu的销售属性id
let valueName = ref<any>('') // spu销售属性值
const InputRef = ref<any>() // 获取输入属性值的input元素
let spuSaleAttrList = ref<any>([])// spu销售属性列表

let spuAttrPlaceholder = computed(() => {
    if (attrList.value.length == 3) {
        return '还未选择3个'
    } else if (attrList.value.length == 2) {
        return '还未选择2个'
    } else if (attrList.value.length == 1) {
        return '还未选择1个'
    } else {
        return '暂无数据可选择'
    }
})

const dialogImageUrl = ref<any>('') // 放大后的图片地址
const dialogVisible = ref<any>(false) // 是否放大图片

onMounted(() => {
    getTm()
    getAttrList()
    if (spuInfo.spuInfo) {
        // 修改spu时初始化传递过来的数据
        spuForm.spuName = spuInfo.spuInfo.spuName
        spuForm.tmId = spuInfo.spuInfo.tmId
        spuForm.description = spuInfo.spuInfo.description
        spuForm.id = spuInfo.spuInfo.id
        // 编辑spu时获取图片和销售属性列表数据
        getSpuImgList(spuInfo.spuInfo.id)
        getSpuAttrList(spuInfo.spuInfo.id)
    }
})


// 移除图片
const handleRemove = (file: any, fileList: any) => {
    if (file.status == 'success' && 'ready') {
        spuImageList.value = fileList.filter((item: any) => item !== file)
    }
}

// 放大图片
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}
// 添加spu属性
const handleAddSpuAttr = () => {
    attrList.value = attrList.value.filter((item: any) => {
        if (item.id == spuSaleAttrId.value) { // 当前选中的属性
            const obj = {
                baseSaleAttrId: item.id,
                saleAttrName: item.name,
                flag: false,
                spuSaleAttrValueList: []
            }
            spuSaleAttrList.value.push(obj)
        } else { // 留下未选中的属性
            return item
        }
    })
    spuSaleAttrId.value = null // 清空销售属性选择框
}
// 添加spu属性值
const handleAddSpuAttrValueName = (row: any) => {
    row.flag = true // 隐藏添加按钮
    nextTick(() => {
        InputRef.value.focus()
    })
}
// input失去焦点时触发
const handleInputConfirm = (row: any) => {

    // 输入值为空直接退出函数执行
    if (valueName.value.trim() == '') {
        ElMessage.error('属性值不能为空')
        return;
    }
    // 判断输入值是否重复
    const isRepeat = row.spuSaleAttrValueList.some((item: any) => {
        return item.saleAttrValueName == valueName.value
    })
    // 输入值重复直接退出函数执行
    if (isRepeat) {
        ElMessage.error('属性值不能重复')
        return;
    }

    row.spuSaleAttrValueList.push({ baseSaleAttrId: row.baseSaleAttrId, saleAttrValueName: valueName.value })
    row.flag = false // 显示添加按钮
    valueName.value = '' // 清空记录的input框的值
}
// 删除属性值
const handleClose = (item: any, row: any) => {
    // 遍历销售属性列表
    spuSaleAttrList.value.forEach((spuAttrItem: any) => {
        // 找到当前点击那一项销售属性
        if (spuAttrItem.baseSaleAttrId == row.baseSaleAttrId) {
            // 遍历当前销售属性下的属性值列表，并过滤掉当前点击的那一项属性值
            spuAttrItem.spuSaleAttrValueList = spuAttrItem.spuSaleAttrValueList.filter((valueItem: any) => valueItem !== item)
        }
    })
}
// 删除销售属性
const deleteSpuAttr = (row: any) => {
    // 删除销售属性列表中存入的数据
    spuSaleAttrList.value = spuSaleAttrList.value.filter((item: any) => item !== row)
    // 将对应备份的销售属性数据添加到attrList里
    attrListCopy.value.forEach((item: any) => {
        if (item.id == row.baseSaleAttrId) {
            attrList.value.push(item)
        }
    })
}
// 点击取消按钮
const handleCancel = () => {
    // 通知父组件将页面状态切换为'list'
    $bus.emit('cancel')
}
// 点击保存按钮
const handleSave = async () => {
    await spuForms.value.validate() // 等待表单验证通过后在执行下面代码
    // 整理数据
    let imgList = <any>[]
    spuImageList.value.forEach((item: any) => {
        let imgObj = {
            id: item.id,
            imgName: item.name,
            imgUrl: '',
            spuId: item.spuId
        }
        if (item.response) { // 新增图片
            imgObj.imgUrl = item.response.url
        } else { // 原有图片
            imgObj.imgUrl = item.url
        }
        imgList.push(imgObj)
    })
    // 收集数据
    const data = {
        spuName: spuForm.spuName,
        description: spuForm.description,
        category3Id: productStore.category3Id,
        tmId: spuForm.tmId,
        spuImageList: imgList,
        spuSaleAttrList: spuSaleAttrList.value,
        id: spuForm.id || undefined
    }
    if (spuForm.id) { // 修改spu
        try {
            await productStore.editSpuInfo(data)
            $bus.emit('cancel') // 通知父组件将页面状态切换为'list'
            ElMessage.success('更新成功')
            productStore.getSpuList() // 重新获取spu列表

        } catch (error) {
            ElMessage.error(error)
        }
    } else { // 保存spu
        try {
            await productStore.saveSpuInfo(data)
            $bus.emit('cancel') // 通知父组件将页面状态切换为'list'
            ElMessage.success('保存成功')
            productStore.getSpuList() // 重新获取spu列表

        } catch (error) {
            ElMessage.error(error)
        }
    }

}

// 获取品牌列表
const getTm = async () => {
    const result = await reqGetTrademark()
    if (result.code == 200) {
        tmList.value = result.data
    }
}
// 获取主要销售属性列表
const getAttrList = async () => {
    const result = await reqGetBaseSaleAttrList()
    if (result.code == 200) {
        attrList.value = result.data
        attrListCopy.value = result.data
    }
}
// 获取spu图片列表
const getSpuImgList = async (id: any) => {
    const result: any = await reqGetSpuImgList(id)
    if (result.code == 200) {
        let arr = result.data // 尽量不要对服务器的数据直接进行遍历
        // 由于element-plus的图片列表展示需要有name和url字段
        // 所以这边将服务器数据中的imgName和imgUrl改为name和url
        let imgList = <any>[]
        arr.forEach((item: any) => {
            let obj = {
                id: item.id,
                spuId: item.spuId,
                name: item.imgName,
                url: item.imgUrl
            }
            imgList.push(obj)
        })

        spuImageList.value = imgList
    }
}
// 获取销售属性列表
const getSpuAttrList = async (id: any) => {
    const result: any = await reqGetSpuAttrList(id)
    if (result.code == 200) {
        spuSaleAttrList.value = result.data
        // 过滤获取的属性列表防止多次选择同个属性
        attrList.value = attrList.value.filter((item1: any) => !spuSaleAttrList.value.some((item2: any) => item1.id === item2.baseSaleAttrId))
    }
}
</script>

<style scoped lang=scss>
.addspu_container {
    width: 100%;
    margin-top: 20px;

    .dialog_img {
        width: 100%;
        height: 100%;
    }

    .sale_attr_value_name {
        background-color: #ecf5ff;
        display: inline;
        padding: 2px 10px;
        color: #409eff;
        border-radius: 4px;
        margin-right: 12px;
    }


}
</style>