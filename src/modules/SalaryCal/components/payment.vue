<template>
  <div class="payment">
    <div class="box">
      <div class="box-con">
        <img src="" alt="" width="49px" height="50px">
        <div class="box-fun">
          <p class="box-title">银行报盘</p>
          <p class="tip">导出姓名、银行卡号、实发工资</p>
          <el-button type="primary">导出</el-button>
        </div>
      </div>
<!--      <i class="el-icon-setting"></i>-->
    </div>
    <div class="box">
      <div class="box-con">
        <img src="" alt="" width="49px" height="50px">
        <div class="box-fun">
          <p class="box-title">发放工资条</p>
          <p class="tip">员工可在微信小程序中查看工资条<span class="seeExample">预览实例</span></p>
          <el-button type="warning">发放</el-button>
        </div>
      </div>
      <i class="el-icon-setting" @click="showSalarySet"></i>
    </div>
    <right-pop :pop-show="popShow" :has-footer="false" popTitle="工资条设置" :popWidth="400">
      <div slot="pop-content">
        <paymentSalarySet></paymentSalarySet>
      </div>
    </right-pop>
  </div>
</template>
<script>
  import { apiSalaryList} from '../store/api'
  import rightPop from '../../../components/basic/rightPop'
  import paymentSalarySet from './payment-salarySet'
export default {
  components: {
    rightPop,
    paymentSalarySet
  },
  data() {
    return {
      popShow: { isshow: false },
    };
  },
  created(){
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  computed:{
    nowDate:function () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1):date.getMonth()+1;
      let day = date.getDate();
      return year+"-"+month+"-"+day+ " 00:00:00";
    }
  },
  methods: {
    showSalarySet(){
      this.popShow.isshow = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.payment {
  margin-top:50px;
  .box{
    width:586px;
    margin:0 auto;
    height: 150px;
    border:1px solid #eee;
    position: relative;
    margin-top:20px;
    .box-con{
      margin-left:240px;
      /*border:1px solid red;*/
      margin-top: 10px;
      img{
        width:50px;
        height:50px;
        border:1px solid red;
      }
      .box-fun{
        .box-title{
          color:#333333;
          font-size: 18px;
        }
        .tip{
          font-size: 10px;
          margin:10px 0px;
          color:#999;
        }
        .seeExample{
          color:#333;
          margin-left: 12px;
          cursor: pointer;
        }
      }
    }
    .el-icon-setting{
      position: absolute;
      right:16px;
      top:20px;
      color:#E6E6E6;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
