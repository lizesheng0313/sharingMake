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
        <div class="name-con">
          <span class="name-box" v-for="(item,index) in nameList" :key="index">{{ item }}、</span>
        </div>
        <el-form :model="paybackForm" ref="paybackForm" label-width="120px" class="demo-ruleForm">
          <div class="shortCon">
            <el-form-item label="参保方案"
                          prop="plan"
                          :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
              <el-select v-model="paybackForm.plan" placeholder="请选择参保方案">
                <el-option v-for="(item,index) in planOption" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="shortCon" style="display: flex">
             <el-form-item label="补缴起止月份" prop="socialMonthStart" :rules="{required: true, message: '请选择社保起缴月份', trigger: 'blur'}">
                <el-date-picker v-model="paybackForm.socialMonthStart" type="month" placeholder="请选择"></el-date-picker>
             </el-form-item>
             <span style="display: inline-block; margin:0 10px;line-height: 40px;height: 40px" >至</span>
             <el-form-item prop="socialMonthEnd" :rules="{required: true, message: '请选择社保止缴月份', trigger: 'blur'}" class="date-picker-right">
                <el-date-picker v-model="paybackForm.socialMonthEnd" type="month" placeholder="请选择"></el-date-picker>
             </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="补缴社保基数" prop="socialBase"
                          :rules="{ required: true, message: '请选择员工社保基数', trigger: 'blur'}">
              <el-input v-model="paybackForm.socialBase"></el-input>
            </el-form-item>
          </div>
          <div class="shortCon" style="display: flex">
            <el-form-item label="公积金起止月份">
              <el-date-picker v-model="paybackForm.providentMonthStart" type="month" placeholder="请选择"></el-date-picker>
            </el-form-item>
            <span style="display: inline-block; margin:0 10px;line-height: 40px;height: 40px" >至</span>
            <el-form-item prop="providentMonthStart" class="date-picker-right">
               <el-date-picker v-model="paybackForm.providentMonthStart" type="month" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="补缴公积金基数" prop="providentBase">
              <el-input v-model="paybackForm.providentBase"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlePayback">确定</el-button>
          <el-button @click ="cancelPayBack">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paybackForm:{
        plan:"",
        socialMonthStart:"",
        socialMonthEnd:"",
        socialBase:"",
        providentMonthStart:"",
        providentMonthEnd:"",
        providentBase:"",
        providentMonthType:"1",
      },
      planOption:[{label:"111",value:"111"}],
      isShowPayback:false,
      closeModel: false,
      nameList:[]
    };
  },
  methods: {
    show(nameList,params) {
      this.isShowPayback = true;
      this.nameList = nameList;
    },
    //代缴
    handlePayback(){
      this.$refs.paybackForm.validate(valid => {
        if(valid){
          this.isShowPayback = false;
          this.$emit("reFreshList",true)
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
}
</style>