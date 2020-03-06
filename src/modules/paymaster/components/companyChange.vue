<template>
  <div class="company-change">
    <el-drawer
      :visible.sync="isShowCompany"
      :with-header="false"
      ref="companyChange"
      size="40%"
    >
        <div class="drawer-title">变更公司 <i class="el-icon-close" @click="isShowCompany = false"></i></div>
        <el-form
          label-width="140px"
          ref="changeCompanyForm"
          :model="changeCompanyForm"
          class="change-form"
        >
          <el-form-item label="姓名">{{ companyItem.empName }}</el-form-item>
          <el-form-item label="身份证号">{{ companyItem.idNo }}</el-form-item>
          <el-form-item label="公司名称" prop="taxSubId" :rules="{required: true, message: '请选择公司名称', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.taxSubId" placeholder="请选择公司名称">
              <el-option v-for="(item,index) in taxSubjectList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用工性质" prop="empType" :rules="{required: true, message: '请选择用工性质', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.empType" placeholder="请选择用工性质">
              <el-option v-for="(item,index) in enumEmpTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任职受雇从业类型" prop="workerType" :rules="{required: true, message: '请选择任职受雇从业类型', trigger: 'change'}">
            <el-select v-model="changeCompanyForm.workerType" placeholder="请选择任职受雇从业类型" >
              <el-option v-for="(item,index) in workerTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="deptName">
            <el-input v-model="changeCompanyForm.deptName"></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="positionName">
            <el-input v-model="changeCompanyForm.positionName"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" prop="empDay" :rules="{required: true, message: '请选择入职日期', trigger: 'blur'}">
            <el-date-picker v-model="changeCompanyForm.empDay" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="工作城市">
            <el-select v-model="changeCompanyForm.workCity" placeholder="请选择工作城市" filterable>
              <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否转正" prop="regularEmpYn" :rules="{required: true, message: '请选择是或否', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.regularEmpYn" placeholder="请选择是或否">
              <el-option v-for="(item,index) in regularEmpYnOptions" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转正日期">
            <el-date-picker v-model="changeCompanyForm.turnRegularDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
          </el-form-item>
        </el-form>
        <span class="con-footer">
          <el-button type="primary" @click="handleNewBody">确定</el-button>
          <el-button @click="handleCancel(false)">取消</el-button>
        </span>
    </el-drawer>
    </div>
</template>
<script>
import { mapState } from "vuex";
import * as constData from "../util/constData"
export default {
  props: {
  },
  data() {
    return {
      isShowCompany:false,
      changeCompanyForm: {
        workerType:"",
        compEmpId:"",
        empId:"",
        taxSubId: "",
        empType:"",
        deptName:"",//部门
        positionName:"",
        empDay:"",//入职日期
        workCity:"",
        regularEmpYn:"",
        turnRegularDate:"",
      },
      enumEmpTypeOption:constData.enumEmpTypeOption,
      workCityOption:[],
      regularEmpYnOptions:[],
      workerTypeOption:constData.workerType,
      taxSubjectList:[],
      closeModel:false,
      checked:true,
      companyItem:{},
    };
  },
  computed:{
    ...mapState({
      taxSubjectInfoList:state=>state.taxSubjectInfoList,
      cityList:state=>state.cityList
    })
  },
  watch:{

  },
  created(){
   this.regularEmpYnOptions = constData.regularEmpYnOption.filter(item=>item.value)
    this.taxSubjectList = this.taxSubjectInfoList.filter(item=>item.taxSubId)
  },
  mounted() {

  },
  methods: {
    showCompany(data){
      this.isShowCompany = true;
      this.companyItem = data
      for(let key in this.changeCompanyForm){this.changeCompanyForm[key] = ""}
      this.changeCompanyForm.compEmpId = this.companyItem.compEmpId;
      this.changeCompanyForm.empId = this.companyItem.empId;
    },
    //更改
    handleNewBody() {
      this.$refs.changeCompanyForm.validate(valid => {
        if(valid){
          this.$store
            .dispatch("payMasterStore/actionSaveCompany", this.changeCompanyForm)
              .then(res => {
                if(res.success){
                  this.isShowCompany = false
                  this.$message.success("变更成功")
                  this.$emit("getList",true)
                }
              })

        }
      })

    },
    handleCancel(){
      this.isShowCompany = false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.company-change {
  /*padding:0px 20px;*/
  /*margin-right: 20px;*/
  .con-footer{
    position: absolute;
    bottom:0px;
    left: 5%;
    text-align: center;
    background: #fff;
    width: 90%;
    padding: 10px 0px;

  }
  .el-date-editor.el-input,.el-select {
    width: 100%;
  }
  .el-input--prefix .el-input__inner {
    padding: 14px 30px;
  }
  .change-form{
    width: 80%;
    margin:0 auto;
    padding-bottom: 50px;
  }
  .el-icon-close{
    font-size: 18px;
    float: right;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>

