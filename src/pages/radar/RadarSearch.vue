<template>
    <div class="el-radar-condition">
        <div class="el-radarcon-name">
            <p>雷达名称</p>
            <el-input v-model.trim="radarConName" placeholder="请输入雷达名称"></el-input>
            <button @click="searchRadar">搜索</button>
        </div>
    </div>
</template>

<script>
import Radar from '../../api/radar';
import { mapState } from 'vuex';
export default {
    name: "radarSearch",
    data() {
        return {
            radarConName: "",
        }
    },
    computed: {
        ...mapState('app', ["rdxgStatusToken"])
    },
    methods: {
        //搜索雷达
        searchRadar() {
            let allTitle = { title: this.radarConName || "", token: this.rdxgStatusToken.token };    
            if(this.radarConName.trim()) {
                Radar.getRadarInforList(allTitle);
            } else {
                this.$message({
                    message: "请输入搜索名称",
                    type: "warning",
                    offset: window.innerHeight / 2
                });
                Radar.getRadarInforList(allTitle);
            }
        },
    }
}
</script>

<style scoped lang="less">
@import '~@/common/radar/radarMessage.less';
</style>