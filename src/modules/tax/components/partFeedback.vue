<template>
  <div class="selectSY">
    <el-dialog
      :visible.sync="isShowReturnInfo"
      width="550px"
      title="获取反馈"
      center
      class="diy-el_dialog"
      :show-close="false"
      :close-on-click-modal="closeModel"
    >
        <div v-if="subjectObj.dealStatus === 'SUCCESS'"><i class="el-icon-success"></i>{{ paramsObj.stopTip }}成功</div>
        <div v-if="subjectObj.dealStatus === 'PROCESSING'"><i class="el-icon-warning"></i>{{ paramsObj.stopTip }}已接收，局端处理中，请稍后点击【{{ paramsObj.stopTip }}反馈】。</div>
        <div v-if="subjectObj.dealStatus === 'FAIL'"><i class="el-icon-warning"></i>{{ subjectObj.failReason}}</div>
      <div class="dialog-footer">
        <el-button @click="onIknow" type="primary" plain>我知道了</el-button>
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
        processingTip:"",//进行中文案
        validParameter: "", //校验参数
        querytAction:"" ,//查询action
      },
      isShowReturnInfo:false,
      isShowReportInfo: false,
      closeModel:false,
      subjectObj:{
        dealStatus:"",
        failReason:""
      },
    };
  },
  methods: {
    show(data,params) {
      if(data) {
        //接口参数赋值
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
            this.subjectObj = res.data.taxSubList[0];
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
    onIknow(){
      this.isShowReturnInfo = false;
      this.$parent.freshList(this.sign)
    },
  }
};
</script>
<style lang="scss" scoped>
.selectSY {
  .dialog-footer{
    text-align: right;
    height: 40px;
    line-height: 40px;
  }
}
</style>