<template>
  <div class="inorde-detail">
    <full-screen :fsTitle="salaryTitle" :bgColor="'#fafafa'" ref="full" style="overflow: hidden;">
      <div class="clearfix check-staff-menu">
        <el-input
          placeholder="请输入姓名\工号\身份证号"
          v-model="userForm.key"
          prefix-icon="iconiconfonticonfontsousuo1 iconfont"
          clearable
          class="search-input left"
          @keyup.enter.native="searchUser"
        ></el-input>
        <el-button class="search" size="small" @click="searchUser" type="primary">搜索</el-button>
      </div>
      <div class="staff-situation">
        <span class="staff-total">
          人员总数
          <i>{{ summryTotal ? summryTotal : "0" }}</i>人
        </span>
        <span>
          本月：新增
          <i>{{incNum || incNum==0?this.incNum:"0"}}</i>人
        </span>
        <span>
          减少：
          <i>{{decNum || decNum ==0?this.decNum:"0"}}</i>人
        </span>
      </div>
      <div class="staff-table">
        <el-table :data="userList"
                  class="check-staff_table"
                  :style="{width:screenWidth-40+'px'}"
                  v-loading="userLoading"
                  :height="screenHeight"
                  border
        >
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column label="姓名" width="104px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
               <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="工号" width="100px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.empNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="身份证号" width="180px">
            <template slot-scope="scope">
              <span>{{scope.row.idCardNo}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="手机号" width="160px">
            <template slot-scope="scope">
              <span>{{scope.row.phoneNo}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="用工性质">
            <template slot-scope="scope">
              <span>{{scope.row.empType|filterEmpType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="扣缴义务人" width="180px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.taxSubject}}</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" width="160x" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.departName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位" width="160x" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.jobTitle}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="工作地点" width="140x" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.workAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="入职时间" width="160px">
            <template slot-scope="scope">
              <span>{{scope.row.empStartDate?scope.row.empStartDate.split(" ")[0]:""}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="工资卡银行" width="140px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.bank}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="工资卡号" width="180px">
            <template slot-scope="scope">
              <span>{{scope.row.bankNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleDelete([scope.row.id])" v-if="privilegeVoList.includes('salary.compute.salaryCheck.empDelete')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </full-screen>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import fullScreen from "@/components/full-screen/index";
  import RouterLink from "olading-ui/lib/mixins/router-link";
 export default {
   components: {RouterLink,fullScreen},
   data() {
    return {
      userForm:{

      },
      userList:[],
      myHeaders:{Authorization:this.$store.state.token},
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      screenHeight: document.body.clientHeight - 280,
      isShowIncrease: false,
      count:0,
      userLoading:false,
      percent:0,
      failCount:0,
      successCount:0,
      uuid: "",
      selectUserIdList:[],
      summryTotal:"",
      decNum:"",
      incNum:"",
      newEmployeeCount:"",
      isShowIncreaseFinish:false,
      deleteDisabled:false,
      closeModel:false,
      salaryTitle:"明细"
    };
  },
  computed:{
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList
    }),
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        that.screenHeight = document.body.clientHeight - 330;
      })();
    };
    this.loading();
  },
  methods: {
    loading(){
      this.userLoading = false;
      // apiCheckMember(this.userForm).then(res=>{
      //   if(res.code === "0000"){
      //     this.userLoading = false;
      //     this.userList = res.data.data;
      //     this.count = res.data.count;
      //   }
      // })
    },
    searchUser(){

    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/helpers.scss";
.inorde-detail {
  padding: 0 20px;
  box-sizing: border-box;
  .check-staff-menu {
    margin-top: 20px;
    .search-input {
      width: 250px;
    }
  }
  .iconiconfonticonfontsousuo1 {
    font-size: 12px;
  }
  .staff-situation {
    margin:10px;
    color: #999;
    font-size: 12px;
    .staff-total {
      border-right: 1px solid #e6e6e6;
      padding-right: 15px;
      margin-right: 15px;
    }
  }
  .staff-table {
    .check-staff_table {
      overflow-x: auto;
    }
    position: relative;
    .staff-page {
      margin-top: 20px;
      text-align: right;
    }
  }
  .search{
    display: inline-block;
    margin-left: 20px;
  }
}
</style>