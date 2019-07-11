<template>
  <full-screen :fsTitle="'基本信息'" :bgColor="'#fff'">
    <div slot="fs-container">
      <el-form
        :label-position="'right'"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        :model="ruleForm"
      >
        <div class="left">
          <el-form-item label="证件类型" prop="cert">
            <el-input v-model="ruleForm.cert"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="ruleForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="是否存在以下情形" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="残疾" name="type"></el-checkbox>
              <el-checkbox label="烈属" name="type"></el-checkbox>
              <el-checkbox label="孤老" name="type"></el-checkbox>
            </el-checkbox-group>
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
      ruleForm: {
        cert: "",
        name: "",
        sex: "",
        type:[]
      },
      rules: {
        cert: [
          {
            required: true,
            message: "请输入证件类型"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入姓名"
          }
        ],
        sex: [
          {
            required: true,
            message: "请输入性别"
          }
        ]
      }
    };
  }
};
</script>
<style>
</style>
