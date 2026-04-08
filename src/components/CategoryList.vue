<template>
    <div class="category_list_container">
        <el-card>
            <div class="card_container">
                <!-- 一级分类 -->
                <div>
                    <span class="title">一级分类</span>
                    <el-select :disabled="!isShowList" class="selectc_container" v-model="category1Id" placeholder="请选择"
                        size="large">
                        <el-option v-for="c1 in category1List" :key="c1.id" :label="c1.name" :value="c1.id" />
                    </el-select>
                </div>
                <!-- 二级分类 -->
                <div>
                    <span class="title">二级分类</span>
                    <el-select :disabled="!isShowList" class="selectc_container" v-model="category2Id" placeholder="请选择"
                        size="large">
                        <el-option v-for="c2 in category2List" :key="c2.id" :label="c2.name" :value="c2.id" />
                    </el-select>
                </div>
                <!-- 二级分类 -->
                <div>
                    <span class="title">三级分类</span>
                    <el-select :disabled="!isShowList" class="selectc_container" v-model="category3Id" placeholder="请选择"
                        size="large">
                        <el-option v-for="c3 in category3List" :key="c3.id" :label="c3.name" :value="c3.id" />
                    </el-select>
                </div>
            </div>

        </el-card>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from '@/api/product/attr'
import type { resCategory1, resCategory2, resCategory3 } from '@/api/product/attr/type'
import useProductStore from '@/store/modules/product'
import { useRoute } from "vue-router";

const productStore = useProductStore()
const $route = useRoute()

let category1Id = ref<number>() // 一级id
let category2Id = ref<number>() // 二级id
let category3Id = ref<number>() // 三级id

let category1List = ref([] as any) // 一级列表
let category2List = ref([] as any) // 二级列表
let category3List = ref([] as any) // 三级列表

onMounted(() => {
    getCategory1List()
})

onBeforeUnmount(() => {
    // 组件销毁前清空仓库中的相关数据
    productStore.clearState()

})
defineProps(['isShowList'])
// 监听一级列表的选择，选择后即触发
watch(category1Id, (nVal) => {
    // 携带一级id向服务器发送请求获取二级列表数据
    if (nVal) {
        productStore.category1Id = nVal
        getCategory2List(nVal) // 获取二级列表
        productStore.attrList = [] // 清空一下仓库中的属性列表
        productStore.spuList = [] // 清空一下仓库中的spu列表
    }
})
// 监听二级列表的选择，选择后即触发
watch(category2Id, (nVal) => {
    // 携带二级id向服务器发送请求获取三级列表数据
    if (nVal) {
        productStore.category2Id = nVal
        getCategory3List(nVal)// 获取三级列表
        productStore.attrList = [] // 清空一下仓库中的属性列表
        productStore.spuList = [] // 清空一下仓库中的spu列表
    }
})
// 监听三级列表的选择，选择后即触发
watch(category3Id, (nVal) => {
    // 携带一级、二级、三级id向服务器发送请求获取属性列表数据
    if (nVal) {
        productStore.category3Id = nVal
        if ($route.path == '/product/attr') { // 属性管理页面
            productStore.getAttrList()
        } else if ($route.path == '/product/spu') { // spu管理页面
            productStore.getSpuList()
        }

    }
})
// 获取一级列表数据
const getCategory1List = async () => {
    const result: resCategory1 = await reqGetCategory1()
    if (result.code == 200) {
        category1List.value = result.data
    }
}

// 获取二级列表数据
const getCategory2List = async (category1Id: number) => {
    const result: resCategory2 = await reqGetCategory2(category1Id)
    if (result.code == 200) {

        // 清空二级、三级列表数据
        clearCategory2List()
        clearCategory3List()

        category2List.value = result.data // 获取二级列表数据
    }
}
// 获取三级列表数据
const getCategory3List = async (category2Id: number) => {
    const result: resCategory3 = await reqGetCategory3(category2Id)
    if (result.code == 200) {
        // 清空三级列表数据
        clearCategory3List()

        category3List.value = result.data //获取三级列表数据

    }
}

// 清空二级列表数据
const clearCategory2List = () => {
    category2List.value = []
    category2Id.value = undefined
    // 仓库中的二级id
    productStore.category2Id = null
}
// 清空三级列表数据
const clearCategory3List = () => {
    category3List.value = []
    category3Id.value = undefined
    // 仓库中的三级id
    productStore.category3Id = null
}
</script>

<style scoped lang="scss">
.category_list_container {
    width: 100%;

    .card_container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: start;

        .title {
            font-size: 16px;
            margin-right: 16px;
        }

        .selectc_container {
            margin-right: 60px;
        }
    }

}
</style>