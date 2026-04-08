<template>
    <div class="search_container">
        <el-card>
            <div class="card_container">
                <div class="input_container">
                    <span class="title">{{ inputTitle }} :</span>
                    <el-input v-model="keyword" :placeholder="inputPlaceholder" size="large"></el-input>
                </div>
                <div class="btn_container">
                    <el-button :disabled="!keyword" type="primary" size="large" @click="handleSearch">搜索</el-button>
                    <el-button size="large" @click="handleReset">重置</el-button>
                </div>
            </div>

        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import userAclStore from '@/store/modules/acl'
import { useRoute } from 'vue-router'
import $bus from '@/bus/index'

const aclStore = userAclStore()
const $route = useRoute()

const { inputTitle, inputPlaceholder } = defineProps(['inputTitle', 'inputPlaceholder'])
let keyword = ref<any>('')

// 点击搜索
const handleSearch = async () => {
    if ($route.path == '/acl/user') { // 当前是用户管理页的搜索事件
        aclStore.keyword = keyword.value
        await aclStore.getUserList()
        // 搜索完将关键字置空
        keyword.value = ''
        aclStore.keyword = ''
    } else if ($route.path == '/acl/role') {// 当前是角色管理页的搜索事件
        aclStore.keyword = keyword.value
        await aclStore.getRoleList()
        // 搜索完将关键字置空
        keyword.value = ''
        aclStore.keyword = ''
    }
}
// 点击重置
const handleReset = async () => {
    // 重置仓库数据
    aclStore.userList = []
    aclStore.roleList = []
    aclStore.page = 1
    aclStore.limit = 5
    if ($route.path == '/acl/user') { // 当前是用户管理页的重置事件
        await aclStore.getUserList()
        // 获取数据完将关键字置空
        keyword.value = ''
        aclStore.keyword = ''
        // 通知父组件将当前页码和limit改为默认值
        $bus.emit('resetUser')
    } else if ($route.path == '/acl/role') { // 当前是角色管理页的重置事件
        await aclStore.getRoleList()
        // 获取数据完将关键字置空
        keyword.value = ''
        aclStore.keyword = ''
        // 通知父组件将当前页码和limit改为默认值
        $bus.emit('resetRole')
    }
}

</script>

<style scoped lang="scss">
.search_container {
    width: 100%;

    .card_container {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        padding: 10px 40px 10px 0;

        .input_container {
            display: flex;
            flex-direction: row;
            align-items: center;

            .title {
                width: 105px;
                text-align: right;
                margin-right: 12px;
            }
        }

        .btn_container {
            margin-left: 30px;
        }
    }
}
</style>