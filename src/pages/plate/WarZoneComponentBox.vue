<template>
    <div class="el-cusmange-box">
        <el-dialog
            title="创建板块"
            :visible.sync="dialogCreatePlate"
            width="500px"
            :before-close="closeDialogCreatePlate">
            <div class="el-custom-list">
                <div class="el-cusplate-name">
                    板块名称
                    <input type="text" v-model="customPlate" class="el-custom-plate"/>
                </div>
                <div class="el-cusplate-shares">
                    股票名称
                    <input type="text" v-model="sharesPlate" class="el-plate-shares"/>
                    <img src="@/imgs/add.png" alt="添加" />
                </div>
                <div class="el-cusplate-exist">
                    已有板块名称
                    <input type="text" v-model="existPlate" class="el-plate-exist"/>
                    <img src="@/imgs/add.png" alt="添加" />
                </div>
                 <div class="el-cusplate-list">
                    股票列表
                    <div class="el-plate-list">
                        <ul>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-custom-delete" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="el-cusplate-state">
                    <span>板块状态</span>
                     <el-radio-group v-model="cusplateRadio" @change="changecustomPlateRadio">
                        <el-radio label="1">待发布</el-radio>
                        <el-radio label="2">已发布</el-radio>
                        <el-radio label="3">已停用</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createDialogCreatePlate">创 建</el-button>
                <el-button @click="closeDialogCreatePlate">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "warZoneComponentBox",
    computed: {
        ...mapState('plate', ['dialogCreatePlate'])
    },
    data() {
        return {
            customPlate: "",
            sharesPlate: "",
            existPlate: "",
            cusplateRadio: "",
        }
    },
    methods: {
        createDialogCreatePlate() {
            this.$store.commit("plate/SET_DIALOG_CREATE_PLATE", false);    
        },
        closeDialogCreatePlate() {
            this.$store.commit("plate/SET_DIALOG_CREATE_PLATE", false);
        },
        changecustomPlateRadio(val) {
            console.log(val);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/css/plate/warZoneComponentBox.less';
</style>