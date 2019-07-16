<template>
  <div class="paymentSalarySet">
    <div class="title">选择显示项目<span class="title-tip">(请勾选需要显示在移动端的工资条项目)</span></div>
    <div class="title-fun">
      <el-checkbox :indeterminate="isIndeterminateAll" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isIndeterminateAll:false,
      checkAll:""
    };
  },
  created(){
  },
  mounted() {
  },
  computed:{
  },
  methods: {
    handleCheckAllChange(){

    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
  .paymentSalarySet{
    margin-top:10px;
    .title-tip{
      color:#999999;
      font-size: 10px;
      margin-left: 20px;
    }
  }
</style>