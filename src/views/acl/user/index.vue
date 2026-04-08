<template>
    <div class="user_container">
        <!-- 搜索区域 -->
        <Search inputTitle="用户名" inputPlaceholder="请输入用户名"></Search>
        <!-- 用户列表区域 -->
        <el-card style="margin-top: 20px;">
            <el-button type="primary" size="large" icon="Plus" @click="handleAddUser">添加用户</el-button>
            <el-button type="danger" size="large" icon="Delete" @click="handleBatchDelete"
                :disabled="userIdList.length < 1">批量删除</el-button>
            <el-table v-loading="aclStore.tableIsLoading" :data="aclStore.userList" border stripe max-height="920"
                style="margin: 20px 0; font-size: 14px;" size="large" @selection-change="handleSelectionChange">
                <!-- 多选框 -->
                <el-table-column type="selection" width="60" align="center" />
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                <!-- 用户ID -->
                <el-table-column prop="id" label="用户ID" width="80" align="center"></el-table-column>
                <!-- 用户名字 -->
                <el-table-column prop="username" label="用户名字" width="width" align="center"></el-table-column>
                <!-- 用户名称 -->
                <el-table-column prop="name" label="用户名称" width="width" align="center"></el-table-column>

                <!-- 用户角色 -->
                <el-table-column prop="roleName" label="用户角色" width="width" align="center"></el-table-column>

                <!-- 创建时间 -->
                <el-table-column prop="createTime" label="创建时间" width="width" align="center"></el-table-column>

                <!-- 更新时间 -->
                <el-table-column prop="updateTime" label="更新时间" width="width" align="center"></el-table-column>

                <!-- 操作 -->
                <el-table-column prop="prop" label="操作" width="400" align="center">
                    <template #="{ row }">
                        <el-button style="margin: 20px 0;" size="default" icon="User"
                            @click="handleAssignRole(row)">分配角色</el-button>
                        <el-button type="primary" size="default" icon="Edit" @click="handleEditUser(row)">编辑</el-button>
                        <el-popconfirm :title="`你确定要删除${row.username}吗？`" @confirm="handleDeleteUser(row)">
                            <template #reference>
                                <el-button type="danger" size="default" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" page-sizes="[5, 7, 9, 11]" background
                layout="prev, pager, next, jumper, ->, sizes, total" :total="aclStore.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
        <!-- 添加用户弹框 -->
        <el-drawer v-model="addUserDrawer" title="添加用户">
            <el-form :model="userForm" :rules="userRules" ref="userForms" size="large">
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="userForm.name" placeholder="请输入用户姓名" />
                </el-form-item>
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="userForm.username" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="userForm.password" placeholder="请输入用户密码" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="large" @click="handleSaveUser">保存</el-button>
                <el-button size="large" @click="addUserDrawer = false">取消</el-button>
            </template>
        </el-drawer>
        <!-- 分配角色弹框 -->
        <el-drawer v-model="assignRoleDrawer" title="分配角色" @closed="assignRoleClosed">
            <el-form :model="assignRolesForm" size="large">
                <el-form-item label="用户姓名">
                    <el-input v-model="assignRolesForm.name" disabled />
                </el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="assignRolesForm.roleIdList" @change="handleCheckedRolesChange">
                        <el-checkbox
                            v-for="                     item                      in                      allRolesList                     "
                            :key="item.id" v-model="item.id" :label="item.id">
                            {{ item.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="large" @click="handleSaveAssignRole">保存</el-button>
                <el-button size="large" @click="assignRoleDrawer = false">取消</el-button>
            </template>
        </el-drawer>
        <!-- 修改用户弹框 -->
        <el-drawer v-model="editUserDrawer" title="分配角色">
            <el-form :model="editUserForm" size="large" ref="editUserForms" :rules="editUserRules">
                <el-form-item label="用户名字" prop="username">
                    <el-input v-model="editUserForm.username" />
                </el-form-item>
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="editUserForm.name" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="large" @click="handleEditUserSave">保存</el-button>
                <el-button size="large" @click="editUserDrawer = false">取消</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from "vue"
import $bus from '@/bus/index'
import userAclStore from '@/store/modules/acl'
import { ElMessage } from 'element-plus'
import { reqAssignRoleList } from '@/api/acl/user/index'

const aclStore = userAclStore()

let pageNo = ref<Number>(1)
let limit = ref<Number>(5)
let addUserDrawer = ref<Boolean>(false) // 添加用户弹框的显示与隐藏
let assignRoleDrawer = ref<Boolean>(false) // 分配角色弹框的显示与隐藏
let editUserDrawer = ref<Boolean>(false) // 修改用户信息弹框的显示与隐藏

let userId = ref<Number>(0) // 当前点击项的用户id
let userForm = reactive<any>({ //添加用户信息表单
    name: '',
    username: '',
    password: ''
})
let userForms = ref<any>()
const userRules = reactive<any>({
    name: [
        { required: true, message: '用户姓名不能为空', trigger: 'blur' },
        { min: 5, message: '长度不能小于5位', trigger: 'blur' }
    ],
    username: [
        { required: true, message: '用户名称不能为空', trigger: 'blur' },
        { min: 5, message: '长度不能小于5位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '用户密码不能为空', trigger: 'blur' }
    ],
})
let assignRolesForm = reactive<any>({ // 分配角色表单
    name: '', // 用户姓名
    roleIdList: [] // 已分配角色id列表
})
let checkAll = ref<any>(false) // 是否全选
let isIndeterminate = ref<any>(false) // 是否部分选中
let allRolesList = ref<any>([]) // 所有角色列表
let assignRoles = ref<any>([])// 已分配角色列表

let editUserForm = reactive<any>({ // 修改用户信息表单
    id: 0,
    name: '',
    username: ''
})
let editUserForms = ref<any>()
const editUserRules = reactive<any>({
    username: [
        { required: true, message: '用户名称不能为空', trigger: 'change' },
        { min: 5, message: '长度不能小于5位', trigger: 'change' }
    ],
    name: [
        { required: true, message: '用户姓名不能为空', trigger: 'change' },
        { min: 5, message: '长度不能小于5位', trigger: 'change' }
    ]
})
let userIdList = ref([]) // 用户id列表 用于批量删除用户
onMounted(() => {
    getUserList(pageNo.value, limit.value)

    // 重置页面状态
    $bus.on('resetUser', () => {
        pageNo.value = 1
        limit.value = 5
    })
})
onBeforeUnmount(() => {
    $bus.off('resetUser') // 清除全局事件
    aclStore.clearStore() // 清除仓库数据
})
// pageNo变化时
const handleCurrentChange = (val: any) => {
    getUserList(val, limit.value)
}
// limit变化时
const handleSizeChange = (val: any) => {
    getUserList(pageNo.value, val)

}
// 点击添加用户按钮
const handleAddUser = () => {
    // 清空数据
    userForm.name = ''
    userForm.username = ''
    userForm.password = ''

    addUserDrawer.value = true // 开启弹框
}
// 点击添加用户的保存按钮
const handleSaveUser = async () => {
    await userForms.value.validate() // 等待表单验证通过后在执行下面代码
    try {
        await aclStore.addUser(userForm) // 携带参数发送请求添加用户
        ElMessage.success('添加成功')
        getUserList(pageNo.value, limit.value) // 重新获取用户列表
    } catch (error) {
        ElMessage.error(error)
    }
    addUserDrawer.value = false // 关闭弹框
}
// 点击分配角色按钮
const handleAssignRole = async (row: any) => {
    assignRolesForm.name = row.name
    userId.value = row.id
    await getRoles(row.id)
    assignRoleDrawer.value = true
    // 判断当前全选框的状态
    const checkedCount = assignRolesForm.roleIdList.length
    checkAll.value = checkedCount == allRolesList.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRolesList.value.length
}
// 获取已分配角色和所有角色列表
const getRoles = async (userId: any) => {
    const result = await reqAssignRoleList(userId)
    if (result.code == 200) {
        assignRoles.value = result.data.assignRoles
        allRolesList.value = result.data.allRolesList
        // 获取已分配角色id
        assignRoles.value.forEach((item: any) => {
            assignRolesForm.roleIdList.push(item.id)
        })
        return 'ok'
    } else {
        return Promise.reject('获取失败')
    }
}
// 全选框的状态发生变化时
const handleCheckAllChange = (val: any) => {
    if (val) { // 全选
        let idList = <any>[]
        allRolesList.value.forEach((item: any) => {
            idList.push(item.id)
        })
        assignRolesForm.roleIdList = idList
    } else { // 全不选
        assignRolesForm.roleIdList = []
    }
    isIndeterminate.value = false
}
// 选中的角色时
const handleCheckedRolesChange = (val: any) => {
    let checkedCount = val.length
    // 设置当前全选框的状态，如果当前选中的长度等于所有角色的数组长度则为true反之为false
    checkAll.value = checkedCount == allRolesList.value.length
    // 设置部分选中的状态
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRolesList.value.length
}
// 点击分配角色弹框的保存按钮
const handleSaveAssignRole = async () => {
    // 收集参数
    const data = {
        userId: userId.value,
        roleIdList: assignRolesForm.roleIdList
    }
    try {
        await aclStore.doAssignRole(data) // 携带参数向服务器发送请求分配角色
        ElMessage.success('保存成功')
        getUserList(pageNo.value, limit.value) // 重新获取用户列表
    } catch (error) {
        ElMessage.error(error)
    }
    assignRoleDrawer.value = false // 关闭弹框  
}
// 分配角色弹框关闭时触发
const assignRoleClosed = () => {
    // 清空分配角色的数据
    assignRoleDrawer.value = false
    userId.value = 0
    checkAll.value = false
    isIndeterminate.value = false
    assignRolesForm.name = '',
        assignRolesForm.roleIdList = []
    allRolesList.value = []
    assignRoles.value = []
}
// 点击编辑
const handleEditUser = (row: any) => {
    editUserForm.id = row.id
    editUserForm.username = row.username
    editUserForm.name = row.name
    editUserDrawer.value = true // 开启编辑用户的弹框
}
// 点击编辑弹框中的保存按钮
const handleEditUserSave = async () => {
    await editUserForms.value.validate() // 等待表单验证通过后在执行下面代码
    // 收集数据
    const data = {
        id: editUserForm.id,
        username: editUserForm.username,
        name: editUserForm.name
    }
    try {
        await aclStore.editUser(data)
        ElMessage.success('修改成功')
        getUserList(pageNo.value, limit.value) // 重新获取用户列表
    } catch (error) {
        ElMessage.error(error)
    }
    editUserDrawer.value = false // 关闭编辑用户的弹框
}
// 删除单个用户
const handleDeleteUser = async (row: any) => {
    try {
        await aclStore.deleteUser(row.id)
        ElMessage.success('删除成功')
        getUserList(pageNo.value, limit.value) // 重新获取用户列表
    } catch (error) {
        ElMessage.error(error)

    }
}
// 当多选框状态发生改变时
const handleSelectionChange = (val: any) => {
    if (val.length > 0) {
        let arr = <any>[]
        val.forEach((item: any) => {
            arr.push(item.id)
        })
        userIdList.value = arr
    } else {
        userIdList.value = []
    }
}
// 点击批量删除
const handleBatchDelete = async () => {
    try {
        await aclStore.batchDeleteUser(userIdList.value)
        ElMessage.success('删除成功')
        getUserList(pageNo.value, limit.value) // 重新获取用户列表
    } catch (error) {
        ElMessage.error(error)
    }

}
// 获取用户列表
const getUserList = (page: any, limit: any) => {
    aclStore.page = page
    aclStore.limit = limit
    aclStore.getUserList()
}
</script>

<style scoped lang="scss">
.user_container {
    width: 100%;
}
</style>