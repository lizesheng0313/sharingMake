<template>
  <div class="add-employee">
    <full-screen
      :fsTitle="'员工信息详情'"
      :bgColor="'#fff'"
      class="info-collection"
    >
      <div slot="fs-container">
          <div class="employee-detail-con">
            <div class="base-info">
              <span class="title">基本信息</span>
            </div>
            <div class="base-info-con">
              <el-form label-width="150px" :model="baseForm" ref="baseForm" >
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="姓名" prop="empName"  :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                            <el-input v-model="baseForm.empName" :disabled="baseDisable"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                          <el-form-item label="工号：">
                            <el-input v-model="baseForm.empNo" :disabled="baseDisable"></el-input>
                          </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="证件类型" prop="idType" :rules="{required: true, message: '证件类型不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.idType" placeholder="请选择证件类型" @change="changeIdType" :disabled="baseDisable">
                              <el-option v-for="(item,index) in idCardTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                         <div style="flex:1">
                        <el-form-item label="证件号码：" prop="idNo" :rules="{required: true, validator: this.validIdNo, trigger: 'blur'}">
                          <el-input v-model="baseForm.idNo" :disabled="baseDisable" @blur="checkIdCard"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="性别" prop="empSex" :rules="{required: true, message: '性别不能为空', trigger: 'change'}">
                            <el-select v-model="baseForm.empSex" placeholder="请选择性别" :disabled="baseDisable">
                              <el-option v-for="(item,index) in sexOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="出生日期：" prop="birthday" :rules="{required: true, message: '出生日期不能为空', trigger: 'blur'}">
                              <el-date-picker v-model="baseForm.birthday" type="date" placeholder="请选择" value-format="yyyy-MM-dd" :disabled="baseDisable"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="国籍（地区）" prop="country" :rules="{required: true, message: '国籍不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.country" placeholder="请选择国籍" :disabled="baseDisable">
                              <el-option v-for="(item,index) in countryList" :label="item" :value="item" :key="index" :disabled="!canSelectCoutry.includes(item)"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="手机号码：" prop="mobile" :rules="[
                            {required: true, message: '手机号码不能为空', trigger: 'blur'},
                            { validator: validateTell, trigger: 'blur'}
                            ]">
                              <el-input v-model="baseForm.mobile" :disabled="baseDisable"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="最高学历">
                            <el-select v-model="baseForm.education" placeholder="请选择最高学历" :disabled="baseDisable">
                              <el-option v-for="(item,index) in topEduOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="参加工作日期：">
                              <el-date-picker v-model="baseForm.inWorkDay" type="date" placeholder="请选择" value-format="yyyy-MM-dd" :disabled="baseDisable"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="户口性质">
                            <el-select v-model="baseForm.householdRegistrationType" placeholder="请选择户口性质" :disabled="baseDisable">
                              <el-option v-for="(item,index) in householdSexOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="户口所在城市：">
                              <el-select v-model="baseForm.householdCountry" placeholder="请选择户口所在城市" filterable :disabled="baseDisable">
                                <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index" fi></el-option>
                              </el-select>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="婚姻状况">
                            <el-input v-model="baseForm.maritalStatus" :disabled="baseDisable"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="民族：">
                              <el-input v-model="baseForm.nationality" :disabled="baseDisable"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="工资卡开户银行">
                            <el-input v-model="baseForm.wageCardBank" :disabled="baseDisable"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="工资银行账号：" prop="wageCardNum"
                                          :rules="[{required:false,validator:validateBankId, trigger: 'blur'}]">
                              <el-input v-model="baseForm.wageCardNum" :disabled="baseDisable"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="其他证件类型" >
                          <el-select v-model="baseForm.otherIdType" placeholder="请选择其他证件类型" :disabled="baseDisable">
                            <el-option v-for="(item,index) in otherIdCardTypeOption" :label="item.label" :value="item.value" :key="index" :disabled="!canSelectotherIdType.includes(item.value)"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="其他证件号码：" >
                          <el-input v-model="baseForm.otherIdNo" :disabled="baseDisable"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="出生国家(地区)">
                          <el-select v-model="baseForm.birthPlace" placeholder="请选择出生国家(地区)" :disabled="baseDisable">
                            <el-option v-for="(item,index) in countryList" :label="item" :value="item" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="涉税事由：">
                          <el-select v-model="baseForm.taxRelatedReason" placeholder="请选择涉税事由" multiple :disabled="baseDisable">
                            <el-option v-for="(item,index) in taxReasonOption" :label="item.label" :value="item.value" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="首次入境时间" >
                          <el-date-picker v-model="baseForm.firstEntryTime" type="date" placeholder="请选择" :disabled="baseDisable"></el-date-picker>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="预计离境时间：">
                          <el-date-picker v-model="baseForm.expectLeaveTime" type="date" placeholder="请选择" :disabled="baseDisable"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
