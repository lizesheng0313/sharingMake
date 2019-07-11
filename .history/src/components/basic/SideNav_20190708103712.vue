<template>
  <div class="div-nav">
    <el-menu default-active="/salary-cal" class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="/salary-cal">
        <i class="iconshouye iconfont"></i>
        <span slot="title">薪资核算</span>
      </el-menu-item>
      <el-menu-item index="/tax">
        <template slot="title">
          <i class="iconfont iconshenbao"></i>
          <span>个税申报</span>
        </template>
        <el-menu-item index="/">意向客户</el-menu-item>
        <el-menu-item index="/">签约客户</el-menu-item>
      </el-menu-item>
      <el-menu-item index="/wage">
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
