<template>
  <div class="authorizeTip">
    <el-dialog
      title="提示"
      :visible.sync="isShowAuthorize"
      width="400px"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
    >
      <div><i class="el-icon-warning" style="color:#e6a23c;font-size:26px"></i>扣缴义务人：测试未授权成功，不允许报送！</div>
      <router-link to="/initialize/paid" style="line-height: 70px">去授权</router-link>
      <el-button type="primary" plain size="mini"  style="margin-left:200px" @click="handleCloseModel">我知道了</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      isShowAuthorize: false,
      closeModel:false,
    };
  },
  methods: {
    //改变radio
    show() {
      this.isShowAuthorize = true;
    },
    handleCloseModel(){
      this.isShowAuthorize = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.import-data {
  .download {
    cursor: pointer;
  }
  .importCount{
    margin:10px auto;
  }
}
</style>