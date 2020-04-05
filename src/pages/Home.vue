<template>
  <div class="el-home">
    <el-row style="height: 100%;">
      <el-col :span="3" style="min-height: 100;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-submenu index="1">
            <template slot="title">板块战区</template>
            <el-menu-item index="plateManagement">战区列表</el-menu-item>
            <el-menu-item index="warZoneComponent">战区成分股</el-menu-item>
            <el-menu-item index="plateList">板块列表</el-menu-item>
            <el-menu-item index="plateComponent">板块成分股</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">雷达管理</template>
            <el-menu-item index="radarMessage">雷达列表</el-menu-item>
            <el-menu-item index="radarComShareMessage">成分股管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">指标算法</template>
            <el-menu-item index="operaTionLog">运行日志</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">系统管理</template>
            <el-menu-item index="cacheMessage">缓存管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/common/css/home.less";
</style>