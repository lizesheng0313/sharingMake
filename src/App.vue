<template>
  <div class="display-flex app-page">
    <div class="header">
      <header></header>
    </div>
    <div class="side-nav">
      <side-nav></side-nav>
    </div>
    <div class="flex1 div-content">
      <router-view></router-view>
    </div>
    <div class="div-nav">
      <el-menu default-active="/home" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item index="/personal">
          <i class="iconshouye iconfont"></i>
          <span slot="title">系统首页</span>
        </el-menu-item>
        <el-menu-item index="/accounting">
          <i class="iconshouye iconfont"></i>
          <span slot="title">薪资核算</span>
        </el-menu-item>
        <el-menu-item index="/personal">
          <i class="iconfont iconshenbao"></i>
          <span slot="title">个税申报</span>
        </el-menu-item>
        <el-menu-item index="/personal">
          <i class="iconfont iconicon-test"></i>
          <span slot="title">工资条</span>
        </el-menu-item>
      </el-menu>
    </div>

  </div>
</template>
<script>
  import fullScreen from "../src/components/full-screen";

  export default {
    data() {
      return {
        currentCom: ""
      };
    },
    components: {
      fullScreen
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .app-page {
    background: #fff;
    margin-left: 17px;
    margin-right: 24px;
    border-radius: 7px;
  }
</style>


