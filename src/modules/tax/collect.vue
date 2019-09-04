<template>
  <div class="collect">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span>人员信息采集</span>
          </el-col>
        </el-row>
      </header>
      <!-- <p class="tax-collect-tips">自动获取工资表当月的增减员名单，您只需选择人员“报送”即可，报送后系统会在个税系统中完成人员信息采集</p> -->
      <div class="tax-content">
        <div class="content-header head-date">
          <span>{{selectMonth}}</span>
          <el-date-picker
            v-model="selectMonth"
            @input="changeMonth"
            type="month"
            value-format="yyyy年MM月"
            :editable="false"
            :clearable="false"
          ></el-date-picker>
        </div>
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <div class="left">
              <el-button type="default" @click="isShowScreening=true">筛选</el-button>
            </div>
            <el-input
              placeholder="请输入姓名\工号\身份证号"
              v-model="ruleForm.nameOrMore"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input left"
            ></el-input>
            <div class="left">
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" @click="handleReport">报送</el-button>
              <el-button type="primary" class="add-import" @click="handleGetFeedback">获取反馈</el-button>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
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
            </span>
            <span class="staff-total">
              正常
              <i>{{normalCount}}</i>人
            </span>
            <span>
              本月：新增
              <i>{{increaseCount}}</i>人
            </span>
            <span class="staff-total">
              减少
              <i>{{decreaseCount}}</i>人
            </span>
            <span>
              待报送
              <i>{{awaitReportCount}}</i>人
            </span>
          </div>
          <div class="staff-table">
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              @selection-change="handleSelectItem"
              :style="{width:screenWidth-285+'px'}"
            >
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="empName" label="姓名" width="140">
                <template slot-scope="scope">
                  <span
                    class="table-name"
                    @click="handleCollectionName(scope.row)"
                  >{{scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="idType" label="证件类型" width="140">
                <template slot-scope="scope">{{scope.row.idType | idType}}</template>
              </el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="140"></el-table-column>
              <el-table-column prop="empSex" label="性别" width="140">
                <template slot-scope="scope">{{returnStatus('empSex',scope.row.empSex)}}</template>
              </el-table-column>
              <el-table-column prop="workerStatus" label="人员状态" width="140">
                <template slot-scope="scope">{{returnStatus('empStatus',scope.row.workerStatus)}}</template>
              </el-table-column>
              <el-table-column prop="reportStatus" label="报送状态" width="140">
                <template slot-scope="scope">{{returnStatus('reportStatus',scope.row.reportStatus)}}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="身份证验证状态" width="140">
                <template
                  slot-scope="scope"
                >{{returnStatus('idValidStatus',scope.row.idValidStatus)}}</template>
              </el-table-column>
              <el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>
              <el-table-column prop="iscgl" label="是否残疾" width="140">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.iscgl)}}</template>
              </el-table-column>
              <el-table-column prop="martyrFamilyYn" label="是否烈属" width="140">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.martyrFamilyYn)}}</template>
              </el-table-column>
              <el-table-column prop="lonelyOldYn" label="是否孤老" width="140">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.iscgl)}}</template>
              </el-table-column>
              <el-table-column prop="workerType" label="任职受雇从业类型" width="140">
                <template slot-scope="scope">{{returnStatus('workerType',scope.row.workerType)}}</template>
              </el-table-column>
              <el-table-column prop="country" label="国籍" width="140"></el-table-column>
              <el-table-column prop="reportFinishTime" label="更新时间" width="140"></el-table-column>
              <el-table-column prop="updateTime" label="最近操作时间" width="140"></el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleSelectionChange"
              @size-change="handleSizeChange"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[20, 50, 100, 200]"
              :total="total"
              class="staff-page"
            ></el-pagination>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="isShowScreening" width="52%" center class="screen-dialog">
        <div class="screening-wapper">
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">身份证状态</el-col>
            <el-col>
              <span :class="{active:idValidStatus}" @click="handleDontLimit('idValidStatus')">不限</span>
              <span
                v-for="(value,key) in screening.idValidStatus"
                :key="key"
                @click="handleSelectScreening(key,'idValidStatus')"
                :class="{'active':ruleForm.idValidStatus.indexOf(key) >-1,}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">报送状态</el-col>
            <el-col>
              <span :class="{active:reportStatus}" @click="handleDontLimit('reportStatus')">不限</span>
              <span
                v-for="(value,key) in screening.reportStatus"
                :key="key"
                @click="handleSelectScreening(key,'reportStatus')"
                :class="{'active':ruleForm.reportStatus.indexOf(key) >-1}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">人员状态</el-col>
            <el-col>
              <span
                v-for="(value,key,index) in screening.empStatus"
                :key="index"
                @click="handleSelectScreening(key,'empStatus')"
                :class="{active:ruleForm.empStatus == key}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">是否残孤烈</el-col>
            <el-col>
              <span
                v-for="(value,key,index) in screening.iscgl"
                :key="index"
                @click="handleSelectScreening(key,'iscgl')"
                :class="{active:ruleForm.iscgl == key}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">任职受雇从业类型</el-col>
            <el-col>
              <span :class="{active:workerType}" @click="handleDontLimit('workerType')">不限</span>
              <span
                v-for="(value,key,index) in screening.workerType"
                :key="index"
                @click="handleSelectScreening(key,'workerType')"
                :class="{'active':ruleForm.workerType.indexOf(key) >-1}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">更新时间</el-col>
            <el-col class="el-diy-date">
              <el-date-picker
                v-model="updatedDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">最近更新时间</el-col>
            <el-col class="el-diy-date">
              <el-date-picker
                v-model="recentlyUpdatedDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="人员信息反馈结果"
        :visible.sync="isShowFeedback"
        width="550px"
        center
        class="diy-el_dialog"
      >
        <el-table :data="feedbackList">
          <el-table-column prop="empName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="idType" label="证件类型" width="120">
            <template slot-scope="scope">{{returnStatus('idType',scope.row.idType)}}</template>
          </el-table-column>
          <el-table-column prop="idNo" label="证件号码" width="140"></el-table-column>
          <el-table-column prop="reportStatus" label="报送状态" width="90">
            <template slot-scope="scope">{{returnStatus('reportStatus',scope.row.reportStatus)}}</template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowFeedback=false">关闭</el-button>
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
          :rules="feekbackRules"
          label-width="110px"
          ref="feekbackForm"
          class
          :model="feedbackForm"
        >
          <el-form-item label="请输入密码：" prop="password">
            <el-input type="password" v-model="feedbackForm.password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSubmitPassword">确定</el-button>
          <el-button @click="isShowPassword=false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as SCR from "./util/constData";
