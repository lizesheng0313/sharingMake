<template>
  <div class="collection">
    <full-screen :fsTitle="'人员信息'" :bgColor="'#fff'" class="info-collection">
      <div slot="fs-container">
        <div class="state-personnel">
          <i>人员状态</i>
          <el-button
            plain
            :class="{active:employeeFormData.workerStatus =='NORMAL'}"
            @click="employeeFormData.workerStatus = 'NORMAL'"
          >正常</el-button>
          <el-button
            plain
            :class="{active:employeeFormData.workerStatus=='NO_NORMAL'}"
            @click="employeeFormData.workerStatus='NO_NORMAL'"
          >非正常</el-button>
        </div>
        <el-form
          :label-position="'right'"
          ref="refEmployeeForm"
          :rules="rules"
          label-width="140px"
          classs="rule-form clearfix"
          :model="employeeFormData"
        >
          <div>
            <span class="title">基本信息</span>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="证件类型" prop="idType">
                  <el-select v-model="employeeFormData.idType" placeholder="请选择">
                    <el-option
                      v-for="(value,key) in baseInfo.documentType"
                      :key="key"
                      :label="value"
                      :value="key"
                      :disabled="checkSuccess"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="empName" :disabled="checkSuccess">
                  <el-input v-model="employeeFormData.empName"></el-input>
                </el-form-item>
                <el-form-item label="性别" required :disabled="checkSuccess">
                  <el-select v-model="employeeFormData.empSex" placeholder="请选择">
                    <el-option
                      v-for="(value,key) in baseInfo.empSex"
                      :key="key"
                      :label="value"
                      :value="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否存在以下情形">
                  <el-checkbox v-model="employeeFormData.disabilityYn">残疾</el-checkbox>
                  <el-checkbox v-model="employeeFormData.martyrFamilyYn">烈属</el-checkbox>
                  <el-checkbox v-model="employeeFormData.lonelyOldYn">孤老</el-checkbox>
                </el-form-item>
                <el-form-item
                  label="残疾证号"
                  :required="employeeFormData.disabilityYn"
                  prop="disabilityYn"
                >
                  <el-input
                    v-model="employeeFormData.dsability"
                    :disabled="!employeeFormData.disabilityYn"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item label="证件号码" prop="idNo" :disabled="checkSuccess">
                  <el-input v-model="employeeFormData.idNo"></el-input>
                </el-form-item>
                <el-form-item label="国籍(地区)" prop="country" :disabled="checkSuccess">
                  <el-input v-model="employeeFormData.country"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday" :disabled="checkSuccess">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.birthday"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="烈属证号"
                  :required="employeeFormData.martyrFamilyYn"
                  prop="martyrFamilyNo"
                >
                  <el-input
                    v-model="employeeFormData.martyrFamilyNo"
                    :disabled="!employeeFormData.martyrFamilyYn"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <span class="title">任职受雇从业信息</span>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="任职受雇从业信息" prop="workType">
                  <el-select v-model="employeeFormData.workType" placeholder="请选择">
                    <el-option
                      v-for="(value,key) in baseInfo.workerType"
                      :key="key"
                      :label="value"
                      :value="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="任职受雇从业日期" prop="empDay">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.empDay"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item label="工号">
                  <el-input v-model="employeeFormData.empNo"></el-input>
                </el-form-item>
                <el-form-item label="离职日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.leaveDay"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <span class="title">联系方式</span>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="手机号码" prop="mobile">
                  <el-input v-model="employeeFormData.mobile"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                  <el-input v-model="employeeFormData.wageCardBank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item label="银行账号">
                  <el-input v-model="employeeFormData.wageCardNum"></el-input>
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
import { validatePhone } from "@/util/validate";
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
    this.employeeFormData = JSON.parse(
      JSON.stringify(this.personnelCollection)
    );
    if (this.employeeFormData.idValidStatus == "CHECK_SUCCESS") {
      this.checkSuccess = true;
    }
  },
  data() {
    return {
      rules: {
        idNo: [{ required: true, message: "请输入证件号码", trigger: "blur" }],
        empName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        country: [
          { required: true, message: "请输入国籍(地区)", trigger: "blur" }
        ],
        birthday: [
          { required: true, message: "请选择出生日期", trigger: "blur" }
        ],
        idType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        workType: [
          { required: true, message: "请选择受雇从业信息", trigger: "change" }
        ],
        empDay: [
          { required: true, message: "请选择受雇从业信息", trigger: "blur" }
        ],
        martyrFamilyNo: [
          {
            validator: (rule, value, callback) => {
              if (!value && this.employeeFormData.disabilityYn) {
                callback(new Error("请输入残疾证号"));
              } else {
                callback();
              }
            },
            required:true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ],
        martyrFamilyNo: [
          {
            validator: (rule, value, callback) => {
              if (!value && this.employeeFormData.martyrFamilyYn) {
                callback(new Error("请输入烈属证号"));
              } else {
                callback();
              }
            },
            message: "请输入手机号",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            validator: (rule, value, callback) => {
              let flag = validatePhone(value);
              if (!flag) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            message: "请输入手机号",
            trigger: "blur"
          }
        ]
      },
      checkSuccess: false,
      baseInfo: SCR,
      employeeFormData: {}
    };
  },
  methods: {
    handleSave() {
      //如果取消选中 将对应的证号清空
      if (!employeeFormData.disabilityYn) {
        this.employeeFormData.dsability = "";
      }
      if (!employeeFormData.martyrFamilyYn) {
        this.employeeFormData.martyrFamilyNo = "";
      }
      this.employeeFormData.operType = "UPDATE";
      this.$refs.refEmployeeForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch(
              "taxPageStore/actionSaveEmpCollectInfo",
              this.employeeFormData
            )
            .then(res => {});
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
