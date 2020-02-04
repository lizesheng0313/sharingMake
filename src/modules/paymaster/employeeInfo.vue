<template>
  <div class="employee-Info">
    <div class="tax el-diy-month">
      <div class="attrition-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <div class="left">
              <el-button type="default" @click="isShowScreening=true">筛选</el-button>
            </div>
            <el-input
              placeholder="请输入姓名\工号\身份证号"
              v-model="ruleForm.nameOrMore"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input"
            ></el-input>
            <div class="select" style="display: inline-block">
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" @click="addEmployee">新增人员</el-button>
              <el-button type="primary" class="add-import" @click="batchImport">批量导入</el-button>
              <el-button  class="more-choose" @click="isShowExport = true">导出</el-button>
            </div>
          </div>
          <div class="drop-down">
            扣缴义务人:
            <el-select v-model="ruleForm.taxSubId" placeholder="请选择">
              <el-option
                v-for="item in taxSubjectInfoList"
                :key="item.taxSubId"
                :label="item.taxSubName"
                :value="item.taxSubId">
              </el-option>
            </el-select>
          </div>
          <div class="staff-table">
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              :height="screenHeight"
              :style="{width:screenWidth-255+'px'}"
              border
            >
              <el-table-column
                type="index"
                label="编号"
                width="50">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="140">
                <template slot-scope="scope">
                  <span class="table-name" @click="handleEmplayeeName(scope.row)">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
              <el-table-column prop="idNo" label="公司名称"></el-table-column>
              <el-table-column prop="empSex" label="参保状态" width="140">
                <template slot-scope="scope">{{ scope.row.empSex }}</template>
              </el-table-column>
              <el-table-column prop="workerStatus" label="参保城市" width="140">
                <template slot-scope="scope">{{ scope.row.workerStatus }}</template>
              </el-table-column>
              <el-table-column prop="reportStatus" label="参保方案" width="140">
                <template slot-scope="scope">{{ scope.row.reportStatus }}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="社保起缴月份" width="140">
                <template slot-scope="scope">{{ scope.row.idValidStatus }}</template>
              </el-table-column>
              <el-table-column prop="mobile" label="公积金期缴月份" width="140"></el-table-column>
              <el-table-column label="操作" fixed="right" width="280px">
                <template slot-scope="scope">
                  <span class="funStyle" @click="onChange(scope.row)">变更</span>
                  <span class="funStyle">删除</span>
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
    </div>
<!-- 变更公司-->
    <right-pop :pop-show="popShow" :has-footer="false" popTitle="变更公司" :popWidth="600">
      <div slot="pop-content">
        <companyChange @hanleClose="hanleClose" :companyChangeName="companyChangeName" :companyChangeIdCard="companyChangeIdCard"></companyChange>
      </div>
    </right-pop>
<!--    筛选-->
    <el-dialog
      title=""
      :visible.sync="isShowScreening"
      width="52%"
      center
      class="screen-dialog"
      :close-on-click-modal="closeModel"
    >
      <el-form :model="ruleForm.queryFilterParam" ref="screenForm" label-width="100px" class="demo-ruleForm">
        <div class="shortCon">
          <el-form-item label="用工性质" label-width="38%">
            <radios :screenOption="employNatureOption" @handleRadio="handleEmploymentNature"></radios>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="员工状态" label-width="38%">
            <radios :screenOption="employStatusOption" @handleRadio="handleEmploymentStatus"></radios>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="部门" label-width="38%">
            <el-input v-model="ruleForm.queryFilterParam.departName"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="岗位" label-width="38%">
            <el-input v-model="ruleForm.queryFilterParam.jobTitle"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="工作城市" label-width="38%">
            <cityCascader @changeCity = "changeCity"></cityCascader>
          </el-form-item>
        </div>
        <el-form-item label="入职日期" label-width="22%">
          <el-date-picker
            v-model="ruleForm.queryFilterParam.enterStartTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            v-model="ruleForm.queryFilterParam.enterEndTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否转正" label-width="22%">
          <el-radio-group v-model="ruleForm.queryFilterParam.isCorrect" size="small">
            <el-radio-button label="null">不限</el-radio-button>
            <el-radio-button label="yes">是</el-radio-button>
            <el-radio-button label="no">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="转正日期" label-width="22%">
          <el-date-picker
            v-model="ruleForm.queryFilterParam.StartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            v-model="ruleForm.queryFilterParam.lastEmployEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离职日期" label-width="22%">
          <el-date-picker
            v-model="ruleForm.queryFilterParam.correctStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            v-model="ruleForm.queryFilterParam.correctEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click ="selectScreen">查询</el-button>
        <el-button @click="resetSreen">重置</el-button>
      </span>
    </el-dialog>
