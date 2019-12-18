<template>
  <div class="collect">
    <div class="tax el-diy-month">
      <div class="tax-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <el-input
              placeholder="请输入姓名\工号\证件号码"
              v-model="ruleForm.key"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input left"
            ></el-input>
            <div class="left">
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-tooltip class="item" effect="dark" content="若未选择人员，抓取工资表全部待报送人员；若选择了人员，抓取所选人员中待报送人员报送。" placement="top">
                <el-button type="primary" class="add-import" @click="handleReport">报送</el-button>
              </el-tooltip>
              <el-button class="add-import" @click="handleReportInfo">获取反馈</el-button>
              <el-button class="add-import" @click="handleExport">导出</el-button>
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
            >
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="empNo" label="工号"></el-table-column>
              <el-table-column prop="empName" label="姓名">
                <template slot-scope="scope">
                  <span class="table-name" @click="handleCollectionName(scope.row)">{{scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="idType" label="证件类型" width="150">
                <template slot-scope="scope">{{scope.row.idType | idType}}</template>
              </el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
<!--              <el-table-column prop="empSex" label="性别">-->
<!--                <template slot-scope="scope">{{returnStatus('empSex',scope.row.empSex)}}</template>-->
<!--              </el-table-column>-->
              <el-table-column prop="taxSubName" label="扣缴义务人名称" width="200">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.taxSubName" placement="top-start" v-if="scope.row.taxSubName.length>10">
                    <span class="hidenCon">{{ scope.row.taxSubName }}</span>
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
<!--              <el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>-->
<!--              <el-table-column prop="iscgl" label="是否残疾" width="80">-->
<!--                <template slot-scope="scope">{{returnYesOrNo(scope.row.iscgl)}}</template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="martyrFamilyYn" label="是否烈属" width="80">-->
<!--                <template slot-scope="scope">{{returnYesOrNo(scope.row.martyrFamilyYn)}}</template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="lonelyOldYn" label="是否孤老" width="80">-->
<!--                <template slot-scope="scope">{{returnYesOrNo(scope.row.iscgl)}}</template>-->
<!--              </el-table-column>-->
              <el-table-column prop="workerType" label="任职受雇从业类型" width="140">
                <template slot-scope="scope">{{returnStatus('workerType',scope.row.workerType)}}</template>
              </el-table-column>
              <el-table-column prop="empDay" label="任职受雇从业日期" width="140">
              </el-table-column>
              <el-table-column label="国籍" width="100">
                <template slot-scope="scope">{{ scope.row.country|countryType }}</template>
              </el-table-column>
              <el-table-column  label="反馈信息" width="110">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.failReason" placement="top-start" v-if="scope.row.failReason && scope.row.failReason.length>10">
                    <span class="hidenCon">{{ scope.row.failReason }}</span>
                  </el-tooltip>
                  <span v-else>{{ scope.row.failReason }}</span>
                </template>
              </el-table-column>
<!--              <el-table-column prop="updateTime" label="最近操作时间" width="110"></el-table-column>-->
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
      <el-dialog
        :visible.sync="isShowReportInfo"
        width="550px"
        center
        class="diy-el_dialog"
        :show-close="false"
        :close-on-click-modal="closeModel"
      >
        <el-row v-for="(item,index) in reportInfoList" :key="index">
         <div v-if="item.dealStatus === 'SUCCESS'"><el-col :span="12" style="height:30px">{{ item.taxSubName }}</el-col><el-col :span="12">报送完成</el-col></div>
         <div v-if="item.dealStatus === 'PROCESSING'"><el-col :span="12" style="height:30px">{{ item.taxSubName }}</el-col><el-col :span="12">获取反馈中。。。</el-col></div>
         <div v-if="item.dealStatus === 'FAIL'"><el-col :span="12" style="height:30px">{{ item.taxSubName }}</el-col><el-col :span="12">报送失败，{{item.failReason}}</el-col></div>
        </el-row>
        <div v-loading="reportInfoLoading" style="height: 40px"></div>
        <div class="dialog-footer">
          <el-button @click="onIKnow" v-show="isShowIknow" type="primary" plain>我知道了</el-button>
        </div>
      </el-dialog>
      <!-- 获取反馈 -->
      <el-dialog
        :visible.sync="isShowReturnInfo"
        width="550px"
        title="获取反馈"
        center
        class="diy-el_dialog"
        :show-close="false"
        :close-on-click-modal="closeModel"
      >
        <el-row v-for="(item,index) in reportReturnList" :key="index">
          <div v-if="item.dealStatus === 'SUCCESS'"><el-col :span="12" style="height:30px">{{ item.taxSubName }}</el-col><el-col :span="12">报送完成</el-col></div>
          <div v-if="item.dealStatus === 'PROCESSING'"><el-col :span="12" style="height:30px">{{ item.taxSubName }}</el-col><el-col :span="12">获取反馈中。。。</el-col></div>
          <div v-if="item.dealStatus === 'FAIL'"><el-col :span="12" style="height:30px">{{ item.taxSubName }}</el-col><el-col :span="12">报送失败，{{item.failReason}}</el-col></div>
        </el-row>
        <div class="dialog-footer">
          <el-button @click="isShowReturnInfo=false" type="primary" plain>我知道了</el-button>
        </div>
      </el-dialog>
      <authorizeTip ref="authorizeTip"></authorizeTip>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as SCR from "../util/constData";
import * as AT from "../store/actionTypes";
import fun from "@/util/fun";
let date = fun.headDate();
let month = new Date().getMonth() + 1;
let defaultDate =
  date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
import authorizeTip from "@/components/tool/authorizeTip"
export default {
  components:{
    authorizeTip,
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
    };
  },
  computed:{
    ...mapState("salaryCalStore", {
      salaryItem:"salaryItem"
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
            this.reportInfoList = [];
            this.isShowReportInfo = true;
            this.reportInfoLoading = true;
            //报送
            this.$store
              .dispatch("taxPageStore/actionReport", {
                ids,
                date:this.salaryItem.date,
                checkId:this.ruleForm.checkId
              })
              .then(res => {
                if (res.success) {
                  //验证通过
                  if(res.data.status === "SUCCESS"){
                    this.reportInfoList = res.data.taxSubList;
                    //是否进行下步查询
                    if(res.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                      this.selectShuiyou()
                    }else{//报送全部成功或失败
                      this.reportInfoLoading = false;
                      this.isShowIknow = true;
                    }
                  }else{//授权失败
                    this.isShowReportInfo = false;
                    this.reportInfoLoading = false;
                    this.$refs.authorizeTip.show()
                  }
                }else{
                  this.isShowReportInfo = false;
                  this.reportInfoLoading = false;
                  this.$message.warning(res.message)
                }
              });
          }).catch(() => {});
        }else{
          this.$message.warning("未检测到报送状态为“待报送”的数据。")
        }
      }

    },
    selectShuiyou(){
      this.isShowIknow = false;
      //查询第一次
      setTimeout(()=>{
        this.$store
          .dispatch("taxPageStore/actionPostReportInfo", {
            date: this.salaryItem.date,
            checkId:this.$route.query.id,
          }).then(r0 => {
          if(r0.success){
            if(r0.data.status === "SUCCESS"){
              this.reportInfoList.push(...r0.data.taxSubList);
              if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.selectSec()
              } else{
                this.reportInfoLoading = false;
                this.isShowIknow = true;
              }
            }else{
            }
          }
        })
      },3000)
    },
    //第二次查询
    selectSec(){
      setTimeout(()=>{
        this.$store.dispatch("taxPageStore/actionPostReportInfo", {
          date: this.salaryItem.date,
          checkId:this.$route.query.id,
        }).then(r0 => {
          if(r0.data.status === "SUCCESS"){
            this.reportInfoList.push(...r0.data.taxSubList);
            if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
              this.selectThird()
            } else{
              this.reportInfoLoading = false;
              this.isShowIknow = true;
            }
          }else{
          }
        })
      },10000)
    },
    //第三次查询
    selectThird(){
      setTimeout(()=>{
        this.$store
          .dispatch("taxPageStore/actionPostReportInfo", {
            date: this.salaryItem.date,
            checkId:this.$route.query.id,
          }).then(re => {
          if(re.success){
            this.reportInfoList.push(...re.data.taxSubList);
            this.reportInfoLoading = false;
            this.isShowIknow = true;
          }
        })
      },15000)
    },
    //获取反馈
    handleReportInfo(){
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        if(this.ids.length>0 || this.allIds.length === 0){
          this.reportReturnList = [];
          this.$store
            .dispatch("taxPageStore/actionPostReportInfo", {
              date: this.salaryItem.date,
              checkId:this.$route.query.id,
            }).then(res=>{
            if(res.success){
              // 已授权，有查询结果
              if(res.data.status === "SUCCESS"){
                this.reportReturnList = res.data.taxSubList;
                this.isShowReturnInfo = true;
              }else{//未授权
                this.isShowReportInfo = false;
                this.$refs.authorizeTip.show()
              }
            }else{
              this.$message.warning(res.message)
            }
          })
        }else{
          this.$message.warning("不存在待反馈的数据")
        }

      }
    },
    onIKnow(){
      this.isShowReportInfo = false;
      this.getList()
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
    padding: 30px 20px 0px 20px;
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
    margin-left: 40px;
  }
  .screening {
    .check-staff-menu {
      .search-input {
        width: 205px;
      }
    }
    /*.add-import {*/
    /*  margin-right: 10px;*/
    /*}*/
    .iconiconfonticonfontsousuo1 {
      font-size: 12px;
    }
    .staff-situation {
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
.hidenCon{
    width:200px;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor:pointer;
  }
</style>

