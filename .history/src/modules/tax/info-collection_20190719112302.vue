<template>
  <div class="collection">
    <full-screen :fsTitle="'人员信息'" :bgColor="'#fff'" class="info-collection">
      <div slot="fs-container">
        <div class="state-personnel">
          <i>人员状态</i>
          <el-button
            plain
            :class="{active:ruleForm.workerStatus =='NORMAL'}"
            @click="ruleForm.workerStatus = 'NORMAL'"
          >正常</el-button>
          <el-button
            plain
            :class="{active:ruleForm.workerStatus=='NO_NORMAL'}"
            @click="ruleForm.workerStatus='NO_NORMAL'"
          >非正常</el-button>
        </div>
        <el-form
          :label-position="'right'"
          ref="ruleForm"
          :rules="rules"
          label-width="140px"
          classs="rule-form clearfix"
          :model="ruleForm"
        >
          <div>
            <span class="title">基本信息</span>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="证件类型"  prop="idType">
                  <el-select v-model="ruleForm.idType" placeholder="请选择">
                    <el-option
                      v-for="(value,key) in baseInfo.documentType"
                      :key="key"
                      :label="value"
                      :value="key"
                      :disabled="checkSuccess"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名" required :disabled="checkSuccess">
                  <el-input v-model="ruleForm.empName"></el-input>
                </el-form-item>
                <el-form-item label="性别" required :disabled="checkSuccess">
                  <el-select v-model="ruleForm.empSex" placeholder="请选择">
                    <el-option
                      v-for="(value,key) in baseInfo.empSex"
                      :key="key"
                      :label="value"
                      :value="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否存在以下情形">
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
                <el-form-item label="证件号码" required :disabled="checkSuccess">
                  <el-input v-model="ruleForm.idNo"></el-input>
                </el-form-item>
                <el-form-item label="国籍(地区)" required :disabled="checkSuccess">
                  <el-input v-model="ruleForm.country"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" required :disabled="checkSuccess">
                  <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
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
                <el-form-item label="任职受雇从业信息" required>
                  <el-select v-model="ruleForm.workType" placeholder="请选择">
                    <el-option
                      v-for="(value,key) in baseInfo.workerType"
                      :key="key"
                      :label="value"
                      :value="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="任职受雇从业日期" required>
                  <el-date-picker v-model="ruleForm.empDay" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item label="工号">
                  <el-input v-model="ruleForm.empNo"></el-input>
                </el-form-item>
                <el-form-item label="离职日期">
                  <el-date-picker v-model="ruleForm.leaveDay" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <span class="title">联系方式</span>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="手机号码" required>
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                  <el-input v-model="ruleForm.wageCardBank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item label="银行账号">
                  <el-input v-model="ruleForm.wageCardNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="save-box">
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </div>
    </full-screen>
  </div>
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
    this.ruleForm = JSON.parse(JSON.stringify(this.personnelCollection));
    if (this.ruleForm.idValidStatus == "CHECK_SUCCESS") {
      this.checkSuccess = true;
    }
  },
  data() {
    return {
      rules: {
        idType: {
          required: true
        }
      },
      checkSuccess: false,
      baseInfo: SCR,
      ruleForm: {},
      currentState: 0,
    };
  },
  methods: {
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.$store
          //   .dispatch(
          //     "taxPageStore/actionSaveEmpCollectInfo",
          //     this.editFormData
          //   )
          //   .then(res => {});
        }
      });
    }
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
  .save-box {
    border-top: 1px solid #e5e5e5;
    text-align: center;
    margin-top: 10px;
    .el-button {
      margin-top: 40px;
    }
  }
}
</style>
