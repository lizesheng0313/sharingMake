<template>
  <div>
    <full-screen :fsTitle="'基本信息'" :bgColor="'#fff'">
       <div slot="fs-buttons">
         <div>
           <span>人员状态</span>
           
         </div>
       </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
export default {
  components: {
    fullScreen
  }
};
</script>
<style>
</style>
