<template>
  <div class="paymaster">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="用户管理" name="emplyeeInfo"></el-tab-pane>
              <el-tab-pane label="社保增员" name="socialInceace"></el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </header>
      <employee-info v-if="activeName=='emplyeeInfo'"></employee-info>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import employeeInfo from "./employeeInfo"
  import * as AT from "./store/actionTypes";
  import fun from "@/util/fun";
  export default {
    data() {
      return {
        activeName:"emplyeeInfo",
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
    };
    },
    components:{
      employeeInfo
    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList
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

</style>

