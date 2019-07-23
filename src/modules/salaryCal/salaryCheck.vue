<template>
  <div class="check-staff sflary-el-step">
    <full-screen :fsTitle="'月度工资表'" :bgColor="'#fff'">
      <div slot="fs-buttons" class="header-button">
        <span class="collect" v-if="active==0">
          <i class="iconqiyexinxicaiji iconfont"></i>个税系统人员人信息采集
        </span>
        <div class="more-operation" v-if="active==1">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i>...</i>更多
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link :to="{ path: '/tax/attach' }">累计专项附加扣除</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="{ path: '/cumulative' }">累计应税所得初始化</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="{path:'/salarySet',query:{'selectStep':2}}">设置工资表</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span class="refresh">
          <i class="iconshuaxin iconfont"></i>刷新
        </span>
      </div>
      <div slot="fs-container">
        <div class="step-box" v-if="active!==3">
          <el-steps :active="active" finish-status="success" class="steps" :align-center="true">
            <el-step title="核对人员"  @click.native="active = 0" style="cursor: pointer;"></el-step>
            <el-step title="核算薪资" @click.native="active = 1" style="cursor: pointer;"></el-step>
            <el-step title="发放薪资" @click.native="active = 2" style="cursor: pointer;"></el-step>
          </el-steps>
          <el-button-group class="turn-page">
            <el-button icon="el-icon-arrow-left" @click="handlePrve">上一步</el-button>
            <el-button @click="handleNext">
              下一步
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </div>
        <check-staff v-if="active==0"></check-staff>
        <calc-wages v-if="active==1"></calc-wages>
        <payment v-if="active==2" @changeActive="changeActive"></payment>
        <salarySend v-if="active==3" @changeActive="changeActive"></salarySend>
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
  methods: {
    handle(val){
      console.log(val)
    },
    changeActive(data){
      this.active = data;
    },
    handlePrve() {
      if (this.active != 0) {
        this.active--;
      }
    },
    handleNext() {
      if (this.active != 2) {
        this.active++;
      }
    },
  //  设置工资表
    salarySet(){
      this.$router.push({path:'/salarySet',query:{'selectStep':2}});
      // console.log(this.$route.query)
      // // this.$store.commit("salaryCalStore/SET_ROULEID", this.$router.query.id);
    }

  }
};
</script>
<style lang="scss" scoped>
.check-staff {
  .more-operation {
    display: inline-block;
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
    position: relative;
    .steps {
      width: 690px;
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
