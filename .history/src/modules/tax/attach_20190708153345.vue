<template>
  <div class="tax el-diy-month">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>专项附加扣除累计</span>
        </el-col>
      </el-row>
    </header>
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
      <p class="tax-attach-tips">点击下载后，系统将自动从税务系统中下载本年度截至当前税款所属期员工的累计专项附加扣除额，累计值将用于本月薪资核算</p>
      <div class="screening">
        <div class="clearfix">
          <div class="left company-collection">
            <span>北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫</span>
          </div>
          <div class="left download-total">已下载 52 人的数据 2019-04-05 09:50</div>
          <div class="right">
            <el-button type="primary" class="add-import">报送</el-button>
            <el-button type="primary" class="add-import">获取反馈</el-button>
          </div>
        </div>
        <div class="staff-table">
          <!-- <div class="floating-menu">
        <span>删除</span>
          </div>-->
          <el-table
            :data="tableData"
            class="check-staff_table"
            :style="{width:screenWidth-285+'px'}"
          >
            <el-table-column type="selection" width="55" fixed></el-table-column>
            <el-table-column prop="date" label="工号" width="140"></el-table-column>
            <el-table-column prop="name" label="姓名" width="140"></el-table-column>
            <el-table-column prop="address" label="证件类型" width="140"></el-table-column>
            <el-table-column prop="address" label="证件号码" width="140"></el-table-column>
            <el-table-column prop="address" label="人员状态" width="140"></el-table-column>
            <el-table-column prop="address" label="报送状态" width="140"></el-table-column>
            <el-table-column prop="address" label="身份证验证状态" width="140"></el-table-column>
            <el-table-column prop="address" label="是否雇员" width="140"></el-table-column>
            <el-table-column prop="address" label="手机号码" width="140"></el-table-column>
            <el-table-column prop="address" label="国籍" width="140"></el-table-column>
            <el-table-column prop="address" label="任职受雇日期" width="140"></el-table-column>
            <el-table-column prop="address" label="离职日期" width="140"></el-table-column>
            <el-table-column prop="address" label="更新时间" width="140"></el-table-column>
          </el-table>
          <el-pagination
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="1000"
            class="staff-page"
          ></el-pagination>
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
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      tableData: [
        {
          date: "1",
          name: "2",
          address: "123"
        }
      ],
      value: "",
      currentDate: "2019年03月"
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
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
  .tax-attach-tips {
    font-size: 12px;
    color: #666;
    margin-bottom: 20px;
  }
  .tax-content {
    padding: 22px;
    .company-collection {
      height: 60px;
      margin-right: 91px;
      overflow-y: scroll;
      max-width: 200px;
      overflow-x: hidden;
    }
    .download-total {
      margin-top: 35px;
      color: #666;
      font-size: 12px;
    }
    .content-header {
      position: relative;
      font-size: 18px;
      margin-bottom: 18px;
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

