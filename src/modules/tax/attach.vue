<template>
  <div class="tax el-diy-month">
    <header class="header main-title">
      <el-row type="flex">
        <el-col :span="12">
          <span>专项附加扣除</span>
        </el-col>
      </el-row>
    </header>
    <div class="tax-content">
      <div class="content-header">
        <i class="el-icon-arrow-left"></i>
        <span>{{selectMonth}}</span>
        <el-date-picker
          v-model="selectMonth"
          type="month"
          @input="changeMonth"
          value-format="yyyy年MM月"
          :editable="false"
          :clearable="false"
        ></el-date-picker>
        <i class="el-icon-arrow-left rotate-el-icon-arrow-left"></i>
      </div>
      <p class="tax-attach-tips">点击更新后，系统将自动从税务系统中下载本年度截至当前税款所属期员工的累计专项附加扣除额，累计值将用于本月薪资核算</p>
      <div class="screening">
        <div class="company-collection">
          <div
            v-for="(item,index) in taxSubjectInfolist"
            :key="index"
            class="company-item clearfix"
          >
            <span class="company-name left">{{item.taxSubName}}</span>
            <span
              class="download-total left"
            >已下载 {{item.downloadCount||0}} 人的数据 {{item.downloadDate}}</span>
            <span class="update-value right" @click="handleShowUpdated(item)">更新累计值</span>
          </div>
        </div>
        <div class="clearfix check-staff-menu">
          <el-input
            placeholder="请输入姓名\手机号"
            v-model="totalListForm.nameOrMore"
            prefix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            @keyup.enter.native="handleSearch"
            class="search-input left"
          ></el-input>
          <div class="left">
            <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
          </div>
          <div class="right">
            <el-button type="warning" plain class="export-button" @click="handleExport">导出</el-button>
          </div>
        </div>
        <div class="select_tax-payer">
          扣缴义务人：
          <el-dropdown trigger="click">
            <el-button type="text">
              <em>{{currentTaxSubName}}</em>
              <em class="iconsanjiao iconfont"></em>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in taxSubjectInfolist"
                :key="index"
                @click.native="handleCheckTaxSubject(item)"
              >{{item.taxSubName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="staff-table">
          <!-- <div class="floating-menu">
        <span>删除</span>
          </div>-->
          <el-table
            :data="list"
            class="check-staff_table"
            :style="{width:screenWidth-285+'px'}"
            v-loading="loading"
          >
            <el-table-column width="55" label="序号" type="index"></el-table-column>
            <el-table-column prop="empName" label="姓名" width="130"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" width="180"></el-table-column>
            <el-table-column prop="empDay" label="入职日期" width="180"></el-table-column>
            <el-table-column prop="totalChildrenEdu" label="累计子女教育" width="140"></el-table-column>
            <el-table-column prop="totalFurtherEdu" label="累计继续教育" width="140"></el-table-column>
            <el-table-column prop="totalHomeLoads" label="累计住房贷款利息" width="140"></el-table-column>
            <el-table-column prop="totalHouseRent" label="累计住房租金" width="140"></el-table-column>
            <el-table-column prop="totalSupportParents" label="累计赡养老人" width="140"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            :page-size="totalListForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[20, 50, 100, 200]"
            class="staff-page"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="输入密码" :visible.sync="isShowUpdate" width="450px" center class="diy-el_dialog">
      <el-form
        :rules="updateRules"
        label-width="110px"
        ref="updatedForm"
        class
        :model="updatedFormData"
      >
        <el-form-item label="企业名称：">
          <span class="company-name">{{currenCompanyName}}</span>
        </el-form-item>
        <el-form-item label="请输入密码：" prop="password">
          <el-input type="password" v-model="updatedFormData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateValue">确定</el-button>
        <el-button @click="isShowUpdate=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
let month = new Date().getMonth() + 1;
let defaultDate =
  new Date().getFullYear() + "年" + (month > 10 ? month : "0" + month) + "月";

import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      loading: false,
      totalListForm: {
        currPage: 1,
        pageSize: 20,
        queryMonth: "",
        taxSubjectId: "",
        nameOrMore: ""
      },
      currenCompanyName: "",
      updatedFormData: {
        date: "",
        password: "",
        taxSubjectId: ""
      },
      taxSubjectInfolist: [],
      currentTaxSubName: "",
      selectMonth: defaultDate,
      isShowUpdate: false,
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      list: [],
      total: 0,
      updateRules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.formatQuerymonth(this.selectMonth);
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    this.getTaxSubjectInfoList();
  },
  methods: {
    handleExport() {
      this.$store.dispatch(
        "taxPageStore/actionOtherTotalExport",
        this.totalListForm
      );
    },
    //扣缴义务人集合
    getTaxSubjectInfoList() {
      this.$store
        .dispatch(
          "taxPageStore/actionTaxSubjectInfoList",
          this.totalListForm.queryMonth
        )
        .then(res => {
          if (res.success) {
            this.taxSubjectInfolist = res.data;
            this.totalListForm.taxSubjectId = this.taxSubjectInfolist[0].taxSubId;
            this.currentTaxSubName = this.taxSubjectInfolist[0].taxSubName;
            this.getList();
          }
        });
    },
    //切换扣缴义务人
    handleCheckTaxSubject(item) {
      this.totalListForm.taxSubjectId = item.taxSubId;
      this.currentTaxSubName = item.taxSubName;
      this.totalListForm.currPage = 1;
      this.getList();
    },
    formatQuerymonth(defaultDate) {
      let currentDate = defaultDate.replace("年", "-");
      this.totalListForm.queryMonth = currentDate.replace("月", "");
    },
    changeMonth(month) {
      this.totalListForm.currPage = 1;
      this.formatQuerymonth(month);
      this.getTaxSubjectInfoList();
    },
    handleSearch() {
      this.totalListForm.currPage = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.totalListForm.pageSize = val;
      this.totalListForm.currPage = 1;
      this.getList();
    },
    handleUpdateValue() {
      this.$refs.updatedForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch(
              "taxPageStore/actionDownloadOtherTotal",
              this.updatedFormData
            )
            .then(res => {
              if (res.success) {
                this.isShowUpdate = false;
                this.getList();
              }
            });
        }
      });
    },
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionOtherTotalList", this.totalListForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.total = res.data.count;
            this.list = res.data.data;
          }
        });
    },
    //显示更新累计值框
    handleShowUpdated(item) {
      this.updatedFormData.date = this.totalListForm.queryMonth;
      this.currenCompanyName = item.taxSubName;
      this.updatedFormData.taxSubjectId = item.taxSubId;
      this.isShowUpdate = true;
      this.updatedFormData.password = "";
    },
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
    border-bottom: 1px solid #ededed;
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
      padding: 20px 0;
      overflow-y: scroll;
      background: rgba(247, 248, 250, 1);
      font-size: 14px;
      color: #333333;
      .company-item {
        margin-bottom: 15px;
      }
      .company-item:last-child {
        margin-bottom: 0;
      }
      .company-name {
        padding-left: 40px;
        @include ellipsis;
        width: 200px;
        display: inline-block;
      }
      p {
        margin-top: 7px;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 500;
        text-overflow: ellipsis;
      }
      .update-value {
        height: 35px;
        margin-right: 50px;
        color: $mainColor;
        cursor: pointer;
      }
    }
    .download-total {
      color: #666;
      margin-left: 50px;
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
  .tax-search {
    margin-left: 20px;
  }
  .screening {
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
  .diy-el_dialog {
    .company-name {
      @include ellipsis;
      width: 200px;
      display: inline-block;
    }
  }
}
</style>

