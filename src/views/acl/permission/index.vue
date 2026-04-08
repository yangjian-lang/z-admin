<template>
    <div class="permission_container">
        <el-card>
            <el-table :data="permissionList" style="width: 100%; margin-bottom: 20px;font-size: 15px;" row-key="id" border
                stripe size="large" max-height="1130" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="code" label="权限值" align="center" />
                <el-table-column prop="updateTime" label="修改时间" align="center" />
                <el-table-column prop="prop" label="操作" align="center" width="300">
                    <template #="{ row }">
                        <el-button v-if="row.level == 3" type="primary" size="default"
                            @click="handleAddPermission(row)">添加功能</el-button>
                        <el-button v-else-if="row.level == 4" size="default" disabled>添加菜单</el-button>
                        <el-button v-else size="default" @click="handleAddPermission(row)">添加菜单</el-button>
                        <el-button :disabled="row.level == 1" type="primary" size="default"
                            @click="handleEditPermission(row)">编辑</el-button>
                        <el-popconfirm :title="`确定删除${row.name}吗？`" @confirm="handleDeletePermission(row)">
                            <template #reference>
                                <el-button :disabled="row.level == 1" type="danger" size="default">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加菜单|功能弹框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%" :before-close="handleClose">
            <el-form :model="permissionForm" ref="permissionForms" :rules="formRules" size="large" label-width="70">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="permissionForm.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="权限值" prop="code">
                    <el-input v-model="permissionForm.code" placeholder="请输入权限值" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false" size="large">取消</el-button>
                    <el-button type="primary" size="large" @click="handleSave">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { reqGetPermissionList } from '@/api/acl/permission/index'
import userAclStore from '@/store/modules/acl'
import { ElMessage } from 'element-plus'

const aclStore = userAclStore()

let permissionList = ref<any>([]) // 菜单列表
let dialogVisible = ref<Boolean>(false) // 是否展示弹框
let dialogTitle = ref<String>('') // 弹框标题

let permissionForm = reactive<any>({
    id: 0,
    name: "", // 菜单名称
    code: "", // 权限值
    level: '', // 所在的层级
    pid: '', // 父集的id
    type: '', // 菜单的类型
    toCode: "" // 跳转权限值
})
let permissionForms = ref()
let formRules = reactive({
    name: [
        { required: true, message: '名称不能为空', trigger: 'change' },
    ],
    code: [
        { required: true, message: '权限值不能为空', trigger: 'change' },
    ]
})

onMounted(() => {
    getPermissionList()
})

// 点击添加菜单|功能
const handleAddPermission = (row: any) => {
    if (row.level == 3) { // 添加功能
        dialogTitle.value = '添加功能'
    } else { // 添加菜单
        dialogTitle.value = '添加菜单'
    }
    dialogVisible.value = true // 开启弹框
    permissionForm.pid = row.id
    permissionForm.level = row.level
    permissionForm.type = row.type
}
// 点击编辑按钮
const handleEditPermission = (row: any) => {
    if (row.level == 3) { // 修改功能
        dialogTitle.value = '修改功能'
    } else { // 修改菜单
        dialogTitle.value = '修改菜单'
    }
    dialogVisible.value = true // 开启弹框
    permissionForm.name = row.name
    permissionForm.code = row.code
    permissionForm.pid = row.pid
    permissionForm.level = row.level
    permissionForm.type = row.type
    permissionForm.id = row.id
}
// 点击弹框的保存按钮
const handleSave = async () => {
    await permissionForms.value.validate()
    // 收集参数
    const data = {
        id: permissionForm.id,
        pid: permissionForm.pid,
        level: permissionForm.level + 1,
        name: permissionForm.name,
        code: permissionForm.code,
        toCode: permissionForm.toCode,
        type: permissionForm.type
    }
    if (!permissionForm.id) {
        // 添加菜单
        try {
            await aclStore.addPermission(data)
            ElMessage.success('添加成功')
            getPermissionList() // 重新获取菜单列表
        } catch (error) {
            ElMessage.error(error)
        }
    } else {
        try {
            await aclStore.editPermission(data)
            ElMessage.success('修改成功')
            getPermissionList() // 重新获取菜单列表
        } catch (error) {
            ElMessage.error(error)
        }
    }
    dialogVisible.value = false // 关闭弹框
    clearForm() // 清空表单数据
}
// 关闭弹框时
const handleClose = () => {
    dialogVisible.value = false // 关闭弹框
}
// 删除菜单
const handleDeletePermission = async (row: any) => {
    try {
        await aclStore.deletePermission(row.id)
        ElMessage.success('删除成功')
        getPermissionList() // 重新获取菜单列表
    } catch (error) {
        ElMessage.error(error)
    }
}
// 获取菜单列表
const getPermissionList = async () => {
    const result = await reqGetPermissionList()
    if (result.code == 200) {
        permissionList.value = result.data
    }
}
// 清空表单数据
const clearForm = () => {
    // 清空表单数据
    permissionForm.name = ''
    permissionForm.code = ''
    permissionForm.id = 0
    permissionForm.level = 0
    permissionForm.pid = 0
}
</script>

<style scoped>
.permission_container {
    width: 100%;
}
</style>