<template>
  <div class="paymaster">
    <div class="el-diy-month">
<!--      <header class="header main-title" style="padding-right: 20px">-->
<!--            <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--              <el-tab-pane label="员工信息" name="emplyeeInfo"></el-tab-pane>-->
<!--              <el-tab-pane label="" name="socialInceace"></el-tab-pane>-->
<!--            </el-tabs>-->
<!--      </header>-->
      <header class="header">
        <el-row type="flex">
          <el-col :span="12">
            <span>员工信息</span>
          </el-col>
        </el-row>
      </header>
      <employee-info v-if="activeName=='emplyeeInfo'"></employee-info>
      <quickStaff v-if="activeName=='socialInceace'" :showTitle = "showTitle"></quickStaff>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import employeeInfo from "./employeeInfo"
  import quickStaff from "../socialFund/quickStaff"
  import * as AT from "./store/actionTypes";
  import fun from "@/util/fun";
  export default {
    components:{
      employeeInfo,
      quickStaff
    },
    data() {
      return {
        activeName:"emplyeeInfo",
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        showTitle:false
    };
    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList,
        taxSubjectInfoList:state=>state.taxSubjectInfoList,
      }),
    },
    created(){

    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
          this.screenHeight = document.body.clientHeight - 330;
        })();
      };
    },
    methods: {
      handleClick() {

      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";
  .paymaster{
    .header {
      padding: 0 20px;
      font-size: 17px;
      height: 61px;
      border-bottom: 1px solid #ededed;
      line-height: 61px;
    }
  }

</style>

