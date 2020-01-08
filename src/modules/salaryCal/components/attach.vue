<template>
  <div class="calc-attach el-diy-month">
    <div class="tax-content">
      <div class="waitReport" v-if="showWaitReport">存在“待报送”的人员 <span class="bold">{{ waitReportCount }}</span> 人，待报送人员无法下载累计专项附加扣除数据，如需下载，请在“人员采集报送”界面中先完成报送！
        <i class="el-icon-close close-style" @click="showWaitReport=false"></i>
      </div>
      <div class="screening">
        <div class="clearfix check-staff-menu">
          <el-input
            placeholder="请输入姓名\工号\身份证号"
            v-model="totalListForm.key"
            prefix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            @keyup.enter.native="handleSearch"
            class="search-input left"
          ></el-input>
          <div class="left">
            <el-button type="primary" class="tax-search" size="small" @click="handleSearch">查询</el-button>
          </div>
          <div class="right">
            <el-button type="primary" @click="handleDownload" v-if="privilegeVoList.includes('salary.compute.salaryCheck.additionDownload')">全部下载</el-button>
            <el-button @click="handleReportInfo" v-if="privilegeVoList.includes('salary.compute.salaryCheck.additionDownload')">获取反馈</el-button>
            <el-button @click="handleExport">导出</el-button>
          </div>
        </div>
        <div class="staff-situation">
            <span class="staff-total">
              <span class="part" @click="selectNum('')">
               全部
               <i :class="['num', allActive?'active':'']">{{ total?total:0 }}</i>人
              </span>
              <span class="part" @click="selectNum('DEDUCT')">
                有扣除
                 <i :class="['num', deductActive?'active':'']">{{ deductCount }}</i>人
              </span>
               <span class="part" @click="selectNum('NOT_DEDUCT')">
                无扣除
                <i :class="['num', notDeductActive?'active':'']">{{ notDeductCount }}</i>人
              </span>
               <span class="part" @click="selectNum('INIT')">
                未下载
                <i :class="['num', initActive?'active':'']">{{ initCount }}</i>人
              </span>
               <span class="part" @click="selectNum('WAIT_BACK')">
                下载中
                <i :class="['num', waitBackActive?'active':'']">{{ waitBackCount }}</i>人
              </span>
               <span class="part" @click="selectNum('FAIL')">
                下载失败
                <i :class="['num', errorActive?'active':'']">{{ errorCount }}</i>人
              </span>
            </span>
        </div>
        <div class="staff-table">
          <el-table
            :data="list"
            class="check-staff_table"
            v-loading="loading"
            :height="screenHeight"
            align="left"
            border
          >
            <el-table-column width="60" label="序号" type="index"></el-table-column>
            <el-table-column prop="empName" label="姓名" width="80"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" width="180"></el-table-column>
