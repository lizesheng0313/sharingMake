<template>
  <div class="calc-attach el-diy-month">
    <div class="tax-content">
      <div class="screening">
        <div class="clearfix check-staff-menu">
          <el-input
            placeholder="请输入姓名\证件号码"
            v-model="totalListForm.key"
            prefix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            @keyup.enter.native="handleSearch"
            class="search-input left"
          ></el-input>
          <div class="left">
            <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
          </div>
          <div class="right">
            <el-button type="warning" plain class="export-button" @click="handleExport">全部下载</el-button>
            <el-button type="primary" plain class="add-import" @click="handleReportInfo">获取反馈</el-button>
          </div>
        </div>
        <div class="staff-table">
          <el-table
            :data="list"
            class="check-staff_table"
            v-loading="loading"
          >
            <el-table-column width="55" label="序号" type="index"></el-table-column>
            <el-table-column prop="empName" label="姓名"></el-table-column>
            <el-table-column prop="idNo" label="身份证号"></el-table-column>
            <el-table-column label="入职日期">
              <template slot-scope="scope">
                <span>{{ scope.row.empDay.split(' ')[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="taxSubName" label="纳税主体名称" width="170"></el-table-column>
            <el-table-column prop="totalChildrenEdu" label="累计子女教育"></el-table-column>
            <el-table-column prop="totalFurtherEdu" label="累计继续教育"></el-table-column>
            <el-table-column prop="totalHomeLoads" label="累计住房贷款利息"></el-table-column>
            <el-table-column prop="totalHouseRent" label="累计住房租金"></el-table-column>
            <el-table-column prop="totalSupportParents" label="累计赡养老人"></el-table-column>
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
        <el-button @click="onShowReportInfo" v-show="isShowIknow" type="primary" plain>我知道了</el-button>
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
</template>
<script>
import { mapState } from "vuex";
import authorizeTip from "@/components/tool/authorizeTip"
import fun from "@/util/fun"
let date = fun.headDate();
let defaultDate =
  date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
export default {
  components: {
    authorizeTip,
  },
  data() {
    return {
      loading: false,
      totalListForm: {
        "checkId":this.$route.query.id,
        "currPage": 1,
        "key": "",
        "pageSize":20 ,
      },
      downLoadForm:{
        "checkId":this.$route.query.id,
        "date":""
      },
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      list: [],
      total: 0,
      reportInfoList:[],
      reportReturnList:[],
      isShowReturnInfo:false,
      isShowReportInfo: false,
      reportInfoLoading:false,
      isShowIknow:false,
      closeModel:false,
    };
  },
  computed:{
    ...mapState("salaryCalStore", {
      salaryItem:"salaryItem"
    })
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
          }
        });
    },
    onShowReportInfo(){
      this.isShowReportInfo = false;
      this.getList();
    },
//下载
    handleExport() {
      this.$store
        .dispatch("taxPageStore/actionDownloadAddition", this.downLoadForm)
        .then(res=>{
          if (res.success) {
            //验证通过
            if(res.data.status === "SUCCESS"){
              this.isShowReportInfo = true;
              this.reportInfoLoading = true;
              this.reportInfoList = res.data.taxSubList;
              //是否进行下步查询
              if(res.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.selectShuiyou()
              }else{//全部成功或失败
                this.reportInfoLoading = false;
                this.isShowIknow = true;
              }
            }else{//授权失败
              this.$refs.authorizeTip.show()
            }
          }else{
            this.$message.warning(res.message)
          }
        })
    },
    selectShuiyou(){
      this.isShowIknow = false;
      //查询第一次
      setTimeout(()=>{
        this.$store
          .dispatch("taxPageStore/actionDownloadAdditionQuery",this.downLoadForm)
          .then(r0 => {
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
        this.$store
          .dispatch("taxPageStore/actionDownloadAdditionQuery",this.downLoadForm)
          .then(r0 => {
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
          .dispatch("taxPageStore/actionDownloadAdditionQuery",this.downLoadForm)
          .then(re => {
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
      this.reportReturnList = [];
      this.$store
        .dispatch("taxPageStore/actionDownloadAdditionQuery",this.downLoadForm)
        .then(res=>{
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
    margin-top: 30px;
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

