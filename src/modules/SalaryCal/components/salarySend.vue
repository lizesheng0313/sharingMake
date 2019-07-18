<template>
  <div class="salary-send">
    <div class="head-fun">
      <span class="goBack" @click="$router.go(-1)">返回</span><span class="fun-line">|</span><span class="title">工资表发放</span><span class="tip">发放后，员工可在移动端查询工资条，已发放的工资条支持撤销发放</span>
    </div>
    <div class="clearfix check-staff-menu">
      <el-input
        placeholder="请输入姓名\手机号"
        v-model="salaryForm.key"
        suffix-icon="iconiconfonticonfontsousuo1 iconfont"
        clearable
        class="search-input left"
        @keyup.enter.native="searchUser"
      ></el-input>
      <div class="right">
        <el-button type="primary" @click="showIncrease" class="add-import">全部发放</el-button>
        <el-dropdown trigger="click" @command="handleDropdown">
          <el-button type="default">
            更多
            <i class="iconsanjiao iconfont"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="cancelAll">全部撤回</el-dropdown-item>
            <el-dropdown-item command="update">更新数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="staff-situation">
      <span class="staff-total">
        人员总数
        <i>{{this.summryTotal}}</i>人
      </span>
      <span>
        本月：入职
        <i>{{this.newEmployeeCount}}</i>人
      </span>
      <span>
        调动
        <i>{{this.changeEmployeeCount}}</i>人
      </span>
    </div>
    <div class="staff-table">
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
            <el-button size="mini" @click="cancelDo(scope.row)">撤回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="salaryForm.currPage"
        :page-sizes="[1, 50, 100, 200]"
        :page-size="salaryForm.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { apiCheckMember,apiImportMember,apiCheckMemberdelete,apiCheckMemberSummary} from '../store/api'
  export default {

    data() {
      return {
        salaryList:[
          [
            {col: "序号", val: 1, floatItem: false},
            {col: "工号", val: null, floatItem: false},
            {col: "姓名", val: "不告诉你", floatItem: false},
            {col: "岗位", val: "你再猜", floatItem: false},
            {col: "本期收入", val: 0, floatItem: false},
            {col: "养老个人", val: null, floatItem: true},
            {col: "测试", val: null, floatItem: true},
            {col: "失业个人", val: null, floatItem: true},
            {col: "个税", val: null, floatItem: false}
          ],
          [
            {col: "序号", val: 1, floatItem: false},
            {col: "工号", val: null, floatItem: false},
            {col: "姓名", val: "不告诉你", floatItem: false},
            {col: "岗位", val: "你再猜", floatItem: false},
            {col: "本期收入", val: 0, floatItem: false},
            {col: "养老个人", val: null, floatItem: true},
            {col: "测试", val: null, floatItem: true},
            {col: "失业个人", val: null, floatItem: true},
            {col: "个税", val: null, floatItem: false}
          ],

        ],
        salaryLoading:false,
        salaryForm:{
          "checkId":this.$route.query.id,
          "currPage": 1,
          "key": "",
          "pageSize":1 ,
        },
        screenWidth: document.body.clientWidth, // 屏幕尺寸
        isShowIncrease: false,
        count:0,
        percent:0,
        failCount: "",
        successCount:"",
        uuid: "",
        selectUserIdList:[],
        summryTotal:"",
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
    },
    methods: {
      loading(){
      },
      summary(){
        apiCheckMemberSummary(this.salaryForm.checkId)
          .then(res=>{
            if(res.code === "0000") {
              let data = res.data;
              this.summryTotal = data.total;
              this.newEmployeeCount = data.newEmployeeCount;
              this.changeEmployeeCount = data.changeEmployeeCount;
            }
          })
      },
      //全部撤回
      cancelAll(){

      },
      cancelDo(data){
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
      handleSelectionChange(val){
        console.log(val)
        // this.selectUserIdList = val.map((item,index)=>item.id);
      },
      handleDropdown(val){
        if(val === 'delete'){
          if(this.selectUserIdList.length === 0){
            this.$message.warning("请选择要删除的人员");
          }else{
            this.handleDelete(this.selectUserIdList)
          }
        }else{
          window.location.href = "/api/salary/checkMember/export?checkId="+this.usersalaryFormForm.checkId+"&"+"key="+this.salaryForm.key
        }
      },
      showIncrease(){
        this.isShowIncrease = true;
        this.fileList = [];
        this.uuid = ""
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/helpers.scss";
  .salary-send {
    padding: 0 20px;
    box-sizing: border-box;
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
        width: 205px;
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
  }
</style>