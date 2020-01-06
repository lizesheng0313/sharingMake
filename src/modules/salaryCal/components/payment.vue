<template>
  <div class="payment">
    <div class="box">
      <div class="box-con">
        <img src="../../../assets/images/bank.png" alt="" width="49px" height="50px">
        <div class="box-fun">
          <p class="box-title">银行代发</p>
          <p class="tip">使用银行代发服务完成在线发薪</p>
          <div v-if="!payrollStatus || payrollStatus ==='INIT' || payrollStatus ==='CANCEL' && privilegeVoList.includes('salary.compute.salaryCheck.payroll')">
            <el-button type="primary" @click="sendData">提交代发数据</el-button>
          </div>
          <div v-else v-show="privilegeVoList.includes('salary.compute.salaryCheck.payroll')">
            <el-button type="primary" @click="$router.push('/pay-batch')">前往代发</el-button>
            <el-button type="primary" @click="cancelPayroll">撤销代发</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-con">
        <img src="../../../assets/images/item1.png" alt="" width="49px" height="50px">
        <div class="box-fun">
          <p class="box-title">银行报盘</p>
          <p class="tip">导出姓名、银行卡号、实发工资</p>
          <a :href="'/api/xsalary/salary/stubs/exportReport/'+checkId" style="color:#fff;" v-if="privilegeVoList.includes('salary.compute.salaryCheck.bankOffer')"><el-button type="primary">导出</el-button></a>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-con">
        <img src="../../../assets/images/item2.png" alt="" width="49px" height="50px">
        <div class="box-fun">
          <p class="box-title">发放工资条</p>
          <p class="tip">员工可在微信小程序中查看工资条<span class="seeExample" v-popover:salaryExample>预览实例</span></p>
          <el-popover
            ref="salaryExample"
            placement="right"
            width="200"
            trigger="click">
            <img src="../../../assets/images/salary.png" width="200px" alt="">
          </el-popover>
          <el-button type="primary" @click="sendSalary" v-if="checkStatus === 'AUDITED' && privilegeVoList.includes('salary.compute.salaryCheck.providStubs')">生成工资条</el-button>
          <div v-if="checkStatus === 'PAID' || checkStatus === 'FINISH' && privilegeVoList.includes('salary.compute.salaryCheck.providStubs')">
            <el-button type="primary" @click="seeRecord">查看发放记录</el-button>
            <el-button type="info" @click="deleteSalary">删除发放</el-button>
          </div>
        </div>
      </div>
      <i class="el-icon-setting" @click="showSalarySet" v-if="privilegeVoList.includes('salary.compute.salaryCheck.providStubs')"></i>
    </div>
    <right-pop :pop-show="popShow" :has-footer="false" popTitle="工资条设置" :popWidth="600">
      <div slot="pop-content">
        <paymentSalarySet @changeSatus="changeSatus"></paymentSalarySet>
      </div>
    </right-pop>
    <el-dialog
      title="银行卡为空"
      :visible.sync="noCardListShow"
      width="750px"
      :show-close="false"
    >
     <el-table :data="noCardList" class="check-staff_table" height="400px">
        <el-table-column prop="empName" label="姓名"></el-table-column>
        <el-table-column prop="idNo" label="证件号码"></el-table-column>
        <el-table-column prop="empNo" label="员工工号"></el-table-column>
        <el-table-column prop="empName" label="扣缴义务人"></el-table-column>
      </el-table>
      <div style="text-align:center;margin-top: 10px">
        <el-button type="primary" @click="downLoadData">下载数据</el-button>
        <el-button type="primary" @click="noCardListShow=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { apiDeleteStubs,apiProvideStubs} from '../store/api'
  import rightPop from '../../../components/basic/rightPop'
  import paymentSalarySet from './payment-salarySet'
  import { mapState } from "vuex";
export default {
  components: {
    rightPop,
    paymentSalarySet
  },
  data() {
    return {
      popShow: { isshow: false },
      checkId:this.$route.query.id,
      active:this.$route.query.active,
      checkStatus:"",
      payrollStatus:"",
      noCardListShow:false,
      noCardList:[],
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
    },
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList
    }),
  },
  methods: {
    _loading(){
      this.$store
        .dispatch("salaryCalStore/actionGetSalaryStatus",this.checkId)
        .then(res=>{
          if(res.code ==="0000"){
            this.checkStatus = res.data.checkStatus;
            this.payrollStatus = res.data.payrollStatus
          }
        })
    },
    showSalarySet(){
      this.popShow.isshow = true;
    },
    changeSatus(data){
     this.popShow.isshow = data;
    },
    //发放薪资
    sendSalary(){
      apiProvideStubs(this.checkId).then(res=>{
        if(res.code === "0000"){
          this.$emit("changeActive",this.active-(-1));
          this.$router.push({path:"/salaryCheck",query:{id:this.checkId,active:this.active-(-1),salaryRuleId:this.$route.query.salaryRuleId}})
        }else{
          this.$message.error(res.message)
        }
      })
    },
    //提交代发数据
    sendData(){
      if(['AUDITED','PAID' ,'FINISH'].includes(this.checkStatus)){
        this.$confirm(
          "提交发薪数据成功后，不允许再修改发薪数据，您可前往银行代发，是否确定提交。",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: false
          }
        ).then(() => {
          this.$store.dispatch('salaryCalStore/actionPayrollCredit',this.checkId).then(res=>{
            if(res.data.payrollStatus === "SUCCESS"){
              this.$message.success("银行代发成功");
              this._loading();
            }else{
              this.noCardListShow = true;
              this.noCardList = res.data.list;
            }
          })
        }).catch(() => {});
      }else{
        this.$message.warning("工资数据未审核，请先审核再提交发薪数据。")
      }
    },
    // 撤销代发
    cancelPayroll(){
      this.$confirm('您确定撤销代发吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('salaryCalStore/actionPayrollCreditCancel',this.checkId).then(res=>{
          if(res.success){
              if(res.data.payrollStatus === "SUCCESS"){
                this.$message.success("撤销成功");
                this._loading()
              }else{
                this.$message.warning(res.data.message);
              }
          }else{
            this.$message.warning(res.message);
          }
        })
      })
    },
    //查看记录
    seeRecord(){
      this.$emit("changeActive",this.active-(-1))
      this.$router.push({path:"/salaryCheck",query:{id:this.checkId,active:this.active-(-1),salaryRuleId:this.$route.query.salaryRuleId}})
    },
    downLoadData(){
      this.$store.dispatch('salaryCalStore/actionPayrollCreditExport',this.checkId).then(res=>{
      })
    },
    //删除发放
    deleteSalary(){
      this.$confirm('您确定要删除已发放工资条,删除后，需重新发放后员工才可查看工资条', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: false
      }).then(() => {
        apiDeleteStubs(this.checkId).then(res=>{
          if(res.code === "0000"){
            this.$message.success('删除成功');
            this._loading()
          }else{
            this.$message.error(res.message);
          }
        })
      }).catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.payment {
  margin-top:120px;
  padding: 0px 40px 120px 40px;
  display: flex;
  .box{
    width:160px;
    margin:0 10px;
    height: 188px;
    position: relative;
    margin-bottom:30px;
    border:1px solid #EBEEF5;
    border-radius: 4px;
    flex:1;
    .box-con{
      margin-left:56px;
      margin-top: 10px;
      padding-top: 40px;
      img{
        width:50px;
        height:50px;
        margin-right: 30px;
        vertical-align: bottom;
      }
      .box-fun{
        display: inline-block;
        height: 80px;
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
      font-size: 16px;
      cursor: pointer;
    }

  }
}
</style>
