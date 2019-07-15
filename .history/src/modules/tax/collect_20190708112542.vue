<template>
  <div class="tax el-diy-month">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>人员信息采集</span>
        </el-col>
      </el-row>
    </header>
    <p class="tax-collect-tips">自动获取工资表当月的增减员名单，您只需选择人员“报送”即可，报送后系统会在个税系统中完成人员信息采集</p>
    <div class="tax-content">
      <div class="content-header">
        <i class="el-icon-arrow-left"></i>
        <span>{{currentDate}}</span>
        <el-date-picker
          v-model="currentDate"
          type="month"
          value-format="yyyy年MM月"
          :editable="false"
          :clearable="false"
        ></el-date-picker>
        <i class="el-icon-arrow-left rotate-el-icon-arrow-left"></i>
      </div>
      <div class="screening">
        <div class="clearfix check-staff-menu">
          <div class="left">
            <el-button type="default">筛选</el-button>
            <el-button type="default">
              人员状态
              <i class="iconsanjiao iconfont"></i>
            </el-button>
            <el-button type="default">
              是否雇员
              <i class="iconsanjiao iconfont"></i>
            </el-button>
          </div>
          <el-input
            placeholder="请输入姓名\手机号"
            v-model="input"
            suffix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            class="search-input left"
          ></el-input>
          <div class="right">
            <el-button type="primary" @click="isShowIncrease = true" class="add-import">增员导入</el-button>
            <el-dropdown trigger="click">
              <el-button type="default">
                更多
                <i class="iconsanjiao iconfont"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>全部删除</el-dropdown-item>
                <el-dropdown-item>导出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="staff-situation">
          <span class="staff-total">
            人员总数
            <i>10</i>人
          </span>
          <span>
            本月：入职
            <i>1</i>人
          </span>
          <span>
            调动
            <i>1</i>人
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      value: "",
      options: [
        {
          value: "本月第1次发薪",
          label: "本月第一次发薪"
        }
      ],
      currentDate: "2019年03月"
    };
  },
  methods: {
    handleCalcSalary() {
      this.$router.push("/salary-cal/start");
    },
    goSalarySet() {
      this.$router.push("/salarySet");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.tax {
  .header {
    padding: 0 20px;
    font-size: 14px;
    height: 61px;
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
  .tax-collect-tips {
    background: #fff6e2;
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    color: #666;
  }
  .tax-content {
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
  }
  .screening {
    .check-staff-menu {
      .search-input {
        width: 205px;
      }
    }
    .add-import {
      margin-right: 10px;
    }
    .iconiconfonticonfontsousuo1 {
      font-size: 12px;
    }
    .staff-situation {
      .staff-total {
        border-right: 1px solid #e6e6e6;
        padding-right: 15px;
        margin-right: 15px;
      }
      margin-top: 20px;
      color: #999;
      font-size: 12px;
      i {
        color: $mainColor;
        font-style: normal;
        padding: 0 3px;
      }
    }
    .staff-table {
      .check-staff_table {
        overflow-x: auto;
      }
      position: relative;
      margin-top: 27px;
      .floating-menu {
        position: absolute;
        left: 100px;
        width: 500px;
        z-index: 99;
        top: 0;
        line-height: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 3px;
        color: #fff;
        span {
          margin: 0 10px;
        }
      }
      .staff-page {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
}
</style>

