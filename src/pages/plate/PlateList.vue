<template>
    <div class="el-plate-list">
        <button @click="handleClick">消息提示</button>
    </div>
</template>

<script>
export default {
    name: "plateList",
    methods: {
        handleClick() {
            this.message("傻逼", "success");
            // this.$store.commit("radar/SET_COMMON_INFO", "");
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/plate/plateList.less';
</style>