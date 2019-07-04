<template>
  <div class="check-staff sflary-el-step">
    <full-screen :fsTitle="'月度工资表'" :bgColor="'#fff'">
      <div slot="fs-buttons" class="header-button">
        <span class="collect">
          <i class="iconqiyexinxicaiji iconfont"></i>个税系统人员人信息采集
        </span>
        <span class="refresh">
          <i class="iconshuaxin iconfont"></i>刷新
        </span>
      </div>
      <div slot="fs-container">
        <div class="step-box">
          <el-steps :active="active" finish-status="success" class="steps" :align-center="true">
            <el-step title="核对人员"></el-step>
            <el-step title="核算薪资"></el-step>
            <el-step title="发放薪资"></el-step>
          </el-steps>
          <el-button-group class="turn-page">
            <el-button icon="el-icon-arrow-left">上一页</el-button>
            <el-button>
              下一页
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </div>
        <check-staff></check-staff>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import checkStaff from "./components/check-staff";
export default {
  components: {
    fullScreen,
    checkStaff
  },
  data() {
    return {
      active: 2
    };
  }
};
</script>
<style lang="scss" scoped>
.check-staff {
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
