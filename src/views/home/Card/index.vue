<template>
    <div class="card_container">
        <el-row :gutter="16">
            <!-- 总销售额 -->
            <el-col :span="6">
                <el-card>
                    <Detail title="总销售额" count="￥126560">
                        <template #chart>
                            <div class="chart_container">
                                <span>周同比 56.67% </span>
                                <el-icon color="red" style="margin: 0 5px;">
                                    <BottomRight />
                                </el-icon>
                                <span>日同比 19.16% </span>
                                <el-icon color="green" style="margin: 0 5px;">
                                    <TopRight />
                                </el-icon>
                            </div>
                        </template>
                        <template #footer>
                            <div class="footer_container">
                                <span>日销售额：￥12432</span>
                            </div>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!-- 访问量 -->
            <el-col :span="6">
                <el-card>
                    <Detail title="访问量" count="88460">
                        <template #chart>
                            <div class="chart_container">
                                <LineChart></LineChart>
                            </div>
                        </template>
                        <template #footer>
                            <div class="footer_container">
                                <span>日访问量：1234</span>
                            </div>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!-- 支付笔数 -->
            <el-col :span="6">
                <el-card>
                    <Detail title="支付笔数" count="76530">
                        <template #chart>
                            <div class="chart_container">
                                <BarChart></BarChart>
                            </div>
                        </template>
                        <template #footer>
                            <div class="footer_container">
                                <span>转化率：65%</span>
                            </div>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!-- 运营活动效果 -->
            <el-col :span="6">
                <el-card>
                    <Detail title="运营活动效果" count="78%">
                        <template #chart>
                            <div class="chart_container">
                                <ProgressChart></ProgressChart>
                            </div>
                        </template>
                        <template #footer>
                            <div class="footer_container">
                                <div class="chart_container">
                                    <span>周同比 32.67% </span>
                                    <el-icon color="red" style="margin: 0 5px;">
                                        <BottomRight />
                                    </el-icon>
                                    <span>日同比 12.16% </span>
                                    <el-icon color="green" style="margin: 0 5px;">
                                        <TopRight />
                                    </el-icon>
                                </div>
                            </div>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
    import Detail from './Detail/index.vue'
    import LineChart from './LineChart/index.vue'
    import BarChart from './BarChart/index.vue'
    import ProgressChart from './ProgressChart/index.vue'
</script>

<style scoped lang="scss">
    .card_container {
        width: 100%;

        .chart_container {
            height: 60px;
        }

        .footer_container {
            height: 40px;
            line-height: 55px;
            width: 100%;
            border-top: 1px solid #eee;
            font-size: 18px;
        }
    }
</style>