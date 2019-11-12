<template>
  <div class="authorizeTip">
    <el-dialog
      title="123"
      :visible.sync="isShowAuthorize"
      width="600px"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
    >
      <div>授权失败</div>
      <a>去授权</a>
      <el-button>我知道了</el-button>
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