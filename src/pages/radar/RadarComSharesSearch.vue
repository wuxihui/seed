<template>
    <div class="el-condition-screen">
        <div class="el-name-search">
            <p>股票名称</p>
            <el-input v-model="searchShearsName" placeholder="请输入股票名称"></el-input>
            <button @click="searchSharesName">搜索</button>
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
</template>

<script>
import Radar from "../../api/radar";
export default {
    name: "radarComSharesSearch",
    data() {
        return {
            radarNameList: [],
            radarBlocksList: [],
            radarSenList: [],
            //
            searchShearsName: "",
            plateSearch: "",
            senSearch: "",
            radarSearch: "",
            //
            radarId: null,
            blockId: null,
            senId: null,
        }
    },
    created() {
        this.radarDropDown();
    },
    methods: {
        //雷达下拉选择
        radarDropDown() {
            Radar.radarDropDown().then(res => {
                if(res) {
                    if(res.code === 0) {
                         let radarNameList = [];
                    for(let i=0; i<res.data.length; i++) {
                        let itemi = res.data[i];
                        radarNameList.push({ title: itemi.title, id: itemi.id });
                    }
                    this.radarNameList = radarNameList;
                    }
                }
            })
        },
        //搜索股票名称
        searchSharesName() {
            if(this.searchShearsName) {
                console.log("成功");
            } else {
                this.$message({
                    message: "请输入股票名称",
                    type: "warning",
                    offset: window.innerHeight / 2
                })
            }
        },
         //选择雷达
        selectRadarName(val) {
           console.log("雷达id", val);
           this.radarId = val;
           Radar.radarLinkDropDown(val).then(res => {
               if(res) {
                   if(res.code === 0) {
                        let radarBlocksList = [];
                        let radarSenList = [];
                        if(res.data.blocks) {
                            if(res.data.blocks.length > 0) {
                                for(let i=0; i<res.data.blocks.length; i++) {
                                    let itemi = res.data.blocks[i];
                                    radarBlocksList.push({ id: itemi.id, title: itemi.title });
                                }
                            }
                        }
                        if(res.data.sensitivities) {
                            if(res.data.sensitivities.length > 0) {
                                for(let i=0; i<res.data.sensitivities.length; i++) {
                                    let itemi = res.data.sensitivities[i];
                                    radarSenList.push({ id: itemi.id, title: itemi.title });
                                }
                            }
                        }
                        //
                        this.radarSenList = radarSenList;
                        this.radarBlocksList = radarBlocksList;
                   }
               }
           });
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
                   message: "请选择雷达名称",
                   type: "warning",
                   offset: window.innerHeight / 2
               })
           }
        },
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/radarComShareMessage.less';
</style>