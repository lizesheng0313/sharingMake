<template>
  <div class="social-increace">
    <el-dialog
      :visible.sync="isShowIncrease"
      title="社保增员"
      width="52%"
      center
      class="social-increace-dialog"
      :close-on-click-modal="closeModel"
    >
      <div class="screening-wapper">
        <div class="increase-tip">温馨提示：若参保人基数/方案不同，请选择【批量增员】方式导入实现增员</div>
        <el-form :model="socialIncreaceForm" ref="socialIncreaceForm" label-width="140px" class="demo-ruleForm">
          <div class="shortCon" v-if="selectEmployee">
            <el-form-item label="人员" prop="employee" :rules="{required: true, message: '人员不能为空', trigger: 'blur'}">
              <el-select v-model="socialIncreaceForm.employee" filterable placeholder="请选择人员">
                <el-option
                  v-for="item in employeeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="姓名" v-if="!selectEmployee">
              <span class="name-box" v-for="(item,index) in nameList" :key="index">{{ item }}、</span>
            </el-form-item>
            <el-form-item label="参保方案"
                          prop="compInsuredId"
                          :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
              <el-select v-model="socialIncreaceForm.compInsuredId" placeholder="请选择参保方案" @change="changeInsure">
                <el-option v-for="(item,index) in planOption" :label="item.insuredName" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="社保起缴月份" prop="socialInsuranceStartMonth"
                          :rules="{required: true, message: '请选择社保起缴月份', trigger: 'blur'}">
              <el-date-picker v-model="socialIncreaceForm.socialInsuranceStartMonth" type="month" placeholder="请选择" value-format="yyyy-MM"></el-date-picker>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="员工社保基数" prop="socialInsuranceBaseNumber" :rules="[
              { required: true, message: '请选择员工社保基数', trigger: 'blur'},
              { validator: validateNumber, trigger: 'blur'}]">
              <el-input v-model="socialIncreaceForm.socialInsuranceBaseNumber"></el-input>
            </el-form-item>
          </div>
          <div class="shortCon" v-if="!accumulationFundYn">
            <el-form-item label="公积金起缴月份" prop="accumulationFundStartMonth"
                          :rules="{ required: true, message: '请选择公积金起缴月份', trigger: 'blur'}">
              <el-radio-group v-model="socialIncreaceForm.providentMonthType">
                <el-radio-button label="1">同社保</el-radio-button>
                <el-radio-button label="2">选择</el-radio-button>
              </el-radio-group>
              <span class="provident-month">
                    <el-date-picker v-if="socialIncreaceForm.providentMonthType==2" v-model="socialIncreaceForm.accumulationFundStartMonth" type="month" placeholder="请选择" value-format="yyyy-MM"></el-date-picker>
                </span>
            </el-form-item>
          </div>
          <div class="shortCon" v-if="!accumulationFundYn">
            <el-form-item label="员工公积金基数" prop="accumulationFundBaseNumber"
                          :rules="[
                           { required: true, message: '公积金基数不能为空', trigger: 'blur'},
                           { validator: validateNumber, trigger: 'blur'}
                          ]">
              <el-input v-model="socialIncreaceForm.accumulationFundBaseNumber"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleIncreateSocial">确定</el-button>
          <el-button @click ="isShowIncrease = false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import { validateNumber } from "@/util/validate";
export default {
  props:{
    selectEmployee:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      socialIncreaceForm:{
        accumulationFundBaseNumber:"",
        accumulationFundStartMonth:"",
        compEmpInfo:[],
        compInsuredId:"",
        socialInsuranceBaseNumber:"",
        socialInsuranceStartMonth:"",

        providentMonthType:"1",
        employee:""
      },
      planOption:[],
      employeeOptions:[{
        label:"马大哈",
        value:"123"
      }],
      isShowIncrease:false,
      closeModel: false,
      nameList:[],
      validateNumber:validateNumber,
      accumulationFundYn:false,

    };
  },
  methods: {
    show(compEmpInfo,nameList) {
      this.isShowIncrease = true;
      this.nameList = nameList
      this.socialIncreaceForm.compEmpInfo = compEmpInfo
        this.$store
        .dispatch("socialFundStore/actionGetCompInsuredProject", this.socialIncreaceForm)
        .then(res => {
          if(res.success){
            this.planOption = res.data
          }
        });
    },
    //选择参保方案
    changeInsure(){
      let selectInsure = this.planOption.filter(item=>item.compInsuredId === this.socialIncreaceForm.compInsuredId)
      this.accumulationFundYn = selectInsure.accumulationFundYn
    },
    //增员
    handleIncreateSocial(){
      this.socialIncreaceForm.providentMonthType == "1" ?
        this.socialIncreaceForm.accumulationFundStartMonth = this.socialIncreaceForm.socialInsuranceStartMonth:""
      this.$refs.socialIncreaceForm.validate(valid => {
        if(valid){
          this.$store
            .dispatch("socialFundStore/actionFloatEmployeeIncreaseDo", this.socialIncreaceForm)
            .then(res => {
              if(res.success){
                this.$message.success("增员导入成功")
                this.isShowIncrease = false
                this.$emit("freshList")
              }
            });
        }
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.social-increace {
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
      font-size: 14px;
    }
  }
  .el-select {
    width: 100%;
  }
}
</style>