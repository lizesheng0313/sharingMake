<template>
  <div class="salary-cal el-diy-month">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>薪资核算</span>
        </el-col>
        <el-col :span="12">
          <div class="add-table">
            <i class="iconxinzeng iconfont"></i>
            <span @click="goSalarySet">新增工资表</span>
          </div>
        </el-col>
      </el-row>
    </header>
    <div class="salary-cal-content">
      <div class="content-header head-date">
        <span>{{resetDate}}</span>
        <el-date-picker
          v-model="currentDate"
          type="month"
          suffix-icon="el-icon-date"
          value-format="yyyy-MM"
          :editable="false"
          :clearable="false"
          @change="changeDate"
        ></el-date-picker>
<!--        <i class="el-icon-arrow-left rotate-el-icon-arrow-left"></i>-->
      </div>
      <div class="salary-payroll">
        <div class="payroll-box" v-for="(item,index) in salaryRuleUsedList">
          <el-row type="flex">
            <el-col :span="12">
              <div>
                <div>
                  <strong>{{item.salaryRuleName}}</strong>
                  <el-dropdown trigger="click" class="more-operation" @command="setSalaryTable(item)">
                    <span class="el-dropdown-link">
                      更多操作
                      <i class="iconsanjiao iconfont"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>设置工资表</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <p class="cycle">
                  算薪周期： <span>{{item.startDate|resetDate}}~ {{item.endDate|resetDate}}</span>
                  <span class="calc-type">{{item.salaryCheckStatus|salaryCheckStatus}}</span>
                </p>
                <p>计税规则： {{item.taxRule|texRule}}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="start-calc">
                <el-select placeholder="请选择" v-model="selectUsedForm[item.salaryRuleId]" class="number-payday" v-show="showSelect(item)" @change="changePayth(index,selectUsedForm[item.salaryRuleId])">
                  <el-option v-for="(it,index) in item.payInfos" :key="index" :label="it.dec" :value="it.salaryCheckStatus+','+it.id"
                  ></el-option>
                </el-select>
                <el-button type="primary" @click="InitCalcSalary(item)" v-show="item.salaryCheckStatus === 'NONE'">启动算薪</el-button>
                <p v-show="item.salaryCheckStatus === 'NONE'">启动算薪时，系统根据算薪范围生成本月计薪人员</p>
                <el-button type="primary" @click="calcSalary(item)" v-show="item.salaryCheckStatus === 'INIT'">计算薪资</el-button>
                <el-button type="primary" @click="seeCalcSalary(item)" v-show="item.salaryCheckStatus === 'COMPUTED' || item.salaryCheckStatus === 'AUDITED' || item.salaryCheckStatus === 'FINISH' || item.salaryCheckStatus === 'PAID'">查看薪资</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { apiSalaryRuleList,apiInitSalaryCheck } from './store/api'