<!--                    参保信息-->
                    <div class="insured-info">
                      <span class="title">参保信息</span>
                    </div>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="公司名称" prop="taxSubId" :rules="{required: true, message: '请选择公司名称', trigger: 'blur'}">
                          <el-select v-model="baseForm.taxSubId" placeholder="请选择公司名称">
                            <el-option v-for="(item,index) in taxSubList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="用工性质" prop="empType" :rules="{required: true, message: '请选择用工性质', trigger: 'blur'}">
                          <el-select v-model="baseForm.empType">
                            <el-option v-for="(item,index) in enumEmpTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="部门" prop="deptName">
                          <el-input v-model="baseForm.deptName"></el-input>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="岗位" prop="positionName">
                          <el-input v-model="baseForm.positionName"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="入职日期" prop="empDay" :rules="{required: true, message: '请选择入职日期', trigger: 'blur'}">
                          <el-date-picker v-model="baseForm.empDay" type="date" placeholder="请选择" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="任职受雇从业类型" prop="workerType">
                          <el-select v-model="baseForm.workerType" placeholder="请选择任职受雇从业类型" :rules="{required: true, message: '请选择任职受贿类型', trigger: 'blur'}">
                            <el-option v-for="(item,index) in workerTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="是否转正" prop="regularEmpYn" >
                          <el-select v-model="baseForm.regularEmpYn" placeholder="请选择">
                            <el-option v-for="(item,index) in isFullWorkOption" :label="item.label" :value="item.value" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="转正日期" prop="turnRegularDate" :rules="{required: baseForm.regularEmpYn ==='1', message: '请选择转正日期', trigger: 'blur'}">
                          <el-date-picker v-model="baseForm.turnRegularDate" type="date" placeholder="请选择" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                       <el-form-item label="工作城市" prop="empStatus">
                        <el-select v-model="baseForm.workCity" placeholder="请选择" filterable>
                          <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
                        </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
              </el-form>
            </div>
            <div class="fun-style">
              <el-button type="primary" @click="saveInfo">保存</el-button>
              <el-button @click="cancelAddInfo">取消</el-button>
            </div>
          </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import { mapState } from "vuex";