<!--    导出-->
    <el-dialog
      title="选择导出项"
      :visible.sync="isShowExport"
      width="600px"
      left
      class="exportDialog"
      :close-on-click-modal="closeModel"
    >
      <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllBaseInfo"><b>基本信息</b></el-checkbox>
        <div style="margin:10px 0px; border-bottom:1px solid #E5E5E5"></div>
        <el-checkbox-group v-model="checkedBaseInfo" @change="checkBaseInfo">
         <el-checkbox v-for="item in baseOptions" :label="item" :key="item" class="checkBoxStyle">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click ="handleExport">确定</el-button>
        <el-button @click="isShowExport = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  import rightPop from '@/components/basic/rightPop'
  import companyChange from './components/companyChange'
  import cityCascader from '@/components/tool/cityCascader'
  import radios from '@/components/tool/radios'
  import fun from "@/util/fun";
  let date = fun.headDate();
  let month = new Date().getMonth() + 1;
  let defaultDate =
    date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";
  export default {
    data() {
      return {
        activeName:"emplyeeInfo",
        taxSubjectInfoList:[{ //扣缴义务人枚举
          taxSubId: 0,
          taxSubName: "全部"
        }],
        isShowScreening:false,
        ruleForm:{
          taxSubId:"",
          key:"",
          currPage:1,
          pageSize:20,
          queryFilterParam:{
            taxSubId:"",
            departName:"",//部门
            jobTitle:"",//岗位
            workCity:"",//工作地点
            enterStartTime:"",
            enterEndTime:"",
            isCorrect:"null",
            correctStartTime:"",
            correctEndTime:"",
            lastEmployStartTime:"",
            lastEmployEndTime:"",
            emplyNature:[],//用工类型
            emplyStatus:[],
          },
        },
        employNatureOption:[
          {
            label:"全职",
            value:"FULL_TIME"
          },{
            label:"兼职",
            value:"PART_TIME"
          },{
            label:"实习",
            value:"PRACTICE"
          },{
            label:"劳务",
            value:"LABOUR"
          },{
            label:"退休返聘",
            value:"RE_EMPLOY"
          }
        ],
        employStatusOption:[
          {
            label:"在职",
            value:"FULL_TIME"
          },{
            label:"离职",
            value:"PART_TIME"
          },{
            label:"退休",
            value:"PRACTICE"
          }
        ],
        companyChangeName:"",
        companyChangeIdCard:"",
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        selectMonth: defaultDate,
        list: [{name:"马大哈",type:'dec',idCard:"777888999"}],
        closeModel: false,
        total:0,
        loading:false,
        popShow:{
          isshow:false
        },
        checkAll:false,
        isShowExport:false,
        baseCheckAll: false,
        checkedBaseInfo: ['工号', '姓名', '身份证号', '部门'],
        baseOptions:[ '姓名','工号', '证件类型','证件号码', '性别',"出生日期","国籍","手机号码","最高学历","参加工作日期","户口性质","户口所在城市","婚姻状态","民族","工资卡开户银行","工资银行账号"],
        companyOptions:["公司名称","用工性质","部门","岗位","入职日期","工作城市","是否转正","转正日期","员工状态","最后工作日"],
        isIndeterminate: false,
      };
    },
    components:{
      rightPop,
      companyChange,
      cityCascader,
      radios,
    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList
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
      handleClick(){

      },
      //调动
      onChange(data){
        this.popShow.isshow = true
        this.companyChangeIdCard = data.idCard
        this.companyChangeName = data.name
      },
      getList() {
        this.loading = true;
        // this.$store
        //   .dispatch("taxPageStore/actionEmpCollectList", this.ruleForm)
        //   .then(res => {
        //     if (res.success) {
              this.loading = false;
        //       this.total = res.data.count;
        //       this.list = res.data.data;
        //     }
        //   });
        // this.getTaxSubjectInfoList()
      },
      //用工性质
      handleEmploymentNature(val){
        this.ruleForm.queryFilterParam.emplyNature = val
        console.log(val)
      },
      //员工特征
      handleEmploymentStatus(val){
        this.ruleForm.queryFilterParam.emplyStatus = val
        console.log(val)
      },
      //筛选查询
      selectScreen(){

      },
      changeCity(val){
        this.ruleForm.queryFilterParam.workCity = val;
        console.log(this.ruleForm.queryFilterParam.workCity)
      },
      //筛选重置
      resetSreen(){

      },
      //扣缴义务人列表
      getTaxSubjectInfoList() {
        this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res => {
          if (res.success) {
            this.taxSubjectInfoList = [{'taxSubId':0,'taxSubName':"全部"}].concat(res.data);
            this.ruleForm.taxSubId = this.taxSubjectInfoList[0].taxSubId
          }
        });
      },
      // 关闭更改侧滑框
      hanleClose(isFresh) {
        this.popShow.isshow = false
        if(isFresh){
          this.getList()
        }
      },
      //新增人员
      addEmployee() {
        this.$router.push('/addEmployee')
      },
      //员工详情
      handleEmplayeeName(data){
        this.$router.push('/employeeDetail')
      },
      //批量导入
      batchImport(){

      },
      //人员基本信息
      checkAllBaseInfo(val){
        this.checkedBaseInfo = val ? this.baseOptions : [];
        this.isIndeterminate = false;
      },
      checkBaseInfo(value){
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.baseOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.baseOptions.length;
      },
      //导出
      handleExport(){
        console.log(this.checkedBaseInfo)
      },
      handleSizeChange(val) {
        this.ruleForm.pageSize = val;
        this.ruleForm.currPage = 1;
        this.getList();
      },
      handleSearch(){

      },
      // 重置
      handleReset(){
        for(let key in this.ruleForm){
          this.ruleForm[key] = ""
        }
      },
      handleCheckTaxSubject(item) {
        this.ruleForm.taxSubjectId = item.taxSubId;
        this.reportForm.taxSubId = item.taxSubId;
        this.reportForm.taxSubjectId = item.taxSubId;
        this.currentTaxSubName = item.taxSubName;
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
  .employee-Info {
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
  .screen-dialog {
    .shortCon{width:450px;}
    .el-select {
      width:100%;
    }
  }
  .exportDialog{
    .checkBoxStyle{
      display: inline-block;
      padding:5px 0px;
    }
  }
</style>

