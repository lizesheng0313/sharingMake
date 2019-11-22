<template>
  <div class="salary-check sflary-el-step">
    <full-screen :fsTitle="salaryTitle" :bgColor="'#fafafa'" ref="full" style="overflow: hidden;">
      <div slot="fs-buttons" class="header-button">
        <span class="collect" v-if="active==1" >
         <router-link :to="{ path: '/tax/collect' }"> <i class="iconqiyexinxicaiji iconfont"></i>人员信息采集</router-link>
        </span>
        <span class="refresh" @click="refresh">
          <i class="iconshuaxin iconfont"></i>刷新
        </span>
        <div class="more-operation" v-if="active==2">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
            更多  <i>...</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link :to="{ path: '/tax/attach' }">专项附加扣除</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="{ path: '/cumulative' }">累计应税项</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="{path:'/salarySet',query:{'isEdit':true}}">设置工资表</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div slot="fs-container" class="content-st">
        <div class="step-box" v-if="active!==6">
            <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
              <el-step title="核对人员" @click.native = "goStep(0)"style="cursor: pointer;"></el-step>
              <el-step title="人员信息采集" @click.native = "goStep(1)" style="cursor: pointer;"></el-step>
              <el-step title="专项附加扣除" @click.native = "goStep(2)" style="cursor: pointer;" v-if="salaryItem.taxRule === 'SALARY_PAY_RULE'"></el-step>
              <el-step title="社保公积金" @click.native = "goStep(3)" style="cursor: pointer;" v-if="salaryItem.taxRule === 'SALARY_PAY_RULE'"></el-step>
              <el-step title="核算薪资" @click.native = "goStep(4)" style="cursor: pointer;"></el-step>
              <el-step title="发放薪资" @click.native = "goStep(5)" style="cursor: pointer;"></el-step>
            </el-steps>
        </div>
        <div class="view-content">
          <check-staff v-if="active==0"></check-staff>
          <staff-collect v-if="active==1"></staff-collect>
          <attach v-if="active==2"></attach>
          <socialProvident v-if="active==3"></socialProvident>
          <calc-wages v-if="active==4"></calc-wages>
          <payment v-if="active==5" @changeActive="changeActive"></payment>
          <salarySend v-if="active==6" @changeActive="changeActive"></salarySend>
        </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import checkStaff from "./components/check-staff";
import staffCollect from "./components/staff-collect"
import calcWages from "./components/calc-wages";
import payment from "./components/payment";
import salarySend from "./components/salarySend";
import attach from "./components/attach";
import socialProvident from "./components/socialProvident"

import { mapState } from "vuex";
export default {
  components: {
    fullScreen,
    checkStaff,
    calcWages,
    payment,
    salarySend,
    staffCollect,
    attach,
    socialProvident,
  },
  data() {
    return {
      active: typeof (this.$route.query.active) == "string" ? this.$route.query.active-0 : this.$route.query.active-0
    };
  },
  computed:{
     ...mapState("salaryCalStore", {
        salaryItem: "salaryItem",
      }),
    salaryTitle:function(){
       return  this.salaryItem.salaryRuleName + " " +this.salaryItem.date
    }
  },

  mounted(){
    console.log()
  },
  methods: {
    handle(val){
      console.log(val)
    },
    changeActive(data){
      this.active = data;
    },
    goStep(data){
      this.active = data;
      console.log(this.active)
      this.replaceRoute(this.active)
    },
    replaceRoute(data){
      this.$router.replace({
        path:"/salaryCheck",
        query:{
          id:this.$route.query.id,
          active:data,
          salaryRuleId:this.$route.query.salaryRuleId
        }
      })
    },
    refresh(){
      this.$router.go(0)
    },
  }
};
</script>
<style lang="scss" scoped>
.salary-check {
  background:#f5f7fa;
  .first-step{
    .el-step__head.is-success{
      color:#eee !important;
    }
  }
  .collect{
    a{
      color:#fff;
    }
  }
  .more-operation {
    display: inline-block;
  }
  .content-st{
    background: #fff;
    width:96%;
    margin:0 auto;
    padding-top: 10px;
    overflow: hidden;
    height:100%;
  }
  .el-dropdown-link {
    color: #fff;
    i {
      top: -3px!important;
    }
  }
  .header-button {
    span {
      display: inline-block;
      margin-right: 27px;
      cursor: pointer;
    }
    i {
      margin-right: 5px;
      font-size: 16px;
      position: relative;
      top: 1px;
    }
  }

  .step-box {
    margin:0 20px;
    .steps {
      width: 100%;
      margin: 30px auto 0;
    }
    .turn-page {
      position: absolute;
      right: 20px;
      bottom: 10px;
    }
  }
}
</style>
