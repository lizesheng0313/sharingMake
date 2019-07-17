<template>
  <div class="right-pop">
    <transition name="fade">
      <div class="pop-mask" v-show="popShow.isshow"  @click="popShow.isshow=false"></div>
    </transition>
    <div class="pop-slide card-box" :style="{width:popWidth+'px','right': popShow.isshow ? '0px' : -popWidth+'px'}">
      <div class="pop-header" v-if="hasHeader">
        <span class="pop-title">{{popTitle}}</span>
        <i v-if="hasCloseBtn" class="el-icon-close" @click="popShow.isshow=false"></i>
      </div>
      <div class="pop-content" v-if="popShow.isshow">
        <slot name="pop-content"></slot>
      </div>
      <div class="pop-footer" :style="{width:popWidth+'px'}" v-if="hasFooter">
        <slot name="pop-footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    popShow:{
      type: Object,
      default:null
    },
    hasCloseBtn: {
      type: Boolean,
      default:true
    },
    hasHeader: {
      type: Boolean,
      default:true
    },
    hasFooter: {
      type: Boolean,
      default:true
    },
    popTitle: {
      type: String,
      default:'pop-title'
    },
    popWidth: {
      type: Number,
      default:400
    },
  },
  data(){
    return{
      // flowList:[],
    }
  },
  computed:{
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";

  .right-pop {
    .pop-slide{
      box-sizing: border-box;
      position: fixed;
      width: 400px;
      height: 100%;
      top: 0;
      right: -400px;
      transition: right 0.3s ease 0s;
      z-index: 1002;
      background-color: #fff;
    }

    .pop-header {
      height: 30px;
      line-height: 20px;
      border-bottom: 1px solid #f1f1f1;
      padding-bottom:20px;
      text-align: left;

      .pop-title{
        color:#333;
        font-size: 18px;
      }
      .el-icon-close{
        cursor: pointer;
        float: right;
        font-size: 18px;
      }
    }
    .pop-content{
      padding-top: 10px;
      background-color: #fff;
      overflow-y: auto;
      height: calc(100vh - 135px);
    }
    .pop-footer{
      box-sizing: border-box;
      width:400px;
      height:60px;
      line-height: 60px;
      text-align: right;
      padding-right: 20px;
      box-shadow:10px -2px 35px 0px rgba(222,214,214,1);
      position: absolute;
      left: 0;
      bottom:0;
    }
    .pop-mask{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.6);
      z-index: 1000;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
