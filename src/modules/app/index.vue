<template>
  <div>
    <topHeader title="app"></topHeader>
    <iframe :src="indexObj.app" frameborder="0" style="width:100%;height:calc(100vh - 40px)"></iframe>
  </div>
</template>
<script>
import { mapState } from "vuex";
import topHeader from "@/components/basic/Header";
export default {
  components: {
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
