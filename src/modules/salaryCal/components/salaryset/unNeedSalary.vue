<template>
  <div class="un-need-salary" @click="showSearch = false">
    <el-dialog
      title="请选择范围"
      :visible.sync="isShowUnNeedSalary"
      width="600px"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
      :show-close="closeModel"
    >
      <div class="company-box">
        <div class="company-box-con all">
          <div class="choose-title">
             待选
             <span class="input-style">
                <el-input v-if="showSearch" v-model="searchCon" placeholder="姓名搜索" class="salary-area-input"
                  @click.stop.native="showSearch = true"
                ></el-input>
             </span>
             <i class="el-icon-search" v-if="!showSearch" @click.stop="showSearch = true"></i>
          </div>
          <el-select v-model="taxSubId" placeholder="请选择公司" style="margin-bottom: 10px;border:none" @change="changCompany">
            <el-option v-for="item in taxSubjectInfoList" :key="item.taxSubId" :label="item.taxSubName" :value="item.taxSubId"></el-option>
          </el-select>
          <div>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedLists" @change="handleCheckedCities" class="check-con">
                  <el-checkbox v-for="(item,index) in lists" :label="item" :key="index" class="check-style">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
          </div>
        </div>
        <div class="company-box-con choose">
              <div class="choose-title">已选：<span class="clear" @click="hanleClearAll">清除</span></div>
              <div class="choose-con">
                  <div v-for="(item,index) in checkedLists" :key="index" class="choose-item">
                      {{ item.name }}
                      <i class="el-icon-circle-close" @click="handleRemoveItem(item)"></i>
                  </div>
              </div>

        </div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="isShowUnNeedSalary = false">取 消</el-button>
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
      isShowUnNeedSalary:false,
      checkAll: false,
      checkedLists: [],
      lists: [],
      allLists:[],
      isIndeterminate: false,
      searchCon:"",
      focus:false,
      showSearch:false,
      taxSubId:""
    };
  },
  computed:{
    ...mapState({
      taxSubjectInfoList:state=>state.taxSubjectInfoList,
    }),
  },
  watch:{
    searchCon:function(){
      if(this.searchCon.trim()){
        this.lists = this.allLists.filter(item=>item['name'].indexOf(this.searchCon)!= -1)
      }else{
        this.lists = this.allLists
      }
    },
  },
  created() {
  },
  methods: {
    sendData(data){
      this.isShowUnNeedSalary = true
      // 获取人员列表
      this.taxSubId = this.taxSubjectInfoList[0]['taxSubId']
      this.getEmployList(data)
    },
    getEmployList(data){
      this.$store
        .dispatch("salaryCalStore/actionGetEnterpriseEmployees", {
          taxSubId:this.taxSubId
        })
        .then(res => {
          let emplyeeList = res.data
          emplyeeList.forEach(item=>{
            item.name = item.empName+`(${item.mobile})`;
            item.id = item.empId;
          })
          this.lists = this.allLists = emplyeeList
          if(data){
            this.checkedLists = this.lists.filter(item=>data.includes(item.empId))
            this.isIndeterminate = this.checkedLists.length > 0 && this.checkedLists.length < this.lists.length
            this.checkAll = this.checkedLists.length == this.lists.length
          }
        })
    },
    changCompany(){
      this.getEmployList()
    },
    handleCheckAll(val) {
      this.checkedLists = val ? this.lists : [];
      this.isIndeterminate = false;
    },
    handleCheckedCities(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.lists.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lists.length;
    },
    handleRemoveItem(item){
      this.checkedLists = this.checkedLists.filter(ite=>ite != item)
      if(this.checkedLists.length === 0){
        this.isIndeterminate = false; //选择部分标志
        this.checkAll = false // 全选标志t
      }
    },
    hanleClearAll(){
      this.checkedLists = [];
      this.isIndeterminate = false; //选择部分标志
      this.checkAll = false // 全选标志
    },
    handleSubmit(){
      let sendStr = "";
      let excludeEmpList = []
      if(this.checkedLists){
        this.checkedLists.forEach(item=>{
          sendStr+=item.name+'、'
          excludeEmpList.push(item.id)
        })
        sendStr = sendStr.substring(0,sendStr.length-1)
      }
      this.$emit("sendUnNeedSalary",{
        sendStr,
        excludeEmpList,
      })
      this.isShowUnNeedSalary = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.un-need-salary {
  .company-box{
    display: flex;
    width: 540px;
    margin:0 auto;
    .company-box-con{
      width: 270px;
      height: 260px;
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
        width:140px;
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