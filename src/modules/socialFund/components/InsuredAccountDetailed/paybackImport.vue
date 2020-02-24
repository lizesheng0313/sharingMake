<template>
  <div class="payback-create">
    <el-drawer
      :visible.sync="isShowPayback"
      :with-header="false"
      ref="companyChange"
      size="38%"
    >
      <div class="import-con">
        <span class="drawer-title">补缴</span>
        <div class="screening-wapper">
          <div class="increase-tip">提示：若需补缴多月，且每月基数不同，您可通过补缴多次实现，【详情】中可查补缴数据</div>
          <el-form :model="paybackForm" ref="paybackForm" label-width="120px" class="demo-ruleForm">
            <div class="shortCon"><span class="title">姓名</span><span>{{ this.selectItem.empName }}</span></div>
            <div class="shortCon"><span class="title">工号</span><span>{{ this.selectItem.empNo }}</span></div>
            <div class="shortCon"><span class="title">证件号码</span><span>{{ this.selectItem.idNo }}</span></div>
            <div class="shortCon"><span class="title">户籍城市</span><span>{{ this.selectItem.householdCountry }}</span></div>
            <div class="shortCon"><span class="title">户口性质</span><span>{{this.selectItem.householdRegistrationType }}</span></div>
            <div class="shortCon" style="display: flex">
              <el-form-item label="补缴起止月份" prop="startDate" :rules="{required: true, message: '请选择社保起缴月份', trigger: 'blur'}">
                <el-date-picker v-model="paybackForm.startDate" type="month" placeholder="请选择" value-format="yyyy-MM"></el-date-picker>
              </el-form-item>
              <span style="display: inline-block; margin:0 10px;line-height: 40px;height: 40px" >至</span>
              <el-form-item prop="endDate" :rules="{required: true, message: '请选择社保止缴月份', trigger: 'blur'}" class="date-picker-right">
                <el-date-picker v-model="paybackForm.endDate" type="month" placeholder="请选择" value-format="yyyy-MM"></el-date-picker>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div style="padding:0 20px;margin: 30px 0px 0px 0px">
          <el-table :data="paybackForm.importSupplementIncuredVo" border height="300">
            <el-table-column prop="month" label="缴纳险种" >
              <template slot-scope="scope">
                <span>{{ scope.row.type | insuranceType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="个人缴纳金额">
              <template slot-scope="scope">
                <el-input v-model="scope.row.personMoney" class="input-right"/>
              </template>
            </el-table-column>
            <el-table-column label="公司缴纳金额">
              <template slot-scope="scope">
                <el-input v-model="scope.row.companyMoney" class="input-right"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span class="con-footer">
          <el-button type="primary" @click="handlePayback">确定</el-button>
          <el-button @click ="cancelPayBack">取消</el-button>
        </span>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props:{
    selectItem:{
      type:Object,
      default:{},
    }
  },
  data() {
    return {
      paybackForm:{
        startDate:"",
        endDate:"",
        supplementType:"IMPORT",
        importSupplementIncuredVo:[
          {type:"ENDOWMENT_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"MEDICAL_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"UNEMPLOYMENT_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"INJURY_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"BIRTH_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"SERIOUS_DISEASE_TREATMENT",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"ACCUMULATION_FUND",projectType:"ACCUMULATION_FUND",personMoney:"0.00",companyMoney:"0.00"},
          {type:"COMPENSATORY_ACCUMULATION_FUND",projectType:"ACCUMULATION_FUND",personMoney:"0.00",companyMoney:"0.00"},
          {type:"COMPENSATORY_ENDOWMENT_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"COMPENSATORY_MEDICAL_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"COMPENSATORY_MEDICAL_INSURANCE",projectType:"SOCIAL_INSURANCE",personMoney:"0.00",companyMoney:"0.00"},
          {type:"COMPENSATORY_UNEMPLOYMENT_INSURANCE",personMoney:"0.00",projectType:"SOCIAL_INSURANCE",companyMoney:"0.00"},
        ],
      },
      closeModel: false,
      isShowPayback:false,
    };
  },
  created(){
  },
  methods: {
    show(){
      this.isShowPayback= true;
      this.$refs.paybackForm?this.$refs.paybackForm.clearValidate():""
    },
    //代缴
    handlePayback(){
      this.$refs.paybackForm.validate(valid => {
        if(valid){
          this.isShowPayback = false;
          this.paybackForm.id = this.selectItem.id;
          this.$store
            .dispatch("socialFundStore/actionEmpMonthlyLedgerSupple",this.paybackForm)
            .then(res => {
              if(res.success){
                this.$emit("reFreshList",true)
              }
            })
        }
      })
    },
    cancelPayBack(){
      this.isShowPayback = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.payback-create {
  overflow-y: auto;
  padding-bottom: 80px;
  .screening-wapper{
    width: 100%;
    padding: 0 20px;
  }
  .shortCon{
    width:450px;
    color:#606266;
    line-height: 50px;
    height: 50px;
    span{
      display: inline-block;
    }
    .title{
      width: 80px;
      text-align: right;
      margin-right: 40px;
      margin-left: 20px;
    }
  }
  .increase-tip{
    margin-bottom: 10px;
  }
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
  .con-footer{
    position: fixed;
    bottom: 0px;
    width: 600px;
    background: #fff;
    text-align: center;
    padding: 10px 0px;
  }

}
</style>