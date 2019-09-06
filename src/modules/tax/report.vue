<template>
  <div class="tax el-diy-month">
    <header class="header main-title">
      <el-row type="flex">
        <el-col :span="12">
          <span>综合所得申报</span>
        </el-col>
      </el-row>
    </header>
    <div class="tax-content">
      <div class="content-header head-date">
        <span>{{selectDate}}</span>
        <el-date-picker
          v-model="selectDate"
          type="month"
          @input="changeMonth"
          value-format="yyyy年MM月"
          :editable="false"
          :clearable="false"
        ></el-date-picker>
      </div>
      <!--      <p class="tax-attach-tips">请在每月1-15号之间完成上月的申报表报送</p>-->
      <div class="screening">
        <div class="clearfix">
          <div class="select_tax-payer left">
            扣缴义务人：
            <el-dropdown trigger="click">
              <el-button type="text">
                <em class="current-tab-sub_name">{{currentTaxSubName}}</em>
                <em class="iconsanjiao iconfont"></em>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in taxSubjectInfolist"
                  :key="index"
                  @click.native="handleCheckTaxSubject(item)"
                  class="current-tab-sub_name"
                >{{item.taxSubName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="staff-total">
              申报类型：
              <i>{{reportObj.reportType}}</i>
            </span>
            <span class="staff-total">
              申报状态：
              <i>{{reportObj.reportStatus}}</i>
            </span>
          </div>
          <div class="right declare-buttton-groups">
            <el-button type="primary" v-if="showGenerate" @click="handleGenerateData">生成申报数据</el-button>
            <el-button type="primary" v-if="showUpdate" @click="handleGenerateData">更新申报数据</el-button>
            <el-button type="primary" v-if="showExport" @click="handleExportApplyTable">导出申请表</el-button>
            <el-button
              type="primary"
              @click="handleSendReport"
              v-if="showButton(['未申报','申报失败'])"
            >发送申报</el-button>
            <el-button
              type="primary"
              v-if="showButton(['申报处理中','作废处理中'])"
              @click="handleGetFeedback"
            >获取反馈</el-button>
            <el-button type="primary" v-if="showButton(['申报成功'])" @click="handleInvalid">作废申报</el-button>
          </div>
        </div>
        <div class="staff-table">
          <el-table
            :data="list"
            class="check-staff_table"
            :style="{width:screenWidth-285+'px'}"
            v-loading="loading"
          >
            <el-table-column prop="subTaxReportType" label="报表名称" width="180">
              <template slot-scope="scope">
                <span>{{reportSubTaxReportType(scope.row.subTaxReportType)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="taxEmpCounts" label="纳税人数" width="170"></el-table-column>
            <el-table-column prop="currentTotalIncome" label="本期收入" width="180"></el-table-column>
            <el-table-column prop="hisTotalIncome" label="累计收入" width="180"></el-table-column>
            <el-table-column prop="calculateTaxTotal" label="应扣缴税额" width="180"></el-table-column>
            <el-table-column prop="realTaxTotal" label="已缴税额" width="180"></el-table-column>
            <el-table-column prop="taxDiffTotal" label="应补(退)税额" width="180"></el-table-column>
            <el-table-column prop="reportEnabled" label="是否可申报" width="140">
              <template slot-scope="scope">
                <span>{{rePortEnabled(scope.row.reportEnabled)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            :page-size="reportForm.pageSize"
            :page-sizes="[20, 50, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="staff-page"
          ></el-pagination>
        </div>
        <div class="footnotes" v-if="isSendReport">
          <p>局端服务器处理结果如下：</p>
          <p>您发送的申报正在处理，请稍后获取反馈信息，谢谢！</p>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示信息"
      :visible.sync="isShowAbnormal"
      width="550px"
      center
      class="diy-el_dialog"
    >
      <el-table :data="abnormalList">
        <el-table-column prop="empName" label="姓名" width="120"></el-table-column>
        <el-table-column prop="idNo" label="证件号码" width="140"></el-table-column>
        <el-table-column label="备注">
          <template>请在采集表中调整为正常并报关</template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAbnormal=false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="输入密码"
      :visible.sync="isShowPassword"
      width="450px"
      center
      class="diy-el_dialog"
    >
      <el-form
        :rules="passwordRules"
        label-width="110px"
        ref="refPassword"
        class
        :model="buttonForm"
      >
        <el-form-item label="请输入密码：" prop="password">
          <el-input type="password" v-model="buttonForm.password"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码：" prop="capText">
          <el-input type="text" v-model="buttonForm.capText" style="width:90px"></el-input>
          <img :src="imgCodeSrc" alt class="dialog-cap_test" @click="getCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitPassword">确定</el-button>
        <el-button @click="isShowPassword=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
let month = new Date().getMonth() + 1;
let defaultDate =
  new Date().getFullYear() + "年" + (month > 10 ? month : "0" + month) + "月";
import { mapState } from "vuex";
import * as SCR from "./util/constData";
export default {
  computed: {
    //当前日期在15号之前且所选月份是上月或本月以及申报状态为空以及所选年为当年
    //当前日期在15号之后且所选是年月为当年当月以及申报状态为空
    //生成申报数据按钮
    showGenerate() {
      if (this.currentDay < 16) {
        //所选为上月且不是1月份
        if (
          this.currentMonth != 1 &&
          this.selectMonth == this.currentMonth - 1 &&
          this.selectYear == this.currentYear
        ) {
          if (!this.reportObj.reportStatus) {
            return true;
          }
        }
        //所选月为上月且是1月
        else if (
          this.currentMonth == 1 &&
          this.selectMonth == 12 &&
          this.selectYear == this.currentYear - 1
        ) {
          if (!this.reportObj.reportStatus) {
            return true;
          }
        }
        //所选月为本月
        else if (
          this.currentMonth == this.selectMonth &&
          this.selectYear == this.currentYear
        ) {
          if (!this.reportObj.reportStatus) {
            return true;
          }
        }
      } else if (
        this.selectMonth == this.currentMonth &&
        this.list.length == 0 &&
        this.selectYear == this.currentYear
      ) {
        return true;
      }
      return false;
    },
    //当前日期在15号之前且所选月份是上月或本月以及申报状态为未申报以及所选年为今年
    //当前日期在15号之后且所选是年月为当年当月以及已生成数据
    //更新申报数据按钮
    showUpdate() {
      if (this.currentDay < 16) {
        //所选为上月且不是1月份
        if (
          this.currentMonth != 1 &&
          this.selectMonth == this.currentMonth - 1 &&
          this.selectYear == this.currentYear
        ) {
          if (
            this.reportObj.reportStatus == "未申报" ||
            this.reportObj.reportStatus == "申报成功" ||
            this.reportObj.reportStatus == "申报失败"
          ) {
            return true;
          }
        }
        //所选月为上月且是1月
        else if (
          this.currentMonth == 1 &&
          this.selectMonth == 12 &&
          this.selectYear == this.currentYear - 1
        ) {
          if (
            this.reportObj.reportStatus == "未申报" ||
            this.reportObj.reportStatus == "申报成功" ||
            this.reportObj.reportStatus == "申报失败"
          ) {
            return true;
          }
        }
        //所选月为本月
        else if (
          this.currentMonth == this.selectMonth &&
          this.selectYear == this.currentYear
        ) {
          if (this.reportObj.reportStatus == "未申报") {
            return true;
          }
        }
      } else if (
        this.selectMonth == this.currentMonth &&
        this.list.length > 0 &&
        this.selectYear == this.currentYear
      ) {
        return true;
      }
      return false;
    },
    //当前日期在15号之前且所选月份是上月或本月以及申报状态为未申报以及所选年为今年
    //当前日期在15号之前且不是当年当月且不是当年上月以及已生成数据
    //当前日期在15号之后且所选年是当年当月且已生成数据
    //当前日期在15号之后且不是本月且已生成数据
    //导出申请报按钮
    showExport() {
      if (this.currentDay < 16) {
        //所选为上月且不是1月份
        if (
          this.currentMonth != 1 &&
          this.selectMonth == this.currentMonth - 1 &&
          this.selectYear == this.currentYear
        ) {
          if (
            this.reportObj.reportStatus == "未申报" ||
            this.reportObj.reportStatus == "申报成功" ||
            this.reportObj.reportStatus == "申报失败"
          ) {
            return true;
          }
        }
        //所选月为上月且是1月
        else if (
          this.currentMonth == 1 &&
          this.selectMonth == 12 &&
          this.selectYear == this.currentYear - 1
        ) {
          if (
            this.reportObj.reportStatus == "未申报" ||
            this.reportObj.reportStatus == "申报成功" ||
            this.reportObj.reportStatus == "申报失败"
          ) {
            return true;
          }
        }
        //所选月为本月
        else if (
          this.currentMonth == this.selectMonth &&
          this.selectYear == this.currentYear
        ) {
          if (this.reportObj.reportStatus == "未申报") {
            return true;
          }
        }
        //其它月份
        else if (this.list.length > 0) {
          return true;
        }
      } else if (this.list.length > 0) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      imgCodeSrc: "",
      abnormalList: [],
      isShowAbnormal: false,
      currentPasItem: "",
      passwordRules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        capText: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      //是否显示处理信息
      isSendReport: false,
      loading: false,
      currentYear: new Date().getFullYear(),
      currentDay: new Date().getDate(),
      currentMonth: month,
      selectYear: "",
      selectMonth: "",
      statusType: SCR,
      buttonForm: {
        capText: "",
        date: "",
        password: "",
        taxSubjectId: "",
        queryMonth: ""
      },
      reportForm: {
        currPage: 1,
        pageSize: 20,
        queryMonth: "",
        taxSubjectId: "",
        nameOrMore: ""
      },
      list: [],
      total: 0,
      reportObj: {
        reportStatus: "",
        reportType: ""
      },
      isShowPassword: false,
      taxSubjectInfolist: [],
      currentTaxSubName: "",
      selectDate: defaultDate,
      isShowScreening: false,
      screenWidth: document.body.clientWidth // 屏幕尺寸
    };
  },
  mounted() {
    this.getCode();
    this.getTaxSubjectInfoList();
    this.formatQuerymonth(this.selectDate);
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    getCode() {
      this.$store.dispatch("getCode").then(res => {
        this.imgCodeSrc = res.data;
      });
    },
    reportSubTaxReportType(params) {
      return SCR.subTaxReportType[params];
    },
    handleInvalid() {
      this.buttonForm.date = this.reportForm.queryMonth;
      this.buttonForm.taxSubjectId = this.reportForm.taxSubjectId;
      this.currentPasItem = "invalid";
      this.isShowPassword = true;
    },
    handleGetFeedback() {
      this.buttonForm.taxSubjectId = this.reportForm.taxSubjectId;
      this.buttonForm.date = this.reportForm.queryMonth;
      this.$store
        .dispatch("taxPageStore/postGetReportBack", this.buttonForm)
        .then(res => {
          if (res.success) {
            this.getList(true);
          }
        });
    },
    //生成申报数据
    handleGenerateData() {
      this.buttonForm.queryMonth = this.reportForm.queryMonth;
      this.buttonForm.taxSubjectId = this.reportForm.taxSubjectId;
      this.$store
        .dispatch("taxPageStore/postGenerateTaxReportData", this.buttonForm)
        .then(res => {
          if (res.success) {
            this.getList(true);
          }
        });
    },
    //发送申报
    handleSendReport() {
      this.isSendReport = true;
      this.buttonForm.taxSubjectId = this.reportForm.taxSubjectId;
      this.buttonForm.date = this.reportForm.queryMonth;
      this.buttonForm.queryMonth = this.reportForm.queryMonth;
      this.currentPasItem = "send";
      this.$store
        .dispatch("taxPageStore/postCheckReportData", this.buttonForm)
        .then(res => {
          this.isSendReport = false;
          if (res.success) {
            if (res.data.length == 0) {
              this.isShowPassword = true;
            } else {
              this.abnormalList = res.data;
              this.isShowAbnormal = true;
            }
          }
        });
    },
    //密码提交
    handleSubmitPassword() {
      this.$refs.refPassword.validate(valid => {
        if (this.currentPasItem == "send") {
          this.$store
            .dispatch("taxPageStore/postSendReport", this.buttonForm)
            .then(res => {
              if (res.success) {
                this.$message({
                  message:
                    "当前" +
                    this.selectDate +
                    "申请表已发送申报，请在申请表中获取反馈",
                  type: "success"
                });
                this.getList();
              }
            });
        } else if (this.currentPasItem == "invalid") {
          this.$store
            .dispatch("taxPageStore/postCancelSubTaxReport", this.buttonForm)
            .then(res => {
              if (res.success) {
                this.getList(true);
              }
            });
        }
      });
    },
    //导出申请报
    handleExportApplyTable() {
      this.buttonForm.taxSubjectId = this.reportForm.taxSubjectId;
      this.buttonForm.date = this.reportForm.queryMonth;
      this.$store.dispatch(
        "taxPageStore/getSubTaxReportExport",
        this.buttonForm
      );
    },
    showButton(arr) {
      if (this.currentDay < 16) {
        //所选为上月且不是1月份
        if (
          this.currentMonth != 1 &&
          this.selectMonth == this.currentMonth - 1 &&
          this.selectYear == this.currentYear
        ) {
          if (arr.indexOf(this.reportObj.reportStatus) > -1) {
            return true;
          }
        }
        //所选月为上月且是1月
        else if (
          this.currentMonth == 1 &&
          this.selectMonth == 12 &&
          this.selectYear == this.currentYear - 1
        ) {
          if (arr.indexOf(this.reportObj.reportStatus) > -1) {
            return true;
          }
        }
      }
      return false;
    },
    rePortEnabled(item) {
      let obj = {
        Y: "是",
        N: "否"
      };
      return obj[item];
    },
    changeMonth(month) {
      this.formatQuerymonth(month);
      this.getList();
    },
    formatQuerymonth(defaultDate) {
      let currentDate = defaultDate.replace("年", "-");
      this.reportForm.queryMonth = currentDate.replace("月", "");
    },
    getTaxSubjectInfoList() {
      this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res => {
        if (res.success) {
          this.taxSubjectInfolist = res.data;
          this.reportForm.taxSubjectId = this.taxSubjectInfolist[0].taxSubId;
          this.currentTaxSubName = this.taxSubjectInfolist[0].taxSubName;
          this.getList();
        }
      });
    },
    //切换扣缴义务人
    handleCheckTaxSubject(item) {
      this.reportForm.taxSubjectId = item.taxSubId;
      this.currentTaxSubName = item.taxSubName;
      this.reportForm.currPage = 1;
      this.getList();
    },
    changeMonth(month) {
      this.formatQuerymonth(month);
      this.reportForm.currPage = 1;
      this.getList();
    },
    handleCalcSalary() {
      this.$router.push("/salary-cal/start");
    },
    goSalarySet() {
      this.$router.push("/salarySet");
    },
    handleSizeChange(val) {
      this.reportForm.pageSize = val;
      this.reportForm.currPage = 1;
      this.getList();
    },
    getList(flag) {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionTaxReportTotalList", this.reportForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.selectYear = this.reportForm.queryMonth.substr(0, 4);
            this.selectMonth = this.reportForm.queryMonth.substr(6, 2);
            this.reportObj.reportStatus = this.statusType.declareStatus[
              res.data.reportStatus
            ];
            this.reportObj.reportType = this.statusType.declareType[
              res.data.reportType
            ];
            this.total = res.data.count;
            this.list = res.data.data;
            if (this.list.length == 0 && flag) {
              this.$message({
                message: "扣缴义务人本月无申报数据",
                type: "warning"
              });
            }
          }
        });
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
    .staff-total {
      margin-left: 15px;
      color: #333;
      i {
        font-style: normal;
        color: #ff8f2c;
      }
    }
    margin-top: 18px;
    padding-top: 18px;
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
  .current-tab-sub_name {
    @include ellipsis;
    width: 200px;
    display: inline-block;
  }
}
</style>

