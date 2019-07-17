<template>
  <div class="div-nav">
    <el-menu
      :router="true"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item index="/salary-cal" >
        <i class="iconshouye iconfont"></i>
        <span slot="title">薪资核算</span>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="iconfont iconshenbao"></i>
          <span>个税申报</span>
        </template>
        <el-menu-item index="/tax/collect">人员信息采集</el-menu-item>
        <el-menu-item index="/tax/attach">专项附加累计</el-menu-item>
        <el-menu-item index="/tax/declare">综合所得申报</el-menu-item>
      </el-submenu>
      <el-menu-item index="/wage" default-active="2">
        <i class="iconfont iconicon-test"></i>
        <span slot="title">工资条</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    }
  }
};
</script>
<style>
</style>
