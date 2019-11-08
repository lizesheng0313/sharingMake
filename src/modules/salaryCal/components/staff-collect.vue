<template>
  <div class="collect">
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
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-tooltip class="item" effect="dark" content="若未选择人员，抓取工资表全部待报送人员；若选择了人员，抓取所选人员中待报送人员报送。" placement="top">
                <el-button type="primary" class="add-import" @click="handleReport">报送</el-button>
              </el-tooltip>
              <el-button type="primary" class="add-import" @click="handleReportInfo">获取反馈</el-button>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
              全部
              <i>{{ total }}</i>人
              <span class="wait-report">
                待报送
                <i>{{ awaitReportCount }}</i>人
              </span>
            </span>
            <div class="content-header head-date">
<!--              <el-date-picker-->
<!--                v-model="selectMonth"-->
<!--                @input="changeMonth"-->
<!--                type="month"-->
<!--                value-format="yyyy-MM"-->
<!--                :editable="false"-->
<!--                :clearable="false"-->
<!--              ></el-date-picker>-->
            </div>
          </div>
          <div class="staff-table">
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              @selection-change="handleSelectItem"
            >
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="empNo" label="工号" ></el-table-column>
              <el-table-column prop="empName" label="姓名">
                <template slot-scope="scope">
                  <span
                    class="table-name"
                    @click="handleCollectionName(scope.row)"
                  >{{scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="idType" label="证件类型">
                <template slot-scope="scope">{{scope.row.idType | idType}}</template>
              </el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="170"></el-table-column>
              <el-table-column prop="empSex" label="性别">
                <template slot-scope="scope">{{returnStatus('empSex',scope.row.empSex)}}</template>
              </el-table-column>
              <el-table-column prop="workerStatus" label="人员状态" >
                <template slot-scope="scope">{{returnStatus("empStatus",scope.row.workerStatus)}}</template>
              </el-table-column>
              <el-table-column prop="taxSubName" label="纳税主体名称" width="170"></el-table-column>
              <el-table-column prop="reportStatus" label="报送状态" width="140">
                <template slot-scope="scope">{{returnStatus('reportStatus',scope.row.reportStatus)}}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="身份证验证状态" width="140">
                <template
                  slot-scope="scope"
                >{{returnStatus('idValidStatus',scope.row.idValidStatus)}}</template>
              </el-table-column>
              <el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>
              <el-table-column prop="iscgl" label="是否残疾" width="80">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.iscgl)}}</template>
              </el-table-column>
              <el-table-column prop="martyrFamilyYn" label="是否烈属" width="80">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.martyrFamilyYn)}}</template>
              </el-table-column>
              <el-table-column prop="lonelyOldYn" label="是否孤老" width="80">
                <template slot-scope="scope">{{returnYesOrNo(scope.row.iscgl)}}</template>
              </el-table-column>
              <el-table-column prop="workerType" label="任职受雇从业类型" width="140">
                <template slot-scope="scope">{{returnStatus('workerType',scope.row.workerType)}}</template>
              </el-table-column>
              <el-table-column label="国籍" width="100">
                <template slot-scope="scope">{{ scope.row.country|countryType }}</template>
              </el-table-column>
              <el-table-column prop="reportFinishTime" label="更新时间" width="110"></el-table-column>
              <el-table-column prop="updateTime" label="最近操作时间" width="110"></el-table-column>
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
      <el-dialog
        :visible.sync="isShowReportInfo"
        width="550px"
        center
        class="diy-el_dialog"
        :show-close="false"
        :close-on-click-modal="closeModel"
      >
        <el-table :data="reportInfoList"
        v-loading="reportInfoLoading"
        :element-loading-text="reportInfoLodingText">
          <el-table-column prop="empName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="idType" label="证件类型" width="120">
            <template slot-scope="scope">{{returnStatus('idType',scope.row.idType)}}</template>
          </el-table-column>
          <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="reportStatus" label="报送状态" width="90">
            <template slot-scope="scope">{{returnStatus('reportStatus',scope.row.reportStatus)}}</template>
          </el-table-column>
        </el-table>
        <div class="dialog-footer">
          <el-button @click="isShowReportInfo=false" v-show="isShowIknow">我知道了</el-button>
        </div>
      </el-dialog>
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
export default {
  data() {
    return {
      submitLoading: false,
      ruleForm: {
        "checkId":this.$route.query.id,
        "currPage": 1,
        "key": "",
        "pageSize":20 ,
      },
      loading: false,
      isShowScreening:false,
      ids: [],
      awaitReportCount:"",
      reportInfoList:[],
      isShowReportInfo: false,
      reportInfoLoading:false,
      reportInfoLodingText:"数据查询中请稍后！",
      total: 0,
      workerType: true,
      list: [],
      screening: SCR,
      closeModel: false,
      isSave:this.$route.query.isSave,
      isShowIknow:false,
    };
  },
  computed:{
    ...mapState("salaryCalStore", {
      salaryItem:"salaryItem"
    })
  },
  created(){
  },
  mounted() {
    const that = this;
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
          }
        });
    },
    //报送
    handleReport() {
        let ids = this.ids.length > 0 ? this.ids:[];
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
          //报送
          this.$store
            .dispatch("taxPageStore/actionReport", {
              ids,
              date:this.salaryItem.date,
            })
            .then(res => {
              if (res.success) {
                this.isShowReportInfo = true;
                this.reportInfoLoading = true;
                //如果是自由接口...报送直接返回数据
                if(res.data){
                  this.reportInfoList = res.data;
                  this.reportInfoLoading = false;
                }else{//如果是税友接口报送后需要查询
                  this.selectShuiyou()
                }
              }else{
                this.$message.warning(res.message)
              }
            });
        }).catch(() => {});
    },
    selectShuiyou(){
      this.reportInfoLodingText = "人员报送数据局端处理中。。。";
      this.isShowIknow = false;
      //查询第一次
      setTimeout(()=>{
        this.$store
          .dispatch("taxPageStore/actionPostReportInfo", {
            date: this.salaryItem.date,
            checkId:this.$route.query.id,
          }).then(r0 => {
            if(r0.success){
              if(!r0.data) {
                this.reportInfoLodingText = "人员报送数据局端处理中。。。";
                this.selectSec()
              }else{
                this.reportInfoLoading = false;
                this.reportInfoList = r0.data
              }
            }else{
              this.reportInfoLodingText= "无待反馈的人员，无需获取反馈";
              this.isShowIknow = true;
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
        }).then(r1 => {
          if(r1.success){
            if (!r1.data) {
              this.reportInfoLodingText = "人员报送数据局端处理中。。。";
              this.selectThird()
            }else{
              this.reportInfoLoading = false;
              this.reportInfoList = r1.data;
            }
          }else{
            this.reportInfoLodingText= "无待反馈的人员，无需获取反馈";
            this.isShowIknow = true;
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
          }).then(r2 => {
          if(r2.success){
            if(!r2.data){
              this.reportInfoLodingText = "人员报送数据局端处理中，请稍后再获取反馈。"
              this.isShowIknow = true;
            }else{
              this.reportInfoLoading = false;
              this.reportInfoList = r2.data
            }
          }else{
            this.reportInfoLodingText= "无待反馈的人员，无需获取反馈"
            this.isShowIknow = true;
          }
        })
      },15000)
    },
    //获取反馈
    handleReportInfo(){
      this.$store
        .dispatch("taxPageStore/actionPostReportInfo", {
          date: this.IndexCurrentDate,
          checkId:this.$route.query.id,
        }).then(res=>{
          if(res.success){
            if(res.data){
              this.isShowReportInfo = true;
              this.reportInfoList = res.data
            }else{
              this.$message.warning("未查询到结果，请稍后点击“获取反馈”进行查询。")
            }
          }else{
            this.$message.warning(res.message)
          }
        })
    },
    //表格选中事件
    handleSelectItem(row) {
      this.ids = [];
      row.forEach(element => {
        if (element.reportStatus == "AWAIT_REPORT") {
          this.ids.push(element.id);
        }
      });
    },
    handleSizeChange(val) {
      this.totalListForm.pageSize = val;
      this.totalListForm.currPage = 1;
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
    padding: 30px 0 40px 22px;
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
}
</style>

