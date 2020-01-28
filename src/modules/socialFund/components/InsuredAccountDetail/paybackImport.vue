<template>
  <div class="payback-create">
      <div class="screening-wapper">
        <div class="increase-tip">提示：若需补缴多月，且每月基数不同，您可通过补缴多次实现，【详情】中可查补缴数据</div>
        <div class="name-con">
          <span class="name-box" v-for="(item,index) in nameList" :key="index">{{ item }}、</span>
        </div>
        <el-form :model="paybackForm" ref="paybackForm" label-width="120px" class="demo-ruleForm">
          <div class="shortCon"><el-form-item label="姓名">{{ this.selectItem.name }}</el-form-item></div>
          <div class="shortCon"><el-form-item label="工号">{{ this.selectItem.name }}</el-form-item></div>
          <div class="shortCon"><el-form-item label="证件号码">{{ this.selectItem.idcard }}</el-form-item></div>
          <div class="shortCon"><el-form-item label="户籍城市">{{ this.selectItem.name }}</el-form-item></div>
          <div class="shortCon"><el-form-item label="户口性质">{{ this.selectItem.name }}</el-form-item></div>
          <div class="shortCon" style="display: flex">
             <el-form-item label="补缴起止月份" prop="socialMonthStart" :rules="{required: true, message: '请选择社保起缴月份', trigger: 'blur'}">
                <el-date-picker v-model="paybackForm.socialMonthStart" type="month" placeholder="请选择"></el-date-picker>
             </el-form-item>
             <span style="display: inline-block; margin:0 10px;line-height: 40px;height: 40px" >至</span>
             <el-form-item prop="socialMonthEnd" :rules="{required: true, message: '请选择社保止缴月份', trigger: 'blur'}" class="date-picker-right">
                <el-date-picker v-model="paybackForm.socialMonthEnd" type="month" placeholder="请选择"></el-date-picker>
             </el-form-item>
          </div>
        </el-form>
      </div>
      <el-table :data="insuranceList" border>
        <el-table-column prop="month" label="缴纳险种" >
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="个人缴纳金额">
          <template slot-scope="scope">
            <el-input v-model="scope.row.personMoney" class="input-right"/>
          </template>
        </el-table-column>
        <el-table-column label="公司缴纳金额">
          <template slot-scope="scope">
            <el-input v-model="scope.row.companeyMoney" class="input-right"/>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="con-footer">
        <el-button type="primary" @click="handlePayback">确定</el-button>
        <el-button @click ="cancelPayBack">取消</el-button>
      </span>
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
      closeModel: false,
      nameList:[],
      insuranceList:[
        {type:"养老保险",personMoney:"100",companeyMoney:"100万"},
        {type:"医疗保险",personMoney:"100",companeyMoney:"100万"},
      ]
    };
  },
  created(){
    console.log(this.selectItem)
  },
  methods: {
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
      console.log(this.insuranceList)
      this.$emit("hanleClose")
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