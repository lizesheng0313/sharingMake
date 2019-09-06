<template>
  <div class="full-screen">
    <div v-if="hasHeader" class="header display-flex">
      <div class="return flex1">
        <i v-if="hasReturnBtn" class="el-icon-arrow-left" @click="goBack"></i>
        <span class="fs-title">{{fsTitle}}</span>
      </div>
      <div class="buttons-warp flex1">
        <slot name="fs-buttons"></slot>
      </div>
    </div>
    <div
      class="fs-container"
      :style="{backgroundColor: bgColor,overflow:hasScroll?'auto':'hidden'}"
    >
      <slot name="fs-container"></slot>
    </div>
  </div>
</template>
<script>
import * as AT from "@/store/actionTypes";
export default {
  components: {},
  props: {
    hasReturnBtn: {
      type: Boolean,
      default: true
    },
    hasHeader: {
      type: Boolean,
      default: true
    },
    hasScroll: {
      type: Boolean,
      default: true
    },
    fsTitle: {
      type: String,
      default: "fs-title"
    },
    bgColor: {
      type: String,
      default: "#fafafa"
    },
    goUrl: {
      type: String,
      default: ""
    },
  },
  mounted() {
    this.$store.commit(AT.SHOWAPP, false);
  },
  destroyed() {
    this.$store.commit(AT.SHOWAPP, true);
  },
  methods:{
    goBack(){
      let goUrl = this.goUrl ? this.goUrl: "/salary-cal";
      this.$router.push(goUrl);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.full-screen {
  .header {
    box-sizing: border-box;
    background-color: #090822;
    color: #fff;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f3f3f3;

    .buttons-warp {
      overflow: hidden;
      text-align: right;
      padding-right: 50px;
    }
    .return {
      text-align: left;
      padding-left: 10px;
      font-size: 20px;
      .el-icon-arrow-left {
        cursor: pointer;
        padding: 10px 24px;
        border-right: 1px solid #58585a;
      }
    }
    .fs-title {
      margin-left: 50px;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 2px;
    }
  }
  .fs-container {
    padding-bottom: 50px;
    height: calc(100vh - 100px);
    overflow: auto;
  }
}
</style>
