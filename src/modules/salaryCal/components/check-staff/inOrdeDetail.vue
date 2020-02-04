<template>
  <div class="inorde-detail">
    <full-screen :fsTitle="salaryTitle" :bgColor="'#fff'" ref="full" style="overflow: hidden;" :goUrl="'/salary-cal'">
        <div slot="fs-buttons" class="header-button">
          <span class="refresh" @click="refresh">
            <i class="iconshuaxin iconfont"></i>刷新
          </span>
        </div>
      <div slot="fs-container" class="content-st">
        <header class="head-style">
          <el-row type="flex">
            <el-col :span="12">
              <span @click="$router.go(-1)" class="back-style">返回</span>
              <span class="header-line">|</span>
              <span>上月收入与减除填写</span>
            </el-col>
          </el-row>
        </header>
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
                调整总人数
                <i>{{ count ? count : "0" }}</i>人
            </span>
            <span>
                相比上月：新增
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
            <el-table-column label="姓名" width="104px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="工号" width="100px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.empNo}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="手机号" width="160px">
              <template slot-scope="scope">
                <span>{{scope.row.phoneNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="部门" width="160x" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.departName}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="员工类型">
              <template slot-scope="scope">
                <span>{{scope.row.empType|filterEmpType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="160x" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.jobTitle}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="入职时间" width="160px">
              <template slot-scope="scope">
                <span>{{scope.row.empStartDate?scope.row.empStartDate.split(" ")[0]:""}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="最后工作日" width="140px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.bank}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="对比上月" width="180px">
              <template slot-scope="scope">
                <span>{{scope.row.bankNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="240px">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleDelete(scope.row.id)" v-if="privilegeVoList.includes('salary.compute.salaryCheck.empDelete')">删除算薪</el-button>
                <el-button size="mini" type="text" @click="handleAdd(scope.row.id)" v-if="privilegeVoList.includes('salary.compute.salaryCheck.empDelete')">添加算薪</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      userList:[{name:1212}],
      myHeaders:{Authorization:this.$store.state.token},
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      screenHeight: document.body.clientHeight - 280,
      isShowIncrease: false,
      count:0,
      userLoading:false,
      decNum:0,
      incNum:0,
      closeModel:false,
    };
  },
  computed:{
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList
    }),
    ...mapState("salaryCalStore", {
      salaryItem: "salaryItem",
    }),
    salaryTitle:function(){
      return  this.salaryItem.salaryRuleName + " " +this.salaryItem.date
    }
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
    handleAdd(){

    },
    handleDelete(){

    },
    searchUser(){

    },
    refresh(){
      this.$router.go(0)
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/helpers.scss";
.inorde-detail {
  box-sizing: border-box;
  background: #fff;
  .head-style{
    margin: 20px 0px;
  }
  .content-st{
    padding:0 20px;
  }
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
    .staff-total {
      border-right: 1px solid #e6e6e6;
      padding-right: 15px;
      margin-right: 15px;
    }
    color: #999;
    font-size: 12px;
    i {
      color: $mainColor;
      font-style: normal;
      padding: 0 3px;
    }
    .seeDetail{
      display: inline-block;
      margin-left: 10px;
      color: $mainColor;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .staff-table {
    .check-staff_table {
      overflow-x: auto;
    }
    position: relative;
  }
  .search{
    display: inline-block;
    margin-left: 20px;
  }
}
</style>