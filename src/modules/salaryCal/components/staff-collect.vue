<template>
  <div class="calc-collect">
    <div class="tax el-diy-month">
      <div class="tax-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <el-input
              placeholder="请输入姓名\工号\身份证号"
              v-model="ruleForm.key"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input left"
            ></el-input>
            <div class="left">
              <el-button type="primary" class="tax-search" @click="handleSearch" size="small">查询</el-button>
            </div>
            <div class="right">
              <el-tooltip class="item" effect="dark" content="若未选择人员，抓取工资表全部待报送人员；若选择了人员，抓取所选人员中待报送人员报送。" placement="top">
                <el-button type="primary" class="add-import" @click="handleReport" v-if="privilegeVoList.includes('salary.compute.salaryCheck.empReport')">报送</el-button>
              </el-tooltip>
              <el-button class="add-import" @click="handleReportInfo" v-if="privilegeVoList.includes('salary.compute.salaryCheck.empReport')">获取反馈</el-button>
              <el-button class="add-import" @click="handleExport" v-if="privilegeVoList.includes('salary.compute.salaryCheck.empReportExport')">导出</el-button>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
              <span class="part" @click="selectNum('all')">
               全部
               <i :class="['num', allActive?'active':'']">{{ total }}</i>人
              </span>
              <span class="part" @click="selectNum('wait')">
                待报送
                 <i :class="['num', waitActive?'active':'']">{{ awaitReportCount }}</i>人
              </span>
               <span class="part" @click="selectNum('back')">
                待反馈
                 <i :class="['num', backActive?'active':'']">{{ awaitFeedBackCount }}</i>人
              </span>
               <span class="part" @click="selectNum('error')">
                报送失败
                <i :class="['num', errorActive?'active':'']">{{ failReportCount }}</i>人
              </span>
            </span>
          </div>
          <div class="staff-table">
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              @selection-change="handleSelectItem"
              :style="{width:screenWidth-40+'px'}"
              :height="screenHeight"
              border
            >
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="empNo" label="工号"></el-table-column>
              <el-table-column prop="empName" label="姓名">
                <template slot-scope="scope">
                  <span class="table-name" @click="handleCollectionName(scope.row)">{{scope.row.empName }}</span>
                </template>
              </el-table-column>
<!--              <el-table-column prop="idType" label="证件类型" width="150">-->
<!--                <template slot-scope="scope">{{scope.row.idType | idType}}</template>-->
<!--              </el-table-column>-->
              <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
