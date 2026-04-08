<template>
    <div class="role_container">
        <!-- 搜索区域 -->
        <Search inputTitle="职位搜索" inputPlaceholder="请输入搜索职位的关键字"></Search>
        <!-- 用户列表区域 -->
        <el-card style="margin-top: 20px;">
            <el-button type="primary" size="large" icon="Plus" @click="handleAddRole">添加职位</el-button>
            <el-table v-loading="aclStore.tableIsLoading" :data="aclStore.roleList" border stripe max-height="920"
                style="margin: 20px 0; font-size: 14px;">
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                <!-- 用户ID -->
                <el-table-column prop="id" label="用户ID" width="80" align="center"></el-table-column>
                <!-- 职位名称 -->
                <el-table-column prop="roleName" label="职位名称" width="width" align="center"></el-table-column>
                <!-- 创建时间 -->
                <el-table-column prop="createTime" label="创建时间" width="width" align="center"></el-table-column>
                <!-- 更新时间 -->
                <el-table-column prop="updateTime" label="更新时间" width="width" align="center"></el-table-column>
                <!-- 操作 -->
                <el-table-column prop="prop" label="操作" width="400" align="center">
                    <template #="{ row }">
                        <el-button style="margin: 20px 0;" size="default" icon="User"
                            @click="handleAssign(row)">分配权限</el-button>
                        <el-button type="primary" size="default" icon="Edit" @click="handleEdit(row)">编辑</el-button>
                        <el-popconfirm :title="`确认删除${row.roleName}吗？`" @confirm="handleDeleteRole(row)">
                            <template #reference>
                                <el-button type="danger" size="default" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 7, 9, 11]" background
                layout="prev, pager, next, jumper, ->, sizes, total" :total="aclStore.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
        <!-- 添加|修改角色弹框 -->
        <el-dialog v-model="roleDialog" :title="dialogTitle" width="30%">
            <el-form :model="roleForm" :rules="roleRules" ref="roleForms" size="large">
                <el-form-item label="添加职位" prop="roleName">
                    <el-input v-model="roleForm.roleName" placeholder="请输入职位" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="large" @click="roleDialog = false">取消</el-button>
                    <el-button size="large" type="primary" @click="handleSave">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 分配权限抽屉 -->
        <el-drawer v-model="assignDrawer" title="分配菜单与按钮的权限" @closed="assignDrawerClosed">
            <el-tree :data="permissionList" empty-text="暂无数据" size="large" show-checkbox node-key="id"
                :default-expanded-keys="permissionIdList" :default-checked-keys="permissionIdList" :props="defaultProps"
                @check="handleChecked" />
            <template #footer>
                <el-button type="primary" size="large" @click="handleSaveAssign">保存</el-button>
                <el-button size="large" @click="assignDrawer = false">取消</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from "vue"
import $bus from '@/bus/index'
import userAclStore from '@/store/modules/acl'
import { ElMessage } from 'element-plus'
import { reqGetPermissionListByRoleId } from '@/api/acl/permission/index'

const aclStore = userAclStore()

let pageNo = ref<Number>(1)
let limit = ref<Number>(5)
let roleDialog = ref<boolean>(false) // 添加|修改角色弹框
let dialogTitle = ref<String>('') // 弹框标题
let roleId = ref<any>(0) // 角色id
let roleForm = reactive<any>({ // 角色表单
    roleName: ''
})
let roleForms = ref<any>()
const roleRules = reactive({
    roleName: [
        { required: true, message: '用户姓名不能为空', trigger: 'blur' }
    ]
})
let assignDrawer = ref<Boolean>(false) // 分配权限弹框
let permissionList = ref<any>([]) // 菜单列表
let defaultProps = reactive({
    children: 'children',
    label: 'name'
})
let permissionIdList = ref<any>([]) // 已选中的菜单权限id列表

onMounted(() => {
    getRoleList(pageNo.value, limit.value)
    // 重置页面状态
    $bus.on('resetRole', () => {
        pageNo.value = 1
        limit.value = 5
    })
})
onBeforeUnmount(() => {
    $bus.off('resetRole') // 清除全局事件总线
    aclStore.clearStore() // 清除仓库数据
})

