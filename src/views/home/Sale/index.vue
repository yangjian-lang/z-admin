<template>
    <div class="sale_container">
        <el-card>
            <!-- 头部区域 -->
            <div class="header">
                <!-- 左侧图标区域 -->
                <el-tabs v-model="activeName" class="chart_container" @tab-click="handleClick">
                    <el-tab-pane label="销售额" name="sales"></el-tab-pane>
                    <el-tab-pane label="访问量" name="interview"></el-tab-pane>
                </el-tabs>
                <!-- 右侧日期选择区域 -->
                <div class="date_container">
                    <span @click="handleDate('day')">今日</span>
                    <span @click="handleDate('week')">本周</span>
                    <span @click="handleDate('month')">本月</span>
                    <span @click="handleDate('year')">本年</span>
                    <el-date-picker v-model="date" style="width: 240px;" type="daterange" start-placeholder="开始时间"
                        end-placeholder="结束时间" :default-value="[new Date(2023, 6, 1), new Date(2023, 7, 1)]" />
                </div>
            </div>
            <!-- 内容区域 -->
            <div class="content">
                <el-row :gutter="16">
                    <el-col :span="19">
                        <SaleChart :title='activeName'></SaleChart>
                    </el-col>
                    <el-col :span="5">
                        <div class="saleStore_container">
                            <span class="title">{{ saleStoreData.title }}</span>
                            <ul>
                                <li class="rank_container" v-for="item in saleStoreData.data" :key="item.id">
                                    <div>
                                        <span class="rank" :class="{ 'active': item.flag }">{{ item.id }}</span>
                                        <span>{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.count }}</span>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
//@ts-ignore
import dayjs from 'dayjs'
import SaleChart from './SaleChart/index.vue'

let activeName = ref('sales') // 选项卡选中项
let date = ref<any>([]) // 时间
let saleStoreData = reactive({
    title: '门店销售额排名',
    data: [
        { id: 1, name: '肯德基', count: 1265656, flag: true },
        { id: 2, name: '麦当劳', count: 1022356, flag: true },
        { id: 3, name: '星巴克', count: 965321, flag: true },
        { id: 4, name: '瑞幸', count: 895561, flag: false },
        { id: 5, name: '海底捞', count: 765321, flag: false },
        { id: 6, name: 'CoCo', count: 423513, flag: false },
        { id: 7, name: '蜜雪冰城', count: 98622, flag: false },
    ]
})

// 点击切换选项卡
const handleClick = (tab: any) => {
    console.log(tab.props.name)
}
// 点击今日|本周|本月|本年
const handleDate = (val: string) => {
    if (val == 'day') {
        // 点击今日
        const day = dayjs().format('YYYY-MM-DD');
        date.value = [day, day]
    } else if (val == 'week') {
        // 点击本周
        const weekStart = dayjs().day(1).format('YYYY-MM-DD')
        const weekEnd = dayjs().day(7).format('YYYY-MM-DD')
        date.value = [weekStart, weekEnd]
    } else if (val == 'month') {
        // 点击本月
        const monthStart = dayjs().startOf('month').format('YYYY-MM-DD')
        const monthEnd = dayjs().endOf('month').format('YYYY-MM-DD')
        date.value = [monthStart, monthEnd]
    } else if (val == 'year') {
        // 点击本年
        const yearStart = dayjs().startOf('year').format('YYYY-MM-DD')
        const yearEnd = dayjs().endOf('year').format('YYYY-MM-DD')
        date.value = [yearStart, yearEnd]
    }
}
</script>

<style scoped lang="scss">
.sale_container {
    width: 100%;
    margin-top: 20px;

    .header {
        position: relative;

        .date_container {
            display: flex;
            align-items: center;
            position: absolute;
            top: 5px;
            right: 0px;
            font-size: 14px;

            span {
                margin-right: 20px;
                cursor: pointer;
                transition: all 0.2s linear;

                &:hover {
                    color: #999;
                }
            }
        }
    }

    .saleStore_container {
        font-size: 15px;

        .title {
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 20px;
            margin-top: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            width: 100%;
            padding-bottom: 12px;
        }

        .rank_container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 26px;

            .rank {
                display: inline-block;
                margin-right: 16px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
            }

            .active {
                background-color: #886dff;
                border-radius: 50%;
                font-size: 14px;
                color: #fff;
            }
        }

    }
}
</style>