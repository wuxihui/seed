<template>
    <div class="el-custom-manage">
        <!-- 创建板块 -->
        <custom-manage-box></custom-manage-box>
        <!-- 标题title -->
        <div class="el-custom-head">
            <div class="el-custom-title">工具管理-自定义板块管理</div>
            <button class="el-custom-buttom" @click="createCustomPlate">创建</button>
        </div>
        <!-- 条件筛选区 -->
        <div class="el-custom-screen">
            <div class="el-namestate-screen">
                <div class="el-plate-name">
                    板块名称
                    <el-input type="text" v-model="plateName" placeholder="请输入板块名称"></el-input>
                    <!-- <el-input type="text" v-model="plateName" placeholder="请输入板块名称"></el-input> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomManageBox from './CustomManageBox.vue';
export default {
    name: "customSectionManage",
    components: {
        'custom-manage-box': CustomManageBox
    },
    data() {
        return {
            plateName: "",
        }
    },
    methods: {
        createCustomPlate() {
            this.$store.commit("custom/SET_DIALOG_CREATE_PLATE", true);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/customPlate/customSectionManage.less';
</style>