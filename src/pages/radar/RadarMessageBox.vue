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
                            <input type="text" v-model="createPlateList[i]" :placeholder="'请输入板块' + (i + 1) + '名字'"/>
                            <span>板块{{i + 1}}</span>
                            <img src="@/imgs/fork.png" @click="deletePlate(i)" />
                        </div>
                        <img src="@/imgs/add.png" alt="添加" @click="addPlate()" class="el-add" />
                    </div>
                </div>
                <div class="el-sen">
                    划分敏感度
                    <el-switch
                    v-model="senValue">
                    </el-switch>
                </div>
                <!-- <div class="el-sen-grade" v-if="senValue">
                    所属敏感度
                    <select name="sen" @change="changeBelongSen">
                        <option selected disabled style="display: none" value="">请选择所属敏感度</option>
                        <option
                        v-for="item in senList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></option>
                    </select>
                </div> -->
                <div class="el-radar-state">
                    雷达状态
                    <el-radio-group v-model="radarState">
                        <el-radio :label="1">待发布</el-radio>
                        <el-radio :label="2">已发布</el-radio>
                        <el-radio :label="3">已停用</el-radio>
                    </el-radio-group>
                </div>
                <div class="el-display-sort">
                    展示排序
                    <input type="text" v-model="sortValue" />
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
import Radar from '../../api/radar';
export default {
    name: "radarMessageBox",
    computed: {
        ...mapState('app', ['rdxgStatusToken']),
        ...mapState('radar', ['dialogCreateRadar', 'radarList'])
    },
    data() {
        return {
            radarName: "",
            createPlateList: [],
            senValue: false,
            radarState: 0,
            sortValue: null,
            // senList: [
            //     { value: "1", label: "中间" },
            //     { value: "2", label: "外延" }
            // ]
        }
    },
    methods: {
        closeDialogCreateRadar() {
            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", false);
            this.empty();
        },
        //清空弹框数据
        empty() {
            this.radarName = "";
            this.createPlateList = "";
            this.senValue = false;
            this.radarState = 0;
            this.sortValue = "";
        },
        dialogCreateRadarTrue() {
            if(this.radarName) {
                let regexp = /^[1-9]+[0-9]*$/;
                let radar = {
                    title: this.radarName,
                    statusId: this.radarState,
                    seqIndex: this.sortValue,
                    sensitivityFlag: this.senValue,
                    blockTitles: this.createPlateList
                };
                if(this.sortValue) {
                    if(regexp.test(this.sortValue)) {
                        for(let i=0; i<this.radarList.length; i++) {
                            let itemi = this.radarList[i].seqIndex;
                            if(this.sortValue == itemi) {
                                this.$message({
                                    message: "该展示顺序已被占用",
                                    type: "warning",
                                    offset: window.innerHeight / 2
                                });
                                return;
                            }
                        }
                        Radar.buildRadar(radar);
                        location.reload();
                        this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", false);
                        this.empty();
                    } else {
                        this.$message({
                            message: "输入格式不正确",
                            type: "warning",
                            offset: window.innerHeight / 2
                        })
                    }
                } else {
                    this.$message({
                        message: "请输入展示顺序",
                        type: "warning",
                        offset: window.innerHeight / 2
                    })
                }
            } else {
                this.$message({
                    message: "请填写雷达名称",
                    type: "warning",
                    offset: window.innerHeight / 2
                })
            }
        },
        //添加板块
        addPlate() {
           this.createPlateList.push("");
        },
        //删除板块
        deletePlate(i) {
            this.createPlateList.splice(i, 1);
        },
        changeBelongSen(e) {
            console.log(e.target.value);
        }
    } 
}
</script>

<style scoped lang="less">
@import "~@/common/radar/radarMessageBox.less";
</style>