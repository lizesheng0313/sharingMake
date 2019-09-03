<template>
  <div class="div-nav">
    <el-menu class="el-menu-vertical-demo" @select="handleSelect">
      <el-submenu index="/">
        <template slot="title">
          <i class="iconfont iconshouye"></i>
          <span>薪资核算</span>
        </template>
        <el-menu-item index="/salary-cal">薪资核算</el-menu-item>
        <el-menu-item index="/cumulative">累计应税项</el-menu-item>
      </el-submenu>
      <el-submenu index>
        <template slot="title">
          <i class="iconfont iconshenbao"></i>
          <span>个税申报</span>
        </template>
        <el-menu-item index="/tax/collect">人员信息采集</el-menu-item>
        <el-menu-item index="/tax/attach">专项附加扣除</el-menu-item>
        <el-menu-item index="/tax/report">综合所得申报</el-menu-item>
        <el-menu-item index="/tax/paid">扣缴义务人</el-menu-item>
      </el-submenu>
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
