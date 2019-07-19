<template>
  <full-screen :fsTitle="'人员信息'" :bgColor="'#fff'" class="info-collection">
    <div slot="fs-container">
      <div class="state-personnel">
        <i>人员状态</i>
        <el-button
          plain
          :class="{active:contentList.empStatus =='NORMAL'}"
          @click="contentList.empStatus = 'NORMAL'"
        >正常</el-button>
        <el-button
          plain
          :class="{active:currentState.empStatus=='NO_NORMAL'}"
          @click="currentState.empStatus=='NO_NORMAL'"
        >非正常</el-button>
      </div>
      <el-form
        :label-position="'right'"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        classs="rule-form clearfix"
        :model="contentList"
      >
        <div>
          <span class="title">基本信息</span>
          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="证件类型">
                <el-select v-model="contentList.idType" placeholder="请选择">
                  <el-option
                    v-for="(value,key) in baseInfo.documentType"
                    :key="key"
                    :label="value"
                    :value="key"
                  ></el-option>
                </el-select>
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
            <el-col :span="7" class="right-input-box">
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
        </div>
        <div>
          <span class="title">任职受雇从业信息</span>
          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="任职受雇从业信息" prop="cert">
                <el-input v-model="ruleForm.cert"></el-input>
              </el-form-item>
              <el-form-item label="任职受雇从业日期" prop="name">
                <el-input v-model="ruleForm.region"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="right-input-box">
              <el-form-item label="工号" prop="cert">
                <el-input v-model="ruleForm.cert"></el-input>
              </el-form-item>
              <el-form-item label="离职日期" prop="name">
                <el-input v-model="ruleForm.region"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <span class="title">联系方式</span>
          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="手机号码" prop="cert">
                <el-input v-model="ruleForm.cert"></el-input>
              </el-form-item>
              <el-form-item label="开户银行" prop="name">
                <el-input v-model="ruleForm.region"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="right-input-box">
              <el-form-item label="银行账号" prop="cert">
                <el-input v-model="ruleForm.cert"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </full-screen>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import { mapState } from "vuex";
import * as SCR from "./util/constData";
export default {
  components: {
    fullScreen
  },
  computed: {
    ...mapState("taxPageStore", {
      personnelCollection: state => state.personnelCollection
    })
  },
  mounted() {
    this.contentList = JSON.parse(JSON.stringify(this.personnelCollection));
  },
  data() {
    return {
      baseInfo: SCR,
      contentList: {},
      currentState: 0,
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
  .active {
    background: #2c7cff;
    color: #fff;
  }
  .state-personnel {
    text-align: right;
    margin-right: 50px;
    margin-top: 10px;
    i {
      font-style: normal;
      margin-right: 20px;
    }
    i:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  .rule-form {
    margin: 0 auto;
  }
  .title {
    margin-left: 25px;
    display: inline-block;
    margin-top: 30px;
    font-weight: 500;
    font-size: 14px;
  }
  .right-input-box {
    margin-left: 20px;
  }
}
</style>
