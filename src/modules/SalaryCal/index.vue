<template>
  <div class="salary-cal">
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
      <div class="content-header">
        <i class="el-icon-arrow-left"></i>
        <span>{{currentDate}}</span>
        <el-date-picker
          v-model="currentDate"
          type="month"
          value-format="yyyy年MM月"
          :editable="false"
          :clearable="false"
          @change="changeDate"
        ></el-date-picker>
        <i class="el-icon-arrow-left rotate-el-icon-arrow-left"></i>
      </div>
      <div class="salary-payroll">
        <div class="payroll-box" v-for="(item,index) in salaryRuleList.used">
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
                <el-select v-model="item.id" placeholder="请选择" class="number-payday">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button type="primary" @click="handleCalcSalary">{{item.salaryCheckStatus|salaryCheckBtn}}</el-button>
                <p>启动算薪时，系统根据算薪范围生成本月计薪人员</p>
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
import { apiSalaryRuleList } from './store/api'
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
      }
    };
  },
  computed:{
  },
  created(){
    //默认日期
    let nowDate = new Date();
    let month = nowDate.getMonth()-(-1)<10?"0"+(nowDate.getMonth()-(-1)).toString():nowDate.getMonth()-(-1);
    this.currentDate = nowDate.getFullYear()+"年"+month+"月";
    this.getDate(this.currentDate)
  },
  methods: {
    handleCalcSalary() {
      this.$router.push("/salary-cal/start");
    },
    getDate(val){
      let Date = val.split('年')[0]+'-'+val.split('年')[1].split('月')[0];
      apiSalaryRuleList(Date).then(res=>{
       this.salaryRuleList = res.data
      })
    },
    changeDate(val){
      this.getDate(val)
    },
    goSalarySet(){
      this.$router.push("/salarySet")
    },
    setSalaryTable(val){
      this.$store.commit("salaryCalStore/SET_ROULEID", val.salaryRuleId);
      this.$store.commit("salaryCalStore/SET_BASICINFOFORM", val.salaryRule);
      this.$router.push({
        path:'/salarySet',
        query:{
          isEdit:true
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.salary-cal {
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