import AT from "./store/actionTypes"
export default {
  components: {},
  filters:{
    salaryCheckBtn:function(val){
      switch (val) {
        case 'NONE': {
          return '启动算薪';
        }
        case 'INIT': {
          return '计算薪资';
        }
        case 'COMPUTED': {
          return '查看薪资';//已计算
        }
        case 'AUDITED': {
          return '查看薪资';//已审核
        }
      }
    }
  },
  data() {
    return {
      value: "",
      options: [
        {
          value: "本月第1次发薪",
          label: "本月第一次发薪"
        }
      ],
      currentDate: "2019年7月",
      salaryRuleList:{
        "used":[],
        "disabled":[]
      },
      salaryRuleUsedList:[],
      payTh:{
        0:"第一次发薪",
        1:"第二次发薪",
        2:"第三次发薪",
        3:"第四次发薪",
      },
      selectUsedForm:{
      },
    };
  },
  computed:{
    resetDate:function(){
      let currentDateArr = this.currentDate.split('-');
      return currentDateArr[0]+"年"+currentDateArr[1]+"月"
    },
    ...mapState("salaryCalStore", {
      IndexCurrentDate: "IndexCurrentDate",
    }),
  },
  created(){
    //默认日期
    if(this.IndexCurrentDate){
      this.currentDate = this.IndexCurrentDate
    }else{
      let nowDate = new Date();
      let month = nowDate.getMonth()-(-1)<10?"0"+(nowDate.getMonth()-(-1)).toString():nowDate.getMonth()-(-1);
      this.currentDate = nowDate.getFullYear()+"-"+month;
    }
    this.loading();
    // console.log(this.selectUsedForm)
  },
  methods: {
    loading(){
      apiSalaryRuleList(this.currentDate).then(res=>{
        if(res.code==="0000"){
          this.salaryRuleList = res.data;
          this.salaryRuleUsedList = this.salaryRuleList?this.salaryRuleList.used:null;
          if(this.salaryRuleUsedList){
            this.salaryRuleUsedList.forEach((item,index)=>{
              if(item.payInfos && item.payInfos.length>0){
                item.payInfos.forEach((it,ins)=>{
                  it.dec = this.payTh[ins];
                  this.selectUsedForm[item.salaryRuleId] = item.payInfos[item.payInfos.length-1]['salaryCheckStatus']+','+item.payInfos[item.payInfos.length-1]['id']
                })
              }
            });
          }
        }else{
          this.$message.error(res.message)
        }
      })
    },
    showSelect:function(item){
      return item.salaryRule.enableMiltSalary || item.payInfos?item.payInfos.length>1:false
    },
    //选择时间
    changeDate(){
      //记录当前选择的时间
      this.$store.commit("salaryCalStore/SET_INDEXCURRENTDATE",this.currentDate);
      this.loading()
    },
    goSalarySet(){
      this.$store.commit("salaryCalStore/SET_ROULEID",null);
      this.$router.push("/salarySet")
    },
    //设置薪资
    setSalaryTable(val){
      this.$store.commit("salaryCalStore/SET_ROULEID", val.salaryRuleId);
      this.$store.commit("salaryCalStore/SET_BASICINFOFORM", val.salaryRule);
      this.$router.push({
        path:'/salarySet',
        query:{
          isEdit:true
        }
      })
    },
    //启动薪资
    InitCalcSalary(item){
      const that = this;
      apiInitSalaryCheck({
        id:item.salaryRuleId,
        date:that.currentDate
      }).then(res=>{
        if(res.code == "0000"){
          this.$store.commit("salaryCalStore/SET_SALARYITEM",item);
          this.$router.push({path:"/salaryCheck",query:{id:res.data.checkId,active:1,salaryRuleId:item.salaryRuleId}})
        }else{
          this.$message.error(res.message);
        }
      })
    },
    //计算薪资
    calcSalary(item){
      this.$store.commit("salaryCalStore/SET_BASICINFOFORM",item.salaryRule);
      this.$store.commit("salaryCalStore/SET_SALARYITEM",item);
      this.$router.push({path:"/salaryCheck",query:{id:item.id,active:2,salaryRuleId:item.salaryRuleId}});
    },
    //查看信息
    seeCalcSalary(item){
      this.$store.commit("salaryCalStore/SET_BASICINFOFORM",item.salaryRule);
      this.$store.commit("salaryCalStore/SET_SALARYITEM",item);
      this.$router.push({path:"/salaryCheck",query:{id:item.id,active:2,salaryRuleId:item.salaryRuleId}})
    },
    //切换查看第几次发薪
    changePayth(index,status){
      this.salaryRuleList.used[index]['salaryCheckStatus'] = status.split(',')[0];
      this.salaryRuleList.used[index]['id'] = status.split(',')[1];
      this.$forceUpdate();
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.salary-cal {
  .el-icon-date{
    font-size:16px;
  }
  .header {
    padding: 0 20px;
    font-size: 14px;
    height: 61px;
    border-bottom: 1px solid #ededed;
    line-height: 61px;
    .add-table {
      cursor: pointer;
      float: right;
      color: $mainColor;
    }
    .iconxinzeng {
      font-size: 18px;
      color: #9c9c9c;
      position: relative;
      top: 1px;
    }
  }
  .salary-cal-content {
    padding: 22px;
    .content-header {
      position: relative;
      font-size: 18px;
      margin-bottom: 30px;
      cursor: pointer;
      i {
        font-size: 16px;
        color: #ccc;
      }
      .rotate-el-icon-arrow-left {
        transform: rotate(180deg);
      }
      span {
        position: absolute;
        left: 32px;
        top: 3px;
        z-index: 0;
      }
    }
    .payroll-box {
      height: 116px;
      box-shadow: 0px 0px 12px 0px rgba(235, 236, 238, 1);
      transition: 0.3s all;
      border: 1px solid #fff;
      border-radius: 6px;
      padding: 20px 17px;
      strong {
        font-size: 16px;
        margin-right: 10px;
        margin-bottom: 23px;
        display: inline-block;
      }
      .more-operation {
        position: relative;
        font-size: 12px;
        cursor: pointer;
        display: inline-block;
        i {
          color: #6c6c6c;
          position: relative;
          top: 1px;
          left: -2px;
        }
      }
      p {
        color: #666;
      }
      .cycle {
        margin-bottom: 10px;
      }
      .calc-type {
        color: #ff8f2c;
        font-size: 14px;
        margin-left: 33px;
      }
    }
    .payroll-box:hover {
      border: 1px solid rgba(44, 124, 255, 1);
    }
    .start-calc {
      text-align: right;
      float: right;
      .el-button--primary {
        margin-top: 20px;
        text-align: right;
        background: $mainColor;
      }
      p {
        margin-top: 20px;
        color: #666;
      }
      .number-payday {
        width: 160px;
        cursor: pointer;
        color: #333;
        margin-right: 15px;
      }
    }
  }
}
</style>

