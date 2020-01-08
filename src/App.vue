<!--<script src="../webpack/webpack.config.prod.js"></script>-->
<template>
  <div class="app-page">
    <div class="app-page">
      <div class="header" v-if="isShowApp">
        <top-header></top-header>
      </div>
      <div class="display-flex">
        <div class="side-nav" v-if="isShowApp">
          <old-side-nav :routerList="routerList" :mainMenu="mainMenu" :insertNavList="insertNavList"></old-side-nav>
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
// import { getServerUrl } from "old-env-map"
// console.log(getServerUrl())
// import { privilegeVOList, privilegeGroupTreeVO } from "@/utils/constData";
export default {
  components: {
    topHeader,
  },
  data() {
    return {
      //整个路由列表
      routerList: router.options.routes,
      mainMenu: [],
      insertNavList: [
        {
          businessCode: null,
          name: "首页",
          url: "/home",
          index: 0,
          icon:"iconshouye"
        }
      ]
      }
  },
  computed: {
    ...mapState({
      isShowApp: state => state.isShowApp
    })
  },
  created() {
    this.$store.commit(AT.SHOWAPP, true); //如用户手动改变路由， 需将full-screeen关闭
    //权限列表
    this.$store.dispatch("actionUserPrivilege").then(res => {
      this.mainMenu = res.data.privilegeGroupTreeVO.children[0].children;
      let privilegeVOList = res.data.privilegeVOList.map(it=>it.code);
      this.privilegeVOList = privilegeVOList ? privilegeVOList : [];
      this.$store.commit(AT.SET_PRIVILIGEVOLiST,this.privilegeVOList);
    });
    // this.mainMenu = privilegeGroupTreeVO
    // let privilegeVOList0 = privilegeVOList.map(it=>it.code);
    // this.$store.commit(AT.SET_PRIVILIGEVOLiST,privilegeVOList0);
  },
  mounted() {
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
    padding: 0px 0 0 15px;
    overflow: auto;
  }
  .no-margin {
    margin: 0;
  }
}
  .side-nav {
    width: 223px;
    height:calc(100vh - 90px);
    overflow-y:auto;
    overflow-x:hidden;
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
