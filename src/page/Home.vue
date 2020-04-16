<template>
    <div class="home">
        <div class="home-left">
            <div class="drop-down-left">
                <el-select v-model="valueLeft" placeholder="请选择" @change="changeLeftVal">
                    <el-option
                    v-for="(item) in dropSelectedArr"
                    :key="item.url"
                    :label="item.api_name"
                    :value="item.url">
                    </el-option>
                </el-select>
            </div>
            <div class="param-left">
                <div class="param-left-result">
                    <ul>
                        <li 
                           v-for="(item, i) in leftParams"
                           :key="item.url"
                        >
                        <p class="param-left-name">{{item}}</p>
                        <p>
                            <el-input
                                type="textarea"
                                class="param-left-content"
                                autosize
                                placeholder="请输入内容"
                                v-model.trim="valueLeftList[i]"
                            >
                            </el-input>
                        </p>
                        </li>
                    </ul>
                </div>
                <div class="btn-left">
                    <el-button type="primary" @click="leftGoClick">GO</el-button>
                </div>
            </div>
            <div class="result-left">
                <ul>
                    <li 
                      v-for="(item, index) in resultLeftArr"
                      :key="(index + 1)"
                      >
                      <p>{{item}}</p>
                      </li>
                </ul>
            </div>
        </div>
        <div class="home-right home-left">
            <div class="drop-down-left drop-down-right">
                <el-select v-model="valueRight" placeholder="请选择" @change="changeRightVal">
                    <el-option
                    v-for="item in dropSelectedArr"
                    :key="item.url"
                    :label="item.api_name"
                    :value="item.url">
                    </el-option>
                </el-select>
            </div>
            <div class="param-left param-right">
                <div class="param-left-result">
                    <ul>
                        <li 
                           v-for="(item, i) in rightParams"
                           :key="item.url"
                        >
                        <p class="param-left-name">{{item}}</p>
                        <p>
                            <el-input
                                type="textarea"
                                class="param-left-content"
                                autosize
                                placeholder="请输入内容"
                                v-model.trim="valueRightList[i]"
                            >
                            </el-input>
                        </p>
                        </li>
                    </ul>
                </div>
                <div class="btn-left btn-right">
                    <el-button type="primary" @click="rightGoClick">GO</el-button>
                </div>
            </div>
            <div class="result-left result-right">
                <ul>
                    <li 
                    v-for="(item, index) in resultRightArr"
                    :key="(index + 1)"
                    >
                    <p>{{item}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Seed from "../api/seed";
import { mapState } from 'vuex';
export default {
    name: "Home",
    computed: {
        ...mapState("home", ["dropSelectedArr", "params", "resultLeftArr", "resultRightArr"])
    },
    data() {
        return {
            valueLeftList: [],
            valueRightList: [],
            //
            valueLeft: "",
            valueRight: "",
            leftValue: "",
            rightValue: "",
            //
            leftParams: [],
            rightParams: [],
        }
    },
    created() {
        Seed.seedDropSelected();
    },
    methods: {
        changeLeftVal(Val) {
            this.leftValue = Val;
            for(let i=0; i<this.dropSelectedArr.length; i++) {
                let itemi = this.dropSelectedArr[i];
                if(Val == itemi.url) {
                    this.leftParams = itemi.params;
                }
            }
            this.valueLeftList.length = this.leftParams.length;
        },
        changeRightVal(Val) {
            this.rightValue = Val;
            for(let i=0; i<this.dropSelectedArr.length; i++) {
                let itemi = this.dropSelectedArr[i];
                if(Val == itemi.url) {
                    this.rightParams = itemi.params;
                }
            }
            this.valueRightList.length = this.rightParams.length;
        },
        leftGoClick() {
            console.log(this.valueLeftList);
            let params = {};
            for(let i=0; i<this.params.length; i++) {
                let itemi = this.params[i];
                params[itemi] = this.valueLeftList[i];
            }
            Seed.seedSelectedLeftResult(this.leftValue, params);
        },
        rightGoClick() {
            console.log(this.valueRightList);
            let params = {};
            for(let i=0; i<this.params.length; i++) {
                let itemi = this.params[i];
                params[itemi] = this.valueRightList[i];
            }
            Seed.seedSelectedRightResult(this.rightValue, params);
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/common/css/Home.less";
</style>