<template>
  <div class="app-page">
    <div class="app-page">
      <div class="header" v-if="isShowApp">
        <top-header></top-header>
      </div>
      <div class="display-flex">
        <div class="side-nav flex1" v-if="isShowApp">
          <old-side-nav :routerList="routerList" :mainMenu="mainMenu"></old-side-nav>
        </div>
        <div class="flex1 div-content" :class="{'no-margin':!isShowApp}">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import topHeader from "@/components/basic/Header";
import { mapState } from "vuex";
import * as AT from "@/store/actionTypes";
export default {
  components: {
    topHeader,
  },
  data() {
    return {
      //整个路由列表
      routerList: router.options.routes,
      mainMenu: {}
    };
  },
  created() {
    this.$store.commit(AT.SHOWAPP, true); //如用户手动改变路由， 需将full-screeen关闭
  },
  mounted() {
    //权限列表
    this.$store.dispatch("actionUserPrivilege").then(res => {
      this.mainMenu = res.data.privilegeGroupTreeVO.children[0].children;
    });
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
  flex-grow: 0;
  height:calc(100vh - 90px)
}
</style>


