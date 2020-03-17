<template>
    <div class="el-plate-box">
        <el-dialog
            title="创建战区"
            :visible.sync="dialogPlateInfor"
            width="500px"
            :before-close="closeDialogPlateInfor">
            <div class="el-infor-list">
                <div class="el-war-name">
                    <span class="el-name">战区名称</span>
                    <input type="text" v-model="warName" class="el-name-txt" />
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
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
                            <li>
                                <p>
                                    <span>名称</span>
                                    <span>代码</span>
                                </p>
                                <img src="@/imgs/fork.png" alt="删除" class="el-shares-delete" />
                            </li>
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
                    <el-radio v-model="radio" label="1">待发布</el-radio>
                    <el-radio v-model="radio" label="2">已发布</el-radio>
                    <el-radio v-model="radio" label="3">已停用</el-radio>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createPlateInfor">创 建</el-button>
                <el-button @click="closeDialogPlateInfor">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "plateMessageBox",
    computed: {
        ...mapState("plate", ["dialogPlateInfor"])
    },
    data() {
        return {
            warName: "",
            sharesName: "",
            indexName: "",
            radio: "0",
        }
    },
    methods: {
        createPlateInfor() {
           this.$store.commit("plate/SET_DIALOG_PLATE_INFOR", false);
        },
        closeDialogPlateInfor() {
           this.$store.commit("plate/SET_DIALOG_PLATE_INFOR", false);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/plateMessageBox.less';
</style>