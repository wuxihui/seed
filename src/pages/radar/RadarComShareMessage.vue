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
        <radar-comshares-search></radar-comshares-search>
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
        <radar-comshare-page></radar-comshare-page>
    </div>
</template>

<script>
import AddRadarShareMessageBox from './AddRadarShareMessageBox';
import RadarComSharePage from './RadarComSharePage';
import RadarComSharesSearch from './RadarComSharesSearch';
import Radar from '../../api/radar';
import { mapState } from 'vuex'
export default {
    name: "radarComShareMessage",
    components: {
        "addRadar-Share-messageBox": AddRadarShareMessageBox,
        "radar-comshare-page": RadarComSharePage,
        "radar-comshares-search": RadarComSharesSearch
    },
    computed: {
        ...mapState("radar", ["radarNameList", "radarBlocksList", "radarSenList", "currentPage"])
    },
    data() {
        return {
            dialogEditRadarMessage: false,
            editSharesName: "",
            editRadarName: "",
            editPlateName: "",
            editSenName: "",
            
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
        this.lookUpCompBlock();
    },
    methods: {
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
    }
}
</script>

<style scoped lang="less">
@import '~@/common/css/radar/radarComShareMessage.less';
</style>