<template>
  <div class="selectSY">
    <el-dialog
      :visible.sync="isShowReportInfo"
      width="550px"
      title="提示"
      center
      class="diy-el_dialog"
      :show-close="false"
      :close-on-click-modal="closeModel"
    >
        <div v-if="subjectObj.dealStatus === 'SUCCESS'"><i class="el-icon-success"></i>{{paramsObj.stopTip}}成功</div>
        <div v-if="subjectObj.dealStatus === 'PROCESSING'"><i class="el-icon-warning"></i>授权请求正在处理中，请稍后再试。</div>
        <div v-if="subjectObj.dealStatus === 'FAIL'"><i class="el-icon-warning"></i>{{ subjectObj.failReason}}</div>
      <div v-loading="reportInfoLoading" style="height: 40px"></div>
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
        isGetSubjectId:false
      },
      isShowIknow:false,
      closeModel:false
    };
  },
  created(){
  },
  methods: {
    show(data,params) {
      if(data) {
        this.subjectObj = {
          dealStatus:"",
          failReason:""
        }
        this.isShowIknow = false;
        //接口参数赋值
       this.paramsObj = params;
       this.handleExport();
      }else{
        this.isShowReportInfo = false;
      }
    },
    handleExport() {
      this.$store
        .dispatch(this.paramsObj.validAction, this.paramsObj.validParameter)
        .then(res=>{
          if (res.success) {
            //验证通过
            if(res.data.status === "SUCCESS"){
              this.reportInfoLoading = true;
              this.isShowReportInfo = true;
              if(res.data.taxSubList[0].dealStatus === "PROCESSING"){
                //如果是授权接口 新增时添加 taxSubId
                if(this.isGetSubjectId){
                  this.paramsObj.validParameter.taxSubId = res.data.taxSubList[0].taxSubId;
                }
                this.selectShuiyou()
              }else{//全部成功或失败
                this.subjectObj = res.data.taxSubList[0];
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
          .dispatch(this.paramsObj.querytAction,this.paramsObj.validParameter)
          .then(r0 => {
            if(r0.success){
              if(r0.data.status === "SUCCESS"){
                if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                  this.selectSec()
                } else{
                  this.subjectObj = r0.data.taxSubList[0];
                  this.reportInfoLoading = false;
                  this.isShowIknow = true;
                  //关闭右侧划窗
                  this.isClose = r0.data.taxSubList[0].dealStatus === "SUCCESS";
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
          .dispatch(this.paramsObj.querytAction,this.paramsObj.validParameter)
          .then(r0 => {
            if(r0.data.status === "SUCCESS"){
              if(r0.data.taxSubList.map(item=>item.dealStatus === "PROCESSING").includes(true)){
                this.selectThird()
              } else{
                this.subjectObj = r0.data.taxSubList[0];
                this.reportInfoLoading = false;
                this.isShowIknow = true;
                //关闭右侧划窗
                this.isClose = r0.data.taxSubList[0].dealStatus === "SUCCESS";
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
          .then(re => {
            if(re.success){
              this.reportInfoLoading = false;
              this.isShowIknow = true;
              this.subjectObj = re.data.taxSubList[0];
              this.isClose = ["PROCESSING",'SUCCESS'].includes(re.data.taxSubList[0].dealStatus);
            }
          })
      },this.timeObj.third)
    },
    onIknow(){
      this.isShowReportInfo = false;
      this.$parent.freshList(this.sign,this.isClose)
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