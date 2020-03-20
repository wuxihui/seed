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
            <p>工具管理-雷达管理</p>
            <p @click="createRadarClick">创建</p>
        </div>
        <!-- 条件筛选区 -->
        <div class="el-radar-condition">
            <div class="el-radarcon-name">
                <p>雷达名称</p>
                <el-input v-model="radarConName" placeholder="请输入雷达名称"></el-input>
                <button>搜索</button>
            </div>
            <div class="el-radar-date">
                <div class="el-radarcre-date">
                    <span>创建日期</span>
                    <el-date-picker
                    v-model="radarCreateStartDate"
                    type="date"
                    placeholder="请选择创建日期">
                    </el-date-picker>
                    ~
                    <el-date-picker
                    v-model="radarCreateEndDate"
                    type="date"
                    placeholder="请选择创建日期">
                    </el-date-picker>
                </div>
                <div class="el-radarmod-date">
                    <span>最近修改日期</span>
                    <el-date-picker
                    v-model="radarModifyStartDate"
                    type="date"
                    placeholder="请选择创建日期">
                    </el-date-picker>
                    ~
                    <el-date-picker
                    v-model="radarModifyEndDate"
                    type="date"
                    placeholder="请选择创建日期">
                    </el-date-picker>
                </div>
                <div class="el-visible">
                    <span>是否可见</span>
                    <el-select v-model="isSeeValue" placeholder="请选择" @change="changeIsSeeValue">
                        <el-option
                        v-for="item in isSees"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <button class="el-radarscr-button">筛选</button>
            </div>
        </div>
        <!-- 列表表格区 -->
        <div class="el-result-list">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                align="center"
                width="55">
                </el-table-column>
                <el-table-column
                prop="number"
                label="编号"
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="雷达名称"
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="code"
                label="雷达代码"
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="comNumber"
                label="成分股数量"
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="havePlate"
                label="所含板块"
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="sort"
                align="center"
                label="排序">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="120">
                <template slot-scope="scope" align="center">
                    <el-button @click="editRadarClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
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
export default {
    name: "radar",
    components: {
        "radar-message-box": RadarMessageBox
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
            editRadarState: "",
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

            tableData: [{
            number: 1,
            name: '青山绿水保护中',
            code: 'L001',
            comNumber: 50,
            havePlate: "钢铁、水泥",
            state: "待发布",
            stateCode: 1,
            sort: 1,
            sen: "是",
            senBoolen: true,
            }, {
            number: 2,
            name: '金融开放全球化',
            code: 'L002',
            comNumber: 60,
            havePlate: "基建、海洋",
            state: "已发布",
            stateCode: 2,
            sort: 2,
            sen: "否",
            senBoolen: true,
            }],
            multipleSelection: []
        }
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
            this.editRadarName = row.name;
            this.editPlateList = row.havePlate.split("、");
            this.editSortValue = row.sort;
            this.editRadarState = row.stateCode;
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
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/radarMessage.less';
@import "~@/common/radar/radarMessageBox.less";
</style>