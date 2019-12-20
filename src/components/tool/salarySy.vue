<template>
  <div class="selectSY">
    <el-dialog
      :visible.sync="isShowReportInfo"
      :title="isShowIknow?'获取反馈':''"
      width="550px"
      center
      class="diy-el_dialog"
      :show-close="false"
      :close-on-click-modal="closeModel"
    >
      <el-row v-for="(item,index) in reportInfoList" :key="index">
        <div v-if="item.dealStatus === 'SUCCESS'"><el-col :span="12" style="height:30px">【{{ item.taxSubName }}】</el-col><el-col :span="12">{{ stopTip }}任务完成</el-col></div>
        <div v-if="item.dealStatus === 'PROCESSING'"><el-col :span="12" style="height:30px">【{{ item.taxSubName }}】</el-col><el-col :span="12">{{ stopTip }}任务处理中…</el-col></div>
        <div v-if="item.dealStatus === 'FAIL'"><el-col :span="12" style="height:30px">【{{ item.taxSubName }}】</el-col><el-col :span="12">{{ stopTip }}失败，{{item.failReason}}</el-col></div>
      </el-row>
      <div v-loading="reportInfoLoading" style="height: 40px"></div>
      <div v-show="showReturn" style="color:#E6A23C">任务仍在处理中，请稍后点击{{ freeBackTip }}查询结果</div>
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
    validParameter: Object, //校验参数
    validAction: String, //校验action
    querytAction:String, //查询action
    sign:String, //页面标识
    stopTip:String,//终止文案
    timeObj:Object,//时间
    freeBackTip:String,//待反馈按钮提示
  },
  data() {
    return {
      reportInfoList:[],
      reportReturnList:[],
      isShowReturnInfo:false,
      isShowReportInfo: false,
      reportInfoLoading:false,
      isShowIknow:false,
      closeModel:false,
      returnTip:"",
      showReturn:false,
    };
  },
  created(){
  },
  methods: {
    show(data) {
      if(data) {
        this.reportInfoList=[];
        this.showReturn = false;
        this.isShowIknow = false;
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
        .dispatch(this.validAction, this.validParameter)
        .then(res=>{
          if (res.success) {
            //验证通过
            if(res.data.status === "SUCCESS"){
              this.reportInfoList = res.data.taxSubList;
              //是否进行下步查询
              if(res.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.selectShuiyou()
              }else{//全部成功或失败
                this.reportInfoLoading = false;
                this.isShowIknow = true;
              }
            }else{//授权失败
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
    selectShuiyou(){
      this.isShowIknow = false;
      //查询第一次
      setTimeout(()=>{
        this.$store
          .dispatch(this.querytAction,this.validParameter)
          .then(r0 => {
            if(r0.success){
              if(r0.data.status === "SUCCESS"){
                this.reportInfoList.forEach((item,index)=>{
                  r0.data.taxSubList.forEach(it=>{
                    if(item.taxSubId == it.taxSubId){
                      this.reportInfoList[index] = it
                    }
                  })
                })
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
      },this.timeObj.first)
    },
    //第二次查询
    selectSec(){
      setTimeout(()=>{
        this.$store
          .dispatch(this.querytAction,this.validParameter)
          .then(r0 => {
            if(r0.data.status === "SUCCESS"){
              this.reportInfoList.forEach((item,index)=>{
                r0.data.taxSubList.forEach(it=>{
                  if(item.taxSubId == it.taxSubId){
                    this.reportInfoList[index] = it
                  }
                })
              })
              if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.selectThird()
              } else{
                this.reportInfoLoading = false;
                this.isShowIknow = true;
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
          .dispatch(this.querytAction,this.validParameter)
          .then(re => {
            if(re.success){
              this.reportInfoList.forEach((item,index)=>{
                re.data.taxSubList.forEach(it=>{
                  if(item.taxSubId == it.taxSubId){
                    this.reportInfoList[index] = it
                  }
                })
              })
              //反馈信息
              if(re.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.showReturn = true;
              }
              this.reportInfoLoading = false;
              this.isShowIknow = true;
            }
          })
      },this.timeObj.third)
    },
    onIknow(){
      this.isShowReportInfo = false;
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