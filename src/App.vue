<template>
  <div>
    <keep-alive include="homePage">
      <router-view></router-view>
    </keep-alive>
    <ad v-show="$route.path == '/ad'"></ad>
    <chat v-show="$route.path == '/chat'"></chat>
    <app v-show="$route.path =='/app'"></app>
  </div>
</template>
<script>
import ad from "./modules/ad/index";
import chat from "./modules/chat/index";
import app from "./modules/app/index";
export default {
  components: {
    ad,
    chat,
    app
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>
