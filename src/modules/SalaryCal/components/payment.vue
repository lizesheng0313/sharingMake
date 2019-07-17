<template>
  <div class="payment">
    <div class="box">
      <div class="box-con">
        <img src="../../../assets/images/item1.png" alt="" width="49px" height="50px">
        <div class="box-fun">
          <p class="box-title">银行报盘</p>
          <p class="tip">导出姓名、银行卡号、实发工资</p>
          <a :href="'/api/salary/stubs/exportReport/'+checkId" style="color:#fff;"><el-button type="primary">导出</el-button></a>
        </div>
      </div>
<!--      <i class="el-icon-setting"></i>-->
    </div>
    <div class="box">
      <div class="box-con">
        <img src="../../../assets/images/item2.png" alt="" width="49px" height="50px">
        <div class="box-fun">
          <p class="box-title">发放工资条</p>
          <p class="tip">员工可在微信小程序中查看工资条<span class="seeExample">预览实例</span></p>
          <el-button type="warning" >发放</el-button>
<!--          <div v-if="checkStatus === 'PAID' || checkStatus === 'FINISH'">-->
            <el-button type="warning">查看发放记录</el-button>
            <el-button type="info" @click="deleteSalary">删除发放</el-button>
<!--          </div>-->
        </div>
      </div>
      <i class="el-icon-setting" @click="showSalarySet"></i>
    </div>
    <right-pop :pop-show="popShow" :has-footer="false" popTitle="工资条设置" :popWidth="440">
      <div slot="pop-content">
        <paymentSalarySet @changeSatus="changeSatus"></paymentSalarySet>
      </div>
    </right-pop>
  </div>
</template>
<script>
  import { apiDeleteStubs} from '../store/api'
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
      checkId:this.$route.query.id,
      checkStatus:""
    };
  },
  created(){
   this._loading();
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
    _loading(){
      this.$store
        .dispatch("salaryCalStore/actionGetSalaryStatus",this.checkId)
        .then(res=>{
          if(res.code ==="0000"){
            this.checkStatus = res.data.checkStatus;
          }
        })
    },
    showSalarySet(){
      this.popShow.isshow = true;
    },
    changeSatus(data){
     this.popShow.isshow = data;
    },
    //删除发放
    deleteSalary(){
      apiDeleteStubs(this.checkId).then(res=>{
        if(res.code === "0000"){
          this._loading()
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.payment {
  margin-top:50px;
  .box{
    width:546px;
    margin:0 auto;
    height: 188px;
    background: url("../../../assets/images/bg.png");
    background-size:100%;
    background-position:center;
    position: relative;
    margin-top:30px;
    .box-con{
      margin-left:160px;
      /*border:1px solid red;*/
      margin-top: 10px;
      padding-top: 40px;
      img{
        width:50px;
        height:50px;
        margin-right: 30px;
      }
      .box-fun{
        display: inline-block;
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