import * as AT from "./store/actionTypes";
let month = new Date().getMonth() + 1;
let defaultDate =
  new Date().getFullYear() + "年" + (month > 10 ? month : "0" + month) + "月";
export default {
  data() {
    return {
      reportOrFeedback: false,
      ruleForm: {
        currPage: 1,
        empStatus: "",
        idValidStatus: [],
        iscgl: "",
        nameOrMore: "",
        pageSize: 20,
        queryEndTime: "",
        queryMonth: "",
        queryStartTime: "",
        reportFinishTimeEnd: "",
        reportFinishTimeStart: "",
        reportStatus: [],
        workerType: [],
        taxSubjectId: ""
      },
      loading: false,
      feekbackRules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      reportForm: {
        taxSubId: "",
        ids: [],
        password: ""
      },
      feedbackForm: {
        taxSubjectId: "",
        password: ""
      },
      feedbackList: [
        {
          empName: "李泽胜",
          idNo: "1307221994010567145",
          idType: "COMPATRIOTS_CARD",
          reportStatus: "AWAIT_REPORT"
        },
        {
          empName: "李2",
          idNo: "1307221994010567145",
          idType: "COMPATRIOTS_CARD",
          reportStatus: "AWAIT_REPORT"
        }
      ],
      isShowPassword: false,
      isShowFeedback: false,
      taxSubjectInfolist: [],
      currentTaxSubName: "",
      increaseCount: 0,
      decreaseCount: 0,
      awaitReportCount: 0,
      normalCount: 0,
      total: 0,
      idValidStatus: true,
      reportStatus: true,
      workerType: true,
      selectMonth: defaultDate,
      updatedDate: "",
      recentlyUpdatedDate: "",
      isShowInfoColl: true,
      isShowScreening: false,
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      list: [],
      screening: SCR
    };
  },
  mounted() {
    this.getTaxSubjectInfoList();
    this.formatQuerymonth(this.selectMonth);
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    handleGetFeedback() {
      this.reportOrFeedback = false;
      this.isShowPassword = true;
      this.feedbackForm.password = "";
    },
    handleReport() {
      this.reportOrFeedback = true;
      if (this.reportForm.ids.length > 0) {
        this.reportForm.taxSubId = this.ruleForm.taxSubjectId;
        this.$confirm(
          "系统共检测到有" +
            this.reportForm.ids.length +
            "位人员需要进行信息提交，请确认是否现在提交",
          "删除确认",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.feedbackForm.password = "";
          this.isShowPassword = true;
        });
      }
    },
    handleSubmitPassword() {
      this.$refs.feekbackForm.validate(valid => {
        if (this.reportOrFeedback) {
          this.reportForm.password = this.feedbackForm.password;
          this.$store
            .dispatch("taxPageStore/actionReport", this.reportForm)
            .then(res => {
              if (res.success) {
                this.isShowPassword = false;
                this.getList()
                this.$alert("人员信息报送成功，请稍后获取反馈", "提示信息", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$message({
                      type: "info",
                      message: `action: ${action}`
                    });
                  }
                });
              }
            });
        } else {
          this.feedbackForm.taxSubjectId = this.ruleForm.taxSubjectId;
          this.$store
            .dispatch("taxPageStore/actionGetFeedback", this.feedbackForm)
            .then(res => {
              if (res.success) {
                 this.getList()
                this.isShowPassword = false;
                this.isShowFeedback = true;
                this.feedbackList = res.data;
              }
            });
        }
      });
    },
    //表格选中事件
    handleSelectItem(row) {
      this.reportForm.ids = [];
      row.forEach(element => {
        if (element.reportStatus == "AWAIT_REPORT") {
          this.reportForm.ids.push(element.id);
        }
      });
    },
    //扣缴义务人集合
    getTaxSubjectInfoList() {
      this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res => {
        if (res.success) {
          this.taxSubjectInfolist = res.data;
          this.ruleForm.taxSubjectId = this.taxSubjectInfolist[0].taxSubId;
          this.currentTaxSubName = this.taxSubjectInfolist[0].taxSubName;
          this.getList();
        }
      });
    },
    handleSizeChange(val) {
      this.totalListForm.pageSize = val;
      this.totalListForm.currPage = 1;
      this.getList();
    },
    handleCheckTaxSubject(item) {
      this.ruleForm.taxSubjectId = item.taxSubId;
      this.currentTaxSubName = item.taxSubName;
      this.ruleForm.currPage = 1;
      this.getList();
    },
    format() {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    changeMonth(month) {
      this.formatQuerymonth(month);
      this.getList();
    },
    formatQuerymonth(defaultDate) {
      let currentDate = defaultDate.replace("年", "-");
      this.ruleForm.queryMonth = currentDate.replace("月", "");
    },
    returnStatus(obj, key) {
      return this.screening[obj][key];
    },
    returnYesOrNo(flag) {
      if (flag) {
        return "是";
      }
      return "否";
    },
    handleDontLimit(obj) {
      if (this.ruleForm[obj].length > 0) {
        this[obj] = !this[obj];
      }
    },
    //查询
    handleSearch() {
      this.formatQuerymonth(this.selectMonth);
      if (this.updatedDate) {
        this.ruleForm.reportFinishTimeStart = this.format(
          "yyyy-MM-dd",
          this.updatedDate[0]
        );
        this.ruleForm.reportFinishTimeEnd = this.format(
          "yyyy-MM-dd",
          this.updatedDate[1]
        );
      } else {
        this.ruleForm.reportFinishTimeStart = "";
        this.ruleForm.reportFinishTimeEnd = "";
      }

      if (this.recentlyUpdatedDate) {
        this.ruleForm.updateTimeStart = this.format(
          "yyyy-MM-dd",
          this.recentlyUpdatedDate[0]
        );
        this.ruleForm.updateTimeEnd = this.format(
          "yyyy-MM-dd",
          this.recentlyUpdatedDate[1]
        );
      } else {
        this.ruleForm.updateTimeStart = "";
        this.ruleForm.updateTimeEnd = "";
      }
      this.ruleForm.currPage = 1;
      this.isShowScreening = false;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionEmpCollectList", this.ruleForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.total = res.data.count;
            this.list = res.data.data;
            this.increaseCount = res.data.increaseCount;
            this.decreaseCount = res.data.decreaseCount;
            this.awaitReportCount = res.data.awaitReportCount;
            this.normalCount = res.data.normalCount;
          }
        });
    },
    handleSelectScreening(key, obj) {
      let index = this.ruleForm[obj].indexOf(key);
      if (obj == "iscgl" || obj == "empStatus") {
        this.ruleForm[obj] = key;
      } else if (index > -1 && (this.ruleForm[obj].length > 1 || this[obj])) {
        this.ruleForm[obj].splice(index, 1);
      } else if (index == -1) {
        this.ruleForm[obj].push(key);
      }
    },
    handleCalcSalary() {
      this.$router.push("/salary-cal/start");
    },
    goSalarySet() {
      this.$router.push("/salarySet");
    },
    handleReset() {
      this.ruleForm.idValidStatus = [];
      this.ruleForm.reportStatus = [];
      this.ruleForm.workerType = [];
      this.ruleForm.empStatus = "NORMAL";
      this.ruleForm.iscgl = "";
      this.updatedDate = "";
      this.recentlyUpdatedDate = "";
    },
    handleCollectionName(row) {
      this.$store.commit("taxPageStore/" + AT.PERSONNELCOLLECTION, row);
      this.$router.push("/tax/info-collection");
    },
    //翻页
    handleSelectionChange(val) {
      this.ruleForm.currPage = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.collect {
  .header {
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
  .tax-content {
    padding: 40px;
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
  .tax-search {
    margin-left: 40px;
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
      .staff-page {
        margin-top: 20px;
        text-align: right;
      }
      .table-name {
        color: $mainColor;
        cursor: pointer;
      }
    }
  }
}
.screen-dialog {
  .screening-box {
    margin-bottom: 20px;
    .el-col-6 {
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
      cursor: pointer;
    }
    .active {
      color: $lineBorderPointer;
      border: 1px solid $lineBorderPointer;
    }
  }
  .el-diy-date .el-date-editor {
    opacity: 1;
    width: auto;
  }
  .el-input__inner {
    height: auto;
  }
  .current-tab-sub_name {
    @include ellipsis;
    width: 200px;
    display: inline-block;
  }
}
</style>

