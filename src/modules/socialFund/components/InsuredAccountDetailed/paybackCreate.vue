<template>
  <div class="payback-create">
    <el-dialog
      :visible.sync="isShowPayback"
      title="补缴"
      width="52%"
      center
      class="payback-create-dialog"
      :close-on-click-modal="closeModel"
    >
      <div class="screening-wapper">
        <div class="increase-tip">提示：若需补缴多月，且每月基数不同，您可通过补缴多次实现，【详情】中可查补缴数据</div>
        <el-form :model="paybackForm" ref="paybackForm" label-width="140px" class="demo-ruleForm">
          <div class="shortCon">
            <el-form-item label="参保方案" prop="compInsuredId"
                          :rules="{required: true, message: '参保方案不能为空', trigger: 'change'}">
              <el-select v-model="paybackForm.compInsuredId" placeholder="请选择参保方案">
                <el-option v-for="(item,index) in planOption" :label="item.insuredName" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="shortCon" style="display: flex">
             <el-form-item label="补缴起止月份" prop="startDate" :rules="{required: true, message: '请选择起缴月份', trigger: 'blur'}">
                <el-date-picker v-model="paybackForm.startDate" type="month" placeholder="请选择"></el-date-picker>
             </el-form-item>
             <span style="display: inline-block; margin:0 10px;line-height: 40px;height: 40px" >至</span>
             <el-form-item prop="endDate" :rules="{required: true, message: '请选择止缴月份', trigger: 'blur'}" class="date-picker-right">
                <el-date-picker v-model="paybackForm.endDate" type="month" placeholder="请选择"></el-date-picker>
             </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="补缴社保基数" prop="socialBaseNum"
                          :rules="{ required: true, message: '请选择员工社保基数', trigger: 'blur'}">
              <el-input v-model="paybackForm.socialBaseNum"></el-input>
            </el-form-item>
            <div class="footer-tip">若社保无需补缴，基数请填0</div>
          </div>
          <div class="shortCon">
            <el-form-item label="补缴公积金基数" prop="fundBaseNum"
                          :rules="{ required: true, message: '请选择公积金基数', trigger: 'blur'}">
              <el-input v-model="paybackForm.fundBaseNum"></el-input>
            </el-form-item>
            <div class="footer-tip">若社保无需补缴，基数请填0</div>
          </div>
          <div class="dialog-footer">
            <el-button type="primary" @click="handlePayback">确定</el-button>
            <el-button @click ="cancelPayBack">取消</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paybackForm:{
        compInsuredId:"",
        startDate:"",
        endDate:"",
        socialBaseNum:"",
        fundBaseNum:"",
        supplementType:"GENERATE"
      },
      planOption:[],
      isShowPayback:false,
      closeModel: false,
    };
  },
  methods: {
    show(insuredCity) {
      this.isShowPayback = true;
      this.$store
        .dispatch("socialFundStore/actionInsuredGetBase", insuredCity)
        .then(res => {
          if(res.success){
            this.planOption = res.data;
          }
        })
    },
    //代缴
    handlePayback(){
      this.$refs.paybackForm.validate(valid => {
        if(valid){
          this.$store
            .dispatch("socialFundStore/actionEmpMonthlyLedgerSupple", this.paybackForm)
            .then(res => {
              if(res.success){
                this.isShowPayback = false;
                this.$emit("reFreshList",true)
              }
            })
        }
      })
    },
    cancelPayBack(){
      this.isShowPayback = false;
      this.$emit("reFreshList",true)
    }
  }
};
</script>
<style lang="scss" scoped>
.payback-create {
  .screening-wapper{
    width: 560px;
    margin: 0 auto;
  }
  .shortCon{width:450px;}
  .name-con{
    margin:10px 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .name-box{
      padding-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .el-select {
    width: 100%;
  }
  .increase-tip{
    margin-bottom: 20px;
  }
  .footer-tip{
    color:#C0C4CC;
    font-size: 12px;
    /*height: 10px;*/
    padding-left: 140px;
    position: relative;
    bottom: 5px;
  }
}
</style>