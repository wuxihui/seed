<template>
    <div class="el-addcom-shares">
        <el-dialog
        title="添加成分股"
        :visible.sync="dialogAddComShares"
        width="600px"
        :before-close="closeAddComShares">
        <div class="el-comshares-content">
            <div class="el-belong-radar">
                所属雷达
                <select name="radar" @change="changeBelongRadar">
                    <option value="" selected disabled class="selected" style="display: none">请选择所属雷达</option>
                    <option 
                    v-for="item in radars"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </option>
                </select>
            </div>
            <div class="el-belong-plate">
                所属板块
                <select name="plate" @change="changeBelongPlate">
                    <option value="" selected disabled style="display: none">请选择所属板块</option>
                    <option
                    v-for="item in plates"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></option>
                </select>
            </div>
            <div class="el-belong-sen">
                所属敏感度
                <select name="sen" @change="changeBelongSen">
                    <option selected disabled style="display: none" value="">请选择所属敏感度</option>
                    <option
                    v-for="item in sens"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></option>
                </select>
            </div>
            <div class="el-compradar-name">
                股票名称
                <input type="text" v-model="compRadarName" />
                <img src="@/imgs/add.png" @click="addCompRadarMember" />
            </div>
            <div class="el-compplate-name">
                板块名称
                <input type="text" v-model="compPlateName" />
                <img src="@/imgs/add.png" @click="addCompPlateMember" />
            </div>
            <div class="el-compshare-list">
                股票列表
                <div class="el-list-content">
                    <ul id="el-sharesList">
                        <li v-for="(item, index) in sharesList" :key="index">
                            <span>{{item.name}}</span>
                            <span>{{item.code}}</span>
                            <img src="@/imgs/fork.png" @click="deleteListMember(index)" />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="el-sharelist-search">
                股票列表搜索
                <input type="text" v-model.trim="sharesNameSearch" @keyup.enter="searchEnterClick" />
                <img src="@/imgs/fdj.png" @click="searchListClick" />
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addComSharesTrue">确 定</el-button>
            <el-button @click="closeAddComShares">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "AddRadarShareMessageBox",
    computed: {
        ...mapState('radar', ['dialogAddComShares'])
    },
    data() {
        return {
            compRadarName: "",
            compPlateName: "",
            sharesNameSearch: "",
            sharesList: [
                { name: "贵州茅台", code: "600519" },
                { name: "青岛啤酒", code: "600600" },
                { name: "恒生电子", code: "600570" },
                { name: "奋达科技", code: "003681" },
                { name: "包钢股份", code: "600010" },
                { name: "雪花啤酒", code: "600251" },
                { name: "芬达可乐", code: "632010" },
                { name: "哈啤哈啤", code: "600234" },
                { name: "坂田地铁", code: "600126" },
                { name: "五一广场", code: "600121" },
                { name: "八一广场", code: "600135" },
                { name: "后瑞机场", code: "600123" },
                { name: "宝安机场", code: "600124" },
                { name: "白云机场", code: "600004" },
                { name: "黄花机场", code: "600214" },
                { name: "宝安中心", code: "600136" },
                { name: "前海湾站", code: "600137" },
            ],

            radars: [
                { value: "1", label: "金融开放全球化" },
                { value: "2", label: "外来的和尚会念经" }
            ],
            plates: [
                { value: "1", label: "基建" },
                { value: "2", label: "深港通" }
            ],
            sens: [
                { value: "1", label: "外延" },
                { value: "2", label: "中间" }
            ]
        }
    },
    methods: {
        closeAddComShares() {
            this.$store.commit("radar/SET_DIALOG_ADD_COM_SHARES", false);
        },
        addComSharesTrue() {
            this.$store.commit("radar/SET_DIALOG_ADD_COM_SHARES", false);
        },
        changeBelongRadar(e) {
            console.log(e.target.value);
        },
        changeBelongPlate(e) {
            console.log(e.target.value);
        },
        changeBelongSen(e) {
            console.log(e.target.value);
        },
        deleteListMember(i) {
            this.sharesList.splice(i, 1);
        },
        addCompRadarMember() {
            if(this.compRadarName) {
                this.sharesList.push({ name: this.compRadarName, code: "" });
            } else {
                this.message("请输入股票名称", "warning");
            }
        },
        addCompPlateMember() {
            if(this.compPlateName) {
                this.sharesList.push({ name: this.compPlateName, code: "" });
            } else {
                this.message("请输入板块名称", "warning");
            }
        },
        //搜索字符
        searchListClick() {
            if(this.sharesNameSearch) {
                let itemi = "";
                for(let i=0; i<this.sharesList.length; i++) {
                    itemi = this.sharesList[i];
                    if(itemi.name.indexOf(this.sharesNameSearch) != -1) {
                        let sharesList = document.getElementById("el-sharesList").getElementsByTagName("li")[i];
                        let sharesListOne = document.getElementById("el-sharesList").getElementsByTagName("li")[0];
                        let searchList = document.querySelector(".el-list-content");
                        let height = sharesListOne.offsetTop + sharesList.scrollHeight + sharesList.offsetHeight + sharesList.clientHeight + 10;
                        searchList.scrollTop = sharesList.offsetTop - height;
                        return;
                    } 
                }
                if(itemi.name.indexOf(this.sharesNameSearch) == -1) {
                    this.message("搜索内容不存在", "warning");
                }
            } else {
                this.message("请输入搜索内容", "warning");
            }
        },
        //列表搜索键盘回车事件
        searchEnterClick() {
            this.searchListClick();
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/css/radar/addRadarShareMessageBox.less';
</style>