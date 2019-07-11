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
            <p>北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫</p>
            <p>北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫</p>
            <p>北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫北京懒猫</p>
          </div>
          <div class="left download-total">已下载 52 人的数据 2019-04-05 09:50</div>
          <div class="right">
            <el-button type="primary">下载累计值</el-button>
            <el-button type="default">重下累计值</el-button>
          </div>
        </div>
        <div class="clearfix check-staff-menu">
          <el-input
            placeholder="请输入姓名\手机号"
            v-model="input"
            suffix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            class="search-input left"
          ></el-input>
          <div class="right">
            <el-button type="warning" plain class="export-button">导出</el-button>
          </div>
        </div>
        <div class="select_tax-payer">
          纳税主体：
          <el-dropdown trigger="click">
            <el-button type="text">
              <em>懒猫联银科技有限公司</em>
              <em class="iconsanjiao iconfont"></em>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>懒猫联银科技有限公司</el-dropdown-item>
              <el-dropdown-item>北京阿拉钉科技有限公司</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
            <el-table-column width="55" label="序号" type="index"></el-table-column>
            <el-table-column prop="date" label="姓名" width="140"></el-table-column>
            <el-table-column prop="name" label="身份证号" width="140"></el-table-column>
            <el-table-column prop="address" label="入职日期" width="140"></el-table-column>
            <el-table-column prop="address" label="累计子女教育" width="140"></el-table-column>
            <el-table-column prop="address" label="累计继续教育" width="140"></el-table-column>
            <el-table-column prop="address" label="累计住房贷款利息" width="140"></el-table-column>
            <el-table-column prop="address" label="累计住房租金" width="140"></el-table-column>
            <el-table-column prop="address" label="累计赡养老人" width="140"></el-table-column>
          </el-table>
          <el-pagination
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="1000"
            class="staff-page"
          ></el-pagination>
        </div>
        <div class="footnotes">
          <strong>说明</strong>
          <p>1、点击【重下累计值】后，先删除本月该纳税主体中全部员工的专项附加累计数据，然后重新重税务系统中下载</p>
        </div>
      </div>
    </div>
    <el-dialog  :visible.sync="isShowScreening" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      isShowScreening:false,
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
      height: 80px;
      margin-right: 91px;
      overflow-y: scroll;
      width: 200px;
      font-size: 14px;
      color: #333333;
      p {
        margin-top: 7px;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 500;
        text-overflow: ellipsis;
      }
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
    .select_tax-payer {
      margin-top: 18px;
      font-size: 14px;
      color: #999;
      em {
        font-style: normal;
        color: #333;
        font-weight: 400;
      }
    }
    .footnotes {
      margin-top: 10px;
      p {
        margin-top: 10px;
        color: #999;
        font-size: 12px;
      }
    }
  }
  .check-staff-menu {
    border-top: 1px solid #eee;
    margin-top: 30px;
    padding-top: 30px;
    .search-input {
      width: 250px;
    }
    .export-button {
      color: #ff8f2c;
      border: 1px solid #ff8f2c;
      background: #fff;
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

