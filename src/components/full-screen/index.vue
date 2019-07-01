<template>
  <div class="full-screen">
    <div v-if="hasHeader" class="header display-flex">
      <div class="logo" @click="$router.push('/')">
        <img src="../../assets/images/logo-1.png" alt>
      </div>
    </div>
    <div class="fs-container">
      <slot name="fs-container"></slot>
    </div>
  </div>
</template>
<script>
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
    }
  },
  computed: {
    returnUrl() {
      return window.__BASEURL__ + "/index1.html";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";

.full-screen {
  .header {
    box-sizing: border-box;
    height: 58px;
    background: #fff;
    margin-bottom:2px;
    padding: 4px;
    .logo{
      width:200px;
    }
    img {
      height: 45px;
    }
  }
  .fs-container {
    padding-bottom: 50px;
  }
}
</style>
