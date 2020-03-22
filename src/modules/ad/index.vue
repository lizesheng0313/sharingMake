<template>
  <div>
    <topHeader title="广告"></topHeader>
    <iframe
      :src="indexObj.guanggaourl"
      frameborder="0"
      style="width:100%;height:calc(100vh - 90px)"
    ></iframe>
    <tarbar></tarbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
import tarbar from "@/components/basic/Footer";
import topHeader from "@/components/basic/Header";
export default {
  components: {
    topHeader,
    tarbar
  },
  computed: {
    ...mapState({
      indexObj: "indexObj"
    })
  }
};
</script>
<style lang="scss" scoped>
</style>
