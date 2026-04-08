<template>
    <div class="attr_container">
        <!-- 三级联动 -->
        <CategoryList :isShowList="isShowList"></CategoryList>
        <!-- 属性列表区域 -->
        <el-card style="margin-top: 20px;" v-show='isShowList'>
            <el-button type="primary" icon="Plus" size="large" :disabled="!productStore.category3Id"
                @click="handleAddAttr">添加平台属性</el-button>
            <!-- 属性表格 -->
            <el-table v-loading="productStore.attrTableLoading" class="attr_list" :data="productStore.attrList" border
                stripe max-height="1000">
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="120" align="center" />
                <!-- 属性名称 -->
                <el-table-column prop="attrName" label="属性名称" width="width" align="center" />
                <!-- 属性值名称 -->
                <el-table-column prop="prop" label="属性值名称" width="width" align="left">
                    <template #="{ row }">
                        <template v-for="item in row.attrValueList" ::key="item.id">
                            <span class="value_name" v-if="item.valueName">
                                {{ item.valueName }}
                            </span>
                        </template>
                    </template>
                </el-table-column>
                <!-- 操作按钮 -->
                <el-table-column prop="prop" label="操作" width="300" align="center">
                    <template #="{ row }">
                        <el-button style="margin: 10px 0 ;" type="primary" size="default"
                            @click="handleEditAttr(row)"><el-icon>
                                <Edit />
                            </el-icon></el-button>
                        <el-popconfirm :title="`确定删除${row.attrName}吗？`" @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button type="danger" size="default" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加属性区域 -->
        <el-card style="margin-top: 20px;" v-show='!isShowList'>
            <el-form :model="attrInfoForm">
                <el-form-item>
                    <!-- 属性名称输入框 -->
                    <span style="margin-right: 16px; font-size: 16px;">属性名称</span>
                    <el-input style="width: 210px;" v-model="attrInfoForm.attrName" size="large"
                        placeholder="请输入属性名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 添加属性值按钮 -->
                    <el-button :disabled="!attrInfoForm.attrName" type="primary" size="large" icon="Plus"
                        @click="handleAddAttrValue">添加属性值</el-button>
                    <!-- <el-button size="large">取消</el-button> -->
                </el-form-item>
                <el-form-item>
                    <el-table :data="attrInfoForm.attrValueList" border stripe size="large">
                        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                        <el-table-column prop="prop" label="属性值名称" width="width" align="center">
                            <template #default="{ row }">
                                <el-input ref='valueNameInput' v-show="row.flag" v-model="row.valueName"
                                    placeholder="请输入属性值" size="large" @blur="valueNameInputBlur(row)"></el-input>
                                <span style="cursor: pointer;display: block;" v-show="!row.flag"
                                    @click="handleValueName(row)">{{ row.valueName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="prop" label="操作" width="width" align="center">
                            <template #="{ row }">
                                <el-button style="margin: 10px 0;" type="danger" size="default" icon="Delete"
                                    @click="deleteValueName(row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleSave" size="large" type="primary"
                        :disabled="attrInfoForm.attrValueList.length > 0 ? false : true">保存</el-button>
                    <el-button size="large" @click="isShowList = true">取消</el-button>
                </el-form-item>
            </el-form>


        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import useProductStore from '@/store/modules/product'
import { reqDeleteAttr } from '@/api/product/attr/index'
import { ElMessage } from 'element-plus';

const productStore = useProductStore()

let isShowList = ref(true) // 是否展示属性列表
const valueNameInput = ref() // 获取属性值输入框的dom节点
let attrInfoForm = reactive<any>({
    attrName: '', // 属性名称
    categoryLevel: 3, // 当前的属性是属于几级列表下的属性
    categoryId: 0, // 该属性的分类id
    attrValueList: [],
    id: 0
})
onBeforeUnmount(() => {
    // 组件销毁前清空仓库中的相关数据
    productStore.clearState()
})
// 点击添加属性按钮
const handleAddAttr = () => {
    // 清空一下添加属性值相关的数据
    attrInfoForm.attrName = ''
    attrInfoForm.attrValueList = []
    attrInfoForm.categoryId = 0
    attrInfoForm.id = 0

    isShowList.value = false // 展示添加属性区域
}
// 点击编辑属性按钮
const handleEditAttr = (row: any) => {
    isShowList.value = false
    // 展示服务器的数据
    const obj = { ...row }
    attrInfoForm.attrName = obj.attrName
    attrInfoForm.categoryLevel = obj.categoryLevel
    attrInfoForm.categoryId = obj.categoryId
    attrInfoForm.attrValueList = obj.attrValueList
    attrInfoForm.id = obj.id
}
// 点击添加属性值按钮
const handleAddAttrValue = () => {
    // 添加一条属性值
    attrInfoForm.attrValueList.push({
        valueName: '',
        flag: true
    })
    nextTick(() => { // dom渲染完成后使input聚焦
        valueNameInput.value.focus()
    })
}
// 属性值输入框失去焦点时触发
const valueNameInputBlur = (row: any) => {
    if (row.valueName) {
        attrInfoForm.attrValueList.forEach((item: any) => {
            if (item !== row) {// 除去当前项
                if (item.valueName == row.valueName) { // 如果valueName相等
                    attrInfoForm.attrValueList = attrInfoForm.attrValueList.filter((i: any) => i !== row) // 过滤掉当前项留下其他项
                    ElMessage.error('属性值不能重复')
                }
            }
        })
    } else {
        // 当属性值未填写就blur时删除当前这条数据
        attrInfoForm.attrValueList = attrInfoForm.attrValueList.filter((item: any) => item !== row)
        ElMessage.error('属性值不能为空')
    }

    row.flag = false

}
// 点击属性值
const handleValueName = (row: any) => {
    row.flag = true
    valueNameInput.value.focus()
}
// 删除属性值
const deleteValueName = (row: any) => {
    attrInfoForm.attrValueList = attrInfoForm.attrValueList.filter((item: any) => item !== row)
}
// 点击保存按钮
const handleSave = async () => {
    const data = {
        attrName: attrInfoForm.attrName,
        categoryLevel: attrInfoForm.categoryLevel,
        categoryId: productStore.category3Id,
        attrValueList: attrInfoForm.attrValueList,
        id: attrInfoForm.id || undefined
    }
    await productStore.saveAttrInfo(data)
    isShowList.value = true
    productStore.getAttrList() // 重新获取属性列表
    ElMessage.success('保存成功')
}
// 删除属性
const deleteAttr = async (attrId: number) => {
    const result = await reqDeleteAttr(attrId)
    if (result.code == 200) {
        productStore.getAttrList() // 重新获取属性列表数据
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
}
</script>

<style scoped lang="scss">
.attr_container {
    width: 100%;

    .attr_list {
        margin-top: 20px;
        font-size: 14px;

        .value_name {
            background-color: #ecf5ff;
            display: inline-block;
            padding: 2px 10px;
            color: #409eff;
            border-radius: 4px;
            margin-right: 12px;
        }
    }
}
</style>