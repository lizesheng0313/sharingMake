<template>
  <div class="check-staff el-diy-month cumulative">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>累计应税所得额初始化</span>
        </el-col>
      </el-row>
    </header>
    <p class="tax-collect-tips">自动获取工资表当月的增减员名单，您只需选择人员“报送”即可，报送后系统会在个税系统中完成人员信息采集</p>
    <div class="clearfix check-staff-menu">
      <div class="left">
        <el-select v-model="ruleForm.queryYear" placeholder="请选择" @change="handleChange">
          <el-option v-for="(item,index) in selectYear" :key="index" :value="item"></el-option>
        </el-select>
      </div>
      <el-input
        placeholder="请输入姓名\手机号"
        v-model="ruleForm.nameOrEmpNo"
        suffix-icon="iconiconfonticonfontsousuo1 iconfont"
        clearable
        class="search-input left"
      ></el-input>
      <div class="right">
        <el-button type="primary" @click="isShowIncrease = true" class="add-import">导入</el-button>
      </div>
    </div>
    <div class="staff-table">
      <!-- <div class="floating-menu">
        <span>删除</span>
      </div>-->
      <el-table :data="list" class="check-staff_table" :style="{width:screenWidth-285+'px'}">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column prop="taxSubName" label="纳税主体" width="140"></el-table-column>
        <el-table-column prop="empName" label="姓名" width="140"></el-table-column>
        <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
        <el-table-column prop="idNo" label="证件号码" width="140"></el-table-column>
        <el-table-column prop="endMonth" label="截止月份" width="140"></el-table-column>
        <el-table-column prop="totalIncome" label="累计收入" width="140"></el-table-column>
        <el-table-column prop="spectialDeduction" label="累计专项扣除" width="140"></el-table-column>
        <el-table-column prop="otherDeduction" label="累计其他扣除" width="140"></el-table-column>
        <el-table-column prop="totalDonated" label="累计准予扣除的捐赠" width="140"></el-table-column>
        <el-table-column prop="taxBreakTotal" label="累计减免税额" width="140"></el-table-column>
        <el-table-column prop="taxTotal" label="累计已预缴税额" width="140"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @selection-change="handleSelectionChange"
        :page-size="ruleForm.pageSize"
        layout="prev, pager, next"
        :total="total"
        class="staff-page"
      ></el-pagination>
    </div>
    <el-dialog
      title="累计应纳税所得导入"
      :visible.sync="isShowIncrease"
      width="600px"
      center
      class="diy-el_dialog"
    >
      <div>
        <p class="headings">1、选择导入匹配方式</p>
        <div class="diy-el_radio">
          <el-radio-group v-model="radio">
            <div>
              <el-radio :label="3">通过员工工号匹配人员</el-radio>
            </div>
            <div>
              <el-radio :label="2">通过身份证匹配人员</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="select-file">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :file-list="fileList"
          :on-success="handleScuess"
        >
          <span class="headings">2、</span>
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <p>
          支持xlsx和xls文件，文件不超过5M，建议使用标准模板格式
          <span>下载模板</span>
        </p>
        <p class="instructions">说明：若本年度纳税主体下员工已存在累计值，再次导入后将覆盖原数据</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">导入通过数据</el-button>
        <el-button @click="isShowIncrease = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
let maxYear = new Date().getFullYear();
let year = [];
for (let i = maxYear; i >= 2017; i--) {
  year.push(i);
}
export default {
  data() {
    return {
      selectYear: year,
      ruleForm: {
        nameOrEmpNo: "",
        currPage: 1,
        pageSize: 1,
        queryYear: year[0]
      },
      total: 0,
      radio: "",
      fileList: [],
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      input: "",
      isShowIncrease: false,
      list: [],
      currentDate: "2019"
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
    this.getList();
  },
  methods: {
    handleChange(val) {
      this.ruleForm.queryYear = val;
      this.ruleForm.currPage = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      alert(val)
      this.ruleForm.currPage = val;
      this.getList();
    },
    getList() {
      this.$store
        .dispatch("cumulativePageStore/actionTaxTotalBaseList", this.ruleForm)
        .then(res => {
          this.list = res.data.data;
          this.total = res.data.count;
        });
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleScuess() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.check-staff {
  padding: 0 20px;
  box-sizing: border-box;
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

  .check-staff-menu {
    margin-top: 40px;
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
</style>