<!--              <el-table-column prop="empSex" label="性别">-->
<!--                <template slot-scope="scope">{{returnStatus('empSex',scope.row.empSex)}}</template>-->
<!--              </el-table-column>-->
              <el-table-column prop="taxSubName" label="扣缴义务人名称" width="200">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.taxSubName" placement="top-start" v-if="scope.row.taxSubName.length>10">
                    <div class="hiden-con">{{ scope.row.taxSubName }}</div>
                  </el-tooltip>
                  <span v-else>{{ scope.row.taxSubName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="workerStatus" label="人员状态" >
                <template slot-scope="scope">{{returnStatus("empStatus",scope.row.workerStatus)}}</template>
              </el-table-column>
              <el-table-column prop="reportStatus" label="报送状态" width="140">
                <template slot-scope="scope">{{returnStatus('reportStatus',scope.row.reportStatus)}}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="身份证验证状态" width="140">
                <template
                  slot-scope="scope"
                >{{returnStatus('idValidStatus',scope.row.idValidStatus)}}</template>
              </el-table-column>
              <el-table-column prop="workerType" label="任职受雇从业类型" width="140">
                <template slot-scope="scope">{{returnStatus('workerType',scope.row.workerType)}}</template>
              </el-table-column>
              <el-table-column prop="empDay" label="任职受雇从业日期" width="140">
              </el-table-column>
              <el-table-column label="国籍" width="100">
                <template slot-scope="scope">{{ scope.row.country|countryType }}</template>
              </el-table-column>
              <el-table-column  label="反馈信息" width="150">
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
      <!-- 报送-->
      <salarySy ref="selectSY"
                :validParameter = "validParameter"
                :validAction="validAction"
                :querytAction="querytAction"
                :sign="sign"
                :stopTip="stopTip"
                :timeObj="timeObj"
                :freeBackTip="freeBackTip"
      >
      </salarySy>
      <!-- 报送反馈 -->
      <salaryBack ref="feedback"
                :validParameter = "validParameter"
                :querytAction="querytAction"
                :sign="sign"
                :stopTip="stopTip"
                :freeBackTip="freeBackTip"
      >
      </salaryBack>
      <authorizeTip ref="authorizeTip"></authorizeTip>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as SCR from "../util/constData";
import * as AT from "../store/actionTypes";
import fun from "@/util/fun";
import authorizeTip from "@/components/tool/authorizeTip"
import salarySy from "@/components/tool/salarySy"
import salaryBack from "@/components/tool/salaryBack";
let date = fun.headDate();
let month = new Date().getMonth() + 1;
let defaultDate =
  date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
export default {
  components:{
    authorizeTip,
    salarySy,
    salaryBack,
  },
  data() {
    return {
      submitLoading: false,
      ruleForm: {
        "checkId":this.$route.query.id,
        "enumReportStatus":"",
        "currPage": 1,
        "key": "",
        "pageSize":20 ,
      },
      loading: false,
      isShowScreening:false,
      ids: [],
      awaitReportCount:0,
      failReportCount:0,
      awaitFeedBackCount:0,
      reportInfoList:[],
      reportReturnList:[],
      isShowReturnInfo:false,
      isShowReportInfo: false,
      reportInfoLoading:false,
      isShowIknow:false,
      total: 0,
      workerType: true,
      list: [],
      screening: SCR,
      closeModel: false,
      isSave:this.$route.query.isSave,
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      screenHeight: document.body.clientHeight - 280,
      allActive:true,
      waitActive:false,
      errorActive:false,
      backActive:"",
      checkStatus:"",
      setWarning:"",
      allIds:[],
      validAction:"taxPageStore/actionReport",
      querytAction:"taxPageStore/actionPostReportInfo",
      validParameter:{
        checkId:this.$route.query.id,
        date:"",
        ids:""
      },
      freeBackTip:"【获取反馈】",
      sign:"calc-staff-collect",
      stopTip:"报送",//终止文案
      timeObj:{
        first:3000,
        second:10000,
        third:15000,
      },
    };
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
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
        this.screenHeight = document.body.clientHeight - 280;
      })();
    };
    that.getList();
  },
  methods: {
    //列表查询
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionEmpCollectNewList", this.ruleForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.total = res.data.count;
            this.list = res.data.data;
            this.awaitReportCount = res.data.awaitReportCount;
            this.failReportCount = res.data.failReportCount;
            this.awaitFeedBackCount = res.data.awaitFeedBackCount;
          }
        });
    this.getSalaryStatus()
    },
    //子组件刷新
    freshList(data){
      if(data === this.sign){
        this.getList()
      }
    },
    //添加人员
    addStaff(){

    },
    //查看工资表状态
    getSalaryStatus(){
      this.$store.dispatch('salaryCalStore/actionGetSalaryStatus',this.ruleForm.checkId).then(res=>{
        if(res.code === "0000"){
          this.checkStatus = res.data.checkStatus;
          this.setWarning = (this.checkStatus ==='AUDITED' || this.checkStatus ==='PAID' || this.checkStatus ==='FINISH');
        }
      })
    },
    //导出
    handleExport(){
      this.$store
        .dispatch("taxPageStore/actionEmpCollectNewListExport", this.ruleForm)
    },
    selectNum(type){
      if(type === "all"){
        this.allActive = true;
        this.waitActive = false;
        this.errorActive = false;
        this.backActive = false;
        this.ruleForm.enumReportStatus = "";
        }
      if(type==="wait"){
        this.allActive = false;
        this.waitActive = true;
        this.errorActive = false;
        this.backActive = false;
          this.ruleForm.enumReportStatus = "AWAIT_REPORT";
      }
      if(type==="back"){
        this.allActive = false;
        this.waitActive = false;
        this.backActive = true;
        this.errorActive = false;
        this.ruleForm.enumReportStatus = "REPORTING";
      }
      if(type==="error"){
          this.allActive = false;
          this.waitActive = false;
          this.backActive = false;
          this.errorActive = true;
          this.ruleForm.enumReportStatus = "REPORT_ERROR";
       }
        this.getList()
      },
    //报送
    handleReport() {
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        let ids = this.ids.length > 0 ? this.ids:[];
        if(ids.length>0 || this.allIds.length === 0){
          let reportCount = this.ids.length > 0 ? this.ids.length:this.awaitReportCount;
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
            this.validParameter.ids = this.ids;
            this.validParameter.date = this.salaryItem.date;
            //报送
            this.$refs.selectSY.show(true)
          }).catch(() => {});
        }else{
          this.$message.warning("未检测到报送状态为“待报送”的数据。")
        }
      }

    },
    //获取反馈
    handleReportInfo(){
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        if(this.ids.length>0 || this.allIds.length === 0){
          this.validParameter.ids = this.ids;
          this.validParameter.date = this.salaryItem.date;
          this.$refs.feedback.show(true)
        }else{
          this.$message.warning("不存在待反馈的数据")
        }

      }
    },
    //表格选中事件
    handleSelectItem(row) {
      this.ids = [];
      row.forEach(element => {
        this.allIds.push(element.id);
        if (element.reportStatus == "AWAIT_REPORT") {
          this.ids.push(element.id);
        }
      });
    },
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.ruleForm.currPage = 1;
      this.getList();
    },
    changeMonth(month) {
      this.ruleForm.queryMonth = month;
      this.getList();
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
    //查询
    handleSearch() {
      this.getList();
    },
    //点击姓名跳转
    handleCollectionName(row) {
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        this.$store.commit("taxPageStore/" + AT.PERSONNELCOLLECTION, row);
        this.$router.push("/tax/info-collection");
      }
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
@import "../../../assets/scss/helpers.scss";
.calc-collect {
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
      margin-bottom: 6px;
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
    margin-left: 20px;
  }
  .screening {
    .check-staff-menu {
      .search-input {
        width: 250px;
      }
    }
    /*.add-import {*/
    /*  margin-right: 10px;*/
    /*}*/
    .iconiconfonticonfontsousuo1 {
      font-size: 12px;
    }
    .staff-situation {
      margin:10px 0px;
      .staff-total {
        .part{
          display:inline-block;
          margin-right: 20px;
          font-size: 13px;
          cursor:pointer;
          .num{
            font-weight: bold;
          }
          .active{
            color:#e6a23c;
          }
        }
      }
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
      .staff-page {
        margin: 10px 0px;
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
}
.dialog-footer{
  text-align: right;
  height: 40px;
  line-height: 40px;
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
}  //超出部分隐藏
</style>

