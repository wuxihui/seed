<template>
    <div class="el-custom-manage">
        <!-- 创建板块 -->
        <custom-manage-box></custom-manage-box>
        <!-- 编辑板块 -->
        <div class="el-cusmange-box">
            <el-dialog
                title="创建板块"
                :visible.sync="dialogEditCustomPlate"
                width="500px"
                :before-close="closeEditCustomPlate">
                <div class="el-custom-list">
                    <div class="el-cusplate-name">
                        板块名称
                        <input type="text" v-model="editPlateName" class="el-custom-plate"/>
                    </div>
                    <div class="el-cusplate-shares">
                        股票名称
                        <input type="text" v-model="editSharesName" class="el-plate-shares"/>
                        <img src="@/imgs/add.png" alt="添加" />
                    </div>
                    <div class="el-cusplate-exist">
                        已有板块名称
                        <input type="text" v-model="editExistName" class="el-plate-exist"/>
                        <img src="@/imgs/add.png" alt="添加" />
                    </div>
                    <div class="el-cusplate-list">
                        股票列表
                        <div class="el-plate-list">
                            <ul>
                                <li>
                                    <p>
                                        <span>名称</span>
                                        <span>代码</span>
                                    </p>
                                    <img src="@/imgs/fork.png" alt="删除" class="el-custom-delete" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="el-cusplate-state">
                        <span>板块状态</span>
                        <el-radio-group v-model="editPlateState" @change="changeEditPlateState">
                            <el-radio label="1">待发布</el-radio>
                            <el-radio label="2">已发布</el-radio>
                            <el-radio label="3">已停用</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editCustomPlateTrue">确 定</el-button>
                    <el-button @click="closeEditCustomPlate">取 消</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 标题title -->
        <div class="el-custom-head">
            <div class="el-custom-title">工具管理-自定义板块管理</div>
            <button class="el-custom-buttom" @click="createCustomPlate">创建</button>
        </div>
        <!-- 条件筛选区 -->
        <div class="el-custom-screen">
            <div class="el-namestate-screen">
                <div class="el-plate-name">
                    <p>板块名称</p>
                    <el-input v-model="plateName" placeholder="请输入板块名称"></el-input>
                </div>
                <button class="el-search-name">搜索</button>
                <div class="el-platestate-screen">
                    板块状态
                    <el-select v-model="plateStateRadio" placeholder="请选择板块状态" class="el-state-selected">
                        <el-option
                        v-for="item in plateStateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="el-custom-date">
                <div class="el-cuscreate-date">
                    <span>创建日期</span>
                    <el-date-picker
                    v-model="createStateDate"
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
                <div class="el-cusmodify-date">
                    <span>最近修改日期</span>
                    <el-date-picker
                    v-model="modifyStateDate"
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

            <div class="el-custom-list">
                <el-table
                    :data="tableData"
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
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
                    label="板块名称"
                    align="center"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="code"
                    label="板块代码"
                    align="center"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="板块代码"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="customPlateModify(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="customPlateDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import CustomManageBox from './CustomManageBox.vue';
export default {
    name: "customSectionManage",
    components: {
        'custom-manage-box': CustomManageBox
    },
    data() {
        return {
            plateName: "",
            dialogEditCustomPlate: false,
            editSharesName: "",
            editPlateName: "",
            editExistName: "",
            editPlateState: "",

            plateStateList: [{
            value: '1',
            label: '待发布'
            }, {
            value: '2',
            label: '已发布'
            }, {
            value: '3',
            label: '已停用'
            }],
            plateStateRadio: "",

            createStateDate: "",
            createEndDate: "",
            modifyStateDate: "",
            modifyEndDate: "",

            tableData: [{
            number: 1,
            name: '自定义板块1',
            code: 'B001',
            stateCode: "2",
            state: "已发布"
            }, {
            number: 2,
            name: '自定义板块2',
            code: 'B001',
            stateCode: "3",
            state: "已停用"
            }],
            multipleSelection: []
        }
    },
    methods: {
        //创建板块
        createCustomPlate() {
            this.$store.commit("custom/SET_DIALOG_CREATE_PLATE", true);
        },
        //选择板块状态
        changePlateStateRadio(val) {
            console.log(val);
        },
        //修改
        customPlateModify(row) {
            console.log(row);
            this.dialogEditCustomPlate = true;
            //
            this.editPlateName = row.name;
            this.editPlateState = row.stateCode;
        },
        //删除
        customPlateDelete(row) {
            console.log(row);
        },
        //全选
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        closeEditCustomPlate() {
            this.dialogEditCustomPlate = false;
        },
        editCustomPlateTrue() {
            this.dialogEditCustomPlate = false;
        },
        //编辑板块状态
        changeEditPlateState(val) {
            console.log(val);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/customPlate/customSectionManage.less';
@import '~@/common/customPlate/customManageBox.less';
</style>