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
          :height="screenHeight"
        >
          <el-table-column  label="序号" type="index"></el-table-column>
          <el-table-column prop="taxSubName" label="扣缴义务人" width="200px">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.taxSubName" placement="top-start" v-if="scope.row.taxSubName && scope.row.taxSubName.length>10">
                <span class="hidenCon">{{ scope.row.taxSubName }}</span>
              </el-tooltip>
              <span v-else>{{ scope.row.taxSubName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payDate" label="税款所属期" width="160px">
            <template slot-scope="scope">
              {{ scope.row.payDate | dateStyle}}
            </template>
          </el-table-column>
          <el-table-column  label="申报表" width="150px">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="subTaxReportType[scope.row.subTaxReportType]" placement="top-start" v-if="scope.row.subTaxReportType && subTaxReportType[scope.row.subTaxReportType].length>10">
                <span class="hidenCon">{{ subTaxReportType[scope.row.subTaxReportType] }}</span>
              </el-tooltip>
              <span v-else>{{ subTaxReportType[scope.row.subTaxReportType]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="taxPaid" label="已缴税款"></el-table-column>
          <el-table-column  label="缴款状态">
            <template slot-scope="scope">
              <span>{{ payStatus[scope.row.payStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payDate" label="缴款日期" width="160px">
            <template slot-scope="scope">
              {{ scope.row.payDate | dateStyle}}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280px">
            <template slot-scope="scope">
              <span class="funStyle" @click="getTripleAgreementList(scope.row)">发起缴款</span>
              <span class="funStyle" @click="queryTaxPay(scope.row)">缴款反馈</span>
              <el-popover
                ref="popMore"
                placement="bottom-end"
                width="250"
                trigger="hover">
                <span class="funStyle" @click="getTripleAgreement(scope.row)">获取三方协议下载</span>
                <span class="funStyle" @click="getTripleAgreementQuery(scope.row)">三方协议反馈</span>
                <span slot="reference" class="more-choose">更多>></span>
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
<!-- 三方协议列表-->
    <el-dialog
      :visible.sync="isShowTripleAgreementTaxList"
      width="550px"
      title="请选择三方协议"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
    >
      <el-table
        :data="tripleAgreementTaxList"
        class="check-staff_table"
        v-loading="tripleAgreementLoading"
        highlight-current-row
        ref="selectTable"
      >
        <el-table-column label=" " width="65">
          <template slot-scope="scope">
            <el-radio :label="scope.row.tripleAgreementNo" v-model="tripleAgreementNo" @change.native="getSelectRow(scope.$index,scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="tripleAgreementNo" label="三方协议号"></el-table-column>
        <el-table-column prop="accountBankCode" label="开户银行"></el-table-column>
        <el-table-column prop="payAccountName" label="账户名称"></el-table-column>
        <el-table-column prop="payAccount" label="缴款账户"></el-table-column>
      </el-table>
      <div class="dialog-foot">
        <span class="moneyStyle">扣款金额：<span class="redTip">{{ deductionAmount ? deductionAmount:0 }}</span>元</span>
        <el-button type="primary" @click="handleTaxPay">扣款</el-button>
        <el-button type="info" @click="isShowTripleAgreementTaxList = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 缴款 三方协议-->
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
      screenHeight: document.body.clientHeight - 360,
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
        taxSubId:"",
      },
      count:0,
      isShowTripleAgreementTaxList:false,
      tripleAgreementTaxList:[],
      tripleAgreementLoading:false,
      deductionAmount:0,//扣款金额
      tripleAgreementNo:"",//三方协议号
      taxSubId:"",//税号
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
        this.screenHeight = document.body.clientHeight - 360;
      })();
    };
  },
  methods:{
    getList(){
      this.$store
        .dispatch(
          "taxPaidStore/actionTripleAgreementTaxList",this.agreementListForm
        )
        .then(res => {
          if (res.success) {
            this.paidList = res.data.data;
            this.count =this.paidList.length;
          }
        });
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
    //三方协议列表
    getTripleAgreementList(data){
      this.tripleAgreementNo = "";
      this.isShowTripleAgreementTaxList = true;
      this.tripleAgreementLoading = true;
      this.$store
        .dispatch(
          "taxPaidStore/actionTripleAgreementList",{
            taxSubId:data.taxSubId,
            queryMonth:this.agreementListForm.queryMonth
          }
        )
        .then(res => {
          if(res.success){
            this.tripleAgreementTaxList = res.data.tripleAgreementListVoList;
            this.deductionAmount = res.data.deductionAmount;
            this.tripleAgreementLoading = false;
          }else{
            // this.$message.warning(res.message)
          }
        });
    },
    getSelectRow(index,row){
      this.taxSubId = row.taxSubId;
      this.tripleAgreementNo = row.tripleAgreementNo
    },
    //缴税
    handleTaxPay(){
      this.isShowTripleAgreementTaxList = false;
     let paramsObj = {
       validParameter :{
         taxSubId:this.taxSubId,
         queryMonth:this.agreementListForm.queryMonth,
         tripleAgreementNo:this.tripleAgreementNo
       },
      validAction : "taxPaidStore/actionTaxPay",
      querytAction : "taxPaidStore/actionTaxPayQuery",
      stopTip:"扣款",
     }
     this.$refs.selectSY.show(true,paramsObj)
    },
    //缴款反馈
    queryTaxPay(row){
      let paramsObj = {
        validParameter :{
          taxSubId:row.taxSubId,
          queryMonth:this.agreementListForm.queryMonth,
          tripleAgreementNo:this.tripleAgreementNo
        },
        querytAction : "taxPaidStore/actionTaxPayQuery",
        stopTip:"扣款",
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
    },
    handleCurrentChange(val){
      this.agreementListForm.currPage = val;
      this.getList()
    },
    handleSizeChange(val){
      this.agreementListForm.pageSize = val;
      this.getList()
    },
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
    display: inline-block;
    margin-left:10px;
  }
  .paid-page{
    margin-top: 30px;
    float:right;
  }
  .redTip{
    color:red;
  }
  .moneyStyle{
    position: absolute;
    left:20px;
  }
  .dialog-foot{
    text-align: center;
    margin-top: 20px;
  }
}
</style>

