<template>
    <div class="el-radarcom-message">
        <!-- 添加成分股 -->
        <addRadar-Share-messageBox></addRadar-Share-messageBox>
        <!-- 编辑雷达 -->
        <el-dialog
        title="编辑成分股"
        :visible.sync="dialogEditRadarMessage"
        width="400px"
        :before-close="closeEditRadarMessage">
        <div class="el-edit-content">
            <div class="el-edit-name">
                股票名称
                <input type="text" v-model="editSharesName" />
            </div>
            <div class="el-edit-radar">
                所属雷达
                <select name="editRadar" @change="changeEditRadar">
                    <option value="" selected disabled style="display: none">{{editRadarName}}</option>
                    <option 
                        v-for="item in radarNameList" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </option>
                </select>
            </div>
            <div class="el-eidt-plate">
                所属板块
                <select name="editPlate" @change="changeEditPlate">
                    <option value="" selected disabled style="display: none">{{editPlateName}}</option>
                    <option 
                        v-for="item in radarBlocksList" 
                        :key="item.value" 
                        :label="item.label"
                        :value="item.value"
                    >
                    </option>
                </select>
            </div>
            <div class="el-edit-sen">
                所属敏感度
                <select name="eidtSen" @change="changeEditSen">
                    <option value="" selected disabled style="display: none">{{editSenName}}</option>
                    <option 
                        v-for="item in radarSenList" 
                        :key="item.value" 
                        :value="item.vaule" 
                        :label="item.label"
                    >
                    </option>
                </select>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeEditRadarMessage">取 消</el-button>
            <el-button type="primary" @click="editRadarMessageTrue">确 定</el-button>
        </span>
        </el-dialog>
        <!-- title标题 -->
        <div class="el-radarcom-head">
            <p>雷达成分股管理</p>
            <button @click="addComShares">添加</button>
        </div>
        <!-- 搜索条件筛选区 -->
        <div class="el-condition-screen">
            <div class="el-name-search">
                <p>股票名称</p>
                <el-input v-model="searchShearsName" placeholder="请输入股票名称"></el-input>
                <button>搜索</button>
            </div>
            <div class="el-more-search">
                <div class="el-radar">
                    雷达
                    <el-select v-model="radarSearch" placeholder="请选择雷达" @change="selectRadarName">
                        <el-option
                        v-for="item in radarNameList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="el-plate">
                    板块
                    <el-select v-model="plateSearch" placeholder="请选择板块" @change="selectBlocksClick">
                        <el-option
                        v-for="item in radarBlocksList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="el-sendeg">
                    敏感度
                    <el-select v-model="senSearch" placeholder="请选择敏感度" @change="selectSenClick">
                        <el-option
                        v-for="item in radarSenList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <button @click="screenClick">筛选</button>
            </div>
        </div>
        <!-- 列表展示区 -->
        <div class="el-compradar-list">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="股票名称"
            align="center"
            width="180">
            </el-table-column>
            <el-table-column
            prop="radar"
            label="所属雷达"
            align="center"
            width="180">
            </el-table-column>
            <el-table-column
            prop="plate"
            align="center"
            label="所属板块">
            </el-table-column>
            <el-table-column
            prop="sen"
            align="center"
            label="所属敏感度">
            </el-table-column>
            <el-table-column
            prop="industry"
            align="center"
            label="所属行业">
            </el-table-column>
            <el-table-column
            prop="concept"
            align="center"
            label="所属概念">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
                <el-button @click="deleteRadar(scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="editRadar(scope.row)" type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页器 -->
        <div class="el-compage">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            background
            :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import AddRadarShareMessageBox from './AddRadarShareMessageBox';
import Radar from '../../api/radar';
import { mapState } from 'vuex'
export default {
    name: "radarComShareMessage",
    components: {
        "addRadar-Share-messageBox": AddRadarShareMessageBox
    },
    computed: {
        ...mapState("radar", ["radarNameList", "radarBlocksList", "radarSenList"])
    },
    data() {
        return {
            searchShearsName: "",
            dialogEditRadarMessage: false,
            editSharesName: "",
            editRadarName: "",
            editPlateName: "",
            editSenName: "",

            currentPage: 1,
            pageSize: 10,

            //
            radarId: null,
            blockId: null,
            senId: null,

            radarSearch: "",
            plateSearch: "",
            senSearch: "",
            
            //
            tableData: [{
            radar: '金融开放全球化',
            name: '宝钢股份',
            plate: '基建',
            sen: '中间',
            industry: '钢铁',
            concept: "一带一路"
            }, {
            radar: '外来的和尚会念经',
            name: '包钢股份',
            plate: '深港通',
            sen: '外延',
            industry: '棉花',
            concept: "一带两路"
            }]
        }
    },
    created() {
        this.radarDropDown();
        this.lookUpCompBlock();
    },
    methods: {
        //雷达下拉选择
        radarDropDown() {
            Radar.radarDropDown();
        },
        //成分股
        lookUpCompBlock() {
            let block = {
                pageIndex: this.currentPage,
                pageSize: this.pageSize,
            }
            Radar.lookUpCompBlock(block);
        },
        addComShares() {
            this.$store.commit("radar/SET_DIALOG_ADD_COM_SHARES", true);
        },
        deleteRadar(row) {
            console.log(row);
        },
        editRadar(row) {
            console.log(row);
            this.dialogEditRadarMessage = true;
            //
            this.editSharesName = row.name;
            this.editRadarName = row.radar;
            this.editPlateName = row.plate;
            this.editSenName = row.sen;
        },
        closeEditRadarMessage() {
            this.dialogEditRadarMessage = false;
        },
        editRadarMessageTrue() {
            this.dialogEditRadarMessage = false;
        },
        changeEditRadar(e) {
            console.log(e.target.value);
        },
        changeEditPlate(e) {
            console.log(e.target.value);
        },
        changeEditSen(e) {
            console.log(e.target.value);
        },
        //选择雷达
        selectRadarName(val) {
           console.log("雷达id", val);
           this.radarId = val;
           Radar.radarLinkDropDown(val);
        },
        //选择板块
        selectBlocksClick(val) {
            this.blockId = val;
        },
        //选择敏感度
        selectSenClick(val) {
            this.senId = val;
        },
        //筛选、雷达、板块敏感度
        screenClick() {
           if(this.radarId) {
               console.log("搜索");
           } else {
               this.$message({
                   message: "请输入搜索雷达",
                   type: "warning",
                   offset: window.innerHeight / 2
               })
           }
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/radarComShareMessage.less';
</style>