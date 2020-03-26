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
                    <input type="text" v-model="editRadarName" />
                </div>
                <div class="el-radar-plate">
                    <p>编辑板块</p>
                    <div class="el-addplate-button">
                        <div v-for="(v, i) in editPlateList" :key="i" class="el-add-palte">
                            <input type="text" v-model="editPlateList[i].title" :placeholder="'请输入板块' + (i + 1) + '名字'"/>
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
                    <input type="text" v-model="editSortValue" />
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
        <div class="el-radar-condition">
            <div class="el-radarcon-name">
                <p>雷达名称</p>
                <el-input v-model="radarConName" placeholder="请输入雷达名称"></el-input>
                <button @click="searchRadar">搜索</button>
            </div>
        </div>
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
import { mapState } from 'vuex';
import Radar from '../../api/radar';
export default {
    name: "radar",
    components: {
        "radar-message-box": RadarMessageBox
    },
    computed: {
        ...mapState('app', ['rdxgStatusToken']),
        ...mapState('radar', ['openRadar'])
    },
    data() {
        return {
            radarList: [],
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

            isSees: [{
            value: '1',
            label: '是'
            }, {
            value: '2',
            label: '否'
            }],
            isSeeValue: "",

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
            Radar.getRadarInforList(allTitle).then(res => {
                console.log("getRadarInforList:", res);
                if(res) {
                    if(res.code === 0) {
                        this.radarList = res.data;
                    }
                }
            });
        },
        createRadarClick() {
            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", true);
        },
        changeIsSeeValue(val) {
            console.log(val);
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
            let searchData = {
                title: "",
                token: this.rdxgStatusToken.token
            }
            console.log(4567777);
            console.log(this.radarList);
            console.log(this.openRadar);
            if(row.statusId != 4) {
                Radar.releaseRadar(row.id);
                Radar.getRadarInforList(searchData);
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
                        this.originPlateList = this. _.cloneDeep(res.data.blocks);
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
            console.log(v.id);
            console.log(i);
            this.remBlockIdArr.push(v.id);
            console.log(this.remBlockIdArr);
            this.editPlateList.splice(i, 1);
        },
        //修改编辑雷达
        editRadarModify() {
            // let itemi = {};
           console.log(this.originPlateList);
           console.log(this.editPlateList);
           let itemi = {};
           let itemj = {};
            // for(let i=0; i<this.editPlateList.length; i++) {
            //    itemi = this.editPlateList[i];
               
            //    for(let j=0; j<this.originPlateList.length; j++) {
            //         itemj = this.originPlateList[j];
                    
            //         if(itemi.title != itemj.title) {
            //             console.log(888);
                        
            //             console.log(this.editPlateList[0]);
            //             console.log(this.originPlateList[0]);
            //             console.log(itemi.title);
            //             console.log(itemj.title);
            //             return;
            //         }
            //     }
            // }
            
            var arr1 = [0,1,2,3,4,5];
            var arr2 = [0,4,6,1,3,9];
            function getArrDifference(arr1, arr2) {
                    return arr1.concat(arr2).filter(function(v, i, arr) {
                        return arr.indexOf(v) === arr.lastIndexOf(v);
                    });
                }
            console.log(getArrDifference(arr1,arr2));
            
            // if(this.editPlateList.length == this.originPlateList.length) {
            //     if(itemi.title != itemj.title) {
            //         console.log(666);
            //         console.log(this.editPlateList);
            //         console.log(itemi.title);
            //         console.log(itemj.title);
            //     }
            // } else {
            //     if(itemi.title != itemj.title) {
            //         console.log(this.editPlateList);
            //     }
            // }
            // if(itemi.title != itemj.title) {
            //     console.log(888);
            //     console.log(itemj.title);
            //     console.log(itemi.title);
            // }
            // console.log(this.originPlateList);
            
            // console.log(newBlockTitleArr);
            // console.log(itemi.title);
            // newBlockTitleArr.push(itemi.title);
            // console.log(newBlockTitleArr);
            
            let radarParams = {
                id: this.editRadar.id,
                newBlockTitle: this.newBlockTitleArr,
                remBlockId: this.remBlockIdArr,
                remark: "",
                seqIndex: this.editSortValue,
                statusId: this.editRadarState,
                title: this.editRadarName
            }
            console.log(radarParams);
            
            // Radar.updateRadar(radarParams).then(res => {
            //     if(res) {
            //         if(res.code === 0) {
            //             console.log(res);
            //         }
            //     }
            // });
            // this.dialogEditRadar = false;
        },
        addEditPlate() {
            this.editPlateList.push({title: ""});
            console.log(this.editPlateList);
        },
        //搜索雷达
        searchRadar() {
            let allTitle = { title: this.radarConName, token: this.rdxgStatusToken.token };    
            Radar.getRadarInforList(allTitle).then(res => {
                if(res) {
                    if(res.code === 0) {
                        if(res.data.length > 0) {
                            this.radarList = res.data;
                        } else if(res.data.length == 0) {
                            this.$message({
                                message: "雷达名称不存在",
                                type: "warning",
                                offset: window.innerHeight / 2
                            })
                        }
                    }
                }
            });
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