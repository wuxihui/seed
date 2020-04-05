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
                    <input type="text" v-model.trim="radarName" />
                </div>
                <div class="el-radar-plate">
                    <p>创建板块</p>
                    <div class="el-addplate-button">
                        <div v-for="(v, i) in createPlateList" :key="i" class="el-add-palte">
                            <input type="text" v-model.trim="createPlateList[i]" :placeholder="'请输入板块' + (i + 1) + '名字'"/>
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
                <div class="el-radar-state">
                    雷达状态
                    <el-radio-group v-model="radarState">
                        <el-radio :label="2">发布中</el-radio>
                        <el-radio :label="4">已上线</el-radio>
                        <el-radio :label="0">已停用</el-radio>
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
            radarState: 2,
            sortValue: 100
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
        },
        //
        buildRadar() {
            let searchData = {
                title: "",
                token: this.rdxgStatusToken.token
            };
            let regexp = /^[1-9]+[0-9]*$/;
            let radar = {
                title: this.radarName.trim(),
                statusId: this.radarState,
                seqIndex: this.sortValue,
                sensitivityFlag: this.senValue,
                blockTitles: this.createPlateList
            };
            if(regexp.test(this.sortValue)) {
                for(let i=0; i<this.radarList.length; i++) {
                    let itemi = this.radarList[i].seqIndex;
                    if(this.sortValue == itemi) {
                        this.message("该展示顺序已被占用", "warning");
                        return;
                    }
                }
                Radar.buildRadar(radar).then(res => {
                    if(res) {
                        if(res.code === 0) {
                            this.message(res.msg, "success");
                            this.empty();
                            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", false);
                            Radar.getRadarInforList(searchData);
                        }
                    }
                });
            } 
        },
        //
        dialogCreateRadarTrue() {
            
            if(this.radarName) {
                if(this.createPlateList.length > 0) {
                    let itemi = "";
                    for(let i=0; i<this.createPlateList.length; i++) {
                        itemi = this.createPlateList[i];
                        if(!itemi) {
                            this.message("请填写板块名称", "warning");
                        } 
                    }
                    if(itemi) {
                        this.buildRadar();
                    }
                } else if(this.createPlateList.length == 0) {
                    if(this.sortValue) {
                        this.buildRadar();
                    } else {
                        this.message("输入格式不正确", "warning");
                    }
                }
            } else {
                this.message("请填写雷达名称", "warning");
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
@import "~@/common/css/radar/radarMessageBox.less";
</style>