<!--            <el-table-column label="入职日期">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.empDay.split(' ')[0] }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column prop="taxSubName" label="扣缴义务人名称" min-width="200">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.taxSubName" placement="top-start" v-if="scope.row.taxSubName.length>10">
                  <span class="hiden-con">{{ scope.row.taxSubName }}</span>
                </el-tooltip>
                <span v-else>{{ scope.row.taxSubName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="syncTimeStr" label="下载时间" width="100"></el-table-column>
            <el-table-column prop="totalChildrenEdu" label="累计子女教育" width="120">
              <template slot-scope="scope">
                <div class="number-right"> {{ scope.row.totalChildrenEdu }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="totalFurtherEdu" label="累计继续教育" width="120">
              <template slot-scope="scope">
                <div class="number-right"> {{ scope.row.totalFurtherEdu }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="totalHomeLoads" label="累计住房贷款利息" width="140">
              <template slot-scope="scope">
                <div class="number-right"> {{ scope.row.totalHomeLoads }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="totalHouseRent" label="累计住房租金" width="120">
              <template slot-scope="scope">
                <div class="number-right"> {{ scope.row.totalHouseRent }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="totalSupportParents" label="累计赡养老人" width="120">
              <template slot-scope="scope">
                <div class="number-right"> {{ scope.row.totalSupportParents }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="totalSupportParents" label="下载状态" width="110">
              <template slot-scope="scope">
                <span>{{ downLoadStatusObj[scope.row.status]}}</span>
              </template>
            </el-table-column>
<!--            <el-table-column label="反馈信息" min-width="150">-->
<!--              <template slot-scope="scope">-->
<!--                <el-tooltip class="item" effect="dark" :content="scope.row.failReason" placement="top-start" v-if="scope.row.failReason && scope.row.failReason.length>10">-->
<!--                  <span class="hiden-con">{{ scope.row.failReason }}</span>-->
<!--                </el-tooltip>-->
<!--                <span v-else>{{ scope.row.failReason }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
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
    <!-- 下载-->
    <salarySy ref="selectSY"
              :validParameter = "downLoadForm"
              :validAction="validAction"
              :querytAction="querytAction"
              :sign="sign"
              :stopTip="stopTip"
              :timeObj="timeObj"
              :freeBackTip="freeBackTip"
    >
    </salarySy>
    <!-- 获取反馈 -->
    <salaryBack ref="feedback"
              :validParameter = "downLoadForm"
              :querytAction ="querytAction"
              :sign="sign"
              :stopTip="stopTip"
              :freeBackTip="freeBackTip"
    >
    </salaryBack>
    <authorizeTip ref="authorizeTip"></authorizeTip>
  </div>
</template>
<script>
import { mapState } from "vuex";
import authorizeTip from "@/components/tool/authorizeTip";
import salarySy from "@/components/tool/salarySy";
import salaryBack from "@/components/tool/salaryBack";
import fun from "@/util/fun"
let date = fun.headDate();
let defaultDate =
  date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
export default {
  components: {
    authorizeTip,
    salarySy,
    salaryBack,
  },
  data() {
    return {
      loading: false,
      totalListForm: {
        "checkId":this.$route.query.id,
        "currPage": 1,
        "enumReportStatus":"",
        "key": "",
        "pageSize":20 ,
        "enumSpecialDeductionStatus":"",
      },
      downLoadForm:{
        "checkId":this.$route.query.id,
        "date":""
      },
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      screenHeight: document.body.clientHeight - 334,
      list: [],
      total: 0,
      validAction:"taxPageStore/actionDownloadAddition",
      querytAction:"taxPageStore/actionDownloadAdditionQuery",
      stopTip:"下载",//终止文案
      freeBackTip:"【获取反馈】",//进行中文案
      timeObj:{
        first:3000,
        second:10000,
        third:15000,
      },
      sign:"attch",
      closeModel:false,
      setWarning:false,
      waitReportCount:0,
      deductCount:0,
      notDeductCount:0,
      initCount:0,
      waitBackCount:0,
      errorCount:0,
      allActive:true,
      deductActive:false,
      notDeductActive:false,
      initActive:false,
      waitBackActive:false,
      errorActive:false,
      showWaitReport:false,
      downLoadStatusObj:{
        "INIT":"未下载",
        "SUCCESS":"下载成功",
        "FAIL":"下载失败",
        "WAIT_BACK":"待反馈"
      }
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
    this.downLoadForm.date = this.salaryItem.date;
  },
  mounted() {
   this.getList()
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
        this.screenHeight = document.body.clientHeight - 334;
      })();
    };
  },
  methods: {
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionAdditionalList", this.totalListForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.total = res.data.count;
            this.list = res.data.data;
            this.deductCount = res.data.deductCount;
            this.notDeductCount = res.data.notDeductCount;
            this.deductCount = res.data.deductCount;
            this.initCount = res.data.initCount;
            this.waitBackCount = res.data.waitBackCount;
            this.errorCount = res.data.errorCount;
          }
        });
      //校验人员状态
        this.checkEmpReportStatus();
      //校验工资表状态
        this.getSalaryStatus();
    },
    //校验人员状态
    checkEmpReportStatus(){
      this.$store
        .dispatch("salaryCalStore/actionCheckEmpReportStatus", this.totalListForm)
        .then(res => {
          if (res.success) {
            this.waitReportCount = res.data;
            this.showWaitReport = this.waitReportCount != 0;
            if(this.waitReportCount == 0) {this.screenHeight+=60}
          }
        });
    },
    //校验工资表状态
    getSalaryStatus(){
      this.$store.dispatch('salaryCalStore/actionGetSalaryStatus',this.totalListForm.checkId).then(res=>{
        if(res.code === "0000"){
          this.checkStatus = res.data.checkStatus;
          this.setWarning = (this.checkStatus ==='AUDITED' || this.checkStatus ==='PAID' || this.checkStatus ==='FINISH');
        }
      })
    },
    //点击数字切换
    selectNum(type){

      if(type === ""){
        this.allActive = true;this.deductActive = false;this.notDeductActive = false;this.initActive = false;this.waitBackActive = false;this.errorActive = false;
      }
      if(type==="DEDUCT"){
        this.allActive = false;this.deductActive = true;this.notDeductActive = false;this.initActive = false;this.waitBackActive = false;this.errorActive = false;
      }
      if(type==="NOT_DEDUCT"){
        this.allActive = false;this.deductActive = false;this.notDeductActive = true;this.initActive = false;this.waitBackActive = false;this.errorActive = false;
      }
      if(type==="INIT"){
        this.allActive = false;this.deductActive = false;this.notDeductActive = false;this.initActive = true;this.waitBackActive = false;this.errorActive = false;
      }
      if(type==="WAIT_BACK") {
        this.allActive = false;this.deductActive = false;this.notDeductActive = false;this.initActive = false;this.waitBackActive = true;this.errorActive = false;
      }
      if(type==="FAIL"){
        this.allActive = false;this.deductActive = false;this.notDeductActive = false;this.initActive = false;this.waitBackActive = false;this.errorActive = true;
      }
      this.totalListForm.enumSpecialDeductionStatus = type;
      this.getList()
    },
    //导出
    handleExport(){
      this.$store
        .dispatch("salaryCalStore/actionGetAdditionalListExport", this.totalListForm)
        .then(res => {
        })
    },
    //子组件触发刷新
    freshList(data){
      if(data === this.sign){
        this.getList()
      }
    },
  //下载
    handleDownload() {
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        this.$refs.selectSY.show(true)
      }
    },
    //获取反馈
    handleReportInfo(){
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        this.$refs.feedback.show(true)
      }
    },
    //关闭加载提示
    closeReturnMsg(){
      this.isShowReturn = false;
      this.getList()
    },
    changeMonth() {
      this.getList()
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
@import "../../../assets/scss/helpers.scss";
.calc-attach {
  padding:0 22px;
  .staff-situation {
    margin: 10px 0px;
    color: #999;
    font-size: 12px;
    .staff-total {
      margin-left: 15px;
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
  .waitReport{
    height: 40px;
    line-height: 40px;
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
    .close-style{
      position: absolute;
      top:10px;
      right:10px;
      cursor: pointer;
    }
  }
  .footer-btn{
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    text-align: right;
  }
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
    background: #FDF7E9;
  }
  .tax-content {
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
    margin-top: 20px;
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
      .staff-page {
        margin: 12px 0px;
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
  .current-tab-sub_name {
    @include ellipsis;
    width: 200px;
    display: inline-block;
  }
  .el-icon-success{
    color:#67C23A;
    font-size: 18px;
  }
  .downdloadTip{
    margin-bottom:20px;
  }
  .dialog-footer-right{
    text-align: right !important;
  }
  .noDownLoad{
    margin-left: 34px;
  }
  .dialog-footer{
    text-align: right;
    height: 40px;
    line-height: 40px;
  }
}
</style>

