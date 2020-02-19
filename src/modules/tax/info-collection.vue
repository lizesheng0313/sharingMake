<template>
  <div class="collection">
    <full-screen
      :fsTitle="'人员信息'"
      :bgColor="'#fff'"
      class="info-collection"
    >
      <span slot="fs-button">关闭</span>
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
                  <el-select v-model="employeeFormData.idType" placeholder="请选择" @change="changeIdType">
                    <el-option
                      v-for="(value,key) in baseInfo.idType"
                      :key="key"
                      :label="value"
                      :value="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="empName">
                  <el-input v-model="employeeFormData.empName" :disabled="checkSuccess"></el-input>
                </el-form-item>
                <el-form-item label="其他证件类型">
                  <el-select v-model="employeeFormData.otherIdType" placeholder="请选择" :disabled="employeeFormData.idType ==='PRC_ID'">
                    <el-option
                      v-for="(item,key) in otherIdCardTypeOption"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                      :disabled="!canSelectotherIdType.includes(item.value)"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生国家" prop="birthPlace" :rules="{required: employeeFormData.idType !='PRC_ID', message: '出生国家不能为空', trigger: 'blur'}">
                  <el-select v-model="employeeFormData.birthPlace" placeholder="请选择" :disabled="employeeFormData.idType ==='PRC_ID'" >
                    <el-option
                      v-for="(item,key) in countryList"
                      :key="key"
                      :label="item"
                      :value="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="性别" required>
                  <el-select v-model="employeeFormData.empSex" placeholder="请选择" :disabled="checkDisabled">
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
                  :class="{'is-required':employeeFormData.disabilityYn}"
                  prop="disabilityNo"
                >
                  <el-input
                    v-model="employeeFormData.disabilityNo"
                    :disabled="!employeeFormData.disabilityYn"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item label="证件号码" prop="idNo" :rules="{required: true, validator: this.validIdNo, trigger: 'blur'}">
                  <el-input v-model="employeeFormData.idNo" :disabled="checkSuccess"></el-input>
                </el-form-item>
                <el-form-item label="国籍(地区)" prop="country" >
                  <el-select v-model="employeeFormData.country" placeholder="请选择" :disabled="checkSuccess">
                    <el-option
                      v-for="(item,key) in countryList"
                      :key="key"
                      :label="item"
                      :value="key"
                      :disabled="!canSelectCoutry.includes(item)"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="其他证件号码" prop="otherIdNo">
                  <el-input v-model="employeeFormData.otherIdNo" :disabled="employeeFormData.idType ==='PRC_ID'"></el-input>
                </el-form-item>
                <el-form-item label="英文名" prop="englishName">
                  <el-input v-model="employeeFormData.englishName" :disabled="employeeFormData.idType ==='PRC_ID'"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="englishName">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.birthday"
                    type="date"
                    placeholder="选择日期"
                    :disabled="checkDisabled"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="烈属证号"
                  :class="{'is-required':employeeFormData.martyrFamilyYn}"
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
            <span class="title">任职受雇从业类型</span>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="任职受雇从业类型" prop="workerType">
                  <el-select v-model="employeeFormData.workerType" placeholder="请选择">
                    <el-option
                      v-for="(item,key) in workerTypeOption"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="任职受雇从业日期" prop="empDay" :rules="{required: this.employeeFormData.workerType === 'EMPLOYEE', message: '任职受雇从业日期不能为空', trigger: 'blur'}">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.empDay"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="首次入境时间" prop="firstEntryTime"
                              :rules="{required: employeeFormData.workerType === 'EMPLOYEE'&& employeeFormData.idType !='PRC_ID'
                              , message: '首次入境时间不能为空', trigger: 'blur'}">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.firstEntryTime"
                    type="date"
                    placeholder="选择日期"
                    :disabled="employeeFormData.idType ==='PRC_ID'"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item label="涉税事由" props="taxRelatedReason" :rules="{required: employeeFormData.idType !='PRC_ID', message: '涉税事由不能为空', trigger: 'blur'}">
                  <el-select v-model="employeeFormData.taxRelatedReason" placeholder="请选择" multiple :disabled="employeeFormData.idType ==='PRC_ID'">
                    <el-option
                      v-for="(item,key) in taxReasonOption"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  prop="leaveDay"
                  label="离职日期"
                  :rules="{required:employeeFormData.workerStatus == 'NO_NORMAL' && employeeFormData.workerType !='OTHER'
                  , message: '离职日期不能为空', trigger: 'blur'}"
                >
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.leaveDay"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="预计离境日期"
                              :rules="{required: this.employeeFormData.workerType === 'EMPLOYEE' && employeeFormData.idType !='PRC_ID'
                              , message: '离境日期不能为空', trigger: 'blur'}">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="employeeFormData.expectLeaveTime"
                    type="date"
                    placeholder="选择日期"
                    :disabled="employeeFormData.idType ==='PRC_ID'"
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
                  <el-select v-model="employeeFormData.wageCardBank" placeholder="请选择" filterable :disabled="employeeFormData.idType ==='PRC_ID'">
                    <el-option
                      v-for="(item,key) in bankList"
                      :key="key"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" class="right-input-box">
                <el-form-item style="height: 40px">
