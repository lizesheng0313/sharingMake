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
          v-model="currentDate"
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
        >
          <el-table-column  label="序号" type="index"></el-table-column>
          <el-table-column prop="taxSubName" label="扣缴义务人"></el-table-column>
          <el-table-column prop="tableName" label="申报表"></el-table-column>
          <el-table-column prop="status" label="申报状态"></el-table-column>
          <el-table-column prop="isThree" label="是否有反方协议"></el-table-column>
          <el-table-column prop="paidStatus" label="缴款状态" width="140"></el-table-column>
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
                <el-button type="primary" plain @click="getTripleAgreement(scope.row)">三方协议下载</el-button>
                <el-button type="primary" plain @click="getTripleAgreementQuery(scope.row)">三方协议下载反馈</el-button>
              </el-popover>
              <span v-popover:popMore class="more-choose">更多 >></span>
            </template>
          </el-table-column>
        </el-table>
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
              :validParameter = "validParameter"
              :querytAction ="querytAction"
              :stopTip="stopTip"
              :processingTip="processingTip"
              :sign="sign"
    >
    </feedback>
  </div>
</template>
<script>
 import selectSY from "./components/partSelectSY";
 import feedback from "./components/partFeedback";
import { mapState } from "vuex";
import  fun from "@/util/fun"
export default {
  components: {
    selectSY,
    feedback,
  },
  data() {
    return {
      currentDate:"",
      loading:"",
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
      showSelect:false
    };
  },
  created(){
    let nowDate = fun.headDate();
    let year = nowDate.year;
    let month = nowDate.month >= 10 ? nowDate.month : "0" + nowDate.month;
    this.currentDate = year+"-"+month;
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      this.$store
        .dispatch(
          "taxPaidStore/actionTripleAgreementList", {
            date:this.currentDate
          }
        )
        .then(res => {
          if (res.success) {
            this.paidList = res.data
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
      this.currentDate = data
    },
    //发起缴款
    handleTaxPay(data){
     let paramsObj = {
       validParameter :{
         checkId:"16-T",
         date:"2019-10"
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
          checkId:"16-Q",
          date:"2019-10"
        },
        validAction : "taxPaidStore/actionTaxPay",
        querytAction : "taxPaidStore/actionTaxPayQuery",
        stopTip:"缴款",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.feedback.show(true,paramsObj)
    },
    //三方协议下载
    getTripleAgreement(data){
      let paramsObj = {
        validParameter :{
          checkId:"17-D",
        },
        validAction : "taxPaidStore/actionGetTripleAgreement",
        querytAction : "taxPaidStore/actionGetTripleAgreementQuery",
        stopTip:"三方协议下载",
        processingTip:"获取反馈中。。。",
      }
      this.$refs.selectSY.show(true,paramsObj);
    },
    //三方协议下载查询
    getTripleAgreementQuery(data){
      let paramsObj = {
        validParameter :{
          checkId:"17-q",
        },
        validAction : "taxPaidStore/actionGetTripleAgreement",
        querytAction : "taxPaidStore/actionGetTripleAgreementQuery",
        stopTip:"三方协议下载",
        processingTip:"获取反馈中。。。",
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
}
</style>

