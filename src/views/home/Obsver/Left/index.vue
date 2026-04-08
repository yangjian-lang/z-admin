<template>
    <div class="container">
        <div class="header">
            <span>{{ data.title }}</span>
            <el-dropdown size="default" placement="bottom-end">
                <el-icon color="#ccc" size="18" style="cursor: pointer;">
                    <MoreFilled />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="item in data.chartList" key="item.id" @click="handleMore(item)">
                            {{ item.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- 详情区域 -->
        <div class="detail_container">
            <el-row :gutter="30">
                <el-col :span="12">
                    <SearchUserDetail :title="data.searchData.titleOne" :count="data.searchData.userCount"
                        :weekCount="data.searchData.weekUserCount" :isUp="true" :chartData="userCountChart">
                    </SearchUserDetail>
                </el-col>
                <el-col :span="12">
                    <SearchDetail :title="data.searchData.titleTwo" :count="data.searchData.count"
                        :weekCount="data.searchData.weekCount" :isUp="false" :chartData="countChart"></SearchDetail>
                </el-col>
            </el-row>


        </div>
    </div>
</template>

<script setup lang="ts">
import SearchUserDetail from './SearchUserDetail/index.vue'
import SearchDetail from './SearchDetail/index.vue'
import { ref, reactive, onMounted } from 'vue'
import $bus from '@/bus/index.ts'
let userCountChart = ref<any>([])
let countChart = ref<any>([])
let data = reactive({
    title: '线上热门搜索',
    searchData: {
        titleOne: '搜索用户数',
        userCount: 12321,
        weekUserCount: 17.1,
        titleTwo: '人均搜索次数',
        count: 2.7,
        weekCount: 26.2
    },
    chartList: [
        {
            id: 1,
            name: '黄金糕',
            searchUserCount: [14, 48, 18, 32, 16, 10, 25, 12, 21],
            searchCount: [25, 58, 17, 86, 16, 28, 35, 10, 49]
        },
        {
            id: 2,
            name: '狮子头',
            searchUserCount: [48, 12, 43, 78, 25, 82, 12, 52, 15],
            searchCount: [24, 18, 58, 100, 48, 89, 70, 15, 25]
        },
        {
            id: 3,
            name: '螺蛳粉',
            searchUserCount: [65, 48, 45, 25, 16, 75, 25, 15, 56],
            searchCount: [24, 65, 45, 78, 45, 10, 25, 45, 10]
        },
        {
            id: 4,
            name: '双皮奶',
            searchUserCount: [65, 78, 18, 58, 16, 50, 45, 20, 15],
            searchCount: [55, 21, 17, 52, 45, 78, 25, 46, 12]
        },
        {
            id: 5,
            name: '蚵仔煎',
            searchUserCount: [54, 65, 25, 45, 65, 78, 52, 13, 20],
            searchCount: [87, 45, 10, 32, 25, 45, 12, 34, 86]
        }
    ]
})
onMounted(() => {
    userCountChart.value = data.chartList[0].searchUserCount
    countChart.value = data.chartList[0].searchCount
})
// 点击右上更多时
const handleMore = (chart: any) => {
    $bus.emit('changeSearchUserchart', chart.searchUserCount)
    $bus.emit('changeSearchChart', chart.searchCount)
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    padding-bottom: 16px;
}
</style>