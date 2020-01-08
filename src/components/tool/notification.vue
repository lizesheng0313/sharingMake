<template>
  <div class="notification" :style="{width: notiwidth+'px',right:210+'px'}" v-if="notiShow.isShow">
     <div class="notification-group">
        <i class="el-icon-warning"></i>
        <div>
          <p>初次使用本系统计算本月个税与工资前，若上月个税暂未向税局申报，请导入上月收入与减除。否则无法获取累计收入等计税累计项的值</p>
          <p class="tip">操作路径：本界面右上角【更多 - 上月收入与减除填写】</p>
          <p class="check-tip"><el-checkbox v-model="isNoTip" @change="changeCheck">不在提示</el-checkbox></p>
        </div>
    </div>
    <i class="el-icon-close" @click="closeNoti"></i>
  </div>
</template>
<script>
export default {
  props: {
    notiwidth: {
      type: Number,
      default:480
    },
    notiShow: {
      type: Object,
      default:null
    },
  },
  data() {
    return {
      isNoTip:false,
    };
  },
  created(){
  },
  methods: {
    show() {

    },
    closeNoti(){
      this.notiShow.isShow = false
    },
    changeCheck(){

    }
  }
};
</script>
<style lang="scss" scoped>
.notification {
  display: flex;
  padding: 10px 26px 6px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  top:4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
  overflow: hidden;
  z-index: 9999;
}
  .notification-group{
    display: flex;
    margin-left: 13px;
    font-size: 11px;
    line-height: 18px;
    color: #606266;
    text-align: justify;
  }
  .el-icon-warning{
    font-size: 19px;
  }
  .el-icon-close{
    position: relative;
    right:-10px;
    font-size: 14px;
    cursor: pointer;
  }
  .tip{
    color:#e6a23c;
  }
  .check-tip{
    text-align: right;
  }

</style>