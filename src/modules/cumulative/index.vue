<template>
  <div class="check-staff el-diy-month cumulative">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>累计应税项</span>
        </el-col>
      </el-row>
    </header>
    <!-- <p class="tax-collect-tips">自动获取工资表当月的增减员名单，您只需选择人员“报送”即可，报送后系统会在个税系统中完成人员信息采集</p> -->
    <div class="clearfix check-staff-menu">
      <div class="left">
        <el-select v-model="ruleForm.queryYear" placeholder="请选择" @change="handleChange">
          <el-option v-for="(item,index) in selectYear" :key="index" :value="item"></el-option>
        </el-select>
      </div>
      <el-input
        placeholder="请输入姓名\手机号"
        v-model="ruleForm.nameOrEmpNo"
        prefix-icon="iconiconfonticonfontsousuo1 iconfont"
        @keyup.enter.native="handleSearch"
        clearable
        class="search-input left"
      ></el-input>
      <div class="left">
        <el-button type="primary" class="check-search" @click="handleSearch">查询</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="handleImport" class="add-import">导入</el-button>
      </div>
    </div>
    <div class="staff-table">
      <div class="floating-menu" v-if="deleteIdsForm.ids.length>0">
        <span>已选中{{deleteIdsForm.ids.length}}人</span>
        <el-button size="mini" class="button-mini" @click="handleDeleteItem">批量删除</el-button>
      </div>
      <el-table
        :data="list"
        class="check-staff_table"
        :style="{width:screenWidth-285+'px'}"
        @selection-change="handleSelectItem"
      >
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column prop="taxSubName" label="扣缴义务人" width="140"></el-table-column>
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
            <el-button size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleSelectionChange"
        :page-size="ruleForm.pageSize"
        layout="prev, pager, next"
        :total="total"
        class="staff-page"
      ></el-pagination>
    </div>
    <import-data
      ref="import"
      :radioList="radioList"
      :title="'累计应纳税所得导入'"
      :apiCheck="'/api/taxTotalBase/importTaxTotalBaseCheck'"
      :apiDownloadLog="'cumulativePageStore/getExportErrorRecord'"
      :apiDownloadTemplate="'cumulativePageStore/actionDownloadTemplate'"
      :parameterData="parameterData"
      @changeRadioValue="changeRadioValue"
      :impoartAction="'cumulativePageStore/actionImportTaxTotalBaseSuccess'"
      @getLoading="refresh"
      :uploadFileData="uploadFileData"
    ></import-data>
  </div>
</template>
<script>
let maxYear = new Date().getFullYear();
let year = [];
for (let i = maxYear; i >= 2019; i--) {
  year.push(i);
}
import importData from "@/components/tool/importData";
export default {
  components: {
    importData
  },
  data() {
    return {
      deleteIdsForm: {
        ids: []
      },
      uploadFileData: {
        uuid: ""
      },
      selectYear: year,
      radioList: [
        { lable: "1", title: "通过员工工号匹配人员" },
        { lable: "2", title: "通过身份证匹配人员" }
      ],
      parameterData: {
        type: 1,
        year: ""
      },
      ruleForm: {
        nameOrEmpNo: "",
        currPage: 1,
        pageSize: 20,
        queryYear: year[0]
      },
      total: 0,
      fileList: [],
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      list: []
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
    //表格选中事件
    handleSelectItem(row) {
      this.deleteIdsForm.ids = [];
      row.forEach(element => {
        this.deleteIdsForm.ids.push(element.id);
      });
    },
    changeRadioValue(val) {
      this.parameterData.type = val;
    },
    handleImport() {
      this.parameterData.year = this.selectYear;
      this.$refs.import.show();
    },
    refresh(data) {
      this.ruleForm.nameOrEmpNo = "";
      this.ruleForm.currPage = 1;
      this.getList();
    },
    //通过姓名或工号搜索
    handleSearch() {
      this.ruleForm.currPage = 1;
      this.getList();
    },
    //年份搜索
    handleChange(val) {
      this.ruleForm.queryYear = val;
      this.ruleForm.currPage = 1;
      this.getList();
    },
    //翻页
    handleSelectionChange(val) {
      this.ruleForm.currPage = val;
      this.getList();
    },
    //搜索接口
    getList() {
      this.loading = true;
      this.$store
        .dispatch("cumulativePageStore/actionTaxTotalBaseList", this.ruleForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.list = res.data.data;
            this.total = res.data.count;
          }
        });
    },
    //删除接口
    handleDeleteItem() {
      this.$confirm(
        "您确定删除员工本年的累计数据，如果是，请点击“确定”，如果否，请点击“取消”",
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$store
            .dispatch(
              "cumulativePageStore/actionDelTaxTotalBase",
              this.deleteIdsForm
            )
            .then(res => {
              if (res.success) {
                this.getList();
                this.deleteIdsForm.ids = [];
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除
    handleDelete(id) {
      this.deleteIdsForm.ids = [id];
      this.handleDeleteItem();
    }
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
  .check-search {
    margin-left: 20px;
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

    .staff-page {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
