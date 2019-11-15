<template>
  <div class="selectSY">
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
    selectAction:String, //查询action
    sign:String, //页面标识
  },
  data() {
    return {
      reportInfoList:[],
      reportReturnList:[],
      isShowReturnInfo:false,
      isShowReportInfo: false,
      reportInfoLoading:false,
      isShowIknow:false,
      closeModel:false
    };
  },
  methods: {
    show(data) {
      if(data) {
        this.reportInfoList=[];
        this.isShowIknow = false;
        this.handleExport();
      }else{
        this.isShowReportInfo = false;
      }
    },
    handleExport() {
      this.$store
        .dispatch(this.validAction, this.validParameter)
        .then(res=>{
          if (res.success) {
            //验证通过
            if(res.data.status === "SUCCESS"){
              this.reportInfoLoading = true;
              this.isShowReportInfo = true;
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
          .dispatch(this.selectAction,this.validParameter)
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
          .dispatch(this.selectAction,this.validParameter)
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
          .dispatch(this.selectAction,this.validParameter)
          .then(re => {
            if(re.success){
              this.reportInfoList.push(...re.data.taxSubList);
              this.reportInfoLoading = false;
              this.isShowIknow = true;
            }
          })
      },15000)
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