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
                          <el-form-item label="姓名" prop="name" :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                            <el-input v-model="baseForm.name"></el-input>
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
                          <el-form-item label="证件类型" prop="idCardType" :rules="{required: true, message: '证件类型不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.idCardType" placeholder="请选择参保方案">
                              <el-option v-for="(item,index) in idCardTypeOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                         <div style="flex:1">
                        <el-form-item label="证件号码：" prop="idCard" :rules="{required: true, message: '证件号码不能为空', trigger: 'blur'}">
                          <el-input v-model="baseForm.idCard"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="性别" prop="sex" :rules="{required: true, message: '性别不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.sex" placeholder="请选择性别">
                              <el-option v-for="(item,index) in sexOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
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
                          <el-form-item label="国籍（地区）" prop="nationality" :rules="{required: true, message: '国籍不能为空', trigger: 'blur'}">
                            <el-select v-model="baseForm.nationality" placeholder="请选择国籍">
                              <el-option v-for="(item,index) in nationalityOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="手机号码：" prop="phone" :rules="{required: true, message: '手机号码不能为空', trigger: 'blur'}">
                              <el-input v-model="baseForm.phone"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="最高学历">
                            <el-select v-model="baseForm.topEdu" placeholder="请选择最高学历">
                              <el-option v-for="(item,index) in topEduOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="参加工作日期：">
                              <el-date-picker v-model="baseForm.workDate" type="date" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="户口性质">
                            <el-select v-model="baseForm.householdSex" placeholder="请选择最高学历">
                              <el-option v-for="(item,index) in householdSexOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="户口所在城市：">
                              <el-select v-model="baseForm.householdCity" placeholder="请选择户口所在城市">
                                <el-option v-for="(item,index) in householdCityOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
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
                              <el-input v-model="baseForm.nation"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div style="flex:1">
                          <el-form-item label="工资卡开户银行">
                            <el-input v-model="baseForm.openBank"></el-input>
                          </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="工资银行账号：">
                              <el-input v-model="baseForm.bankNo"></el-input>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="其他证件类型" >
                          <el-select v-model="baseForm.otherIdCardType" placeholder="请选择其他证件类型">
                            <el-option v-for="(item,index) in otherIdCardTypeOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="其他证件号码：">
                          <el-input v-model="baseForm.otherIdCard"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="出生国家(地区)">
                          <el-select v-model="baseForm.birthCountry" placeholder="请选择出生国家(地区)">
                            <el-option v-for="(item,index) in birthCountryOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="涉税事由：">
                          <el-select v-model="baseForm.taxReasonOption" placeholder="请选择涉税事由">
                            <el-option v-for="(item,index) in taxReasonOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="首次入境时间">
                          <el-date-picker v-model="baseForm.entryIranDate" type="date" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="预计离境时间：">
                          <el-date-picker v-model="baseForm.leaveIranDate" type="date" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
<!--                    参保信息-->
                    <div class="insured-info">
                      <span class="title">参保信息</span>
                    </div>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="公司名称" prop="socialStartMonth" :rules="{required: true, message: '请选择公司名称', trigger: 'blur'}">
                          <el-select v-model="baseForm.companyName" placeholder="请选择公司名称">
                            <el-option v-for="(item,index) in companyOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="用工性质" prop="employmentNature" :rules="{required: true, message: '请选择用工性质', trigger: 'blur'}">
                          <el-date-picker v-model="baseForm.employmentNature" type="month" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="部门" prop="department">
                          <el-input v-model="baseForm.department"></el-input>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="岗位" prop="station">
                          <el-input v-model="baseForm.station"></el-input>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="入职日期" prop="socialMonth" :rules="{required: true, message: '请选择入职日期', trigger: 'blur'}">
                          <el-date-picker v-model="baseForm.socialMonth" type="date" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="工作城市">
                          <el-select v-model="baseForm.workCity" placeholder="请选择工作城市">
                            <el-option v-for="(item,index) in workCityOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="是否转正" prop="isFullWork" :rules="{required: true, message: '请选择', trigger: 'blur'}">
                          <el-select v-model="baseForm.isFullWork" placeholder="请选择">
                            <el-option v-for="(item,index) in isFullWorkOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="转正日期" prop="fullWorkDate">
                          <el-date-picker v-model="baseForm.fullWorkDate" type="date" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
                    <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="员工状态" prop="employeeStatus" :rules="{required: true, message: '请选择', trigger: 'blur'}">
                          <el-select v-model="baseForm.employeeStatus" placeholder="请选择">
                            <el-option v-for="(item,index) in employeeStatusOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div style="flex:1">
                        <el-form-item label="最后工作日" prop="lastWorkDate">
                          <el-date-picker v-model="baseForm.lastWorkDate" type="date" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
              </el-form>
            </div>
            <div class="fun-style">
              <el-button type="primary" @click="saveAddInfo">保存</el-button>
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
        name:"",
        empNo:"",
        idCardType:"",
        idCard:"",
        sex:"",
        birthday:"",
        nationality:"",
        phone:"",
        topEdu:"",
        workDate:"",
        householdSex:"",
        householdCity:"",
        maritalStatus:"",
        nation:"",
        openBank:"",
        bankNo:"",
        otherIdCardType:"",
        otherIdCard:"",
        birthCountry:"",
        taxReasonOption:"",
        entryIranDate:"",
        leaveIranDate:"",

        companyName: "",
        employmentNature:"",
        department:"",
        station:"",
        workCity:"",
        isFullWork:"",
        fullWorkDate:"",
        employeeStatus:"",
        lastWorkDate:""
      },
      idCardTypeOption:[],
      sexOption:[],
      cityOption:[],
      nationalityOption:[],
      topEduOption:[],
      householdSexOption:[],
      householdCityOption:[],
      companyOption:[],
      workCityOption:[],
      isFullWorkOption:[],
      employeeStatusOption:[],
      otherIdCardTypeOption:[],
      birthCountryOption:[],
      taxReasonOption:[],
    };
  },
  mounted() {

  },
  methods: {
    saveInfo() {
      this.$refs['baseForm'].validate(valid => {
        if(valid){
          console.log("111")
        }
      })
    },
    //保存基本信息信息
    saveAddInfo(){
      this.$refs['baseForm'].validate(valid => {
        if(valid){
          console.log("111")
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