import * as constData from "./util/constData"
import { validateTell,validateBankId } from "@/util/validate";
export default {
  components: {
    fullScreen
  },
  computed: {
    ...mapState("taxPageStore", {
      personnelCollection: state => state.personnelCollection
    }),
  },
  data() {
    const t = this;
    return {
      baseForm:{
        empName:"",
        empNo:"",
        idType:"PRC_ID",
        idNo:"",
        empSex:"",
        birthday:"",
        country:"",
        mobile:"",
        education:"",
        inWorkDay:"",
        householdRegistrationType:"",
        householdCountry:"",
        maritalStatus:"",
        nationality:"",
        wageCardBank:"",//开户银行
        wageCardNum:"",
        otherIdType:"",
        otherIdNo:"",
        birthPlace:"",
        taxRelatedReason:"",
        firstEntryTime:"",
        expectLeaveTime:"",

        taxSubId:"",//公司名称
        empType:"",
        deptName:"",
        positionName:"",
        empDay:"",
        workerType:"",
        regularEmpYn:"",
        turnRegularDate:"",
        workCity:"",
      },
      canSelectCoutry:[],
      canSelectotherIdType:[],//其他证件类型
      taxSubList:[],
      enumEmpTypeOption:constData.enumEmpTypeOption,
      idCardTypeOption:constData.idType,
      sexOption:constData.empSex,
      topEduOption:constData.educationOption,
      householdSexOption:constData.householdRegistrationTypeOption,
      isFullWorkOption:[],
      otherIdCardTypeOption:constData.idType,
      taxReasonOption:constData.taxReasonOption,
      workerTypeOption: constData.workerType,
      baseDisable:false,
      validateTell:validateTell,
      validateBankId:validateBankId

    };
  },
  computed: {
    ...mapState({
      countryList:state=>state.countryList,
      cityList:state=>state.cityList,
      taxSubjectInfoList:state=>state.taxSubjectInfoList
    })
  },
  mounted() {

  },
  created(){
    this.changeIdType(this.baseForm.idType)
    this.taxSubList = this.taxSubjectInfoList.filter(item=>item.taxSubId)
    this.isFullWorkOption = constData.regularEmpYnOption.filter(item=>item.value)
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
    checkIdCard(){
     this.$refs.baseForm.validateField('idNo',emailError=>{
       if(!emailError){
         this.$store
           .dispatch("payMasterStore/actionEmployeeIdCard", {
              "idCard":this.baseForm.idNo,
              "idType":this.baseForm.idType,
           })
           .then(res=>{
             let data = res.data
             if(res.success){
               this.$confirm(`员工[${data.empName}]已存在，是否继续将员工添加到其他公司`, '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                 for(let key in this.baseForm){if(data[key]){this.baseForm[key] = data[key]}}
                 this.baseDisable = true;
                 this.$refs['baseForm'].validate()
               }).catch(() => {})
             }else{
               this.baseDisable = false
               if(this.baseForm.idType === 'PRC_ID'){
                 this.baseForm.empSex = data.empSex
                 this.baseForm.birthday = data.birthday
               }
               this.$refs['baseForm'].validate()
             }
           })
       }
      })

    },
    //证件类型控制显示
    changeIdType(value){
      switch (value) {
        case "PRC_ID"://居民身份证
          this.baseForm.country = "中国" ;this.canSelectCoutry = ['中国'];
          this.baseForm.otherIdType = "";this.canSelectotherIdType = [];
          break;
        case "CHINA_PASSPORT": //中国护照
          this.baseForm.country = "中国" ;this.canSelectCoutry = ['中国']
          this.baseForm.otherIdType = "中国护照";this.canSelectotherIdType = ['中国护照']
          break;
        case "COMPATRIOTS_CARD": //港澳居民来往内地通行证
          this.baseForm.country = "" ;this.canSelectCoutry = ['中国香港','中国澳门']
          this.baseForm.otherIdType = "MACAU_PRC_ID";this.canSelectotherIdType = ['MACAU_PRC_ID']
          break;
        case "MACAU_PRC_ID"://港澳居民居住证
          this.baseForm.country = "" ;this.canSelectCoutry = ['中国香港','中国澳门']
          this.baseForm.otherIdType = "COMPATRIOTS_CARD";this.canSelectotherIdType = ['COMPATRIOTS_CARD']
          break;
        case "FORMOSA_CARD": //台湾居民来往大陆通行证
          this.baseForm.country = "中国台湾" ;this.canSelectCoutry = ['中国台湾']
          this.baseForm.otherIdType = "FORMOSA_PRC_ID";this.canSelectotherIdType = ['FORMOSA_PRC_ID']
          break;
        case "FORMOSA_PRC_ID": //台湾居民居住证
          this.baseForm.country = "中国台湾" ;this.canSelectCoutry = ['中国台湾']
          this.baseForm.otherIdType = "FORMOSA_CARD";this.canSelectotherIdType = ['FORMOSA_CARD']
          break;
        case "FOREIGN_PASSPORT": //外国护照
          this.baseForm.country = "" ;
          this.canSelectCoutry = this.countryList.filter(item=>!['中国香港','中国','中国澳门'].includes(item))
          this.baseForm.otherIdType = "";this.canSelectotherIdType = ['外国人永久居留身份证','外国人工作许可证（A类）','外国人工作许可证（B类）','外国人工作许可证（C类)']
          break;
        case "FOREIGN_PRC_ID"://外国人永久居留身份证
        case "FOREIGN_WORK_PERMIT_A":// 外国人工作许可证（A类）
        case "FOREIGN_WORK_PERMIT_B"://外国人工作许可证（B类）
        case "FOREIGN_WORK_PERMIT_C"://外国人工作许可证（C类
          this.baseForm.country = "" ;
          this.canSelectCoutry = this.countryList.filter(item=>!['中国香港','中国','中国澳门'].includes(item))
          this.baseForm.otherIdType = "外国护照";this.canSelectotherIdType = ['外国护照']
          break;
      }
      if(!['PRC_ID','CHINA_PASSPORT','COMPATRIOTS_CARD','FORMOSA_PRC_ID','FORMOSA_PRC_ID',
        'FOREIGN_PASSPORT','FOREIGN_PRC_ID','FOREIGN_WORK_PERMIT_A','FOREIGN_WORK_PERMIT_B','FOREIGN_WORK_PERMIT_C'].includes(value)){
        this.baseForm.country = "" ;this.canSelectCoutry = this.countryList
      }

    },
    saveInfo() {
      this.$refs['baseForm'].validate(valid => {
        if(valid){
          this.$store
            .dispatch("payMasterStore/actionAddEmployees", this.baseForm)
            .then(res => {
              if(res.success){
                this.$message.success("保存成功")
                this.$router.go(-1)
              }
            })
        }
      })
    },
    //取消保存公司信息
    cancelAddInfo(){
      // this.baseDisable =false
      // for(let key in this.baseForm){
      //  this.baseForm[key] =""
      // }
      // this.baseForm.idType = "PRC_ID"
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
.add-employee {
  background: #fff;
  padding-bottom: 30px;
  .employee-detail-con {
    width: 1100px;
    margin: 0 auto;
    padding-bottom: 50px;
    .title {
      display: inline-block;
      margin-top: 30px;
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .base-info-con ,.insured-info-con {
      width: 1000px;
      margin: 0 auto;
    }
    .base-info{
      .fun-right{
        float: right;
        margin-top: 30px;
      }
    }
    .table-fun{
      margin:0px 0px 20px 0px;
    }

  }
  .fun-style{
    position: fixed;
    left:0px;
    bottom:0px;
    text-align: center;
    width: 100%;
    background: #fff;
    padding:10px 0px;
  }
}
</style>
