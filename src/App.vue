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
          <router-view class="router-view"></router-view>
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
  computed: {
    ...mapState({
      isShowApp: state => state.isShowApp
    })
  },
  data() {
    return {
      //整个路由列表
      // routerList: router.options.routes,
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
      console.log(this.mainMenu)
    });
  },
  methods:{

  },
};
</script>
<style lang="scss" scoped>
.app-page {
  height: 100%;
  background-size: 100% 100%;
  background-position: center center;
  .router-view {
    box-sizing: border-box;
    padding: 15px 0 0 15px;
  }
  .no-margin {
    margin: 0;
  }

  .side-nav {
    width: 223px;
    flex-grow: 0;
    background: #4a535e;
    box-shadow: 0 0 56px 0 #f1f1f1;
  }
  .div-content {
    margin-left: 17px;
    background: #fff;
    overflow: hidden;
    box-shadow: 3px 5px 15px #dae2ea;
  }
  .bottom {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 40px;
  }
}
</style>