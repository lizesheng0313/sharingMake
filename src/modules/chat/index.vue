<template>
  <div>
    <topHeader title="客服中心"></topHeader>
    <iframe :src="indexObj.kefuurl" frameborder="0" style="width:100%;height:calc(100vh - 90px)"></iframe>
    <tarbar></tarbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
import tarbar from "@/components/basic/Footer";
import topHeader from "@/components/basic/Header";
export default {
  components: {
    tarbar,
    topHeader
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
