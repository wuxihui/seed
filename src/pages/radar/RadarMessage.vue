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
                            <input type="text" v-model="editPlateList[i]" :placeholder="'请输入板块' + (i + 1) + '名字'"/>
                            <span>板块{{i + 1}}</span>
                            <img src="@/imgs/fork.png" @click="deleteEditPlate(i)" />
                        </div>
                        <img src="@/imgs/add.png" alt="添加" @click="addEditPlate()" class="el-add" />
                    </div>
                </div>
                <div class="el-radar-state">
                    雷达状态
                    <el-radio-group v-model="editRadarState">
                        <el-radio :label="1">待发布</el-radio>
                        <el-radio :label="2">已发布</el-radio>
                        <el-radio :label="3">已停用</el-radio>
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
                prop="buildTime"
                label="创建日期"
                align="center"
                width="150">
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="最近修改日期"
                align="center"
                width="150">
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
                prop="buildTime"
                align="center"
                label="最近运算时间">
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
                    <el-button type="text" size="small">开启</el-button>
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
        ...mapState('radar', ['radarList', "radarTotal"])
    },
    data() {
        return {
            radarConName: "",
            radarCreateStartDate: "",
            radarCreateEndDate: "",
            radarModifyStartDate: "",
            radarModifyEndDate: "",
            
            dialogEditRadar: false,
            editRadarName: "",
            editRadarState: null,
            editSortValue: "",
            editPlateList: [],

            isSees: [{
            value: '1',
            label: '是'
            }, {
            value: '2',
            label: '否'
            }],
            isSeeValue: "",

            multipleSelection: [],

            pageIndex: 1,
            pageSize: 10
        }
    },
    created() {
        let allTitle = { title: "", token: this.rdxgStatusToken.token };    
        Radar.getRadarInforList(allTitle);
    },
    methods: {
        createRadarClick() {
            this.$store.commit("radar/SET_DIALOG_CREATE_RADAR", true);
        },
        changeIsSeeValue(val) {
            console.log(val);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //编辑雷达打开
        editRadarClick(row) {
            console.log(row);
            this.dialogEditRadar = true;
            //
            this.editRadarName = row.title;
            // this.editPlateList = row.blockSummary;
            this.editSortValue = row.seqIndex;
            if(row.statusTitle == "默认") {
                this.editRadarState = 3;
            }
            if(row.statusTitle == "发布中") {
                this.editRadarState = 1;
            }
            if(row.statusTitle == "已上线") {
                this.editRadarState = 2;
            }
            // this.editRadarState = row.seqIndex;
        },
        //关闭编辑雷达
        closeEditRadar() {
            this.dialogEditRadar = false;
        },
        //确认修改编辑雷达
        editRadarModify() {
            this.dialogEditRadar = false;
        },
        deleteEditPlate(i) {
            this.editPlateList.splice(i, 1);
        },
        addEditPlate() {
            this.editPlateList.push("");
        },
        //搜索雷达
        searchRadar() {
            let allTitle = { title: this.radarConName, token: this.rdxgStatusToken.token };    
            Radar.getRadarInforList(allTitle);
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