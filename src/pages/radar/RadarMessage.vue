<template>
    <div class="el-radar-message">
        <!-- 创建雷达信息 -->
        <radar-message-box></radar-message-box>
        <!-- 标题title -->
        <div class="el-radar-head">
            <p>工具管理-雷达管理</p>
            <p @click="createRadarClick">创建</p>
        </div>
    </div>
</template>

<script>
import RadarMessageBox from './RadarMessageBox';
export default {
    name: "radar",
    components: {
        "radar-message-box": RadarMessageBox
    },
    methods: {
        createRadarClick() {
            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", true);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/radarMessage.less';
</style>