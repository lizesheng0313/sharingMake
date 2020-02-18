<template>
  <div class="add-staff">
    <el-dialog
      title="增加人员"
      :visible.sync="isShowAddStaff"
      width="54%"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
    >
    <div class="add-staff-con">
      <div class="table-con">
          <div class="select-con">
              <el-select v-model="addForm.taxSubId" placeholder="请选择公司" @change="getList()">
                <el-option v-for="item in taxSubjectInfoList" :key="item.taxSubId" :label="item.taxSubName" :value="item.taxSubId"></el-option>
              </el-select>
              <el-select v-model="addForm.empType" placeholder="用工性质" @change="getList()">
                <el-option v-for="item in enumEmpTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="addForm.enumEmpStatus" placeholder="员工状态" @change="getList()">
                <el-option v-for="item in employStatusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-input v-model="addForm.key" placeholder="姓名/工号" @keyup.enter.native="getList()"></el-input>
          </div>
          <el-table :data="staffTable" ref="staffTable" tooltip-effect="dark" height="300px" style="width:100%;margin-top: 10px"
                    @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" fixed="left"></el-table-column>
              <el-table-column label="姓名" width="120">
                <template slot-scope="scope">{{ scope.row.empName }}</template>
              </el-table-column>
              <el-table-column label="工号" width="80">
                <template slot-scope="scope">{{ scope.row.empNo }}</template>
              </el-table-column>
              <el-table-column label="部门" width="80">
                <template slot-scope="scope">{{ scope.row.deptName }}</template>
              </el-table-column>
              <el-table-column label="用工性质" width="80">
                <template slot-scope="scope">{{ scope.row.empType | filterEmpType}}</template>
              </el-table-column>
              <el-table-column label="人员状态" width="80">
                <template slot-scope="scope">{{ scope.row.empStatus | filterEmployStatus}}</template>
              </el-table-column>
              <el-table-column label="入职日期" width="120">
                <template slot-scope="scope">{{ scope.row.empDay }}</template>
              </el-table-column>
              <el-table-column label="最后工作日" width="120">
                <template slot-scope="scope">{{ scope.row.leaveDay }}</template>
              </el-table-column>
          </el-table>
      </div>
      <div class="choose-con">
          <div class="choose-title">已选 <span class="staff-style">{{ checkedPerson.length }}人</span></div>
          <div class="choose-item-con">
              <div v-for="(item,index) in checkedPerson" :key="index" class="choose-item">
                <span>{{ item.empName }}</span>
                <span class="emNo">{{ item.empNo }}</span>
                <i class="el-icon-circle-close" @click="removeStaff(item)"></i>
              </div>
          </div>

      </div>
    </div>
    <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="isShowAddStaff = false">取 消</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as constData from "../../modules/paymaster/util/constData"
  import { mapState } from "vuex";
export default {
  props: {
  },
  data() {
    return {
      addForm:{
        checkId:"",
        taxSubId:0,//公司
        empType:"",//用工性质
        enumEmpStatus:"",//人员状态
        key:"",
      },
      companyOptions:[],
      enumEmpTypeOption:constData.enumEmpTypeOption,//用工性质
      employStatusOption:constData.employStatusOption,//员工状态
      isShowAddStaff: false,
      closeModel:false,
      staffTable:[],
      checkedPerson:[],
      compEmpIds:[],
    };
  },
  computed:{
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList,
      taxSubjectInfoList:state=>state.taxSubjectInfoList,
    }),
  },
  created(){
  },
  methods: {
    getList(form){
      form.checkId?this.addForm.checkId = form.checkId:"";
      this.listAction = form.listAction
      this.saveAction = form.saveAction
      this.isShowAddStaff = true
      this.$store.dispatch(this.listAction,this.addForm)
        .then(res=>{
          console.log(res)
          this.staffTable = res.data;
        })
    },
    removeStaff(item){
      this.checkedPerson=this.checkedPerson.filter(ite=>ite.emNo!=item.emNo)
      this.$refs.staffTable.toggleRowSelection(item,false);
    },
    handleSubmit(){
      this.$store.dispatch(this.saveAction,{
          checkId:this.addForm.checkId,
          compEmpIds:this.compEmpIds,
          key:this.addForm.key,
          queryFilterParam:{
            "empType":this.addForm.empType,
            "enumEmpStatus":this.addForm.enumEmpStatus,
            "taxSubId": this.addForm.taxSubId
          }
      }).then(res=>{
          if(res.success){
            this.isShowAddStaff = false
            this.$message.success("添加成功")
            this.$emit("freshList")
          }
        })

    },
    handleSelectionChange(data){
      this.checkedPerson = data;
      this.compEmpIds = data.map(item=>item.compEmpId)
    },
  }
};
</script>
<style lang="scss" scoped>
.add-staff {
  .add-staff-con{
    display: flex;
    border-top:1.2px solid #f7f7f7;
    .table-con{
      width: 78%;
      padding-top: 10px;
      border-right: 1.2px solid #f7f7f7;
    }
    .choose-con{
      padding:0px 10px;
      width: 24%;
      .choose-title{
        height: 34px;
        line-height: 34px;
        border-bottom: 1.2px solid #f7f7f7;
        padding-top: 10px;
        margin-bottom: 10px;
        .staff-style{
          float: right;
        }
      }
      .choose-item-con{
        height: 300px;
        overflow-y: auto;
        .choose-item{
          line-height: 24px;
          height: 24px;
          .emNo{
            display: inline-block;
            margin: 0px 26px 0px 6px;
          }
          .el-icon-circle-close{
            float: right;
            margin: 6px 2px 0px 0px;
            font-size: 16px;
            font-weight: bold;
            display:none;
            cursor: pointer;
          }
        }
        .choose-item:hover .el-icon-circle-close{
          display: inline-block;
        }
      }

    }
  }

}
</style>