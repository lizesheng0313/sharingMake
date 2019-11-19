<template>
  <div class="taxPaid">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>三方协议缴税</span>
        </el-col>
      </el-row>
    </header>
    <div class="taxPaidCon">
      <div class="content-header head-date">
        <el-date-picker
          v-model="agreementListForm.queryMonth"
          type="month"
          suffix-icon="el-icon-date"
          value-format="yyyy-MM"
          :editable="false"
          :clearable="false"
          @change="changeDate"
        ></el-date-picker>
      </div>
      <div class="tableCon">
        <el-table
          :data="paidList"
          class="check-staff_table"
          v-loading="loading"
          :style="{width:screenWidth-300+'px'}"
        >
          <el-table-column  label="序号" type="index"></el-table-column>
          <el-table-column prop="taxSubName" label="扣缴义务人"></el-table-column>
          <el-table-column prop="payDate" label="税款所属期"></el-table-column>
          <el-table-column  label="申报表">
            <template slot-scope="scope">{{ subTaxReportType[scope.row.subTaxReportType]}}</template>
          </el-table-column>
          <el-table-column prop="taxPaid" label="已缴税款"></el-table-column>
          <el-table-column  label="缴款状态">
            <template slot-scope="scope">{{ payStatus[scope.row.payStatus]}}</template>
          </el-table-column>
          <el-table-column prop="payDate" label="缴款日期" width="140">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="320px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleTaxPay(scope.row.name)">发起缴款</el-button>
              <el-button type="primary" size="mini" @click="queryTaxPay(scope.row.name)">缴款反馈</el-button>
              <el-popover
                ref="popMore"
                placement="right"
                width="400"
                trigger="hover">
                <el-button type="primary" plain @click="getTripleAgreement(scope.row)">获取三方协议下载</el-button>
                <el-button type="primary" plain @click="getTripleAgreementQuery(scope.row)">三方协议反馈</el-button>
                <span slot="reference" class="more-choose">更多1 >></span>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="agreementListForm.currPage"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="agreementListForm.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="count"
          class="paid-page">
        </el-pagination>
      </div>
    </div>
<!--    缴款 三方协议-->
    <selectSY ref="selectSY"
              :timeObj="timeObj"
              :sign="sign"
    >
    </selectSY>
    <!--获取反馈 -->
    <feedback ref="feedback"
              :sign="sign"
    >
    </feedback>
  </div>
</template>
<script>
 import selectSY from "./components/partSelectSY";
 import feedback from "./components/partFeedback";
 import * as constData from "./util/constData"
import { mapState } from "vuex";
import fun from "@/util/fun"
export default {
  components: {
    selectSY,
    feedback,
  },
  data() {
    return {
      loading:"",
      subTaxReportType:constData.subTaxReportType,
      payStatus:constData.payStatus,
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      paidList:[
        { name:"北京懒猫联银科技有限公司",tableName:"综合所得预扣预缴表",status:"申报成功",isThree:"是",paidStatus:"无需缴款",time:"2019-12-12" }
      ],
      closeModel: false,
      isShowReturn:false,
      returnMsg:"",
      validAction:"",
      validParameter:{},
      querytAction:"",
      stopTip:"",//终止文案
      processingTip:"",//进行中文案
      timeObj:{
        first:3000,
        second:10000,
        third:15000,
      },
      sign:"taxPaidIndex",
      showSelect:false,
      agreementListForm:{
        currPage:1,
        pageSize:20,
        queryMonth:"",
        taxSubId: 17
      },
      count:0
    };
  },
  created(){
    let nowDate = fun.headDate();
    let year = nowDate.year;
    let month = nowDate.month >= 10 ? nowDate.month : "0" + nowDate.month;
    this.agreementListForm.queryMonth = year+"-"+month;
  },
  mounted(){
    this.getList()
    let that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods:{
    getList(){
      this.$store
        .dispatch(
          "taxPaidStore/actionTripleAgreementList",this.agreementListForm
        )
        .then(res => {
          if (res.success) {
            this.paidList = res.data.data;
            this.count =this.paidList.length;
          }
        });
    },
    handleCurrentChange(val){
      this.agreementListForm.currPage = val;
      this.getList()
    },
    handleSizeChange(val){
      this.agreementListForm.pageSize = val;
      this.getList()
    },
    //子组件触发刷新
    freshList(data){
      if(data === this.sign){
        this.getList()
      }
    },
    changeDate(data){
      this.agreementListForm.queryMonth = data;
      this.getList()
    },
    //发起缴款
    handleTaxPay(data){
     let paramsObj = {
       validParameter :{
         taxSubId:data.taxSubId,
         queryMonth:"2019-10"
       },
      validAction : "taxPaidStore/actionTaxPay",
      querytAction : "taxPaidStore/actionTaxPayQuery",
      stopTip:"缴款",
      processingTip:"获取反馈中。。。",
     }
     this.$refs.selectSY.show(true,paramsObj)
    },
    //缴款反馈
    queryTaxPay(data){
      let paramsObj = {
        validParameter :{
          taxSubId:data.taxSubId,
          queryMonth:"2019-10"
        },
        querytAction : "taxPaidStore/actionTaxPayQuery",
        stopTip:"缴款",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.feedback.show(true,paramsObj)
    },
    //三方协议下载
    getTripleAgreement(data){
      console.log(data)
      let paramsObj = {
        validParameter :{
          taxSubId:data.taxSubId,
          queryMonth:this.agreementListForm.queryMonth
        },
        validAction : "taxPaidStore/actionGetTripleAgreement",
        querytAction : "taxPaidStore/actionGetTripleAgreementQuery",
        stopTip:"获取三方协议",
      }
      this.$refs.selectSY.show(true,paramsObj);
    },
    //三方协议下载查询
    getTripleAgreementQuery(data){
      let paramsObj = {
        validParameter :{
          taxSubId:data.taxSubId,
          queryMonth:this.agreementListForm.queryMonth
        },
        querytAction : "taxPaidStore/actionGetTripleAgreementQuery",
        stopTip:"获取三方协议",
      }
      this.$refs.feedback.show(true,paramsObj)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.taxPaid {
  .header {
    padding:0 20px;
    font-size: 14px;
    height: 61px;
    border-bottom: 1px solid #ededed;
    line-height: 61px;
  }
  .taxPaidCon{
    padding:22px;
  }
  .tableCon{
    margin-top:40px;
  }
  .more-choose{
    color: #2c7cff;
    cursor: pointer;
  }
  .paid-page{
    margin-top: 30px;
    float:right;
  }
}
</style>

