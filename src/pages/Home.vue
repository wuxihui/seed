<template>
  <div class="el-home">
    <el-row style="height: 100%;">
      <el-col :span="3" style="min-height: 100;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="system">系统管理</el-menu-item>
          <!-- <el-menu-item index="resources">资源管理</el-menu-item>
          <el-menu-item index="teach">教学管理</el-menu-item>
          <el-menu-item index="content">内容管理</el-menu-item>
          <el-menu-item index="approval">审批管理</el-menu-item>
          <el-menu-item index="propaganda">宣传管理</el-menu-item>
          <el-menu-item index="operate">运营管理</el-menu-item>
          <el-menu-item index="column">栏目管理</el-menu-item>
          <el-menu-item index="interface">接口管理</el-menu-item>
          <el-menu-item index="liveBroadcast">直播管理</el-menu-item> -->
          <el-submenu index="2">
            <template slot="title">工具管理</template>
            <el-menu-item index="PlateManagement">战区管理</el-menu-item>
            <el-menu-item index="CustomSectionManage">自定义板块管理</el-menu-item>
            <el-menu-item index="RadarMessage">雷达管理</el-menu-item>
            <el-menu-item index="radarComponent">雷达成分股管理</el-menu-item>
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
@import "~@/common/home.less";
</style>