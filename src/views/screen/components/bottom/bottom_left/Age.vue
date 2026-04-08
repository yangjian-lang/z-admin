<template>
    <div class="age_container">
        <Title name="年龄比例"></Title>
        <AgePieChart></AgePieChart>
    </div>
</template>

<script setup lang="ts">
import Title from "./components/Title.vue"
import AgePieChart from './components/agePieChart.vue'
</script>

<style scoped lang="scss">
.age_container {
    background: url(@/assets/image/screen_main_IB.png) no-repeat;
    background-size: 100% 100%;
}
</style>