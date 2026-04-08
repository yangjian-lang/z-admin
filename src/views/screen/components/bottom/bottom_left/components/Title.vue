<template>
    <div class="title_container">
        <span>{{ name }}</span>
        <img src="@/assets/image/screen_title_tag.png" alt="标签">
    </div>
</template>

<script setup lang="ts">
    defineProps(['name'])
</script>

<style scoped lang="scss">
    .title_container {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        color: #fff;
        margin-top: 6px;
        margin-left: 6px;

        img {
            width: 60px;
            height: 6px;
            margin-top: 10px;
        }
    }
</style>