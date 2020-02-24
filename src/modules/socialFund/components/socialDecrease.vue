<template>
  <div class="social-decreace">
    <el-dialog
      :visible.sync="isShowDecrease"
      title="社保减员"
      width="52%"
      center
      class="social-increace-dialog"
      :close-on-click-modal="closeModel"
    >
      <div class="screening-wapper">
        <el-form :model="socialDecreaceForm" ref="socialDecreaceForm" label-width="140px" class="demo-ruleForm">
          <div class="shortCon">
            <el-form-item label="社保停缴月份" prop="socialInsuranceEndMonth"
                          :rules="{required: true, message: '请选择社保停缴月份', trigger: 'blur'}">
              <el-date-picker v-model="socialDecreaceForm.socialInsuranceEndMonth" value-format="yyyy-MM"
                              type="month" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </div>
          <div class="shortCon" v-if="!accumulationFundYn">
            <el-form-item label="公积金停缴月份" prop="accumulationFundEndMonth"
                          :rules="{ required: true, message: '请选择公积金停缴月份', trigger: 'blur'}">
              <el-radio-group v-model="socialDecreaceForm.providentMonthType">
                <el-radio-button label = "1">同社保</el-radio-button>
                <el-radio-button label = "2">选择</el-radio-button>
              </el-radio-group>
              <span class="provident-month">
                    <el-date-picker v-if="socialDecreaceForm.providentMonthType==2"
                                    v-model="socialDecreaceForm.accumulationFundEndMonth"
                                    value-format="yyyy-MM"
                                    type="month" placeholder="请选择"></el-date-picker>
                </span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleDecreateSocial">确定</el-button>
          <el-button @click ="isShowDecrease = false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import { validateNumber } from "@/util/validate";
export default {
  props:{
    accumulationFundYn:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      socialDecreaceForm:{
          socialInsuranceEndMonth:"",
          accumulationFundEndMonth:"",
          providentMonthType:"1",
        },
        compEmpInfo:[],
        closeModel: false,
        isShowDecrease:false,
        nameList:[],
        validateNumber:validateNumber
    };
  },

  methods: {
    show(compEmpInfo) {
      this.isShowDecrease = true;
      this.compEmpInfo =compEmpInfo
    },
    handleDecreateSocial(){
      this.socialDecreaceForm.accumulationFundEndMonth = this.socialDecreaceForm.providentMonthType === "1" ?
        this.socialDecreaceForm.socialInsuranceEndMonth: this.socialDecreaceForm.accumulationFundEndMonth
      this.$refs.socialDecreaceForm.validate(valid => {
        if(valid){
          this.$store
            .dispatch("socialFundStore/actionFloatEmployeeDecreaseDo", {
              compEmpInfo:this.compEmpInfo,
              socialInsuranceEndMonth:this.socialDecreaceForm.socialInsuranceEndMonth,
              accumulationFundEndMonth: this.socialDecreaceForm.accumulationFundEndMonth
            }).then(res => {
                if(res.success){
                  this.isShowDecrease = false;
                  this.$emit("freshList")
                }
            })
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  .social-decreace {
    .screening-wapper{
      width: 560px;
      margin: 0 auto;
    }
    .shortCon{width:450px;}
    .name-con{
      margin:10px 0px 10px 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .name-box{
        padding-right: 10px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>