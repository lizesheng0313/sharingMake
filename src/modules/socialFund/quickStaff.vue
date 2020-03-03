<template>
  <div class="quickStaff">
    <div class="tax el-diy-month">
      <header class="header main-title" v-if="showTitle">
        <el-row type="flex">
          <el-col :span="12">
            <span @click="$router.go(-1)" class="back-style">返回</span>
            <span class="header-line">|</span>
            <span>快速增减员</span>
          </el-col>
        </el-row>
      </header>
      <div class="attrition-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <div class="left">
              <el-button type="default" @click="onShowScreen">筛选</el-button>
            </div>
            <el-input
              placeholder="请输入姓名\工号\身份证号"
              v-model="ruleForm.key"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input"
            ></el-input>
            <div class="select" style="display: inline-block">
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-button class="add-import" @click="handleExport">导出</el-button>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
              <span class="wait-report" @click="selectNum(true)">
                入职未投保
                <i :class="['num', uninsuredActive?'active':'']">{{ entryUninsuredNum?entryUninsuredNum:0 }}</i>人
              </span>
              <span class="wait-report" @click="selectNum(false)">
                投保中已离职
                <i :class="['num', !uninsuredActive?'active':'']">{{ dimissionInsuredNum ? dimissionInsuredNum:0 }}</i>人
              </span>
            </span>
          </div>
          <div class="staff-table">
            <div class="floating-menu" v-if="selectList.length>0">
              <span>已选中{{selectList.length}}人</span>
              <el-button size="small" class="button-mini" @click="batchIncreate" v-if="uninsuredActive" v-show="privilegeVoList.includes('salary.social.floatEmployee.increase')">批量增员</el-button>
              <el-button size="small" class="button-mini" @click="batchDecreate" v-else v-show="privilegeVoList.includes('salary.social.floatEmployee.decrease')">批量减员</el-button>
            </div>
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              :height="screenHeight"
              :style="{width:screenWidth-255+'px'}"
              @selection-change="handleSelectionPerson"
              border
            >
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column
                type="index"
                label="编号"
                width="50">
              </el-table-column>
              <el-table-column prop="empName" label="姓名" width="140">
                <template slot-scope="scope">
                  <span>{{ scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
              <el-table-column prop="compName" label="公司名称" width="160"></el-table-column>
              <el-table-column prop="empType" label="用工性质" width="140">
                <template slot-scope="scope">{{ scope.row.empType | filterEmpType }}</template>
              </el-table-column>
              <template v-if="uninsuredActive">
                <el-table-column prop="empDay" label="入职日期" width="140"></el-table-column>
                <el-table-column prop="householdCity" label="户口所在城市" width="140"></el-table-column>
                <el-table-column prop="householdRegistrationType" label="户口性质" width="140">
                  <template slot-scope="scope">{{ scope.row.householdRegistrationType | householdRegistrationType }}</template>
                </el-table-column>
                <el-table-column prop="workCity" label="工作城市" width="140"></el-table-column>
              </template>
              <template v-else>
                <el-table-column prop="leaveDay" label="最后工作日" width="140"></el-table-column>
                <el-table-column prop="insuredCity" label="参保城市" width="140"></el-table-column>
                <el-table-column prop="compInsuredName" label="参保方案" width="140"></el-table-column>
                <el-table-column prop="socialInsuranceStartMonth" label="社保起缴月份" width="140"></el-table-column>
              </template>
              <el-table-column label="操作" fixed="right" width="120px">
                <template slot-scope="scope">
                  <el-button v-if="uninsuredActive" type="text" v-show="privilegeVoList.includes('salary.social.floatEmployee.increase')"  @click="showSocialIncreate(scope.row)" >社保增员</el-button>
                  <el-button v-else type="text" @click="showSocialDecreate(scope.row)" v-show="privilegeVoList.includes('salary.social.floatEmployee.decrease')">社保减员</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleSelectionChange"
              @size-change="handleSizeChange"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[20, 50, 100, 200]"
              :total="total"
              class="staff-page"
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- 筛选-->
      <el-dialog
        :visible.sync="isShowScreening"
        width="52%"
        center
        class="screen-dialog"
        :close-on-click-modal="closeModel"
      >
        <div class="screening-wapper">
          <el-form :model="ruleForm" ref="screenForm" label-width="100px" class="demo-ruleForm">
            <div class="shortCon">
              <el-form-item label="公司名称" label-width="20%">
                <el-select v-model="ruleForm.taxSubId" placeholder="请选择公司名称">
                  <el-option v-for="(item,index) in taxSubjectInfoList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="用工性质" label-width="20%">
                <el-select v-model="ruleForm.empType" placeholder="请选择用工性质">
                  <el-option v-for="(item,index) in employTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon" v-if="uninsuredActive">
              <el-form-item label="参保城市" label-width="20%">
                <el-select v-model="ruleForm.insuredCity" placeholder="请选择工作城市" filterable>
                  <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon" v-else>
              <el-form-item label="参保城市" label-width="20%">
                <el-select v-model="ruleForm.workCity" placeholder="请选择工作城市" filterable>
                  <el-option v-for="(item,index) in cityList" :label="item.insuredName" :value="item.code" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="户口性质" label-width="20%">
                <el-select v-model="ruleForm.householdRegistrationType" placeholder="请选择户口性质">
                  <el-option v-for="(item,index) in householdRegistrationTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon" v-if="uninsuredActive">
              <el-form-item :label="uninsuredActive?'入职日期':'离职日期'" label-width="20%">
                <el-date-picker v-model="ruleForm.startDate" type="month" placeholder="开始月份"></el-date-picker> 至
                <el-date-picker v-model="ruleForm.endDate" type="month" placeholder="结束月份"></el-date-picker>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </span>
      </el-dialog>
      <!-- 社保增员 -->
      <socialIncreace ref="socialIncreace" @freshList ="getList"></socialIncreace>
      <!-- 社保减员 -->
      <social-decreace ref="socialDecreace" @freshList ="getList" :accumulationFundYn="deAccumulationFundYn"></social-decreace>
    </div>
  </div>
</template>
<script>
  import socialIncreace from './components/socialIncreace'
  import socialDecreace from './components/socialDecrease'
  import { mapState } from "vuex";
  import fun from "@/util/fun";
  let date = fun.headDate();
  let month = new Date().getMonth() + 1;
  import * as constData from "./util/constData";
  let defaultDate =
    date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";
  export default {
    components:{
      socialIncreace,
      socialDecreace
    },
    props:{
      showTitle:{
        type:Boolean,
        default:true,
      }
    },
    data() {
      return {
          ruleForm:{
            taxSubId:"",
            currPage:"1",
            empType:"",
            insuredCity:"",
            startDate:"",
            endDate:"",
            householdRegistrationType:"",
            key:"",
            pageSize:"20",
            workCity:"",
          },
          cityOption:[

          ],
          planOption:[],
          employTypeOption:constData.enumEmpTypeOption,
          householdRegistrationTypeOption:constData.householdRegistrationTypeOption,
          screenWidth: document.body.clientWidth,// 屏幕尺寸
          screenHeight: document.body.clientHeight - 330,
          list: [],
          closeModel: false,
          isShowScreening:false,
          isShowDecrease:false,
          total:0,
          uninsuredActive:true,
          insuredActive:false,
          uninsuredCount:0,
          insuredCount:0,
          loading:false,
          selectList:[],
          entryUninsuredNum:"",
          dimissionInsuredNum:"",
          deAccumulationFundYn:false,
      };
    },

    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList,
        taxSubjectInfoList:state=>state.taxSubjectInfoList,
        cityList:state=>state.cityList
      }),
    },
    created(){
      this.getList()
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
          this.screenHeight = document.body.clientHeight - 330;
        })();
      };
    },
    methods: {
      selectNum(type){
        this.uninsuredActive = type
        this.getList()
      },
      getList() {
        this.loading = true;
        let actionUrl = this.uninsuredActive?"actionFloatEmployeeIncreaseUnlist":"actionFloatEmployeeIncreaseList"
        this.$store
          .dispatch("socialFundStore/"+actionUrl, this.ruleForm)
          .then(res => {
            if (res.success) {
              this.loading = false;
              this.list = res.data.data.data;
              this.total = res.data.count;
              res.data.entryUninsuredNum ? this.entryUninsuredNum = res.data.entryUninsuredNum :""
              res.data.dimissionInsuredNum ? this.dimissionInsuredNum = res.data.dimissionInsuredNum : "";
            }
          });
      },
      changeMonth(){

      },
      //筛选查询
      handleSearch(){
        this.getList()
        this.isShowScreening = false
      },
      //筛选
      onShowScreen(){
        this.isShowScreening = true
        if(this.uninsuredActive){
          this.ruleForm.leaveStart = ""
          this.ruleForm.leaveEnd = ""
        }else{
          this.ruleForm.enterStart = ""
          this.ruleForm.enterEnd = ""
        }
      },
      // 重置
      handleReset(){
        for(let key in this.ruleForm){
          this.ruleForm[key] = ""
        }
      },
      increateImport(){

      },
      decreateImport(){

      },
      //增员导入
      handleIncreateSocial(){
        this.$refs.socialIncreaceForm.validate(valid => {

        })
      },
      //批量选择
      handleSelectionPerson(val){
        this.selectList = val
      },
      //社保增员
      showSocialIncreate(data){
        let compEmpInfo= [
          {
            empId:data.empId,
            taxSubId:data.taxSubId
          }
        ]
        let nameList = [data.empName]
        this.$refs.socialIncreace.show(compEmpInfo,nameList)
      },
      //社保减员
      showSocialDecreate(data){
        this.deAccumulationFundYn = data.accumulationFundYn
        let compEmpInfo= [
          {
            empId:data.empId,
            taxSubId:data.taxSubId
          }
        ]
        this.$refs.socialDecreace.show(compEmpInfo)
      },
      //批量增员
      batchIncreate(){
        let compEmpInfo = []
        this.selectList.forEach(item=>{
          compEmpInfo.push({
            empId:item.empId,
            taxSubId:item.taxSubId
          })
        })
        let nameList = this.selectList.map(item=>item.empName)
        this.$refs.socialIncreace.show(compEmpInfo,nameList)
      },
      //批量减员
      batchDecreate(){
        let compEmpInfo = []
          this.selectList.forEach(item=>{
            compEmpInfo.push({
              empId:item.empId,
              taxSubId:item.taxSubId
            })
          })
        this.$refs.socialDecreace.show(compEmpInfo)
      },
      //导出
      handleExport(){
        let actionUrl = this.uninsuredActive?"actionFloatEmployeeInExport":"actionFloatEmployeeDeExpor"
        this.$store
          .dispatch("socialFundStore/"+actionUrl, this.ruleForm)
      },
      handleSizeChange(val) {
        this.ruleForm.pageSize = val;
        this.ruleForm.currPage = 1;
        this.getList();
      },
      //翻页
      handleSelectionChange(val) {
        this.ruleForm.currPage = val;
        this.getList();
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";
  .quickStaff {
    .header {
      border-bottom: 1px solid #ededed;
      .add-table {
        cursor: pointer;
        float: right;
        color: $mainColor;
      }
      .iconxinzeng {
        font-size: 18px;
        color: #9c9c9c;
        position: relative;
        top: 1px;
      }
    }
    .attrition-content {
      padding: 20px 20px 0px 20px;
      .content-header {
        display: inline-block;
        font-size: 16px;
        margin:0px 0px 6px 20px;
        i {
          font-size: 16px;
          color: #ccc;
        }
        .rotate-el-icon-arrow-left {
          transform: rotate(180deg);
        }
        span {
          position: absolute;
          left: 32px;
          top: 3px;
          z-index: 0;
        }
      }
      .button-style{
        margin:0 20px;
      }
    }
    .screening {
      .check-staff-menu {
        .search-input {
          margin:0px 20px;
          width: 230px;
        }
      }
      .iconiconfonticonfontsousuo1 {
        font-size: 12px;
      }
      .staff-situation {
        margin: 14px 0px;
        color: #999;
        font-size: 12px;
        .staff-total {
          padding-right: 15px;
          margin-right: 15px;
        }
        i {
          font-style: normal;
          padding: 0 3px;
        }
        em {
          color: #333;
          font-style: normal;
        }
      }
      .staff-table {
        .check-staff_table {
          overflow-x: auto;
        }
        position: relative;
        .staff-page {
          margin-top: 10px;
          text-align: right;
        }
        .table-name {
          color: $mainColor;
          cursor: pointer;
        }
      }
    }
    .wait-report{
      margin-right:20px;
      cursor: pointer;
      .num{
        font-weight: bold;
        color: $mainColor;
      }
      .active{
        color:#e6a23c;
      }
    }
  }
  .screen-dialog,.social-increace-dialog {
    .screening-wapper{
      width: 560px;
      margin: 0 auto;
    }
    .shortCon{width:450px;}
    .el-select {
      width:100%;
    }
    .increase-tip{
      padding:30px
    }
    .provident-month{
      float:right;
    }
  }

</style>

