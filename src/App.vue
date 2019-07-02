<template>
  <div class="display-flex app-page">
    <div class="header">
      <header></header>
    </div>
    <div class="side-nav">
      <side-nav></side-nav>
    </div>
    <div class="flex1 div-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import fullScreen from "../src/components/full-screen";

  export default {
    data() {
      return {
        currentCom: ""
      };
    },
    components: {
      fullScreen
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .app-page {
    background: #fff;
    margin-left: 17px;
    margin-right: 24px;
    border-radius: 7px;
  }
</style>


