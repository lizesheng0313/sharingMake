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
      <div class="tax-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <div class="left">
              <el-button type="default" @click="isShowScreening=true">筛选</el-button>
            </div>
            <div class="content-header head-date">
              <!--              <span>{{selectMonth}}</span>-->
              <el-date-picker
                v-model="selectMonth"
                @input="changeMonth"
                type="month"
                value-format="yyyy年MM月"
                :editable="false"
                :clearable="false"
              ></el-date-picker>
            </div>
            <el-input
              placeholder="请输入姓名\工号\身份证号"
              v-model="ruleForm.nameOrMore"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input"
            ></el-input>
            <div class="select" style="display: inline-block">
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" @click="handleReport"
                         v-if="privilegeVoList.includes('salary.report.personReport.sendReport')">报送</el-button>
              <el-button class="add-import" @click="handleReportInfo"
                         v-if="privilegeVoList.includes('salary.report.personReport.sendReport')">获取反馈</el-button>
              <el-button class="add-import" @click="handleExport"
                         v-if="privilegeVoList.includes('salary.report.personReport.export')">导出</el-button>
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
              <span class="wait-report" @click="selectNum('')">
                全部
                <i :class="['num', allActive?'active':'']">{{ total }}</i>人
              </span>
              <span class="wait-report" @click="selectNum('REPORT_SUCCESS')">
                正常
                <i :class="['num', successActive?'active':'']">{{ normalCount }}</i>人
              </span>
              <span class="wait-report" @click="selectNum('AWAIT_REPORT')">
                待报送
                <i :class="['num', waitActive?'active':'']">{{ awaitReportCount?awaitReportCount:0 }}</i>人
              </span>
              <span class="wait-report" @click="selectNum('REPORTING')">
                待反馈
                <i :class="['num', backActive?'active':'']">{{ awaitFeedBackCount ? awaitFeedBackCount:0 }}</i>人
              </span>
               <span class="wait-report" @click="selectNum('REPORT_ERROR')">
                报送失败
                <i :class="['num', errorActive?'active':'']">{{ failReportCount ? failReportCount:0 }}</i>人
              </span>
            </span>
            <span>
              本月：新增
              <i>{{increaseCount}}</i>人
            </span>
            <span class="staff-total">
              减少
              <i>{{decreaseCount}}</i>人
            </span>
          </div>
          <div class="staff-table">
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              @selection-change="handleSelectItem"
              :height="screenHeight"
              :style="{width:screenWidth-255+'px'}"
              border
             >
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="empName" label="姓名" width="140">
                <template slot-scope="scope">
                  <span class="table-name" @click="handleCollectionName(scope.row)" v-if="privilegeVoList.includes('salary.report.personReport.edit')">{{ scope.row.empName }}</span>
                  <span class="table-name" v-else>{{ scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="idType" label="证件类型" width="140">
                <template slot-scope="scope">{{scope.row.idType | idType}}</template>
              </el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
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
                <template slot-scope="scope">{{returnStatus('idValidStatus',scope.row.idValidStatus)}}</template>
              </el-table-column>
              <el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>
              <el-table-column prop="iscgl" label="是否残疾" width="140">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.disabilityYn)}}</template>
              </el-table-column>
              <el-table-column prop="martyrFamilyYn" label="是否烈属" width="140">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.martyrFamilyYn)}}</template>
              </el-table-column>
              <el-table-column prop="lonelyOldYn" label="是否孤老" width="140">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.lonelyOldYn)}}</template>
              </el-table-column>
              <el-table-column prop="workerType" label="任职受雇从业类型" width="140">
                <template slot-scope="scope">{{returnStatus('workerType',scope.row.workerType)}}</template>
              </el-table-column>
              <el-table-column label="国籍" width="140">
                <template slot-scope="scope">{{ scope.row.country|countryType }}</template>
              </el-table-column>
