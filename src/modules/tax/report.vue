<template>
  <div class="tax el-diy-month">
    <header class="header main-title">
      <el-row type="flex">
        <el-col :span="12">
          <span>综合所得申报</span>
        </el-col>
      </el-row>
    </header>
    <div class="waitReport" v-if="showWaitReport">
      <div v-if="failReportCount">存在生成申报表失败的人员<span class="failStyle bold" @click="showFail">{{ failReportCount }}</span> 人，点击数字可查看失败名单和原因</div>
      <div v-if="awaitReportCount">存在“待报送”的人员 <span class="bold">{{ awaitReportCount }}</span> 人，待报送人员无法参与个税计算，如需计算，请在“人员采集报送”界面中先完成报送！</div>
      <i class="el-icon-close close-style" @click="showWaitReport=false"></i>
    </div>
    <div class="tax-content">
      <div class="content-header head-date" style="display: inline-block">
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
      <div class="right declare-buttton-groups" style="float: right">
        <el-button type="primary" v-if="showCreate" @click="handleGenerateData('create')">生成申报数据</el-button>
        <el-button type="primary" v-if="showCreateReturn" @click="handleGenerateDataQ">获取申报数据</el-button>
        <el-button type="primary" v-if="showSend" @click="handleGenerateData('update')">更新申报数据</el-button>
        <el-button type="primary" v-if="showSend" @click="handleSendReport">发送申报</el-button>
        <el-button type="primary" v-if="showSendQ" @click="handleSendReportQ">发送申报反馈</el-button>
        <el-button v-if="showExport" @click="handleExportApplyTable">导出申请表</el-button>
        <el-button type="primary" v-if="showFeedback" @click="handleGetFeedback">获取反馈</el-button>
        <el-button type="primary" v-if="showFeedbackQ" @click="handleGetFeedbackQ">获取反馈查询</el-button>
        <el-button type="primary" v-if="showInvalid" @click="handleInvalid">作废申报</el-button>
        <el-button type="primary" v-if="showInvalidQ" @click="handleInvalidQ">作废申报反馈</el-button>
      </div>
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
              <i>{{reportTypeObj[reportType] }}</i>
            </span>
            <span class="staff-total">
              申报状态：
              <i>{{ reportStatusObj[reportStatus] }}</i>
            </span>
          </div>
        </div>
        <div class="staff-table">
          <el-table
            :data="list"
            class="check-staff_table"
            :style="{width:screenWidth-285+'px'}"
            v-loading="loading"
          >
            <el-table-column prop="subTaxReportType" label="报表名称" width="200">
              <template slot-scope="scope">
                <b>{{reportSubTaxReportType(scope.row.subTaxReportType)}}</b>
              </template>
            </el-table-column>
            <el-table-column prop="taxEmpCounts" label="纳税人数">
              <template slot-scope="scope">
                <span>{{ scope.row.subTaxReportType === "TOTAL_RULE"? "--":scope.row.taxEmpCounts }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="currentTotalIncome" label="本期收入">
            </el-table-column>
            <el-table-column prop="hisTotalIncome" label="累计收入">
              <template slot-scope="scope">
                <span>{{ showSalary(scope.row.subTaxReportType,scope.row.hisTotalIncome) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="calculateTaxTotal" label="应扣缴税额"></el-table-column>
            <el-table-column prop="realTaxTotal" label="已缴税额">
              <template slot-scope="scope">
                <span>{{ showSalary(scope.row.subTaxReportType,scope.row.realTaxTotal)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="taxDiffTotal" label="应补(退)税额"></el-table-column>
            <el-table-column  label="是否可申报">
              <template slot-scope="scope">
                <span>{{scope.row.idReport?'是':'否'}}</span>
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
      :close-on-click-modal="closeModel"
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
      :close-on-click-modal="closeModel"
    >
      <el-form
        :rules="passwordRules"
        label-width="140px"
        ref="refPassword"
        class
        :model="buttonForm"
      >
        <el-form-item label="扣缴义务人：">
          <span class="company-name">{{currentTaxSubName}}</span>
        </el-form-item>
        <el-form-item label="输入密码：" prop="password">
          <el-input type="password" v-model="buttonForm.password"></el-input>
        </el-form-item>
        <el-form-item label="输入验证码：" prop="capText">
          <el-input type="text" v-model="buttonForm.capText" style="width:90px"></el-input>
          <img
            :src="`/api/taxReport/getCaptcha/${buttonForm.captchaId}/captcha`"
            alt
            class="dialog-cap_test"
            @click="getCode"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitPassword" :loading="submitLoading">确定</el-button>
        <el-button @click="isShowPassword=false" :disabled="sendReportDisabled">取消</el-button>
      </span>
    </el-dialog>
    <!-- 验证-->
    <selectSY ref="selectSY" :timeObj="timeObj" :sign="sign"></selectSY>
    <!-- 查询-->
    <feedback ref="feedback" :sign="sign"></feedback>
    <!--计算失败记录-->
    <el-dialog
      title="失败记录"
      :visible.sync="isShowFail"
      width="600px"
      :close-on-click-modal="closeModel"
    >
      <div class="failTip">生成申报表失败，以下员工数据存在问题，请参考错误信息处理后更新申报数据</div>
      <el-table :data="failList">
        <el-table-column prop="subTaxReportType" label="申报表">
          <template slot-scope="scope">
            <span>{{scope.row.subTaxReportType | texRule}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idNo" label="证件号码"></el-table-column>
        <el-table-column prop="empName" label="扣缴义务人"></el-table-column>
        <el-table-column prop="checkStatus" label="申报状态">
          <template slot-scope="scope">
            <span>{{scope.row.checkStatus | reportType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="failReason" label="反馈信息"></el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 20px;">
        <el-button type="primary" @click="handleExport">导出</el-button>
        <el-button @click="isShowFail = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
 import { mapState } from "vuex";
 import selectSY from "./components/partSelectSY";
 import feedback from "./components/partFeedback";
import * as SCR from "./util/constData";
import fun from "@/util/fun";
let date = fun.headDate();
let month = new Date().getMonth() + 1;
let defaultDate =
  date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";

export default {
  components: {
    selectSY,
    feedback,
  },
  data() {
    return {
      submitLoading: false,
      listStatus:"",
      abnormalList: [],
      isShowAbnormal: false,
      currentPasItem: "",
      closeModel: false,
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
      reportTypeObj: SCR.reportType,
      reportStatusObj:SCR.declareStatus,
      buttonForm: {
        date: "",
        taxSubId: "",
        queryMonth: ""
      },
      reportForm: {
        currPage: 1,
        pageSize: 20,
        queryMonth: "",
        taxSubId: "",
      },
      list: [],
      total: 0,
      reportStatus: "",
      reportType: "",
      taxSubjectInfolist: [],
      currentTaxSubName: "",
      selectDate: defaultDate,
      isShowScreening: false,
      isShowPassword:false,
      screenWidth: document.body.clientWidth,// 屏幕尺寸
      sendReportDisabled:false,
      timeObj:{
        first:3000,
        second:8000,
        third:12000,
        fourth:22000,
      },
      sign:"taxReport",
      failList:[],
      isShowFail:false,
      awaitReportCount:0,
      failReportCount:0,
      showWaitReport:false,
    };
  },
  computed: {
    //生成申报
    showCreate:function(){
      return ["INIT",null].includes(this.reportStatus)
    },
    //生成申报反馈
    showCreateReturn:function(){
      return ["GENERATE_REPORT_WAIT"].includes(this.reportStatus)
    },
    showExport:function(){
      return this.reportStatus !== "INIT" && this.reportStatus
    },
    //发送申报
    showSend:function(){
      return ["AWAIT_REPORT","CANCEL_SUCCESS","REPORT_ERROR"].includes(this.reportStatus)
    },
    //发送申报反馈
    showSendQ:function(){
      return ["REPORTING"].includes(this.reportStatus)
    },
    //作废申报
    showInvalid:function(){
      return ["REPORT_SUCCESS","REPORT_SUCCESS_OTHER"].includes(this.reportStatus)
    },
    //作废申报反馈
    showInvalidQ:function(){
      return ["REPORT_SUCCESS_OTHER"].includes(this.reportStatus)
    },
    //获取反馈
    showFeedback:function(){
      return ['REPORT_WAIT_BACK'].includes(this.reportStatus)
    },
    //获取反馈
    showFeedbackQ:function(){
      return ['REPORT_BACK_WAIT_BACK'].includes(this.reportStatus)
    }
  },
  mounted() {
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
    getList(flag) {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionTaxReportTotalList", this.reportForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.reportStatus = res.data.reportStatus;
            this.reportType = res.data.reportType;
            this.total = res.data.count;
            this.list = res.data.data;
            this.failReportCount = res.data.failReportCount;
            this.awaitReportCount = res.data.awaitReportCount;
            this.showWaitReport = this.failReportCount || this.awaitReportCount;
            if (this.list.length == 0 && flag) {
              this.$message({
                message: "暂无申报数据",
                type: "warning"
              });
            }
          }
        });
    },
    //失败原因
    showFail(){
      this.isShowFail = true
      this.$store
        .dispatch("taxPageStore/actionTaxReportFailRecord", this.salaryForm)
        .then(res => {
          this.failList = res.data;
        })
    },
    handleExport(){
      this.$store
        .dispatch("taxPageStore/actionTaxReportFailRecordExport", this.salaryForm)
        .then(res => {
          console.log(res)
        })
    },
    //展示收入，已缴税额
    showSalary(subTaxReportType,data){
      return subTaxReportType === "SALARY_PAY_RULE" || subTaxReportType === "TOTAL_RULE" ? data:"--"
    },
    //子组件触发刷新
    freshList(data){
      if(data === this.sign){
        this.getList()
      }
    },
    getCode() {
      this.$store.dispatch("getCode").then(res => {
        this.buttonForm.captchaId = res.data;
      });
    },
    reportSubTaxReportType(params) {
      return SCR.subTaxReportType[params];
    },
    //生成申报数据
    handleGenerateData(type) {
      let paramsObj = {
        validParameter : this.buttonForm,
        validAction : "taxPageStore/postGenerateTaxReportData",
        querytAction : "taxPageStore/postQueryGenerateTaxReportData",
        stopTip:type === "create" ? "生成申报数据":"更新申报数据",
        processingTip:"获取反馈中。。。",
        showFailReason:true,
      }
      this.$refs.selectSY.show(true,paramsObj)
    },
    //发送申报
    handleSendReport() {
        let paramsObj = {
          validParameter : this.buttonForm,
          validAction : "taxPageStore/postSendReport",
          querytAction : "taxPageStore/postSendReportQuery",
          stopTip:"发送申报",
          processingTip:"获取反馈中。。。",
        }
        this.$refs.selectSY.show(true,paramsObj)
    },
    //发送申报反馈
    handleSendReportQ(){
      let paramsObj = {
        validParameter : this.buttonForm,
        querytAction : "taxPageStore/postSendReportQuery",
        stopTip:"发送申报",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.feedback.show(true,paramsObj)
    },
    //生成申报数据反馈
    handleGenerateDataQ(){
      let paramsObj = {
        validParameter : this.buttonForm,
        querytAction : "taxPageStore/postQueryGenerateTaxReportData",
        stopTip:"生成申报数据",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.feedback.show(true,paramsObj)
    },
    //作废申报
    handleInvalid() {
      let paramsObj = {
        validParameter : this.buttonForm,
        validAction : "taxPageStore/postCancelSubTaxReport",
        querytAction : "taxPageStore/postCancelSubTaxReportQuery",
        stopTip:"作废申报",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.selectSY.show(true,paramsObj)
    },
    //作废申报反馈
    handleInvalidQ(){
      let paramsObj = {
        validParameter : this.buttonForm,
        querytAction : "taxPageStore/postCancelSubTaxReportQuery",
        stopTip:"作废申报",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.feedback.show(true,paramsObj)
    },
    //获取反馈
    handleGetFeedback() {
      let paramsObj = {
        validParameter : this.buttonForm,
        validAction : "taxPageStore/postGetReportBack",
        querytAction : "taxPageStore/postGetReportBackQuery",
        stopTip:"申报获取反馈",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.selectSY.show(true,paramsObj)
    },
    //获取反馈查询
    handleGetFeedbackQ(){
      let paramsObj = {
        validParameter : this.buttonForm,
        querytAction : "taxPageStore/postGetReportBackQuery",
        stopTip:"申报获取反馈",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.feedback.show(true,paramsObj)
    },
    //密码提交
    handleSubmitPassword() {
      this.sendReportDisabled = true;
      this.$refs.refPassword.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          switch (this.currentPasItem) {
            case "send":
              this.$store
                .dispatch("taxPageStore/postSendReport", this.buttonForm)
                .then(res => {
                  this.submitLoading = false;
                  this.sendReportDisabled = false;
                  if (res.success) {
                    this.isShowPassword = false;
                    this.$message({
                      message:
                        "当前" +
                        this.selectDate +
                        "申请表已发送申报，请在申请表中获取反馈",
                      type: "success"
                    });
                    this.getList(true);
                  }
                });
              break;
            case "invalid":
              this.$store
                .dispatch(
                  "taxPageStore/postCancelSubTaxReport",
                  this.buttonForm
                )
                .then(res => {
                  this.submitLoading = false;
                  if (res.success) {
                    this.isShowPassword = false;
                    this.$message({
                      message: "当前" + this.selectDate + "申请表已作废成功",
                      type: "success"
                    });
                    this.getList(true);
                  }
                });
              break;
            case "feedback":
              this.$store
                .dispatch("taxPageStore/postGetReportBack", this.buttonForm)
                .then(res => {
                  this.submitLoading = false;
                  if (res.success) {
                    this.$message({
                      message:
                        "当前" + this.selectDate + "申请表已获取反馈成功",
                      type: "success"
                    });
                    this.isShowPassword = false;
                    this.getList(true);
                  }
                });
              break;
          }
        }
      });
    },
    //导出申请报
    handleExportApplyTable() {
      this.buttonForm.taxSubId = this.reportForm.taxSubId;
      this.buttonForm.date = this.reportForm.queryMonth;
      this.$store.dispatch(
        "taxPageStore/getSubTaxReportExport",
        this.buttonForm
      );
    },
    formatQuerymonth(defaultDate) {
      let currentDate = defaultDate.replace("年", "-");
      this.reportForm.queryMonth = currentDate.replace("月", "");

      this.buttonForm.queryMonth = this.reportForm.queryMonth;
      this.buttonForm.date = this.reportForm.queryMonth;

      this.selectMonth = this.reportForm.queryMonth.split('-')[1];
      this.selectYear = this.reportForm.queryMonth.split('-')[0];
    },
    //扣缴义务人列表
    getTaxSubjectInfoList() {
      this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res => {
        if (res.success) {
          this.taxSubjectInfolist = res.data;
          this.reportForm.taxSubId = this.taxSubjectInfolist[0].taxSubId;
          this.buttonForm.taxSubId = this.taxSubjectInfolist[0].taxSubId;
          this.currentTaxSubName = this.taxSubjectInfolist[0].taxSubName;
          this.getList();
        }
      });
    },
    //切换扣缴义务人
    handleCheckTaxSubject(item) {
      this.reportForm.taxSubId = item.taxSubId;
      this.buttonForm.taxSubId = item.taxSubId;
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
  .waitReport{
    line-height: 30px;
    margin-top: 20px;
    color:#909399;
    border-left:4px solid #E6A23C;
    background:#FDF7E9;
    padding-left: 20px;
    position: relative;
    .bold{
      color:#E6A23C;
      font-weight: bold;
    }
    .failStyle{
      cursor: pointer;
    }
    .close-style{
      position: absolute;
      top:10px;
      right:10px;
      cursor: pointer;
    }
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
      i {
        font-size: 16px;
        color: #ccc;
      }
      .rotate-el-icon-arrow-left {
        transform: rotate(180deg);
      }
      span {
        position: absolute;
        /*left: 32px;*/
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
  .diy-el_dialog {
    .company-name {
      @include ellipsis;
      width: 200px;
      display: inline-block;
    }
  }
}
</style>

