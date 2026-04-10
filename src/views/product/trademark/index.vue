<template>
    <div class="trademark_container">
        <el-card>
            <!-- 添加品牌按钮 -->
            <el-button class="add" type="primary" size="large" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <!-- 品牌列表 -->
            <el-table class="trademark_list" :data="productStore.trademarkList" border stripe>
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="120" align="center" />
                <!-- 品牌名称 -->
                <el-table-column prop="tmName" label="品牌名称" width="width" align="center" />
                <!-- logo图片 -->
                <el-table-column prop="prop" label="品牌LOGO" width="width" align="center">
                    <template #="{ row }">
                        <img class="logo_img" :src="row.logoUrl" alt="logo">
                    </template>
                </el-table-column>
                <!-- 操作按钮 -->
                <el-table-column prop="prop" label="操作" width="300" align="center">
                    <template #="{ row }">
                        <el-button type="primary" size="default" @click="editTrademark(row)"><el-icon>
                                <Edit />
                            </el-icon></el-button>
                        <el-popconfirm :title="`确定删除${row.tmName}吗？`" @confirm="deleteTrademark(row.id)">
                            <template #reference>
                                <el-button type="danger" size="default">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </el-button>

                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background
                layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>

        <!-- 添加品牌弹框 -->
        <el-dialog v-model="dialogVisible" title="添加品牌" width="30%">
            <el-form style="width: 90%;" :model="trademarkform" :rules="trademarkRules" ref="trademarkforms"
                label-width="120px" size="large">
                <!-- 品牌名称输入框 -->
                <el-form-item label="品牌名称" prop="tmName">
                    <el-input v-model="trademarkform.tmName" placeholder="请输入品牌名称" size="large" />
                </el-form-item>
                <!-- 品牌图片上传 -->
                <el-form-item label="品牌LOGO" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :headers="{ Authorization: localStorage.getItem('token') }">
                        <img v-if="trademarkform.logoUrl" :src="trademarkform.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                        <template #tip>
                            <div class="el-upload__tip">
                                只能上传jpg/png文件，且不超过500kb
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>

            <template #footer>
                <span>
                    <el-button @click="dialogVisible = false" size="large">取消</el-button>
                    <el-button type="primary" @click="handleConfirm" size="large">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import useProductStore from '@/store/modules/product.ts'
import { addTrademarkForm } from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'

const productStore = useProductStore()

let dialogVisible = ref<Boolean>(false) // 是否展示弹框
let pageNo = ref<any>(1) // 当前的页码
let limit = ref<any>(3) // 一页展示多少条数据
let total = ref<any>(0) // 总共多少条数据
let tmId = ref<any>(0) // 品牌的id
let trademarkforms = ref() // 获取form根节点
let trademarkform = reactive<addTrademarkForm>({
    tmName: '',
    logoUrl: ''
})
//表单验证规则
const trademarkRules = {
    tmName: [
        { required: true, message: '品牌名称不能为空', trigger: 'change' },
    ],
    logoUrl: [
        { required: true, message: '上传图片不能为空', trigger: 'change' },
    ],
}
onMounted(() => {
    getTrademarkListData() // 组件加载时获取品牌列表数据
})
onBeforeUnmount(() => {
    // 组件销毁前清空仓库中的相关数据
    productStore.clearState()
})
// pageNo变化时
const handleCurrentChange = (val: any) => {
    pageNo.value = val
    getTrademarkListData()
}
// limit变化时
const handleSizeChange = (val: any) => {
    limit.value = val
    getTrademarkListData()
}
// 获取品牌列表数据
const getTrademarkListData = async () => {
    await productStore.getTrademarkList(pageNo.value, limit.value)
    // 等待服务器数据返回后再给total赋值
    total.value = productStore.total
}
// 点击添加品牌按钮，进入对话框
const addTrademark = () => {
    // 添加前清除之前留下的数据
    trademarkform.tmName = ''
    trademarkform.logoUrl = ''
    tmId.value = null
    dialogVisible.value = true // 弹出对话框
}
// 编辑品牌
const editTrademark = (row: any) => {
    let copyRow = { ...row } // 浅拷贝一份服务器返回的品牌数据
    trademarkform.tmName = copyRow.tmName
    trademarkform.logoUrl = copyRow.logoUrl
    tmId.value = copyRow.id
    dialogVisible.value = true // 弹出对话框
}
// 点击确认按钮添加或者更新品牌
const handleConfirm = async () => {
    await trademarkforms.value.validate() // 等待表单验证通过后在执行下面代码
    if (!tmId.value) { // 添加品牌
        try {
            await productStore.addTrademark(trademarkform) // 携参向服务器发送请求添加品牌
            ElMessage.success('添加成功')
            dialogVisible.value = false // 弹出对话框
            pageNo.value = productStore.pages// 跳转到最后一页
            getTrademarkListData() // 重新获取品牌列表
        } catch (error) {
            ElMessage.error(error)
        }
    } else { // 编辑品牌
        const data = {
            tmName: trademarkform.tmName,
            logoUrl: trademarkform.logoUrl,
            id: tmId.value
        }
        try {
            await productStore.editTrademark(data) // 携参向服务器发送请求添加品牌
            ElMessage.success('修改成功')
            dialogVisible.value = false // 弹出对话框
            getTrademarkListData() // 重新获取品牌列表
        } catch (error) {
            ElMessage.error(error)
        }
    }
}
// 图片上传成功后
const handleAvatarSuccess = (res: any) => {
    console.log('上传成功，后端返回:', res);
    // 将上传到服务器的图片地址赋值给本地的logoUrl
    trademarkform.logoUrl = res.url;
    console.log('设置的logoUrl:', trademarkform.logoUrl);
}
// 图片上传之前 / 判断上传的图片格式大小是否符合要求
const beforeAvatarUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
}
// 删除品牌
const deleteTrademark = async (id: any) => {
    try {
        await productStore.deleteTrademark(id)
        ElMessage.success('删除成功')
        getTrademarkListData() // 重新获取品牌列表
    } catch (error) {
        ElMessage.error(error)
    }

}
</script>

<style scoped lang="scss">
.trademark_container {
    width: 100%;

    .add {
        width: 140px;
    }

    .trademark_list {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 14px;

        .logo_img {
            width: 100px;
            margin: 20px 0;
        }
    }

    .avatar-uploader {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
}
</style>

<style lang="scss">
.avatar-uploader {
    .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);

        &:hover {
            border-color: var(--el-color-primary);
        }
    }
}

.avatar-uploader-icon {
    font-size: 30px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>