// pageNo变化时
const handleCurrentChange = (val: any) => {
    getRoleList(val, limit.value)
}
// limit变化时
const handleSizeChange = (val: any) => {
    getRoleList(pageNo.value, val)
}
// 获取用户列表
const getRoleList = (page: any, limit: any) => {
    aclStore.page = page
    aclStore.limit = limit
    aclStore.getRoleList()
}
// 点击添加职位按钮
const handleAddRole = () => {
    roleForm.roleName = '' // 清空表单数据
    roleId.value = 0
    dialogTitle.value = '添加职位' // 设置标题
    roleDialog.value = true // 开启弹框
}
// 点击编辑按钮
const handleEdit = (row: any) => {
    roleForm.roleName = row.roleName
    roleId.value = row.id
    dialogTitle.value = '更新职位' // 设置标题
    roleDialog.value = true // 开启弹框
}
// 点击添加|修改职位中的保存按钮
const handleSave = async () => {
    await roleForms.value.validate() // 等待表单验证通过后在执行下面代码
    // 获取当前时间
    const date = new Date()
    let year = computedDate(date.getFullYear()) // 年
    let month = computedDate(date.getMonth()) // 月
    let day = computedDate(date.getDay()) // 日
    let hour = computedDate(date.getHours()) // 时
    let minute = computedDate(date.getMinutes()) // 分
    let second = computedDate(date.getSeconds()) // 秒

    // 收集参数
    const data = {
        id: roleId.value,
        roleName: roleForm.roleName,
        remark: null,
        createTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
        updateTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    if (dialogTitle.value == '添加职位') {
        // 添加职位
        await aclStore.addRole(data)
        ElMessage.success('添加成功')
        getRoleList(pageNo.value, limit.value) // 重新获取角色分页列表

    } else if (dialogTitle.value == '更新职位') {
        // 更新职位
        await aclStore.editRole(data)
        ElMessage.success('更新成功')
        getRoleList(pageNo.value, limit.value) // 重新获取角色分页列表
    }
    roleDialog.value = false // 关闭弹框
}
// 删除角色
const handleDeleteRole = async (row: any) => {
    await aclStore.deleteRole(row.id)
    ElMessage.success('删除成功')
    getRoleList(pageNo.value, limit.value) // 重新获取角色分页列表
}
// 当传入的值为单位数时，在前面加个0
const computedDate = (num: any) => {
    if (num < 10) {
        num = `0${num}`
    }
    return num
}
// 计算选中权限的方法
const computedChecked = (arr: any) => {
    arr.forEach((item: any) => {
        if (item.children && item.children.length > 0) {
            // 通过递归重复调用该方法来判断子集中的选中项
            computedChecked(item.children)
        } else {
            if (item.select) { // select的值为true即代表选中
                permissionIdList.value.push(item.id)
            }
        }
        return true
    })
}
// 点击分配权限
const handleAssign = async (row: any) => {
    await getPermissionList(row.id)
    roleId.value = row.id
    assignDrawer.value = true // 开启弹框
}
// 当分配权限弹框关闭时
const assignDrawerClosed = () => {
    assignDrawer.value = false // 关闭弹框
    // 清空数据
    permissionList.value = []
    permissionIdList.value = []
    roleId.value = 0
}
// 选中菜单权限
const handleChecked = (item: any, data: any) => {// item:当前选中的节点信息，data:所有相关的信息（包括选中信息）
    permissionIdList.value = data.checkedKeys // 收集当前选中的权限id
    console.log(item)
}
// 点击保存按钮，保存菜单权限
const handleSaveAssign = async () => {
    // 收集数据
    const data = {
        permissionIdList: permissionIdList.value,
        roleId: roleId.value
    }
    await aclStore.doAssign(data)
    assignDrawer.value = false // 关闭弹框
    ElMessage.success('保存成功')
    getRoleList(pageNo.value, limit.value) // 重新获取角色分页列表
}
// 通过角色id获取菜单列表
const getPermissionList = async (roleId: any) => {
    const result = await reqGetPermissionListByRoleId(roleId)
    if (result.code == 200) {
        permissionList.value = result.data
        computedChecked(permissionList.value)
        return 'ok'
    } else {
        return Promise.reject('获取失败')
    }
}
</script>

<style scoped lang="scss">
.role_container {
    width: 100%;
}
</style>