<!--                  <el-input v-model="employeeFormData.wageCardNum"></el-input>-->
                </el-form-item>
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
    }),
    ...mapState({
      countryList:state=>state.countryList,
      bankList:state=>state.bankList
    }),
    checkSuccess:function(){
      return this.employeeFormData.idValidStatus === "CHECK_SUCCESS" || this.employeeFormData.idValidStatus ==='CHECKING'
    }
  },
  mounted() {
    this.employeeFormData = JSON.parse(
      JSON.stringify(this.personnelCollection)
    );
  },
  data() {
    const t = this;
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
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        workerType: [
          { required: true, message: "请选择受雇从业信息", trigger: "blur" }
        ],
        martyrFamilyNo: [
          {
            validator: (rule, value, callback) => {
              if (
                t.employeeFormData.martyrFamilyYn &&
                !value &&
                t.employeeFormData.lonelyOldYn == false
              ) {
                callback(new Error("请输入烈属证号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        disabilityNo: [
          {
            validator: (rule, value, callback) => {
              if (
                t.employeeFormData.disabilityYn &&
                !value &&
                t.employeeFormData.lonelyOldYn == false
              ) {
                callback(new Error("请输入残疾证号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        leaveDay: [
          {
            validator: (rule, value, callback) => {
              if (t.employeeFormData.workerStatus == "NO_NORMAL" && !value) {
                callback(new Error("离职日期不能为空"));
              } else {
                callback();
              }
            },
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
            required: true,
            trigger: "blur"
          }
        ]
      },
      checkDisabled:true,
      baseInfo: SCR,
      workerTypeOption:SCR.workerTypeOption,
      taxReasonOption:SCR.taxReasonOption,
      employeeFormData: {
        martyrFamilyYn: ""
      },
      otherIdCardTypeOption:SCR.idTypeOption,
      canSelectCoutry:[],
      canSelectotherIdType:[],//其他证件类型
    };
  },
  methods: {
    validIdNo(rule, value, callback){
      if(value){
        switch (this.baseForm.idType) {
          case "PRC_ID"://居民身份证
            var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(!regIdNo.test(value)){
              callback(new Error('居民身份证号录入不正确'));
            }else{callback();}
            break;
          case "CHINA_PASSPORT"://中国护照
            if(value.length != 9){
              callback(new Error('中国护照的证件号码必须9位，且只含数字和字母'));
            }else{callback();}
            break;
          case "COMPATRIOTS_CARD"://港澳居民来往内地通行证
            if(!(value.length == 9 || value.length == 11)){
              callback(new Error('证件号码长度不对，且必须是数字和字母组合'));
            }else{callback();}
            break;
          case "FORMOSA_CARD"://台湾居民来往大陆通行证
            if(value.length != 8){
              callback(new Error('台湾居民来往大陆通行证的证件号码必须8位数字'));
            }else{callback();}
            break;
          case "MACAU_PRC_ID"://港澳居民居住证
            if(value.length != 18){
              callback(new Error('港澳居民居住证的证件号码必须18位'));
            }else{callback();}
            break;
          case "FORMOSA_PRC_ID"://台湾居民居住证
            if(value.length != 18){
              callback(new Error('台湾居民居住证的证件号码必须18位'));
            }else{callback();}
            break;
          case "FOREIGN_PRC_ID"://外国人永久居留身份证
            if(value.length != 15){
              callback(new Error('外国人永久居留身份证的证件号码必须15位'));
            }else{callback();}
            break;
        }
      }else{
        callback('身份证信息不能为空')
      }
    },
    //证件类型控制显示
    changeIdType(value){
      switch (value) {
        case "PRC_ID"://居民身份证
          this.employeeFormData.country = "中国" ;this.canSelectCoutry = ['中国'];
          this.employeeFormData.otherIdType = "";this.canSelectotherIdType = [];
          break;
        case "CHINA_PASSPORT": //中国护照
          this.employeeFormData.country = "中国" ;this.canSelectCoutry = ['中国']
          this.employeeFormData.otherIdType = "CHINA_PASSPORT";this.canSelectotherIdType = ['中国护照']
          break;
        case "COMPATRIOTS_CARD": //港澳居民来往内地通行证
          this.employeeFormData.country = "" ; this.canSelectCoutry = ['中国香港','中国澳门'];
          this.employeeFormData.otherIdType = "MACAU_PRC_ID";this.canSelectotherIdType = ['MACAU_PRC_ID']
          break;
        case "MACAU_PRC_ID"://港澳居民居住证
          this.employeeFormData.country = "" ;this.canSelectCoutry = ['中国香港','中国澳门']
          this.employeeFormData.otherIdType = "COMPATRIOTS_CARD";this.canSelectotherIdType = ['COMPATRIOTS_CARD']
          break;
        case "FORMOSA_CARD": //台湾居民来往大陆通行证
          this.employeeFormData.country = "中国台湾" ;this.canSelectCoutry = ['中国台湾']
          this.employeeFormData.otherIdType = "FORMOSA_PRC_ID";this.canSelectotherIdType = ['FORMOSA_PRC_ID']
          break;
        case "FORMOSA_PRC_ID": //台湾居民居住证
          this.employeeFormData.country = "中国台湾" ;this.canSelectCoutry = ['中国台湾']
          this.employeeFormData.otherIdType = "FORMOSA_CARD";this.canSelectotherIdType = ['FORMOSA_CARD']
          break;
        case "FOREIGN_PASSPORT": //外国护照
          this.employeeFormData.country = "" ;
          this.canSelectCoutry = this.countryList.filter(item=>!['中国香港','中国','中国澳门'].includes(item))
          this.employeeFormData.otherIdType = "";this.canSelectotherIdType = ['外国人永久居留身份证','外国人工作许可证（A类）','外国人工作许可证（B类）','外国人工作许可证（C类)']
          break;
        case "FOREIGN_PRC_ID"://外国人永久居留身份证
        case "FOREIGN_WORK_PERMIT_A":// 外国人工作许可证（A类）
        case "FOREIGN_WORK_PERMIT_B"://外国人工作许可证（B类）
        case "FOREIGN_WORK_PERMIT_C"://外国人工作许可证（C类
          this.employeeFormData.country = "" ;
          this.canSelectCoutry = this.countryList.filter(item=>!['中国香港','中国','中国澳门'].includes(item))
          this.employeeFormData.otherIdType = "外国护照";this.canSelectotherIdType = ['外国护照']
          break;
      }
      if(!['PRC_ID','CHINA_PASSPORT','COMPATRIOTS_CARD','FORMOSA_PRC_ID','FORMOSA_PRC_ID',
        'FOREIGN_PASSPORT','FOREIGN_PRC_ID','FOREIGN_WORK_PERMIT_A','FOREIGN_WORK_PERMIT_B','FOREIGN_WORK_PERMIT_C'].includes(value)){
        this.employeeFormData.country = "" ;this.canSelectCoutry = this.countryList
      }

    },
    handleSave() {
      //如果取消选中 将对应的证号清空
      if (!this.employeeFormData.disabilityYn) {
        this.employeeFormData.dsability = "";
      }
      if (!this.employeeFormData.martyrFamilyYn) {
        this.employeeFormData.martyrFamilyNo = "";
      }

      this.employeeFormData.operType = "UPDATE";
      if (this.employeeFormData.empDay > this.employeeFormData.leaveDay && this.employeeFormData.leaveDay) {
        this.$message({
          message: "离职日期不能早于任职受雇从业日期",
          type: "warning"
        });

      } else {
        if (!this.employeeFormData.leaveDay) {
          this.employeeFormData.leaveDay = "";
        }

        //过滤failReason字段
        if(this.employeeFormData.failReason){this.employeeFormData.failReason == ""}
        this.$refs.refEmployeeForm.validate(valid => {
          if (valid) {
            this.$store
              .dispatch(
                "taxPageStore/actionSaveEmpCollectInfo",
                this.employeeFormData
              )
              .then(res => {
                if (res.success) {
                 this.$router.go(-1)
                }else{
                  this.$message.warning(res.message)
                }
              });
          }
        });
      }
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
    margin-left: 250px;
    display: inline-block;
    margin-top: 30px;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 50px;
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
