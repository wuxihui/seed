<template>
    <div class="el-plate-message">
        <!-- 创建战区信息 -->
        <plate-message-box></plate-message-box>
        <!-- header    分割线 -->
        <div class="el-plate-head">
            <div class="el-plate-title">工具管理-战区管理</div>
            <button class="el-plate-create" @click="createInforBox">创建</button>
        </div>
        <!-- condition 筛选区   分割线 -->
        <div class="el-screen-area">
            <div class="el-war">
                <div class="el-war-name">
                    战区名称
                    <input type="text" v-model="warNameScreen" class="el-screenwar-txt" />
                </div>
                <button class="el-search">搜索</button>
                <div class="el-state-screen">
                    战区状态
                      <el-select v-model="warStateSelected" @change="selectedState(warStateSelected)" placeholder="请选择状态">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-date-screen">
                <div class="el-create-date">
                    <span>创建日期</span>
                    <el-date-picker
                    v-model="createStartDate"
                    type="date"
                    placeholder="选择创建日期">
                    </el-date-picker>
                    ~
                    <el-date-picker
                    v-model="createEndDate"
                    type="date"
                    placeholder="选择创建日期">
                    </el-date-picker>
                </div>
                <div class="el-modify-date">
                    <span>最近修改日期</span>
                    <el-date-picker
                    v-model="modifyStartDate"
                    type="date"
                    placeholder="选择修改日期">
                    </el-date-picker>
                    ~
                    <el-date-picker
                    v-model="modifyEndDate"
                    type="date"
                    placeholder="选择修改日期">
                    </el-date-picker>
                </div>
                <button class="el-screen-button">筛选</button>
            </div>
        </div>
    </div>
</template>

<script>
import PlateMessageBox from './PlateMessageBox.vue';
export default {
    name: "plateManagement",
    components: {
        "plate-message-box": PlateMessageBox
    },
    data() {
        return {
            warNameScreen: "",
            createStartDate: "",
            createEndDate: "",
            modifyStartDate: "",
            modifyEndDate: "",
            options: [{
                value: '1',
                label: '待发布'
                }, {
                value: '2',
                label: '已发布'
                }, {
                value: '3',
                label: '已停用'
                }],
            warStateSelected: ''
        }
    },
    methods: {
        createInforBox() {
            this.$store.commit("plate/SET_DIALOG_PLATE_INFOR", true);
        },
        selectedState(warStateSelected) {
            console.log(warStateSelected);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/plateManagement.less';
</style>