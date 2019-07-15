<template>
  <full-screen :fsTitle="'基本信息'" :bgColor="'#fff'">
    <div slot="fs-container">
      <el-form :label-position="'right'" label-width="80px" :model="formLabelAlign">
        <div class="left">
          <el-form-item label="证件类型">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </full-screen>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
export default {
  components: {
    fullScreen
  },
  data() {
    return {
      formLabelAlign: {}
    };
  }
};
</script>
<style>
</style>
