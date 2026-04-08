import { defineStore } from 'pinia'
import { reqGetUserList, reqSaveUser, reqDoAssignRole, reqEditUser, reqDeleteUser, reqBatchDeleteUser } from '@/api/acl/user/index'
import { reqGetRoleList, reqAddRole, reqEditRole, reqDeleteRole } from '@/api/acl/role/index'
import { reqGetDoAssign, reqSavePermission, reqEditPermission, reqDeletePermission } from '@/api/acl/permission/index'

import type { aclStore } from './types/type'
import type { SaveUser, doAssignRole, editUser } from '@/api/acl/user/type'
import type { resRoleListRecordsType } from '@/api/acl/role/type'
import type { doAssign, AddPermission } from '@/api/acl/permission/type'

const useAclStore = defineStore('acl', {
    state: (): aclStore => {
        return {
            keyword: '', // 搜索关键字
            userList: [], // 用户管理分页列表
            page: 0,// 当前是第几页
            limit: 0, // 每页展示多少条
            pages: 0, // 总页数
            total: 0,// 总共多少条数据
            tableIsLoading: false, // 表格是否刷新
            roleList: [], // 角色分页列表
        }
    },
    actions: {
        // 清除仓库数据
        clearStore() {
            this.keyword = ''
            this.userList = []
            this.page = 0
            this.limit = 0
            this.pages = 0
            this.total = 0
            this.tableIsLoading = false
            this.roleList = []
        },
        // 获取用户分页列表
        async getUserList() {
            this.tableIsLoading = true // 开启表格加载动画
            const result = await reqGetUserList(this.page, this.limit, this.keyword)
            if (result.code == 200) {
                this.userList = result.data.records
                this.pages = result.data.pages
                this.total = result.data.total
                this.tableIsLoading = false  // 关闭表格加载动画
                return 'ok'
            } else {
                return Promise.reject('获取失败')
            }
        },
        // 新增用户
        async addUser(data: SaveUser) {
            const result = await reqSaveUser(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('添加失败')
            }
        },
        // 分配角色
        async doAssignRole(data: doAssignRole) {
            const result = await reqDoAssignRole(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('保存失败')
            }
        },
        // 修改用户信息
        async editUser(data: editUser) {
            const result = await reqEditUser(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('修改失败')
            }
        },
        // 删除用户
        async deleteUser(id: number) {
            const result = await reqDeleteUser(id)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('删除失败')
            }
        },
        // 批量删除用户
        async batchDeleteUser(idList: number[]) {
            const result = await reqBatchDeleteUser(idList)
            console.log(result)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('批量删除失败')
            }
        },
        // 获取角色分页列表
        async getRoleList() {
            this.tableIsLoading = true // 开启表格加载动画
            const result = await reqGetRoleList(this.page, this.limit, this.keyword)
            if (result.code == 200) {
                this.roleList = result.data.records
                this.pages = result.data.pages
                this.total = result.data.total
                this.tableIsLoading = false  // 关闭表格加载动画
                return 'ok'
            } else {
                return Promise.reject('获取失败')
            }
        },
        // 添加角色
        async addRole(data: resRoleListRecordsType) {
            const result = await reqAddRole(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('添加失败')
            }
        },
        // 修改角色
        async editRole(data: resRoleListRecordsType) {
            const result = await reqEditRole(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('修改失败')
            }
        },
        // 删除角色
        async deleteRole(id: number) {
            const result = await reqDeleteRole(id)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('删除失败')
            }
        },
        // 给角色分配权限
        async doAssign(data: doAssign) {
            const result = await reqGetDoAssign(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('保存失败')
            }
        },
        // 新增菜单
        async addPermission(data: AddPermission) {
            const result = await reqSavePermission(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('添加失败')
            }
        },
        // 编辑菜单
        async editPermission(data: AddPermission) {
            const result = await reqEditPermission(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('更新失败')
            }
        },
        // 删除菜单
        async deletePermission(id: number) {
            const result = await reqDeletePermission(id)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject('删除失败')
            }
        }
    },
    getters: {

    }
})

export default useAclStore