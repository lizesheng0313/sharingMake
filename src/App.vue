<template>
  <div class="app-page">
    <div class="app-page">
      <div class="header">
        <top-header></top-header>
      </div>
      <div class="display-flex">
        <div class="side-nav">
          <side-nav></side-nav>
        </div>
        <div class="flex1 div-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import topHeader from "@/components/basic/Header";
import sideNav from "@/components/basic/SideNav";
import { mapState } from "vuex";
export default {
  components: {
    topHeader,
    sideNav
  }
};
</script>
<style lang="scss" scoped>
.app-page {
  .div-content {
    background: #fff;
    margin-left: 17px;
    margin-right: 24px;
    border-radius: 7px;
  }
}
</style>


