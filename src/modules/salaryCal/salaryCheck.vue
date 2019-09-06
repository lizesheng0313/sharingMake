<template>
  <div class="salary-check sflary-el-step">
    <full-screen :fsTitle="salaryItem.salaryRuleName" :bgColor="'#fafafa'" ref="full" style="overflow: hidden;">
      <div slot="fs-buttons" class="header-button">
        <span class="collect" v-if="active==1" >
         <router-link :to="{ path: '/tax/collect' }"> <i class="iconqiyexinxicaiji iconfont"></i>个税系统人员人信息采集</router-link>
        </span>
        <div class="more-operation" v-if="active==2">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
            更多  <i>...</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link :to="{ path: '/tax/attach' }">累计专项附加扣除</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="{ path: '/cumulative' }">累计应税所得初始化</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="{path:'/salarySet',query:{'isEdit':true}}">设置工资表</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span class="refresh" @click="refresh">
          <i class="iconshuaxin iconfont"></i>刷新
        </span>
      </div>
      <div slot="fs-container" class="content-st">
        <div class="step-box" v-if="active!==4" >
            <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
              <el-step title="开始" class="first-step"></el-step>
              <el-step title="核对人员" @click.native = "goStep(1)"style="cursor: pointer;"></el-step>
              <el-step title="核算薪资" @click.native = "goStep(2)" style="cursor: pointer;"></el-step>
              <el-step title="发放薪资" @click.native = "goStep(3)" style="cursor: pointer;"></el-step>
              <el-step title="结束" disabled></el-step>
            </el-steps>
        </div>
        <div class="view-content">
          <check-staff v-if="active==1"></check-staff>
          <calc-wages v-if="active==2"></calc-wages>
          <payment v-if="active==3" @changeActive="changeActive"></payment>
          <salarySend v-if="active==4" @changeActive="changeActive"></salarySend>
        </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import checkStaff from "./components/check-staff";
import calcWages from "./components/calc-wages";
import payment from "./components/payment";
import salarySend from "./components/salarySend"
import { mapState } from "vuex";
export default {
  components: {
    fullScreen,
    checkStaff,
    calcWages,
    payment,
    salarySend
  },
  data() {
    return {
      active: typeof (this.$route.query.active) == "string" ? this.$route.query.active-0 : this.$route.query.active-0
    };
  },
  computed:{
     ...mapState("salaryCalStore", {
        salaryItem: "salaryItem",
      })
  },

  mounted(){
    console.log(this.salaryItem)
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
      this.replaceRoute(data)
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
