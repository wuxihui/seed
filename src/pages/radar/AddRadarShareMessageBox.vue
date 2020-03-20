<template>
    <div class="el-addcom-shares">
        <el-dialog
        title="添加成分股"
        :visible.sync="dialogAddComShares"
        width="500px"
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
                { name: "白云机场", code: "600004" },
                { name: "恒生电子", code: "600570" },
                { name: "奋达科技", code: "003681" },
                { name: "包钢股份", code: "600010" },
                { name: "雪花啤酒", code: "600251" },
                { name: "黄花机场", code: "600214" },
                { name: "芬达可乐", code: "632010" },
                { name: "哈啤哈啤", code: "600234" },
                { name: "后瑞机场", code: "600123" },
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
                { value: "1", label: "中间" },
                { value: "2", label: "外延" }
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
            }
        },
        addCompPlateMember() {
            if(this.compPlateName) {
                this.sharesList.push({ name: this.compPlateName, code: "" });
            }
        },
        searchListClick() {
            if(this.sharesNameSearch) {
                for(let i=0; i<this.sharesList.length; i++) {
                    let itemi = this.sharesList[i];
                    if(itemi.name.indexOf(this.sharesNameSearch) >= 0) {
                        // let sharesList = document.getElementById("el-sharesList").getElementsByTagName("li")[i].scrollHeight;
                        let searchList = document.querySelector(".el-list-content");
                        
                        console.log(searchList.scrollTop);
                        // searchList.scrollTop = sharesList;
                        console.log(888);
                    }
                }
            }
        },
        //列表搜索回车事件
        searchEnterClick() {
            console.log(66);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/addRadarShareMessageBox.less';
</style>