<template>
  <div class="salary-area"  @click="showSearch = false">
    <el-dialog
      title="请选择范围"
      :visible.sync="isShowSalaryArea"
      width="600px"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
      :show-close="closeModel"
    >
      <div class="company-box">
        <div class="company-box-con all">
          <el-tabs v-model="chooseType">
            <el-tab-pane label="公司" name="company"></el-tab-pane>
            <el-tab-pane label="人员" name="employee"></el-tab-pane>
          </el-tabs>
          <span v-if="chooseType === 'employee'">
             <span class="input-style">
                <el-input v-if="showSearch" v-model="searchCon" placeholder="姓名搜索" class="salary-area-input"
                  @click.stop.native="showSearch = true"
                ></el-input>
             </span>
            <i class="el-icon-search" v-if="!showSearch" @click.stop="showSearch = true"></i>
          </span>
          <div>
              <div style="margin-bottom: 10px" v-if="chooseType === 'company'">全部公司</div>
              <div v-else style="margin-bottom: 10px">
                  <el-select v-model="taxSubId" placeholder="请选择公司" style="margin-bottom: 10px;border:none" @change="changCompany">
                    <el-option v-for="(item,index) in taxSubjectInfoList" :key="index" :label="item.taxSubName" :value="item.taxSubId"></el-option>
                  </el-select>
              </div>
              <el-checkbox :indeterminate="chooseTypeObj[chooseType]['isIndeterminate']" v-model="chooseTypeObj[chooseType]['checkAll']" @change="handleCheckAll">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="chooseTypeObj[chooseType]['checkedLists']" @change="handleCheckedCities" class="check-con">
                  <el-checkbox v-for="item in chooseTypeObj[chooseType]['lists']" :label="item" :key="item.id" class="check-style">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
          </div>
        </div>

        <div class="company-box-con choose">
              <div class="choose-title">已选：<span class="clear" @click="hanleClearAll">清除</span></div>
              <div class="choose-con">
                <div v-for="(item,index) in chooseTypeObj['company']['checkedLists'].concat(chooseTypeObj['employee']['checkedLists'])"
                     :key="index" class="choose-item">
                  {{ item.name }}
                  <i class="el-icon-circle-close" @click="handleRemoveItem(item)"></i>
                </div>
              </div>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="isShowSalaryArea = false">取 消</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
  },
  data() {
    return {
      closeModel:false,
      isShowSalaryArea:false,
      chooseType:"company",
      chooseTypeObj:{
        "company":{
          checkAll: false,
          checkedLists: [105],
          lists:[],
          isIndeterminate: false
        },
        "employee":{
          checkAll: false,
          checkedLists: [],
          lists: [],
          allLists:[],
          isIndeterminate: false,
        }
      },
      taxSubId:"",
      searchCon:"",
      focus:false,
      showSearch:false,
      taxSubList:[],
    };
  },
  computed:{
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList,
      taxSubjectInfoList:state=>state.taxSubjectInfoList,
    }),
  },
  watch:{
    searchCon:function(){
      if(this.searchCon.trim()){
        this.chooseTypeObj.employee.lists = this.chooseTypeObj.employee.allLists.filter(item=>item['name'].indexOf(this.searchCon)!= -1)
      }else{
        this.chooseTypeObj.employee.lists = this.chooseTypeObj.employee.allLists
      }
    },
  },
  created(){
    this.taxSubList = this.taxSubjectInfoList.filter(item=>item.taxSubId)
    console.log( this.taxSubList)
  },
  methods: {
    sendData(companyData,emplyeeData){
      this.isShowSalaryArea = true
      // 获取人员列表
      this.taxSubId = this.taxSubjectInfoList[0]['taxSubId']
      this.getEmployList(emplyeeData)

      // 公司列表
      let taxSubjectInfoList =this.taxSubjectInfoList.filter(item=>item.taxSubId)
      taxSubjectInfoList.forEach(item=>{
        item.name =item.taxSubName;
        item.id = item.taxSubId;
        item.type = "company";
      })
      this.chooseTypeObj.company.lists = taxSubjectInfoList

      //公司信息回显
      this.chooseTypeObj.company.checkedLists = this.chooseTypeObj.company.lists.filter(item=>companyData.includes(item.taxSubId))
      // this.chooseTypeObj.company.isIndeterminate = companyData.length>0 && companyData.length<this.chooseTypeObj.company.lists.length
      // this.chooseTypeObj.company.checkAll = companyData.length == this.chooseTypeObj.company.lists.length
    },
    getEmployList(emplyeeData){
      this.$store
        .dispatch("salaryCalStore/actionGetEnterpriseEmployees", {
          taxSubId:this.taxSubId,
        })
        .then(res => {
          if(res.success){
            let emplyeeList = res.data
            emplyeeList.forEach(item=>{
              item.name = item.empName+`(${item.mobile})`;
              item.id = item.empId;
              item.type = "employee";
            })
            this.chooseTypeObj.employee.lists = this.chooseTypeObj.employee.allLists = emplyeeList
            //数据回显
            if(emplyeeData){
              this.chooseTypeObj.employee.checkedLists = this.chooseTypeObj.employee.lists.filter(item=>emplyeeData.includes(item.empId))
              this.chooseTypeObj.employee.isIndeterminate = emplyeeData.length >0 && emplyeeData.length<this.chooseTypeObj.employee.lists.length
              this.chooseTypeObj.employee.checkAll = emplyeeData.length == this.chooseTypeObj.employee.lists.length
              // console.log( emplyeeData.length >0 && emplyeeData.length<this.chooseTypeObj.employee.lists.length)
              // console.log(emplyeeData)
            }
          }
        })
    },
    changCompany(){
      this.getEmployList()
    },
    handleCheckAll(val) {
      this.chooseTypeObj[this.chooseType]['checkedLists'] = val ? this.chooseTypeObj[this.chooseType]['lists'] : [];
      this.chooseTypeObj[this.chooseType]['isIndeterminate'] = false;
    },
    handleCheckedCities(value) {
      let checkedCount = value.length;
      this.chooseTypeObj[this.chooseType]['checkAll'] = checkedCount === this.chooseTypeObj[this.chooseType]['lists'].length;
      this.chooseTypeObj[this.chooseType]['isIndeterminate'] = checkedCount > 0 && checkedCount < this.chooseTypeObj[this.chooseType]['lists'].length;
    },
    handleRemoveItem(item){
      this.chooseTypeObj[item.type]['checkedLists'] = this.chooseTypeObj[item.type]['checkedLists'].filter(ite=>ite.id != item.id)
      if(this.chooseTypeObj[item.type]['checkedLists'].length === 0){
        this.chooseTypeObj[item.type]['isIndeterminate'] = false;//选择部分标志
        this.chooseTypeObj[item.type]['checkAll'] = false // 全选标志
      }
    },
    hanleClearAll(){
      for(let key in this.chooseTypeObj){
        this.chooseTypeObj[key]['checkedLists'] = []
        this.chooseTypeObj[key]['isIndeterminate'] = false;//选择部分标志
        this.chooseTypeObj[key]['checkAll'] = false // 全选标志
      }
    },
    handleSubmit(){
      let sendStr = "";
      let allLists = this.chooseTypeObj['company']['checkedLists'].concat(this.chooseTypeObj['employee']['checkedLists'])
      if(allLists.length>0){
        allLists.forEach(item=>{
          sendStr+=item.name+' 、'
        })
        sendStr = sendStr.substring(0,sendStr.length-1)
      }
      let taxSubList = this.chooseTypeObj["company"]['checkedLists'].map(item=>item.id)
      let empList = this.chooseTypeObj["employee"]['checkedLists'].map(item=>item.id)
      this.$emit("sendSalayArea",{
        taxSubList,
        sendStr,
        empList,
      })
      this.isShowSalaryArea = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.salary-area {
  .company-box{
    display: flex;
    width: 540px;
    margin:0 auto;
    .company-box-con{
      width: 270px;
      min-height: 260px;
      border:1px solid #F7F7F7;
      border-radius: 4px;
      margin-left: 20px;
      padding: 0 10px;
      .check-style{
        display: block;
        margin-bottom: 10px;
      }
      .check-con{
        height: 140px;
        overflow-y: auto;
      }
      .choose-con{
        height: 200px;
        overflow-y: auto;
      }
      .choose-title{
        border-bottom:1.2px solid #E4E7ED;
        padding:10px 0px;
        margin-bottom:16px;
      }
      .clear{
        float: right;
        color:#2C7CFF;
        cursor: pointer;
      }
      .choose-item{
        margin-bottom:10px;
        cursor: pointer;
      }
      .el-icon-circle-close{
        display: none;
        float: right;
        margin-top: 6px;
      }
      .choose-item:hover .el-icon-circle-close{
        display: inline-block;
      }
    }
    .all{
      position: relative;
      .input-style{
        display: inline-block;
        width:120px;
        position:absolute;
        top:7px;
        right:10px;
      }
    }
    .el-icon-search{
      position:absolute;
      top:10px;
      right:10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .dialog-footer{
    margin-top: 20px;
    text-align: center;
  }
}
</style>