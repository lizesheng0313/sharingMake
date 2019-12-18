<template>
  <div class="div-nav">
    <el-menu class="el-menu-vertical-demo" @select="handleSelect">
      <el-submenu index="/">
        <template slot="title">
          <i class="iconfont iconshouye"></i>
          <span>薪资核算</span>
        </template>
        <el-menu-item index="/salary-cal">薪资核算</el-menu-item>
      </el-submenu>
      <el-submenu index="report">
        <template slot="title">
          <i class="iconfont icongeshuishenbao"></i>
          <span>个税申报</span>
        </template>
        <el-menu-item index="/tax/collect">人员信息采集</el-menu-item>
        <el-menu-item index="/tax/attach">专项附加扣除</el-menu-item>
        <el-menu-item index="/tax/report">综合所得申报</el-menu-item>
      </el-submenu>
      <el-submenu index="taxPaid">
        <template slot="title">
          <i class="iconfont iconshuikuanjiaona"></i>
          <span>税款缴纳</span>
        </template>
        <el-menu-item index="/taxPaid/paid">三方协议缴税</el-menu-item>
      </el-submenu>
      <el-submenu index="/initialize">
        <template slot="title">
          <i class="iconfont iconchushihuashezhi"></i>
          <span>初始化设置</span>
        </template>
        <el-menu-item index="/initialize/paid">扣缴义务人管理</el-menu-item>
        <el-menu-item index="/initialize/cumulative">累计应税项初始化</el-menu-item>
      </el-submenu>
      <template v-for="first in menuList">
          <el-submenu :key="first.key" v-if="first.children" :index="first.key">
            <template slot="title">
              <i :class="['iconfont',first.icon]"></i>
              <span>{{first.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="second in first.children" :key="second.key" :index="second.url">{{second.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :key="first.key" v-else :index="first.url">
            <template slot="title">
              <i :class="['iconfont',first.icon]"></i>
              <span>{{first.title}}</span>
            </template>
          </el-menu-item>
        </template>
    </el-menu>
  </div>
</template>
<script>
import menus from "./menus";
export default {
  data() {
    return {
      startUrl: "",
      menuList: []
    };
  },
  mounted(){
    this.startUrl = this.$route.path;
    this.menuList = menus;
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    }
  }
};
</script>
<style>
</style>
