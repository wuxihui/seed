<template>
    <div class="el-plate-message">
        <!-- 创建战区信息 -->
        <plate-message-box></plate-message-box>

        <!-- 修改战区 -->
        <div class="el-plate-box">
            <el-dialog
                title="修改战区"
                :visible.sync="dialogModifyWarZone"
                width="500px"
                :before-close="closeDialogModifyWarZone">
                <div class="el-infor-list">
                    <div class="el-war-name">
                        <span class="el-name">战区名称</span>
                        <input type="text" v-model="warZoneName" class="el-name-txt" />
                    </div>
                    <div class="el-shares-name">
                        <span class="el-name">股票名称</span>
                        <input type="text" v-model="sharesName" class="el-name-txt" />
                        <img src="@/imgs/add.png" alt="添加" class="el-shares-add el-add" />
                    </div>
                    <div class="el-index-name">
                        <span class="el-name">指数名称</span>
                        <input type="text" v-model="indexName" class="el-name-txt" />
                        <img src="@/imgs/add.png" alt="添加" class="el-index-add el-add" />
                    </div>
                    <div class="el-shares-list">
                        <div class="el-shares-title el-name">股票列表</div>
                        <div class="el-shares-listInfor">
                            <ul>
                                <li>
                                    <p>
                                        <span>名称</span>
                                        <span>代码</span>
                                    </p>
                                    <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="el-war-state">
                        <span class="el-name el-war-title">战区状态</span>
                        <el-radio-group v-model="stateRadio" @change="changeWarZoneStateRadio">
                            <el-radio label="1">待发布</el-radio>
                            <el-radio label="2">已发布</el-radio>
                            <el-radio label="3">已停用</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="closeDialogModifyWarZone">取 消</el-button>
                    <el-button type="primary" @click="dialogModifyWarZoneTrue">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <!-- header    分割线 -->
        <div class="el-plate-head">
            <div class="el-plate-title">工具管理-战区管理</div>
            <button class="el-plate-create" @click="createInforBox">创建</button>
        </div>

        <!-- condition 筛选区   分割线 -->
        <div class="el-screen-area">
            <div class="el-war">
                <div class="el-war-name">
                    战区名称
                    <el-input type="text" v-model="warNameScreen" class="el-screenwar-txt"></el-input>
                </div>
                <button class="el-search">搜索</button>
                <div class="el-state-screen">
                    战区状态
                      <el-select v-model="warStateSelected" @change="selectedState(warStateSelected)" placeholder="请选择状态">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-date-screen">
                <div class="el-create-date">
                    <span>创建日期</span>
                    <el-date-picker
                    v-model="createStartDate"
                    type="date"
                    placeholder="选择创建日期">
                    </el-date-picker>
                    ~
                    <el-date-picker
                    v-model="createEndDate"
                    type="date"
                    placeholder="选择创建日期">
                    </el-date-picker>
                </div>
                <div class="el-modify-date">
                    <span>最近修改日期</span>
                    <el-date-picker
                    v-model="modifyStartDate"
                    type="date"
                    placeholder="选择修改日期">
                    </el-date-picker>
                    ~
                    <el-date-picker
                    v-model="modifyEndDate"
                    type="date"
                    placeholder="选择修改日期">
                    </el-date-picker>
                </div>
                <button class="el-screen-button">筛选</button>
            </div>
            <div class="el-component-list">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    >
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
                    label="战区名称"
                    align="center"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="code"
                    align="center"
                    label="战区代码">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    align="center"
                    label="状态">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="modifyWarZone(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="deleteWarZone(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import PlateMessageBox from './PlateMessageBox.vue';
export default {
    name: "plateManagement",
    components: {
        "plate-message-box": PlateMessageBox
    },
    data() {
        return {
            warNameScreen: "",
            createStartDate: "",
            createEndDate: "",
            modifyStartDate: "",
            modifyEndDate: "",
            //
            options: [{
                value: '1',
                label: '待发布'
                }, {
                value: '2',
                label: '已发布'
                }, {
                value: '3',
                label: '已停用'
                }],
            warStateSelected: '',
            //
            tableData: [{
                number: "1",
                name: '中小板',
                code: "z001",
                state: "待发布",
                radio: "1",
                }, {
                number: "2",
                name: '沪中大盘',
                code: "z002",
                state: "已发布",
                radio: "2",
                }],
            multipleSelection: [],
            //
            stateRadio: "0",
            warZoneName: "",
            indexName: "",
            sharesName: "",
            dialogModifyWarZone: false,
        }
    },
    methods: {
        createInforBox() {
            this.$store.commit("plate/SET_DIALOG_PLATE_INFOR", true);
        },
        //状态选择
        selectedState(warStateSelected) {
            console.log(warStateSelected);
        },
        //多选
         handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        //修改战区弹框
        modifyWarZone(row) {
            console.log(row);
            this.dialogModifyWarZone = true;
            //
            this.warZoneName = row.name;
            this.stateRadio = row.radio;
        },
        //删除战区
        deleteWarZone(row) {
           console.log(row);
        },
        closeDialogModifyWarZone() {
           this.dialogModifyWarZone = false;
        },
        dialogModifyWarZoneTrue() {
           this.dialogModifyWarZone = false;
        },
        changeWarZoneStateRadio(val) {
           console.log(val);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/plate/plateManagement.less';
@import '~@/common/plate/plateMessageBox.less';
</style>