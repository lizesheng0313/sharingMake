<template>
  <div class="employee-detail">
    <full-screen
      :fsTitle="'员工信息详情'"
      :bgColor="'#fff'"
      class="info-collection"
    >
      <div slot="fs-container">
          <div class="employee-detail-con">
            <div class="base-info">
              <span class="title">基本信息</span>
              <span class="fun-right">
                 <span v-if="isBaseEdit">
                   <el-button type="primary" @click="saveBaseInfo">保存</el-button>
                   <el-button @click="cancelBaseEdit">取消</el-button>
                 </span>
                 <el-button type="primary" @click="isBaseEdit = true" v-else>编辑</el-button>
              </span>
            </div>
            <div class="base-info-con">
              <el-form label-width="140px" v-if="!isBaseEdit">
                  <el-row>
                      <el-col :span="12"><el-form-item label="姓名：">{{ this.baseForm.empName}}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="工号：">{{ this.baseForm.empNo}}</el-form-item></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12"><el-form-item label="证件类型：">{{ this.baseForm.idCardType}}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="证件号码：">{{ this.baseForm.idCard }}</el-form-item></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12"><el-form-item label="性别：">{{ this.baseForm.enumEmpSex}}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="出生日期：">{{ this.baseForm.birthday }}</el-form-item></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12"><el-form-item label="国籍(地区)：">{{ this.baseForm.country }}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="手机号码：">{{ this.baseForm.mobile}}</el-form-item></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12"><el-form-item label="最高学历：">{{ this.baseForm.education }}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="参加工作日期：">{{ this.baseForm.inWorkDay }}</el-form-item></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12"><el-form-item label="户口性质：">{{ this.baseForm.householdRegistrationType}}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="户口所在城市：">{{ this.baseForm.householdCountry }}</el-form-item></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12"><el-form-item label="婚姻状态：">{{ this.baseForm.maritalStatus}}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="民族：">{{ this.baseForm.nationality }}</el-form-item></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12"><el-form-item label="工资卡开户银行：">{{ this.baseForm.wageCardBank }}</el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="工资银行账号：">{{ this.baseForm.wageCardNum }}</el-form-item></el-col>
                  </el-row>
              </el-form>
              <el-form label-width="150px" :model="baseForm" ref="baseForm" v-else>
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
                              <el-option v-for="(item,index) in idTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
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
                          <el-form-item label="性别" prop="enumEmpSex" :rules="{required: true, message: '性别不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.enumEmpSex" placeholder="请选择性别">
                              <el-option v-for="(item,index) in enumEmpSexOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="出生日期：" prop="birthday" :rules="{required: true, message: '出生日期不能为空', trigger: 'blur'}">
                              <el-date-picker v-model="baseForm.birthday" type="date" placeholder="请选择" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="国籍（地区）" prop="country" :rules="{required: true, message: '国籍不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.country" placeholder="请选择国籍" filterable>
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
                              <el-option v-for="(item,index) in educationOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="参加工作日期：">
                              <el-date-picker v-model="baseForm.inWorkDay" type="date"  value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="户口性质">
                            <el-select v-model="baseForm.householdRegistrationType" placeholder="请选择户口性质">
                              <el-option v-for="(item,index) in householdRegistrationTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="户口所在城市：">
                              <el-select v-model="baseForm.householdCountry" placeholder="请选择户口所在城市" filterable>
                                <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
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
                    </el-row> <el-row style="display: flex">
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
                </el-form>
            </div>
            <div class="insured-info">
                <span class="title">参保信息</span>
                <span class="fun-right">
                    <span v-if="isInsuredEdit">
                      <el-button type="primary" @click="saveInsuredInfo">保存</el-button>
                      <el-button @click="isInsuredEdit = false">取消</el-button>
                    </span>
                    <span v-else><el-button type="primary" @click="isInsuredEdit = true">编辑</el-button></span>
                </span>
            </div>
            <div class="insured-info-con">
                  <el-form label-width="140px" v-if="!isInsuredEdit">
                      <el-row>
                        <el-col :span="12"><el-form-item label="公司名称：">{{ this.insuredForm.companyName}}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="用工性质：">{{ this.insuredForm.empType }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="部门：">{{this.insuredForm.deptName}}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="岗位：">{{ this.insuredForm.positionName }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="入职日期：">{{ this.insuredForm.empDay}}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="任职受雇从业类型：">{{this.insuredForm.workerType}}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="是否转正：">{{this.insuredForm.regularEmpYn }}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="转正日期：">{{ this.insuredForm.zzDay }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="员工状态：">{{ this.insuredForm.empStatus }}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="最后工作日：">{{ this.insuredForm.leaveDay}}</el-form-item></el-col>
                      </el-row>
                    <el-row>
                      <el-col :span="12"><el-form-item label="工作城市：">{{ this.insuredForm.workCity }}</el-form-item></el-col>
                    </el-row>
                  </el-form>
                  <el-form label-width="150px" :model="insuredForm" ref="insuredForm" v-else>
                      <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="公司名称" prop="companyName" :rules="{required: true, message: '请选择公司名称', trigger: 'blur'}">
                            <el-select v-model="insuredForm.companyName" placeholder="请选择公司名称">
                              <el-option v-for="(item,index) in companyOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                          <el-form-item label="用工性质" prop="empType" :rules="{required: true, message: '请选择用工性质', trigger: 'blur'}">
                            <el-select v-model="insuredForm.empType" placeholder="请选择">
                              <el-option v-for="(item,index) in enumEmpTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </el-row>
                      <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="部门" prop="deptName">
                            <el-input v-model="insuredForm.deptName"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                          <el-form-item label="岗位" prop="station">
                            <el-input v-model="insuredForm.positionName"></el-input>
                          </el-form-item>
                        </div>
                      </el-row>
                      <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="入职日期" prop="empDay" :rules="{required: true, message: '请选择入职日期', trigger: 'blur'}">
                            <el-date-picker v-model="insuredForm.empDay" type="date"  value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                          <el-form-item label="任职受雇从业类型" prop="workerType">
                            <el-select v-model="insuredForm.workerType" placeholder="请选择任职受雇从业类型" :rules="{required: true, message: '请选择任职受贿类型', trigger: 'blur'}">
                              <el-option v-for="(item,index) in workerTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </el-row>
                      <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="是否转正" prop="regularEmpYn" :rules="{required: true, message: '请选择', trigger: 'blur'}">
                            <el-select v-model="insuredForm.regularEmpYn" placeholder="请选择">
                              <el-option v-for="(item,index) in regularEmpYnOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                          <el-form-item label="转正日期" prop="zzDay">
                            <el-date-picker v-model="insuredForm.zzDay" type="date"  value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
                          </el-form-item>
                        </div>
                      </el-row>
                      <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="员工状态" prop="empStatus" :rules="{required: true, message: '请选择', trigger: 'blur'}">
                            <el-select v-model="insuredForm.empStatus" placeholder="请选择">
                              <el-option v-for="(item,index) in empStatusOption" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                          <el-form-item label="最后工作日" prop="leaveDay">
                            <el-date-picker v-model="insuredForm.leaveDay" type="date" placeholder="请选择"></el-date-picker>
                          </el-form-item>
                        </div>
                      </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="工作城市" prop="empStatus">
                          <el-select v-model="insuredForm.workCity" placeholder="请选择" filterable>
                            <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
                </el-form>
              </div>
          </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import * as constData from "./util/constData"
import { validatePhone } from "@/util/validate";
import { mapState } from "vuex";

export default {
  components: {
    fullScreen
  },
  data() {
    const t = this;
    return {
      isBaseEdit:false,
      isInsuredEdit:false,
      compEmpId:this.$route.query.compEmpId,
      baseForm:{
        empName:"",
        empNo:"",
        idType:"PRC_ID",
        idNo:"",
        enumEmpSex:"MALE",
        birthday:"",
        country:"",
        mobile:"",
        education:"",
        inWorkDay:"",
        householdRegistrationType:"",//户口性质
        householdCountry:"",//户口所在城市
        maritalStatus:"",
        nationality:"",
        wageCardBank:"",//工资卡开发银行
        wageCardNum:"",//工资银行账号
      },
      idTypeOption:constData.idType,//证件类型
      enumEmpSexOption:constData.empSex,
      educationOption:constData.educationOption,//最高学历
      householdRegistrationTypeOption:constData.householdRegistrationTypeOption,//户口性质
      insuredForm:{
        companyName: "",
        empType:"",
        deptName:"",//部门
        positionName:"",//岗位
        empDay:"",//入职日期
        workerType:"",//受职
        regularEmpYn:"",//是否转正
        zzDay:"",//转正日期
        empStatus:"",//员工状态
        leaveDay:"",//最后工作日
        workCity:"",//工作城市
      },
      companyOption:[],
      workerTypeOption:constData.workerType,
      regularEmpYnOption:constData.regularEmpYnOption,
      enumEmpTypeOption:constData.enumEmpTypeOption,
      empStatusOption:constData.employStatusOption,
      showTable:false,
    };
  },
  computed: {
    ...mapState({
      countryList:state=>state.countryList,
      cityList:state=>state.cityList,
    })
  },
  created(){
    this.$store.dispatch("payMasterStore/actionGetEmployee",this.compEmpId).then(res=>{
      if(res.success){
        let data = res.data;
        for(let key in this.baseForm) {this.baseForm[key] = data[key]}
        for(let key in this.insuredForm) {this.insuredForm[key] = data[key]}
      }
    })
    //公司列表
    this.getTaxSubjectInfoList()

  },
  mounted() {
  },
  methods: {
    //扣缴义务人列表
    getTaxSubjectInfoList() {
      this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res => {
        if (res.success) {
          this.companyOption = res.data
        }
      });
    },
    saveInfo() {
      this.$refs['baseForm'].validate(valid => {
        if(valid){
          console.log("111")
        }
      })
    },
    //保存基本信息信息
    saveBaseInfo(){
      this.$refs['baseForm'].validate(valid => {
        if(valid){
          this.$store
            .dispatch("payMasterStore/actionSaveEmployee", this.baseForm)
            .then(res => {
              console.log(res)
            })
        }
      })
    },
    //保存公司信息
    saveInsuredInfo(){
      this.$refs['insuredForm'].validate(valid => {
        if(valid){
          this.$store
            .dispatch("payMasterStore/actionSaveCompany", this.insuredForm)
            .then(res => {
              console.log(res)
            })
        }
      })
    },
    cancelBaseEdit(){
      this.isBaseEdit = false
    },
  }
};
</script>
<style lang="scss" scoped>
.employee-detail {
  background: #fff;
  padding-bottom: 30px;
  .employee-detail-con {
    width: 1100px;
    margin: 0 auto;
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
    .insured-info{
      .title{
        margin: 0px 0px 30px 0px;
      }
      .fun-right{
        float: right;
      }
    }
    .table-fun{
      margin:0px 0px 20px 0px;
    }

  }
}
</style>
