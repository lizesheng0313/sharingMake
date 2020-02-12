<template>
  <div class="company-change">
        <el-form
          label-width="100px"
          ref="changeCompanyForm"
          :model="changeCompanyForm"
        >
          <el-form-item label="姓名">{{ companyItem.empName }}</el-form-item>
          <el-form-item label="身份证号">{{ companyItem.idNo }}</el-form-item>
          <el-form-item label="公司名称" prop="taxSubId" :rules="{required: true, message: '请选择公司名称', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.taxSubId" placeholder="请选择公司名称">
              <el-option v-for="(item,index) in companyOptions" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用工性质" prop="empType" :rules="{required: true, message: '请选择用工性质', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.empType" placeholder="请选择用工性质">
              <el-option v-for="(item,index) in enumEmpTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
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
          <el-form-item label="是否转正" prop="regularEmpYn" :rules="{required: true, message: '请选择', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.regularEmpYn" placeholder="请选择">
              <el-option v-for="(item,index) in regularEmpYnOptions" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转正日期">
            <el-date-picker v-model="changeCompanyForm.zzDay" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="con-footer">
          <el-button type="primary" @click="handleNewBody">确定</el-button>
          <el-button @click="handleCancel(false)">取消</el-button>
        </span>
    </div>
</template>
<script>
import { mapState } from "vuex";
import * as constData from "../util/constData"
export default {
  props: {
    companyItem: {
      type: Object,
      default:""
    },
  },
  data() {
    return {
      changeCompanyForm: {
        empId:"",
        taxSubId: "",
        empType:"",
        deptName:"",//部门
        positionName:"",
        empDay:"",//入职日期
        workCity:"",
        regularEmpYn:"-1",
        zzDay:"",
      },
      enumEmpTypeOption:constData.enumEmpTypeOption,
      workCityOption:[],
      regularEmpYnOptions:constData.regularEmpYnOption,
      companyOptions:[{label:"全部",value:"1"}],
      closeModel:false,
      checked:true
    };
  },
  computed:{
    ...mapState({
      taxSubjectInfoList:state=>state.taxSubjectInfoList,
      cityList:state=>state.cityList
    })
  },
  created(){
    this.companyOptions = this.taxSubjectInfoList
    for(let key in this.changeCompanyForm){
      this.companyItem[key]?this.changeCompanyForm[key] = this.companyItem[key]:""
    }
  },
  mounted() {

  },
  methods: {
    //子组件触发刷新
    freshList(data,isClose){
      if((data === this.sign) && isClose){
        this.handleCancel(true)
      }
    },
    //更改
    handleNewBody() {
      this.$refs.changeCompanyForm.validate(valid => {
        if(valid){
          this.$store
            .dispatch("payMasterStore/actionCompanyChange", this.changeCompanyForm)
              .then(res => {
                console.log(res)
              })

        }
      })

    },
    handleCancel(data){
      this.$emit("hanleClose",data)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.company-change {
  padding:0px 20px;
  .con-footer{
    position: absolute;
    bottom:20px;
    left:40%;
  }
  .el-date-editor.el-input,.el-select {
    width: 100%;
  }
  .el-input--prefix .el-input__inner {
    padding: 14px 30px;
  }
}
</style>

