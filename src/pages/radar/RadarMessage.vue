<template>
    <div class="el-radar-message">
        <!-- 创建雷达信息 -->
        <radar-message-box></radar-message-box>
        <!-- 编辑雷达 -->
        <div class="el-create-radar">
            <el-dialog
            title="编辑雷达"
            :visible.sync="dialogEditRadar"
            width="500px"
            :before-close="closeEditRadar">
            <div class="el-content">
                <div class="el-radar-name">
                    雷达名称
                    <input type="text" v-model.trim="editRadarName" />
                </div>
                <div class="el-radar-plate">
                    <p>编辑板块</p>
                    <div class="el-addplate-button">
                        <div v-for="(v, i) in editPlateList" :key="i" class="el-add-palte">
                            <input type="text" v-model.trim="editPlateList[i].title" :placeholder="'请输入板块' + (i + 1) + '名字'"/>
                            <span>板块{{i + 1}}</span>
                            <img src="@/imgs/fork.png" @click="deleteEditPlate(v, i)" />
                        </div>
                        <img src="@/imgs/add.png" alt="添加" @click="addEditPlate()" class="el-add" />
                    </div>
                </div>
                <div class="el-radar-state">
                    雷达状态
                    <el-radio-group v-model="editRadarState">
                        <el-radio :label="2">发布中</el-radio>
                        <el-radio :label="4">已上线</el-radio>
                        <el-radio :label="0">已停用</el-radio>
                    </el-radio-group>
                </div>
                <div class="el-display-sort">
                    展示排序
                    <input type="text" v-model.trim="editSortValue" />
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editRadarModify">修 改</el-button>
                <el-button @click="closeEditRadar">取 消</el-button>
            </span>
            </el-dialog>
        </div>
        <!-- 标题title -->
        <div class="el-radar-head">
            <p>雷达管理</p>
            <p @click="createRadarClick">创建</p>
        </div>
        <!-- 条件筛选区 -->
        <radar-search></radar-search>
        <!-- 列表表格区 -->
        <div class="el-result-list">
            <el-table
                :data="radarList"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                align="center"
                width="55">
                </el-table-column>
                <el-table-column
                prop="id"
                label="编号"
                align="center"
                width="80">
                </el-table-column>
                <el-table-column
                prop="title"
                label="雷达名称"
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="code"
                label="雷达代码"
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="totalStock"
                label="成分股数量"
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="blockSummary"
                label="所含板块"
                align="center"
                width="200">
                </el-table-column>
                <el-table-column
                label="是否划分敏感度"
                align="center"
                width="120">
                <template slot-scope="scope" align="center">
                   <span v-if="scope.row.sensitivityFlag">是</span>
                   <span v-else>否</span>
                </template>
                </el-table-column>
                <el-table-column
                label="创建日期"
                align="center"
                width="150">
                <template slot-scope="scope" align="center">
                   <span>{{formatTime(scope.row.createTime)}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="最近修改日期"
                align="center"
                width="150">
                <template slot-scope="scope" align="center">
                   <span>{{formatTime(scope.row.updateTime)}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="statusTitle"
                label="状态"
                align="center"
                width="80">
                </el-table-column>
                <el-table-column
                prop="seqIndex"
                align="center"
                width="80"
                label="排序">
                </el-table-column>
                <el-table-column
                label="最近运算时间"
                align="center"
                width="150">
                <template slot-scope="scope" align="center">
                   <span>{{formatOperaTime(scope.row.buildTime)}}</span>
                </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="120">
                <template slot-scope="scope" align="center">
                    <el-button @click="editRadarClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteRowRadar(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small">添加</el-button>
                    <el-button @click="openClick(scope.row)" type="text" size="small">开启</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import RadarMessageBox from './RadarMessageBox';
import RadarSearch from "./RadarSearch";
import { mapState } from 'vuex';
import Radar from '../../api/radar';
export default {
    name: "radar",
    components: {
        "radar-message-box": RadarMessageBox,
        "radar-search": RadarSearch
    },
    computed: {
        ...mapState('app', ['rdxgStatusToken']),
        ...mapState('radar', ['openRadar', 'radarList'])
    },
    data() {
        return {
            //编辑雷达区
            editRadar: {},
            remBlockIdArr: [],
            newBlockTitleArr: [],

            radarConName: "",
            radarCreateStartDate: "",
            radarCreateEndDate: "",
            radarModifyStartDate: "",
            radarModifyEndDate: "",
            
            dialogEditRadar: false,
            editRadarName: "",
            editRadarState: null,
            editSortValue: null,
            editPlateList: [],
            originPlateList: [],
            //全选
            multipleSelection: []
        }
    },
    created() {
        //雷达列表
        this.getRadarInforList();
    },
    methods: {
        //搜索雷达
        getRadarInforList() {
            let allTitle = { title: "", token: this.rdxgStatusToken.token };    
            Radar.getRadarInforList(allTitle);
        },
        createRadarClick() {
            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", true);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //格式化新建修改时间
        formatTime(time) {
            return this.formatCreateUpTime(time);
        },
        //格式化运算时间
        formatOperaTime(time) {
            return this.formatBuildTime(time);
        },
        //开启
        openClick(row) {
            if(row.statusId != 4) {
                Radar.releaseRadar(row.id);
            }
        },
         //关闭编辑雷达
        closeEditRadar() {
            this.dialogEditRadar = false;
        },
        //打开编辑雷达
        editRadarClick(row) {
            //
            Radar.eidtRadar(row.id).then(res => {
                if(res) {
                    if(res.code === 0) {
                        this.editRadar = res.data;
                        if(res.data.blocks.length > 0) {
                            this.originPlateList = this._.cloneDeep(res.data.blocks);
                        }
                        if(Object.keys(this.editRadar).length > 0) {
                            this.dialogEditRadar = true;
                            this.editRadarName = this.editRadar.title;
                            this.editPlateList = this.editRadar.blocks;
                            this.editRadarState = this.editRadar.statusId;
                            this.editSortValue = this.editRadar.seqIndex
                        }
                    }
                }
            });
        },
        //删除板块
        deleteEditPlate(v, i) {
            this.remBlockIdArr.push(v.id);
            this.editPlateList.splice(i, 1);
        },
        //修改编辑雷达
        editRadarModify() {
           let regexp = /^.{1,6}$/;
           let newBlockTitleArr = [];
        if(!this.editRadarName) {
            this.$message({
                message: "请输入板块名称",
                type: "warning",
                offset: window.innerHeight / 2
            });
            return;
        } else {
            if(!regexp.test(this.editRadarName)) {
                this.$message({
                    message: "雷达名称过长", 
                    type: "warning",
                    offset: window.innerHeight / 2
                });
                return;
            }
        }
        if(this.editPlateList.length > 0) {
            for(let i=0; i<this.editPlateList.length; i++) {
                let itemi = this.editPlateList[i];
                if(itemi.title) {
                    if(!regexp.test(itemi.title)) {
                        this.$message({
                                message: "板块名称过长",
                                type: "warning",
                                offset: window.innerHeight / 2
                        });
                        return;
                    }
                } else {
                    this.$message({
                        message: "请输入板块名称",
                        type: "warning",
                        offset: window.innerHeight / 2
                    });
                    return;
                }
            }
        } 
           if(this.originPlateList.length > 0) {
              for(let itemi of this.originPlateList) {
                for(let itemj of this.editPlateList) {
                    if(itemi.title == itemj.title) {
                        newBlockTitleArr.push(itemj.title);
                    }
                }
             }
            //
            for(let i=0, len=this.editPlateList.length; i<len; i++) {
                let itemi = this.editPlateList[i];
                if(itemi.title) {
                       if(newBlockTitleArr.indexOf(itemi.title) == -1) {
                            if(this.newBlockTitleArr.indexOf(itemi.title) == -1) {
                                this.newBlockTitleArr.push(itemi.title);
                            }
                        }
                    } 
            }
           } else if(this.originPlateList.length == 0) {
               for(let i=0; i<this.editPlateList.length; i++) {
                   let itemi = this.editPlateList[i];
                   if(itemi.title) {
                        this.newBlockTitleArr.push(itemi.title);
                   }
               }
           }
           //
            let radarParams = {
                id: this.editRadar.id,
                newBlockTitle: this.newBlockTitleArr,
                remBlockId: this.remBlockIdArr,
                remark: "",
                seqIndex: this.editSortValue,
                statusId: this.editRadarState,
                title: this.editRadarName.trim()
            }
            Radar.updateRadar(radarParams).then(res => {
                if(res) {
                    if(res.code === 0) {
                        this.$message({
                            message: res.msg,
                            type: "success",
                            offset: window.innerHeight / 2
                        });
                        this.dialogEditRadar = false;
                        //清空之前的数组
                        this.newBlockTitleArr.length = 0;
                        Radar.getRadarInforList({ title: "", token: this.rdxgStatusToken.token });
                    }
                }
            });
        },
        addEditPlate() {
            this.editPlateList.push({title: ""});
        },
        //删除雷达
        deleteRowRadar(row) {
            this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                Radar.deleteRadar(row);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    offset: window.innerHeight / 2
                });          
            });
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/radarMessage.less';
@import "~@/common/radar/radarMessageBox.less";
</style>