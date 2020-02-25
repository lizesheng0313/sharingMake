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
      <el-row v-for="(item,index) in reportReturnList" :key="index">
        <div v-if="item.dealStatus === 'SUCCESS'"><el-col :span="12" style="height:30px">【{{ item.taxSubName }}】</el-col><el-col :span="12">任务完成</el-col></div>
        <div v-if="item.dealStatus === 'PROCESSING'"><el-col :span="12" style="height:30px">【{{ item.taxSubName }}】</el-col><el-col :span="12">任务处理中…</el-col></div>
        <div v-if="item.dealStatus === 'FAIL'"><el-col :span="12" style="height:30px">【{{ item.taxSubName }}】</el-col><el-col :span="12">任务失败，{{item.failReason}}</el-col></div>
      </el-row>
      <div v-show="showReturn" style="color:#E6A23C">任务仍在处理中，请稍后点击{{ freeBackTip }}查询结果</div>
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
    validParameter: Object, //校验参数
    querytAction: String, //校验action
    sign:String, //页面标识
    stopTip:String, //终止文案
    freeBackTip:String //获取反馈文案
  },
  data() {
    return {
      reportReturnList:[],
      isShowReturnInfo:false,
      isShowReportInfo: false,
      closeModel:false,
      showReturn:false,

    };
  },
  methods: {
    show(data) {
      if(data) {
        this.reportReturnList = [];
        this.showReturn = false;
        this.handleReportInfo()
      }
      else{
        this.isShowReportInfo = false;
      }
    },
    //获取反馈
    handleReportInfo(){
      this.$store
        .dispatch(this.querytAction,this.validParameter)
        .then(res=>{
        if(res.success){
          // 已授权，有查询结果
          if(res.data.status === "SUCCESS"){
            this.reportReturnList = res.data.taxSubList;
            if(res.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
              this.showReturn = true;
            }
            this.isShowReturnInfo = true;
          }else{//未授权
            this.isShowReportInfo = false;
            this.$refs.authorizeTip.show()
          }
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