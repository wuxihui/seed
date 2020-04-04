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
            this.commonenca.message("傻逼", "success");
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/plate/plateList.less';
</style>