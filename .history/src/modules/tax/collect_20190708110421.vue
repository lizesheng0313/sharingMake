<template>
  <div class="tax">
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
      <div class="salary-payroll">
        <div class="payroll-box">
          <el-row type="flex">
            <el-col :span="12">
              <div>
                <div>
                  <strong>月度工资表</strong>
                  <el-dropdown trigger="click" class="more-operation">
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
                  算薪周期：2019-03-01 ~ 2019-03-31
                  <span class="calc-type">未计算</span>
                </p>
                <p>计税规则:工资薪金所得计税</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="start-calc">
                <el-select v-model="value" placeholder="请选择" class="number-payday">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <el-button type="primary" @click="handleCalcSalary">启动算薪</el-button>
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
  .tax-collect-tips{
    background:#FFF6E2;
    padding-left:20px;
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

