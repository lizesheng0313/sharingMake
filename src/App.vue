<template>
  <div>
    <full-screen>
      <div slot="fs-container">
        <div class="home">
          <div class="display-flex">
            <div>
              <el-menu default-active="/home" class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item index="/personal">
                  <i class="iconshouye iconfont"></i>
                  <span slot="title">系统首页</span>
                </el-menu-item>
                <el-menu-item index="/accounting">
                  <i class="iconshouye iconfont"></i>
                  <span slot="title">薪资核算</span>
                </el-menu-item>
                <!-- <el-submenu index="3">
                  <template slot="title">
                    <i class="iconfont iconjisuanxinzi"></i>
                    <span>薪资核算</span>
                  </template>
                  <el-menu-item index="/home">薪资档案</el-menu-item>
                  <el-menu-item index="/xxx">考勤月报采集</el-menu-item>
                  <el-menu-item index="/accounting">薪资计算</el-menu-item>
                </el-submenu>-->
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
            <div class="flex1 view-page">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </full-screen>
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
.view-page {
  background: #fff;
  margin-left: 17px;
  margin-right: 24px;
  border-radius: 7px;
}
</style>


