<template>
    <div class="el-radar-condition">
        <div class="el-radarcon-name">
            <p>雷达名称</p>
            <el-input 
             v-model.trim="radarConName" 
             placeholder="请输入雷达名称"
             @keyup.delete.native="deleteSearchInput"
             @keyup.enter.native="searchEnterRadar"
             ></el-input>
            <button @click="searchRadar">搜索</button>
        </div>
    </div>
</template>

<script>
import Radar from '../../api/radar';
import { mapState } from 'vuex';
export default {
    name: "radarMessageSearch",
    data() {
        return {
            radarConName: "",
        }
    },
    computed: {
        ...mapState('app', ["rdxgStatusToken"]),
    },
    methods: {
        //搜索雷达
        searchRadar() {
            let allTitle = { title: this.radarConName || "", token: this.rdxgStatusToken.token };    
            if(this.radarConName.trim()) {
                Radar.getRadarInforList(allTitle);
            } else {
                this.message("请输入搜索名称", "warning");
            }
        },
        deleteSearchInput() {
            Radar.getRadarInforList({ title: this.radarConName || "", token: this.rdxgStatusToken.token });
        },
        searchEnterRadar(e) {
            if (e.code == "Enter") {
                this.searchRadar();
            }
    },
    }
}
</script>

<style scoped lang="less">
@import '~@/common/css/radar/radarMessage.less';
</style>