<!--              <el-table-column prop="reportFinishTime" label="更新时间" width="180"></el-table-column>-->
<!--              <el-table-column prop="updateTime" label="最近操作时间" width="180"></el-table-column>-->
              <el-table-column prop="updateTime" label="反馈信息" width="120">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.failReason" placement="top-start" v-if="scope.row.failReason && scope.row.failReason.length>10">
                    <span class="hiden-con">{{ scope.row.failReason }}</span>
                  </el-tooltip>
                  <span v-else>{{ scope.row.failReason }}</span>
                </template>
              </el-table-column>
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
      <!-- 筛选-->
      <el-dialog
        :visible.sync="isShowScreening"
        width="52%"
        center
        class="screen-dialog"
        :close-on-click-modal="closeModel"
      >
        <div class="screening-wapper">
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">身份证状态</el-col>
            <el-col>
              <span
                :class="{active:idValidStatus,'first-span':true}"
                @click="handleDontLimit('idValidStatus')"
              >不限</span>
              <span
                v-for="(value,key) in screening.idValidStatus"
                :key="key"
                @click="handleSelectScreening(key,'idValidStatus')"
                :class="{'active':ruleForm.idValidStatus.indexOf(key) >-1,'right-span':true}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">报送状态</el-col>
            <el-col>
              <span
                :class="{active:reportStatus,'first-span':true}"
                @click="handleDontLimit('reportStatus')"
              >不限</span>
              <span
                v-for="(value,key) in screening.reportStatus"
                :key="key"
                @click="handleSelectScreening(key,'reportStatus')"
                :class="{'active':ruleForm.reportStatus.indexOf(key) >-1,'right-span':true}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box employee" align="middle">
            <el-col :span="6">人员状态</el-col>
            <el-col>
              <span
                v-for="(value,key,index) in screening.empStatus"
                :key="index"
                @click="handleSelectScreening(key,'empStatus')"
                :class="{active:ruleForm.empStatus == key,'right-span':index !==0}"
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
                :class="{active:ruleForm.iscgl == key,'right-span': index!==0}"
              >{{value}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">任职受雇从业类型</el-col>
            <el-col>
              <span
                :class="{active:workerType,'first-span':true}"
                @click="handleDontLimit('workerType')"
              >不限</span>
              <span
                v-for="(value,key,index) in screening.workerType"
                :key="index"
                @click="handleSelectScreening(key,'workerType')"
                :class="{'active':ruleForm.workerType.indexOf(key) >-1,'right-span':true}"
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
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </span>
      </el-dialog>
      <!-- 验证-->
      <selectSy ref="selectSY" :timeObj="timeObj" :sign="sign"></selectSy>
      <!-- 查询-->
      <feedback ref="feedback" :sign="sign"></feedback>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as SCR from "./util/constData";
import * as AT from "./store/actionTypes";
import fun from "@/util/fun";
import selectSy from "./components/partSelectS";
import feedback from "./components/partFeedback";
let date = fun.headDate();
let month = new Date().getMonth() + 1;
let defaultDate =
  date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";
export default {
  data() {
    return {
      submitLoading: false,
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
        taxSubjectId: "",
      },
      loading: false,
      reportForm: {
        date: "",
        taxSubId: "",
        ids: [],
      },
      reportInfoList:[],
      reportReturnList:[],
      isShowReturnInfo:false,
      isShowReportInfo: false,
      reportInfoLoading:false,
      isShowIknow:false,
      taxSubjectInfolist: [],
      currentTaxSubName: "",
      increaseCount: 0,
      decreaseCount: 0,
      awaitReportCount: 0,
      awaitFeedBackCount:0,
      normalCount: 0,
      failReportCount:0,
      allActive:true,
      successActive:false,
      backActive:false,
      waitActive:false,
      errorActive:false,
      total: 0,
      idValidStatus: true,
      reportStatus: true,
      workerType: true,
      selectMonth: defaultDate,
      screening: SCR,
      updatedDate: "",
      recentlyUpdatedDate: "",
      isShowInfoColl: true,
      isShowScreening: false,
      screenWidth: document.body.clientWidth,// 屏幕尺寸
      screenHeight: document.body.clientHeight - 330,
      list: [],
      closeModel: false,
      unNormalIds:[],
      timeObj:{
        first:3000,
        second:8000,
        third:12000,
        fourth:22000,
      },
      sign:"taxCollect",
      // isSave:this.$route.query.isSave,
    };
  },
  components:{
    selectSy,
    feedback
  },
  computed:{
    ...mapState("salaryCalStore", {
      salaryItem:"salaryItem"
    }),
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList
    }),
  },
  created(){

  },
  mounted() {
    this.getTaxSubjectInfoList();
    this.formatQuerymonth(this.selectMonth);
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        this.screenHeight = document.body.clientHeight - 330;
      })();
    };
  },
  methods: {
    selectNum(type){
      //全部
      if(type===""){this.allActive = true;this.successActive = false;  this.waitActive = false;this.backActive = false ; this.errorActive = false; }
      //正常
      if(type === "REPORT_SUCCESS"){this.allActive = false;this.successActive = true; this.waitActive = false; this.backActive = false ; this.errorActive = false;}
      //待报送
      if(type === "AWAIT_REPORT"){this.allActive = false;this.successActive = false; this.waitActive = true; this.backActive = false ; this.errorActive = false;}
      //待反馈
      if(type==="REPORTING"){this.allActive = false;this.successActive = false; this.waitActive = false; this.backActive = true ; this.errorActive = false;}
      //报送失败
      if(type==="REPORT_ERROR"){this.allActive = false;this.successActive = false;  this.waitActive = false; this.backActive = false ; this.errorActive = true; }
      this.ruleForm.reportStatus = type === "" ? [] : [type];
      this.getList()
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
            this.failReportCount = res.data.failReportCount;
            this.awaitFeedBackCount = res.data.awaitFeedBackCount;
          }
        });
    },
    //子组件触发刷新
    freshList(data){
      if(data === this.sign){
        this.getList()
      }
    },
    //导出
    handleExport(){
      this.$store
        .dispatch("taxPageStore/actionTaxEmpCollectNewListExport", this.ruleForm)
    },
    //报送
    handleReport() {
      let reportCount = this.reportForm.ids.length > 0 ? this.reportForm.ids.length:this.awaitReportCount;
      if( this.reportForm.ids.length > 0){
        this.$confirm(
          "系统共检测到有" +
          reportCount +
          "位人员需要进行信息提交，请确认是否现在提交 ?",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: false
          }
        ).then(() => {
          //报送
          let paramsObj = {
            validParameter : this.reportForm,
            validAction : "taxPageStore/actionTaxReport",
            querytAction : "taxPageStore/actionPostReportInfo",
            stopTip:"报送",
            showFailReason:false,
            freeBackTip:"【获取反馈】"
          }
          this.$refs.selectSY.show(true,paramsObj)
        }).catch(() => {});
      }else{
        //如果未点击数据
        if(this.unNormalIds.length === 0){
          this.$message.warning("请选择待报送数据")
        }else{//选择成功或失败的
          this.$message.warning("未检测到报送状态为“待报送”的数据。")
        }
      }
    },
    //获取反馈
    handleReportInfo(){
      let paramsObj = {
        validParameter : {
          date:this.reportForm.date,
          taxSubjectId: this.reportForm.taxSubId
        },
        validAction : "taxPageStore/actionTaxReport",
        querytAction : "taxPageStore/actionPostReportInfo",
        stopTip:"报送",
        showFailReason:false,
        freeBackTip:"【获取反馈】"
      }
      this.$refs.feedback.show(true,paramsObj)
    },
    //表格选中事件
    handleSelectItem(row) {
      this.reportForm.ids = [];
      row.forEach(element => {
        if (element.reportStatus == "AWAIT_REPORT") {
          this.reportForm.ids.push(element.id);
        }
        if(element.reportStatus != "AWAIT_REPORT"){
          this.unNormalIds.push(element.id)
        }
      });
    },
    //扣缴义务人集合
    getTaxSubjectInfoList() {
      this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res => {
        if (res.success) {
          this.taxSubjectInfolist = res.data;
          this.ruleForm.taxSubjectId = this.taxSubjectInfolist[0].taxSubId;
          this.reportForm.taxSubId = this.taxSubjectInfolist[0].taxSubId;
          this.reportForm.taxSubjectId = this.taxSubjectInfolist[0].taxSubId;
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
      this.reportForm.taxSubId = item.taxSubId;
      this.reportForm.taxSubjectId = item.taxSubId;
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
      this.reportForm.date = this.ruleForm.queryMonth;
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
      if(this[obj]){
        this.ruleForm[obj] = []
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
    handleSelectScreening(key, obj) {
      let index = this.ruleForm[obj].indexOf(key);
      if (obj == "iscgl" || obj == "empStatus") {
        this.ruleForm[obj] = key;
      } else if (index > -1 && (this.ruleForm[obj].length > 1 || this[obj])) {
        this.ruleForm[obj].splice(index, 1);
      } else if (index == -1) {
        this.ruleForm[obj].push(key);
        this[obj] = false;
      }
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
  .tax-content {
    padding: 20px 20px 0px 20px;
    .content-header {
      display: inline-block;
      font-size: 16px;
      margin:0px 0px 6px 20px;
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
    margin-left: 24px;
  }
  .screening {
    .check-staff-menu {
      .search-input {
        margin:0px 20px;
        width: 205px;
      }
    }
    .add-import {
      /*margin-right: 10px;*/
    }
    .iconiconfonticonfontsousuo1 {
      font-size: 12px;
    }
    .staff-situation {
      margin: 0px 10px 10px 0px;
      color: #999;
      font-size: 12px;
      .staff-total {
        border-right: 1px solid #e6e6e6;
        padding-right: 15px;
        margin-right: 15px;
      }
      i {
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
      .staff-page {
        margin-top: 10px;
        text-align: right;
      }
      .table-name {
        color: $mainColor;
        cursor: pointer;
      }
    }
  }
  .current-tab-sub_name {
    @include ellipsis;
    width: 200px;
    display: inline-block;
  }
  .dialog-footer{
    text-align: right;
    margin-top: 20px;
  }
  .wait-report{
    margin-right:20px;
    cursor: pointer;
    .num{
      font-weight: bold;
      color: $mainColor;
    }
    .active{
      color:#e6a23c;
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
      border: 1px solid #dcdfe6;
      /*margin-right: px;*/
      font-size: 12px;
      padding: 7px 15px;
      cursor: pointer;
    }
    span:first-child {
      border-radius: 4px;
    }
    .right-span {
      border-left: none;
    }
    .right-span:nth-child(2) {
      border-left: 1px solid #dcdfe6;
      border-radius: 4px 0px 0px 4px;
      margin-left: 10px;
    }
    .right-span:last-child {
      border-radius: 0px 4px 4px 0px;
    }
    .right-span:first-child {
      border-radius: 4px;
    }
    .active {
      color: #fff;
      border: 1px solid #5b9cf8;
      background: #5b9cf8;
    }
  }
  .el-diy-date .el-date-editor {
    opacity: 1;
    width: auto;
  }
  .el-input__inner {
    height: auto;
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

