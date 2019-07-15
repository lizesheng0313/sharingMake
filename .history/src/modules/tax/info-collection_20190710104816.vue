<template>
  <full-screen :fsTitle="'人员信息'" :bgColor="'#fff'" class="info-collection">
    <div slot="fs-container">
      <el-form
        :label-position="'right'"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        classs="rule-form"
        :model="ruleForm"
      >
        <span class="title">基本信息</span>
        <el-row type="flex">
          <el-col :span="6">
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
            <el-form-item label="残疾证号">
              <el-input v-model="ruleForm.dsability"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码" prop="cert">
              <el-input v-model="ruleForm.cert"></el-input>
            </el-form-item>
            <el-form-item label="国籍(地区)" prop="name">
              <el-input v-model="ruleForm.region"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="sex">
              <el-input v-model="ruleForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="烈属证号">
              <el-input v-model="ruleForm.dsability"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
        type: [],
        dsability: ""
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
<style lang="scss" scoped>
.info-collection {
  .rule-form {
    margin:0 auto;
  }
  .title {
    font-weight: 500;
    font-size: 14px;
  }
}
</style>
