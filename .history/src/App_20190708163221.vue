<template>
  <div class="app-page">
    <div class="app-page">
      <div class="header" v-if="isShowApp">
        <top-header></top-header>
      </div>
      <div class="display-flex">
        <div class="side-nav flex1" v-if="isShowApp">
          <side-nav></side-nav>
        </div>
        <div class="flex1 div-content" :class="{'no-margin':!isShowApp}">
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
import * as AT from "@/store/actionTypes";
export default {
  components: {
    topHeader,
    sideNav
  },
  created() {
    this.$store.commit(AT.SHOWAPP, true); //如用户手动改变路由， 需将full-screeen关闭
  },
  computed: {
    ...mapState({
      isShowApp: state => state.isShowApp
    })
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
  .no-margin {
    margin: 0;
  }
}
.side-nav {
  width: 223px;
  background: #4a535e;
  box-shadow: 0 0 56px 0 #f1f1f1;
}
</style>


