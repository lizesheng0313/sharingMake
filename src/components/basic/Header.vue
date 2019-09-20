<template>
  <div class="top-header">
    <el-row type="flex" class="row-bg header display-flex">
      <el-col :span="12">
        <div class="logo" @click="goOladingServer">
          <img src="../../assets/images/olading-icon.png" alt />
          <i class="el-icon-arrow-left"></i>
          <span>返回选择服务</span>
        </div>
      </el-col>
      <el-col :span="12">
        <span class="log-out icontuichu iconfont" @click="logOut"></span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapState } from "vuex";
export default {
  data() {
    let originHref = "";
    switch (window.__CURRENT_ENV__) {
      case "prod":
        originHref='https://www.olading.com/main.html#/';
        break;
      case "stage":
        originHref='https://stage.olading.com/main.html#/';
        break;
      case "dev":
        originHref='http://172.19.60.38/main.html#/';
        break;
      case "local":
        originHref='http://localhost:8081/main.html#/';
        break;
    }
    return {
      originUrl:originHref,//跳转路径
    };
  },
  computed:mapState({
    token:"token",
  }),
  created(){
  },
  methods: {
    goOladingServer(){
      window.open(this.originUrl+'login'+'?token='+ this.token+'&from=salaryFont', "_self");
    },
    logOut(){
     window.open(this.originUrl+'login', "_self")
    }
  }
};
</script>
<style lang="scss" scoped>
.top-header {
  .header {
    box-sizing: border-box;
    height: 75px;
    background: #fff;
    line-height: 75px;
    margin-bottom: 15px;
    img {
      margin: 16px 50px 0 20px;
      height: 36px;
      float: left;
    }
  }
  .logo {
    margin-left: 20px;
    height: 100%;
    color: #a3a3a3;
    font-size: 16px;
    cursor: pointer;
  }
  .log-out {
    float: right;
    cursor: pointer;
    height: 75px;
    font-size: 25px;
    color: #a3a3a3;
    padding-right: 30px;
  }
}
</style>
