<template>
  <div class="tax-select">
    <el-dialog
      :visible.sync="isShowReportInfo"
      width="550px"
      :title="isShowIknow?'反馈信息':' '"
      center
      class="diy-el_dialog"
      :show-close="false"
      :close-on-click-modal="closeModel"
    >
      <el-row v-for="(item,index) in reportInfoList" :key="index">
        <div v-if="item.dealStatus === 'SUCCESS'"><i class="el-icon-success"></i>任务完成</div>
        <div v-if="item.dealStatus === 'PROCESSING'"><i class="el-icon-warning"></i>任务处理中…</div>
        <div v-if="item.dealStatus === 'FAIL'"><i class="el-icon-error"></i>任务失败，{{item.failReason}}</div>
      </el-row>
      <div v-loading="reportInfoLoading" style="height: 40px" element-loading-text="任务处理中"></div>
      <div v-show="showReturn" style="color:#E6A23C">任务仍在处理中，请稍后点击{{ paramsObj.freeBackTip }}查询结果</div>
      <div class="dialog-footer">
        <el-button @click="onIknow" v-show="isShowIknow" type="primary" plain>我知道了</el-button>
      </div>
    </el-dialog>
    <authorizeTip ref="authorizeTip"></authorizeTip>
   <!-- 失败原因   -->
    <el-dialog
      :visible.sync="isShowFailReason"
      width="750px"
      title="反馈信息"
      center
      class="diy-el_dialog"
      :show-close="false"
      :close-on-click-modal="closeModel"
    >
      <el-table :data="failReasonData">
        <el-table-column prop="subTaxReportType" label="申报表" width="150px">
          <template slot-scope="scope">
            <span>{{ reportSubTaxReportType(scope.row.subTaxReportType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="idNo" label="证件号码" width="170"></el-table-column>
        <el-table-column label="状态" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.status | reportType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="failReason" label="反馈信息">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.failReason" placement="top-start" v-if="scope.row.failReason && scope.row.failReason.length>10">
                <span class="hiden-con">{{ scope.row.failReason }}</span>
              </el-tooltip>
              <span v-else>{{ scope.row.failReason }}</span>
            </template>
        </el-table-column>
      </el-table>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleFailExport">导出</el-button>
        <el-button @click="onIknow" plain>我知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import authorizeTip from "@/components/tool/authorizeTip"
  import * as SCR from "../util/constData";
export default {
  components:{
    authorizeTip
  },
  props: {
    sign:String, //页面标识
    timeObj:Object,
  },
  data() {
    return {
      subjectObj:{
        dealStatus:"",
        failReason:""
      },
      isShowReturnInfo:false,
      isShowReportInfo: false,
      reportInfoLoading:false,
      paramsObj:{
        stopTip:"",//终止文案
        processingTip:"",//进行中文案
        validParameter: "", //校验参数
        validAction: "", //校验action
        querytAction:"" ,//查询action
        exportFailAction:"",//导出失败原因
        showFailReason:false,//是否显示失败原因
        freeBackTip:"",//获取反馈提示
      },
      isShowIknow:false,
      closeModel:false,
      failReasonData:[],
      isShowFailReason:false,
      reportInfoList:[],
      showReturn:false,
      returnTip:"",
    };
  },
  created(){
  },
  methods: {
    show(data,params) {
      if(data) {
        this.isShowReportInfo = true;
        this.reportInfoList = [];
        this.isShowIknow = false;
        this.showReturn = false;
        //接口参数赋值
       this.paramsObj = params;
       this.handleExport();
      }else{
        this.isShowReportInfo = false;
      }
    },
    handleExport() {
      this.reportInfoLoading = true;
      this.isShowReportInfo = true;
      this.returnTip = "";
      this.$store
        .dispatch(this.paramsObj.validAction, this.paramsObj.validParameter)
        .then(res=>{
          if (res.success) {
            //验证通过
            if(res.data.status === "SUCCESS"){
              if(res.data.taxSubList[0].dealStatus === "PROCESSING"){
                this.selectShuiyou()
              }else{//全部成功或失败
                this.reportInfoList = res.data.taxSubList;
                this.reportInfoLoading = false;
                this.isShowIknow = true;
              }
            }else{
                //授权失败
                this.reportInfoLoading = false;
                this.isShowReportInfo = false;
                this.$refs.authorizeTip.show()
            }
          }else{
            this.reportInfoLoading = false;
            this.isShowReportInfo = false;
            this.$message.warning(res.message)
          }
        })
    },
    handleFailExport(){
      this.$store
        .dispatch(this.paramsObj.exportFailAction, this.paramsObj.validParameter)
        .then(res=>{
          console.log(res)
        })
    },
    selectShuiyou(){
      this.isShowIknow = false;
      //查询第一次
      setTimeout(()=>{
        this.$store
          .dispatch(this.paramsObj.querytAction,this.paramsObj.validParameter)
          .then(r0 => {
            if(r0.success){
              if(r0.data.status === "SUCCESS"){
                if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                  this.selectSec()
                }else{
                  //如果有人员失败原因
                  if(this.paramsObj.showFailReason && r0.data.dataList && r0.data.dataList.length>0){
                    this.reportInfoLoading = false;
                    this.isShowReportInfo = false;
                    this.failReasonData = r0.data.dataList;
                    this.isShowFailReason = true;
                  }else{
                    this.reportInfoList = r0.data.taxSubList;
                    this.reportInfoLoading = false;
                    this.isShowIknow = true;
                  }
                }
              }else{}
            }
          })
      },this.timeObj.first)
    },
    //第二次查询
    selectSec(){
      setTimeout(()=>{
        this.$store
          .dispatch(this.paramsObj.querytAction,this.paramsObj.validParameter)
          .then(r0 => {
            if(r0.data.status === "SUCCESS"){
              if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.selectThird()
              } else{
                //如果有人员失败原因
                if(this.paramsObj.showFailReason && r0.data.dataList && r0.data.dataList.length>0){
                  this.reportInfoLoading = false;
                  this.isShowReportInfo = false;
                  this.failReasonData = r0.data.dataList;
                  this.isShowFailReason = true;
                }else{
                  this.reportInfoList = r0.data.taxSubList;
                  this.reportInfoLoading = false;
                  this.isShowIknow = true;
                }
              }
            }else{
            }
          })
      },this.timeObj.second)
    },
    //第三次查询
    selectThird(){
      setTimeout(()=>{
        this.$store
          .dispatch(this.paramsObj.querytAction,this.paramsObj.validParameter)
          .then(r0 => {
            if(r0.data.status === "SUCCESS"){
              if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.selectFour()
              } else{
                //如果有人员失败原因
                if(this.paramsObj.showFailReason && r0.data.dataList && r0.data.dataList.length>0){
                  this.reportInfoLoading = false;
                  this.isShowReportInfo = false;
                  this.failReasonData = r0.data.dataList;
                  this.isShowFailReason = true;
                }else{
                  this.reportInfoList = r0.data.taxSubList;
                  if(this.reportInfoList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                    this.showReturn = true;
                  }
                  this.reportInfoLoading = false;
                  this.isShowIknow = true;
                }
              }
            }else{
            }
          })
      },this.timeObj.third)
    },
    //第四次次查询
    selectFour(){
      setTimeout(()=>{
        this.$store
          .dispatch(this.paramsObj.querytAction,this.paramsObj.validParameter)
          .then(re => {
            if(re.success){
              //如果有人员失败原因
              if(this.paramsObj.showFailReason && re.data.dataList && re.data.dataList.length>0){
                this.reportInfoLoading = false;
                this.isShowReportInfo = false;
                this.failReasonData = re.data.dataList;
                this.isShowFailReason = true;
              }else{
                this.reportInfoLoading = false;
                this.isShowIknow = true;
                this.reportInfoList = re.data.taxSubList;
              }
            }
          })
      },this.timeObj.fourth)
    },
    reportSubTaxReportType(params) {
      return SCR.subTaxReportType[params];
    },
    onIknow(){
      this.isShowReportInfo = false;
      this.isShowFailReason = false;
      this.$parent.freshList(this.sign)
    },
  }
};
</script>
<style lang="scss" scoped>
.tax-select {
  .dialog-footer{
    text-align: right;
    height: 40px;
    line-height: 40px;
  }
}
</style>