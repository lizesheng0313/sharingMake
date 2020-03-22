<template>
  <div class="footer">
    <router-link v-for="(item,index) in navList" :key="index" tag="div" :to="item.url">
      <span class="iconfont" :class="item.icon"></span>
      <span>{{item.title}}</span>
    </router-link>
    <router-link :to="'/ad'" tag="div" v-if="indexObj.guanggaourl">
      <span class="iconfont iconrenwu"></span>
      <span>广告</span>
    </router-link>
    <router-link tag="div" to="/mine">
      <span class="iconfont icondaohanglan-05"></span>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      indexObj: "indexObj"
    })
  },
  data() {
    return {
      navList: [
        { title: "任务", icon: "iconicon_renwu", url: "/home" },
        { title: "易聊", icon: "iconmiaosha", url: "/chat" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.footer {
  position: fixed;
  align-items: center;
  background: #fff;
  height: 50px;
  bottom: 0;
  display: flex;
  right: 0;
  left: 0;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    .iconfont {
      font-size: 24px;
      color: #777;
    }
  }
  .router-link-active {
    color: #ed6c5e;
    .iconfont {
      color: #ed6c5e;
    }
  }
}
</style>
