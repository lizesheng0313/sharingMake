<template>
  <div class="company-change">
        <el-form
          label-width="100px"
          ref="changeCompanyForm"
          class="addForm"
          :model="changeCompanyForm"
        >
          <el-form-item label="姓名">{{ companyChangeName }}</el-form-item>
          <el-form-item label="身份证号">{{ companyChangeIdCard }}</el-form-item>
          <el-form-item label="公司名称" prop="socialStartMonth" :rules="{required: true, message: '请选择公司名称', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.companyName" placeholder="请选择公司名称">
              <el-option v-for="(item,index) in companyOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用工性质" prop="employmentNature" :rules="{required: true, message: '请选择用工性质', trigger: 'blur'}">
            <el-date-picker v-model="changeCompanyForm.employmentNature" type="month" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="changeCompanyForm.department"></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="station">
            <el-input v-model="changeCompanyForm.station"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" prop="socialMonth" :rules="{required: true, message: '请选择入职日期', trigger: 'blur'}">
            <el-date-picker v-model="changeCompanyForm.socialMonth" type="date" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="工作城市">
            <el-select v-model="changeCompanyForm.workCity" placeholder="请选择工作城市">
              <el-option v-for="(item,index) in workCityOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否转正" prop="isFullWork" :rules="{required: true, message: '请选择', trigger: 'blur'}">
            <el-select v-model="changeCompanyForm.isFullWork" placeholder="请选择">
              <el-option v-for="(item,index) in isFullWorkOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转正日期" prop="fullWorkDate">
            <el-date-picker v-model="changeCompanyForm.fullWorkDate" type="date" placeholder="请选择"></el-date-picker>
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
export default {
  props: {
    companyChangeIdCard: {
      type: String,
      default:""
    },
    companyChangeName: {
      type: String,
      default:""
    },
  },
  data() {
    return {
      changeCompanyForm: {
        companyName: "",
        employmentNature:"",
        department:"",
        station:"",
        workCity:"",
        isFullWork:"",
        fullWorkDate:"",
      },
      companyOption:[],
      workCityOption:[],
      isFullWorkOption:[],
      closeModel:false,
      checked:true
    };
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

