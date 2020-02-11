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
                          <el-form-item label="姓名" prop="empName" :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                            <el-input v-model="baseForm.empName"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                          <el-form-item label="工号：">
                            <el-input v-model="baseForm.empNo"></el-input>
                          </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="证件类型" prop="idType" :rules="{required: true, message: '证件类型不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.idType" placeholder="请选择证件类型">
                              <el-option v-for="(item,index) in idCardTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                         <div style="flex:1">
                        <el-form-item label="证件号码：" prop="idNo" :rules="{required: true, message: '证件号码不能为空', trigger: 'blur'}">
                          <el-input v-model="baseForm.idNo"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="性别" prop="empSex" :rules="{required: true, message: '性别不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.empSex" placeholder="请选择性别">
                              <el-option v-for="(item,index) in sexOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="出生日期：" prop="birthday" :rules="{required: true, message: '出生日期不能为空', trigger: 'blur'}">
                              <el-date-picker v-model="baseForm.birthday" type="date" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="国籍（地区）" prop="country" :rules="{required: true, message: '国籍不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.country" placeholder="请选择国籍">
                              <el-option v-for="(item,index) in countryList" :label="item" :value="item" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="手机号码：" prop="mobile" :rules="{required: true, message: '手机号码不能为空', trigger: 'blur'}">
                              <el-input v-model="baseForm.mobile"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="最高学历">
                            <el-select v-model="baseForm.education" placeholder="请选择最高学历">
                              <el-option v-for="(item,index) in topEduOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="参加工作日期：">
                              <el-date-picker v-model="baseForm.inWorkDay" type="date" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="户口性质">
                            <el-select v-model="baseForm.householdRegistrationType" placeholder="请选择最高学历">
                              <el-option v-for="(item,index) in householdSexOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="户口所在城市：">
                              <el-select v-model="baseForm.householdCountry" placeholder="请选择户口所在城市" filterable>
                                <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index" fi></el-option>
                              </el-select>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="婚姻状况">
                            <el-input v-model="baseForm.maritalStatus"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="民族：">
                              <el-input v-model="baseForm.nationality"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="工资卡开户银行">
                            <el-input v-model="baseForm.wageCardBank"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="工资银行账号：">
                              <el-input v-model="baseForm.wageCardNum"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="其他证件类型" >
                          <el-select v-model="baseForm.otherIdType" placeholder="请选择其他证件类型">
                            <el-option v-for="(item,index) in otherIdCardTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="其他证件号码：">
                          <el-input v-model="baseForm.otherIdNo"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="出生国家(地区)">
                          <el-select v-model="baseForm.birthPlace" placeholder="请选择出生国家(地区)">
                            <el-option v-for="(item,index) in countryList" :label="item" :value="item" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="涉税事由：">
                          <el-select v-model="baseForm.taxRelatedReason" placeholder="请选择涉税事由">
                            <el-option v-for="(item,index) in taxReasonOption" :label="item.label" :value="item.value" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="首次入境时间">
                          <el-date-picker v-model="baseForm.firstEntryTime" type="date" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="预计离境时间：">
                          <el-date-picker v-model="baseForm.expectLeaveTime" type="date" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
<!--                    参保信息-->
                    <div class="insured-info">
                      <span class="title">参保信息</span>
                    </div>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="公司名称" prop="compId" :rules="{required: true, message: '请选择公司名称', trigger: 'blur'}">
                          <el-select v-model="baseForm.compId" placeholder="请选择公司名称">
                            <el-option v-for="(item,index) in taxSubjectInfoList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="用工性质" prop="empType" :rules="{required: true, message: '请选择用工性质', trigger: 'blur'}">
                          <el-date-picker v-model="baseForm.empType" type="month" placeholder="请选择"></el-date-picker>
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
                          <el-date-picker v-model="baseForm.empDay" type="date" placeholder="请选择"></el-date-picker>
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
                        <el-form-item label="是否转正" prop="regularEmpYn" :rules="{required: true, message: '请选择', trigger: 'blur'}">
                          <el-select v-model="baseForm.regularEmpYn" placeholder="请选择">
                            <el-option v-for="(item,index) in isFullWorkOption" :label="item.label" :value="item.value" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="转正日期" prop="zzDay">
                          <el-date-picker v-model="baseForm.zzDay" type="date" placeholder="请选择"></el-date-picker>
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
        idType:"",
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

        compId:"",//公司名称
        empType:"",
        deptName:"",
        positionName:"",
        empDay:"",
        workerType:"",
        regularEmpYn:"",
        zzDay:"",
        workCity:"",
      },
      idCardTypeOption:constData.idType,
      sexOption:constData.empSex,
      topEduOption:constData.educationOption,
      householdSexOption:constData.householdRegistrationTypeOption,
      isFullWorkOption:constData.regularEmpYnOption,
      otherIdCardTypeOption:constData.idType,
      taxReasonOption:constData.taxReasonOption,
      workerTypeOption: constData.workerType
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
  methods: {
    saveInfo() {
      this.$refs['baseForm'].validate(valid => {
        if(valid){
          this.$store
            .dispatch("payMasterStore/actionAddEmployees", this.baseForm)
            .then(res => {
              console.log(res)
            })
        }
      })
    },
    //取消保存公司信息
    cancelAddInfo(){
      this.$router.go(-1)
    },

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
