<template>
  <div class="footer">
    <router-link v-for="(item,index) in navList" :key="index" tag="div" :to="item.url">
      <span class="iconfont" :class="item.icon"></span>
      <span>{{item.title}}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        { title: "任务", icon: "iconicon_renwu", url: "/home" },
        { title: "易聊", icon: "iconmiaosha", url: "/seconds_kill" },
        { title: "我的", icon: "icondaohanglan-05", url: "/mine" }
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
