<template>
  <div class="header">
    <span class="iconfont iconyou" @click="handleBack"></span>
    <p>{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  data() {
    return {};
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 40px;
  text-align: center;
  position: relative;
  line-height: 40px;
  font-size: 18px;
  span {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>
