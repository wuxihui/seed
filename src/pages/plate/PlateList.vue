<template>
    <div class="el-plate-list">
        <button @click="handleClick">消息提示</button>
        <button @click="handleTimeClick">获取后台时间格式</button>
        <p>{{formatTime(time)}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "plateList",
    computed: {
        ...mapState("radar", ["time"])
    },
    methods: {
        handleClick() {
            // this.commonJS.message("傻逼", "success");
            this.$store.commit("radar/SET_COMMON_INFO", "");
        },
        handleTimeClick() {
            let time = "2018-01-03T02:01:13.678Z";
            this.$store.commit("radar/SET_TIME", time);
        },
        //时区修正
        formatTime(time) {
          return this.commonJS.formatBuildTime(time);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/common/css/plate/plateList.less';
</style>