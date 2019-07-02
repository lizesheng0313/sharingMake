<template>
  <div class="salarySet-page">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>返回</span>
          <span class="headerLine">|</span>
          <span>工资表设置</span>
        </el-col>
      </el-row>
    </header>
    <div class="salarySetCon">
      
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  methods:{
    goSalarySet(){
      this.$router.push("/salarySet")
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.salarySet-page {
  .header {
    padding:0 20px;
    font-size: 14px;
    height: 61px;
    border-bottom: 1px solid #ededed;
    line-height: 61px;
    .add-table {
      cursor: pointer;
      float: right;
      color: $mainColor;
    }
    .iconxinzeng {
      font-size: 18px;
      color: #9c9c9c;
      position: relative;
      top: 1px;
    }
  }
  .headerLine{
    display: inline-block;
    padding:0 10px;
  }
}
</style>

