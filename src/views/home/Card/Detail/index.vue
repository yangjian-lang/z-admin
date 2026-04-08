<template>
    <div class="detail_container">
        <!-- 头部标题区域 -->
        <div class="header">
            <span>{{ title }}</span>
            <el-icon size="20">
                <InfoFilled />
            </el-icon>
        </div>
        <!-- 数值区域 -->
        <div class="count">{{ count }}</div>
        <div class="chart">
            <slot name="chart"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps(['title', 'count'])
</script>


<style scoped lang=scss>
    .detail_container {
        width: 100%;

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            color: #ddd;
            font-size: 16px;
        }

        .count {
            font-size: 30px;
            margin-top: 16px;
            margin-bottom: 24px;
        }
    }
</style>