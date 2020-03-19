<template>
    <div class="el-create-radar">
        <el-dialog
            title="创建雷达"
            :visible.sync="dialogCreateRadar"
            width="500px"
            :before-close="closeDialogCreateRadar">
            <div class="el-content">
                <div class="el-radar-name">
                    雷达名称
                    <input type="text" v-model="radarName" />
                </div>
                <div class="el-radar-plate">
                    <p>创建板块</p>
                    <div class="el-addplate-button">
                        <div v-for="(v, i) in createPlateList" :key="i" class="el-add-palte">
                            <input type="text" v-model="createPlateList[i].createPlateName" :placeholder="'请输入板块' + (i + 1) + '名字'"/>
                            <span>板块{{i + 1}}</span>
                            <img src="@/imgs/fork.png" @click="deletePlate(i)" />
                        </div>
                        <button @click="addPlate()">添加</button>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogCreateRadarTrue">创 建</el-button>
                <el-button @click="closeDialogCreateRadar">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "radarMessageBox",
    computed: {
        ...mapState('radar', ['dialogCreateRadar'])
    },
    data() {
        return {
            radarName: "",
            createPlateList: [],
        }
    },
    methods: {
        closeDialogCreateRadar() {
            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", false);
        },
        dialogCreateRadarTrue() {
            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", false);
        },
        //添加板块
        addPlate() {
           this.createPlateList.push({createPlateName: ""});
        },
        //删除板块
        deletePlate(i) {
            this.createPlateList.splice(i, 1);
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/common/radar/radarMessageBox.less";
</style>