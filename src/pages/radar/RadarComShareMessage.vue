<template>
    <div class="el-radarcom-message">
        <!-- 添加成分股 -->
        <addRadar-Share-messageBox></addRadar-Share-messageBox>
        <!-- title标题 -->
        <div class="el-radarcom-head">
            <p>雷达成分股管理</p>
            <button @click="addComShares">添加</button>
        </div>
    </div>
</template>

<script>
import AddRadarShareMessageBox from './AddRadarShareMessageBox';
export default {
    name: "radarComShareMessage",
    components: {
        "addRadar-Share-messageBox": AddRadarShareMessageBox
    },
    methods: {
        addComShares() {
            this.$store.commit("radar/SET_DIALOG_ADD_COM_SHARES", true);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/radarComShareMessage.less';
</style>