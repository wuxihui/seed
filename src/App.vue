<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
#app {
  height: 94%;
}
</style>

<script>
import { mapState } from 'vuex';
export default {
  name: "app",
  computed: {
    ...mapState('app', ['rdxgStatusToken'])
  },
  created() {
    let rdxgStatus = JSON.parse(localStorage.getItem("rdxgStatus") || '{}');
    this.$store.commit("app/SET_RDXG_STATUS_TOKEN", rdxgStatus);
  }
}
</script>