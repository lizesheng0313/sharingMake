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
          <router-view class="router-view"></router-view>
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
  computed: {
    ...mapState({
      isShowApp: state => state.isShowApp
    })
  },
  created() {
    this.$store.commit(AT.SHOWAPP, true); //如用户手动改变路由， 需将full-screeen关闭
  },
  mounted() {
    //权限列表
    this.$store.dispatch("actionUserPrivilege").then(res => {
      this.mainMenu = res.data.privilegeGroupTreeVO.children[0].children;
      this.privilegeVOList = res.data.privilegeVOList.map(it=>it.code);
      this.$store.commit(AT.SET_PRIVILIGEVOLiST,this.privilegeVOList);
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
}
.side-nav {
  width: 223px;
  flex-grow: 0;
  height:calc(100vh - 90px)
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
</style>
