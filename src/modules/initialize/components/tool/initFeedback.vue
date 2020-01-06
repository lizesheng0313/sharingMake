<template>
  <div class="initFeedback">
    <el-dialog
      :visible.sync="isShowReturnInfo"
      width="550px"
      :title="isShowIknow?'获取反馈':''"
      center
      class="diy-el_dialog"
      :show-close="false"
      :close-on-click-modal="closeModel"
    >
      <el-row v-for="(item,index) in reportInfoList" :key="index">
        <div v-if="item.dealStatus === 'SUCCESS'">任务完成。</div>
        <div v-if="item.dealStatus === 'PROCESSING'">任务处理中…</div>
        <div v-if="item.dealStatus === 'FAIL'">任务失败，{{item.failReason}}</div>
      </el-row>
      <div v-loading="reportInfoLoading" style="height: 40px"></div>
      <div v-show="showReturn" style="color:#E6A23C">任务仍在处理中，请稍后点击{{ paramsObj.freeBackTip }}查询结果</div>
      <div class="dialog-footer">
        <el-button @click="onIknow" v-show="isShowIknow" type="primary" plain>我知道了</el-button>
      </div>
    </el-dialog>
    <authorizeTip ref="authorizeTip"></authorizeTip>
  </div>
</template>
<script>
  import authorizeTip from "@/components/tool/authorizeTip"
export default {
  components:{
    authorizeTip
  },
  props: {
    sign:String, //页面标识
  },
  data() {
    return {
      paramsObj:{
        stopTip:"",//终止文案
        validParameter: "", //校验参数
        querytAction:"" ,//查询action
        freeBackTip:"",//获取反馈
      },
      isShowReturnInfo:false,
      isShowReportInfo: false,
      closeModel:false,
      reportInfoList:[],
      showReturn:false,
      reportInfoLoading:false,
      isShowIknow:false
    };
  },
  methods: {
    show(data,params) {
      if(data) {
        //接口参数赋值
        this.showReturn=false;
        this.reportInfoList = []
        this.isShowIknow = false;
        this.paramsObj = params;
        this.handleReportInfo()
      }
      else{
        this.isShowReportInfo = false;
      }
    },
    //获取反馈
    handleReportInfo(){
      this.$store
        .dispatch(this.paramsObj.querytAction,this.paramsObj.validParameter)
        .then(res=>{
        if(res.success){
          // 已授权，有查询结果
          if(res.data.status === "SUCCESS"){
            this.reportInfoList = res.data.taxSubList;
            this.isShowReturnInfo = true;
            if(res.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
              this.showReturn = true;
            }
          }else{//未授权
            this.isShowReportInfo = false;
            this.$refs.authorizeTip.show()
          }
        }else{
          this.$message.warning(res.message)
        }
      })
    },
    onIknow(){
      this.isShowReturnInfo = false;
      this.$parent.getList()
    },
  }
};
</script>
<style lang="scss" scoped>
.initFeedback {
  .dialog-footer{
    text-align: right;
    height: 40px;
    line-height: 40px;
  }
}
</style>