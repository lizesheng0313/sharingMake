<template>
  <div class="full-screen">
    <el-row type="flex" class="row-bg header display-flex">
      <el-col :span="12">
        <div class="logo" @click="$router.push('/')">
          <img src="../../assets/images/olading-icon.png" alt />
          <i class="el-icon-arrow-left"></i>
          <span>返回选择服务</span>
        </div>
      </el-col>
      <el-col :span="12">
        <span class="logOut icontuichu iconfont"></span>
      </el-col>
    </el-row>
    <div class="fs-container">
      <slot name="fs-container"></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.full-screen {
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
  .fs-container {
    padding-bottom: 50px;
  }
  .logo {
    margin-left: 20px;
    height: 100%;
    color: #a3a3a3;
    font-size: 16px;
    cursor: pointer;
  }
  .logOut {
    float: right;
    cursor: pointer;
    height: 75px;
    font-size:25px;
    color:#a3a3a3;
    padding-right: 30px;
  }
}
</style>
