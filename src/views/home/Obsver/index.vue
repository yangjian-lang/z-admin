<template>
    <div class="obsver_container">
        <el-row :gutter="16">
            <el-col :span="16">
                <!-- 左侧线上热门搜索 -->
                <div class="left_container">
                    <el-card>
                        <Left></Left>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <!-- 右侧销售额类别占比 -->
                <div class="right_container">
                    <el-card>
                        <Right></Right>
                    </el-card>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script setup lang="ts">
    import Left from "./Left/index.vue";
    import Right from './Right/index.vue'
</script>

<style scoped lang="scss">
    .obsver_container {
        margin-top: 20px;
    }
</style>