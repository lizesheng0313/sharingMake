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
            <el-button type="default" @click="isShowScreening=true">筛选</el-button>
          </div>
          <el-input
            placeholder="请输入姓名\手机号"
            v-model="input"
            suffix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            class="search-input left"
          ></el-input>
          <div class="right">
            <el-button type="primary" class="add-import">报送</el-button>
            <el-button type="primary" class="add-import">获取反馈</el-button>
          </div>
        </div>
        <div class="staff-situation">
          <span class="staff-total">
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
          </span>
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
    <el-dialog :visible.sync="isShowScreening" width="45%" center>
      <div class="screening-wapper">
        <el-row type="flex" class="screening-box" align="middle">
          <el-col :span="6">身份证状态</el-col>
          <el-col>
            <span>不限</span>
            <span>待验证</span>
            <span>验证中</span>
            <span>验证通过</span>
            <span>暂不验证</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="screening-box" align="middle">
          <el-col :span="6">报送状态</el-col>
          <el-col>
            <span>不限</span>
            <span>待报送</span>
            <span>待反馈</span>
            <span>报送成功</span>
            <span>报送失败</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="screening-box" align="middle">
          <el-col :span="6">人员状态</el-col>
          <el-col>
            <span>不限</span>
            <span>正常</span>
            <span>非正常</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="screening-box" align="middle">
          <el-col :span="6">是否残孤烈</el-col>
          <el-col>
            <span>不限</span>
            <span>是</span>
            <span>否</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="screening-box" align="middle">
          <el-col :span="6">任职受雇从业类型</el-col>
          <el-col>
            <span>不限</span>
            <span>雇员</span>
            <span>其他</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowScreening = false">取 消</el-button>
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
      input: "",
      isShowScreening: false,
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
    font-size: 12px;
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
        margin-left: 10px;
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
      em {
        color: #333;
        font-style: normal;
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
.screening-box {
  margin-bottom: 20px;
  .el-col-4 {
    text-align: right;
  }
  .el-col-24 {
    margin-left: 15px;
  }
  span {
    display: inline-block;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    margin-right: 10px;
    padding: 5px 15px;
  }
}
</style>

