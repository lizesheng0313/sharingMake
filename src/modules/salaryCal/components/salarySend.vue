<template>
  <div class="salary-send">
    <div class="head-fun">
      <span class="goBack" @click="goBack">返回</span><span class="fun-line">|</span><span class="title">工资表发放</span><span class="tip">发放后，员工可在移动端查询工资条，已发放的工资条支持撤销发放</span>
    </div>
    <div class="clearfix check-staff-menu">
      <el-input
        placeholder="请输入姓名\手机号\工号"
        v-model="salaryForm.key"
        prefix-icon="iconiconfonticonfontsousuo1 iconfont"
        clearable
        class="search-input left"
        @keyup.enter.native="searchUser"
      ></el-input>
      <el-button class="search" size="small" @click="searchUser" type="primary">搜索</el-button>
      <div class="right">
        <el-button type="primary" @click="changeAllStatus('PROVIDED')" class="add-import">全部发放</el-button>
        <el-dropdown trigger="click">
          <el-button type="default">
            更多
            <i class="iconsanjiao iconfont"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="cancelAll" @click.native="changeAllStatus('NO_PROVIDE')">全部撤回</el-dropdown-item>
            <el-dropdown-item command="update" @click.native="updateData">更新数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="staff-situation">
      <span class="staff-total">
        总人数
        <i>{{this.total || this.total === 0?this.total:"--"}}</i>人
      </span>
      <span>
        未发放
        <i>{{this.un_send || this.un_send === 0?this.un_send:'--'}}</i>人
      </span>
      <span>
        已发放
        <i>{{this.send || this.send===0 ? this.send:"--"}}</i>人
      </span>
    </div>
    <div class="staff-table">
      <div class="floating-menu" v-if="selectUserIdList.length>0">
        <span>已选中{{selectUserIdList.length}}人</span>
        <el-button size="mini" class="button-mini" @click="handleBatchSend" v-if="selectUserStatusList.includes('已发放')">批量发放</el-button>
        <el-button size="mini" class="button-mini" @click="handleBatchCancel" v-if="selectUserStatusList.includes('未发放')">批量撤回</el-button>
      </div>
      <el-table :data="salaryList" class="check-staff_table" :style="{width:screenWidth-40+'px'}" v-loading="salaryLoading"  @selection-change="handleSelectionChange" :header-cell-style="{'background-color': '#F7F7F7','color':'#333333'}">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column
          min-width="180"
          v-for="(col,index) in salaryList[0]"
         :label="col.col" :key="index">
          <template slot-scope="scope">
            <span>{{scope['row'][index]["val"]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="setSalaryItem(scope.row)">{{getSendStatus(scope.row)?"发放":"撤销"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="salaryForm.currPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="salaryForm.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {apiCheckMemberSummary,apiSalaryStubsStatusAlter,apiSalaryStubsStatusBatchAlter,apiRefreshStubs} from '../store/api'
  export default {
    data() {
      return {
        salaryList:[],
        salaryLoading:false,
        salaryForm:{
          "checkId":this.$route.query.id,
          "currPage": 1,
          "key": "",
          "pageSize":20 ,
        },
        screenWidth: document.body.clientWidth, // 屏幕尺寸
        isShowIncrease: false,
        count:0,
        selectUserIdList:[],
        selectUserStatusList:[],
        total:"",
        send:"",
        un_send:"",
        changeEmployeeCount:"",
        newEmployeeCount:"",
      };
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
        })();
      };
      this.loading();
    },
    methods: {
      loading(){
        this.salaryLoading = true;
        this.$store.dispatch('salaryCalStore/actionGetSalaryStubsList',this.salaryForm).then(res=>{
          if(res.code === "0000"){
            this.count = res.data.tableData.count;
            this.total = res.data.tableData.count;
            this.send = res.data.SEND;
            this.un_send = res.data.UN_SEND;
            this.salaryList = res.data.tableData.tableData.map(item=>item.diyrow)
            this.salaryLoading = false;
          }
        })
      },
      getSendStatus(data){
        let status = "";
       data.forEach(item=>{
         if(item.col === "发放状态"){
           status = item.val
         }
       })
       return status == "未发放" ||status == "已撤销"
      },
      //全部发放
     changeAllStatus(status){
        apiSalaryStubsStatusBatchAlter({
          "checkId": this.salaryForm.checkId,
          "payStubsStatus": status,
        }).then(res=>{
          if(res.code === "0000"){
            this.$message.success((status === 'PROVIDED'?'发放成功':'撤销成功')+res.data.successCount+'条');
            this.loading()
          }else{
            this.$message.error(res.message);
          }
        })
      },
      //更新数据
      updateData(){
        apiRefreshStubs(this.salaryForm.checkId).then(res=>{
          if(res.code === "0000"){
            this.$message.success('数据更新成功')
          }
        })
      },
      //单个发放/撤销
      setSalaryItem(data){
        let stubIds = [data[0]['val']];
        let payStubsStatus = this.getSendStatus(data)?"PROVIDED":"NO_PROVIDE";
        apiSalaryStubsStatusAlter({
          "payStubsStatus":payStubsStatus,
          "stubIds":stubIds
        }).then(res=>{
          if(res.code === "0000"){
            this.loading()
          }else{
            this.$message.error(res.message)
          }
        })

      },
      //切换pageId
      handleCurrentChange(val){
        this.salaryForm.currPage = val;
        this.loading()
      },
      handleSizeChange(val){
        this.salaryForm.pageSize = val;
        this.loading()
      },
      searchUser(){
        this.loading()
      },
      //批量选择
      handleSelectionChange(val){

      this.selectUserIdList = []

       val.forEach(item=>{
         item.forEach(it=>{
           if(it.col === "ID"){
             this.selectUserIdList.push(it.val)
           }
           if(it.col === "发放状态"){
             this.selectUserStatusList.push(it.val)
           }
         })
       })
      console.log(this.selectUserIdList)
      },
      //批量发放
      handleBatchSend(){
        apiSalaryStubsStatusAlter({
          "payStubsStatus":"PROVIDED",
          "stubIds":this.selectUserIdList
        }).then(res=>{
          if(res.code === "0000"){
            this.loading()
            this.$message.success("批量发放成功")
          }else{
            this.$message.error(res.message)
          }
        })
      },
      //批量撤回
      handleBatchCancel(){
          apiSalaryStubsStatusAlter({
          "payStubsStatus":"NO_PROVIDE",
          "stubIds":this.selectUserIdList
        }).then(res=>{
          if(res.code === "0000"){
            this.loading()
            this.$message.success("批量撤回成功")
          }else{
            this.$message.error(res.message)
          }
        })
      },
      //返回
      goBack(){
        this.$emit("changeActive",3);
        this.$router.push({path:"/salaryCheck",query:{id:this.salaryForm.checkId,active:2,salaryRuleId:this.$route.query.salaryRuleId}})
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/helpers.scss";
  .salary-send {
    padding: 0 20px;
    box-sizing: border-box;
    .staff-table{
      position: relative;
    }
    .head-fun{
      span{display: inline-block}
      .goBack{
        font-size:15px;
        color:#333333;
        cursor: pointer;
      }
      .fun-line{
        margin:20px 20px;
        font-size: 12px;
        color: #999;
      }
      .tip{
        margin-left: 20px;
        font-size: 12px;
        color:#999;
      }
    }
    .check-staff-menu {
      margin-top: 66.5px;
      .search-input {
        width: 215px;
      }
    }
    .add-import {
      margin-right: 10px;
    }
    .iconiconfonticonfontsousuo1 {
      font-size: 12px;
    }
    .staff-situation {
      .staff-total {
        border-right: 1px solid #e6e6e6;
        padding-right: 15px;
        margin-right: 15px;
      }
      margin: 20px 0px;
      color: #999;
      font-size: 12px;
      i {
        color: $mainColor;
        font-style: normal;
        padding: 0 3px;
      }
    }
    .el-pagination{
      text-align: right;
    }
    .search{
      display: inline-block;
      margin-left: 20px;
    }
  }
</style>