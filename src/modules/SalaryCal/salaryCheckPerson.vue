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
              <el-dropdown-item>累计专项附加扣除</el-dropdown-item>
              <el-dropdown-item>累计应税所得初始化</el-dropdown-item>
              <el-dropdown-item>设置工资表</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span class="refresh">
          <i class="iconshuaxin iconfont"></i>刷新
        </span>
      </div>
      <div slot="fs-container">
        <div class="step-box">
          <el-steps :active="active" finish-status="success" class="steps" :align-center="true">
            <el-step title="核对人员"  @click.native="active = 0" style="cursor: pointer;"></el-step>
            <el-step title="核算薪资" @click.native="active = 1" style="cursor: pointer;"></el-step>
            <el-step title="发放薪资"></el-step>
          </el-steps>
          <el-button-group class="turn-page">
            <el-button icon="el-icon-arrow-left" @click="handlePrve">上一页</el-button>
            <el-button @click="handleNext">
              下一页
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </div>
        <check-staff v-if="active==0"></check-staff>
        <calc-wages v-if="active==1"></calc-wages>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import checkStaff from "./components/check-staff";
import calcWages from "./components/calc-wages";
export default {
  components: {
    fullScreen,
    checkStaff,
    calcWages
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    handle(val){
      console.log(val)
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
      margin: 100px auto 0;
    }
    .turn-page {
      position: absolute;
      right: 20px;
      bottom: 10px;
    }
  }
}
</style>
