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
              <el-button type="primary" class="add-import" @click="addEmployee">新增人员</el-button>
              <el-button type="primary" class="add-import" @click="batchImport">批量导入</el-button>
              <el-button  class="more-choose" @click="isShowExport = true">导出</el-button>
            </div>
          </div>
          <div class="drop-down">
            公司名称:
            <el-select v-model="ruleForm.queryFilterParam.taxSubId" placeholder="请选择" @change="changeSubTaxId">
              <el-option
                v-for="item in taxSubjectInfoList"
                :key="item.taxSubId"
                :label="item.taxSubName"
                :value="item.taxSubId">
              </el-option>
            </el-select>
          </div>
          <div class="staff-table">
            <el-table v-loading="loading" :data="list" class="check-staff_table" :height="screenHeight"
                      :style="{width:screenWidth-255+'px'}" border
            >
              <el-table-column
                type="index"
                label="编号"
                width="50">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="140">
                <template slot-scope="scope">
                  <span class="table-name" @click="handleEmplayeeName(scope.row)">{{ scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
              <el-table-column prop="taxSubName" label="公司名称" width="180">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.taxSubName" placement="top-start" v-if="scope.row.taxSubName && scope.row.taxSubName.length>10">
                    <span class="hiden-con">{{ scope.row.taxSubName }}</span>
                  </el-tooltip>
                  <span v-else>{{ scope.row.taxSubName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empType" label="用工性质" width="140">
                <template slot-scope="scope">{{ scope.row.empType | filterEmpType }}</template>
              </el-table-column>
              <el-table-column prop="empStatus" label="员工状态" width="140">
                <template slot-scope="scope">{{ scope.row.empStatus | filterEmployStatus }}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="入职日期" width="140">
                <template slot-scope="scope">{{ scope.row.empDay }}</template>
              </el-table-column>
              <el-table-column prop="turnRegularDate" label="转正日期" width="140"></el-table-column>
              <el-table-column label="操作" fixed="right" width="280px">
                <template slot-scope="scope">
                  <span class="funStyle" @click="onChange(scope.row)" v-if="scope.row.empStatus == 'ON_THE_JOB'">变更</span>
                  <span class="funStyle" @click="handleDelete(scope.row)">删除</span>
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
      <companyChange @getList="getList"  :companyOption="taxSubjectInfoList" ref="companyChange"></companyChange>
<!--    筛选-->
    <el-dialog
      title=""
      :visible.sync="isShowScreening"
      width="52%"
      center
      ref="screenForm"
      class="screen-dialog"
      :close-on-click-modal="closeModel"
    >
      <el-form :model="ruleForm.queryFilterParam" ref="screenForm" label-width="100px" class="demo-ruleForm">
        <div class="shortCon">
          <el-form-item label="用工性质" label-width="38%">
            <radios ref="enumEmpType" :screenOption="enumEmpTypeOption" @handleRadio="handleEnumEmpTypes"> </radios>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="员工状态" label-width="38%">
            <radios ref="employStatus" :screenOption="employStatusOption" @handleRadio="handleEnumEmpStatuses"></radios>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="部门" label-width="38%">
            <el-input v-model="ruleForm.queryFilterParam.departName"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="岗位" label-width="38%">
            <el-input v-model="ruleForm.queryFilterParam.positionName"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="工作城市" label-width="38%">
            <el-select v-model="ruleForm.queryFilterParam.workCity" placeholder="请选择" filterable>
              <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
            </el-select>
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
          <el-radio-group v-model="ruleForm.queryFilterParam.regularEmpYn" size="small">
            <el-radio-button label=-1>不限</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
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
      <div v-for="(item,index) in checkAllList" :style="{marginTop:index!=0?'10px':''}">
        <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="checkAllInfo(index)"><b>{{ item.title }}</b></el-checkbox>
        <div style="margin:10px 0px; border-bottom:1px solid #E5E5E5"></div>
        <el-checkbox-group v-model="item.checkedInfo" @change="checkInfo(index)">
         <el-checkbox v-for="it in item.options" :label="it" :key="it" class="checkBoxStyle">{{it}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click ="handleExport">确定</el-button>
        <el-button @click="isShowExport = false">取消</el-button>
      </span>
    </el-dialog>
<!--    导入-->
    <import-data
      ref="import"
      :radioList="radioList"
      :title="'新增导入'"
      :apiCheck="'/api/xsalary/enterprise/employees/importVerify'"
      :apiDownloadLog="'payMasterStore/actionEmployeesVerifyErrorLog'"
      :apiDownloadTemplate="'payMasterStore/actionEmployeesTemplate'"
      :parameterData="parameterData"
      sendRadio="BY_ID_NO"
      @changeRadioValue="changeRadioValue"
      :impoartAction="'payMasterStore/actionEmployeesImport'"
      @getLoading="getList"
      :uploadFileData="uploadFileData"
      :tips="'说明：导入模板中空单元格薪资项，导入后不覆盖系统中对应薪资'"
    ></import-data>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  import * as constData from "./util/constData"
  import rightPop from '@/components/basic/rightPop'
  import companyChange from './components/companyChange'
  import importData from "@/components/tool/importData";
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
          key:"",
          currPage:1,
          pageSize:20,
          queryFilterParam:{
            enumEmpTypes:[],//用工性质，
            enumEmpStatuses:[],//员工状态
            departName:"",//部门
            positionName:"",//岗位
            taxSubId:"",
            workCity:"",//工作城市
            enterStartTime:"",//入职筛选开始时间
            enterEndTime:"",
            regularEmpYn:-1,//是否转正
            turnRegularStartTime:"",//转正开始时间
            turnRegularEndTime:"",
            lastEmployStartTime:"",
            lastEmployEndTime:"",
          },
        },
        enumEmpTypeOption:constData.enumEmpTypeOption,
        employStatusOption:constData.employStatusOption,
        companyItem:"",
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        selectMonth: defaultDate,
        list: [],
        closeModel: false,
        total:0,
        loading:false,
        isShowCompany:false,
        checkAll:false,
        isShowExport:false,
        checkAllList:[
          {
            title:"基本信息",
            checkAll:true,
            checkedInfo:[ '姓名','工号', '证件类型','证件号码', '性别',"出生日期","国籍","手机号码","最高学历","参加工作日期","户口性质","户口所在城市","婚姻状态","民族","工资卡开户银行","工资银行账号"],
            options:[ '姓名','工号', '证件类型','证件号码', '性别',"出生日期","国籍","手机号码","最高学历","参加工作日期","户口性质","户口所在城市","婚姻状态","民族","工资卡开户银行","工资银行账号"],
            isIndeterminate: false,
          },
          {
            title:"公司信息",
            checkAll:true,
            checkedInfo:["公司名称","用工性质","部门","岗位","入职日期","工作城市","是否转正","转正日期","员工状态","最后工作日"],
            options:["公司名称","用工性质","部门","岗位","入职日期","工作城市","是否转正","转正日期","员工状态","最后工作日"],
            isIndeterminate: false,
          }
        ],
         radioList: [
            { lable: "BY_ID_NO", title: "通过身份证匹配人员" }
          ],
         parameterData: {
            'importType':'BY_ID_NO'
          },
         uploadFileData: {
          uuid: "",
          importType:"BY_ID_NO"
        },
      };
    },
    components:{
      rightPop,
      companyChange,
      radios,
      importData
    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList,
        cityList:state=>state.cityList
      }),
    },
    created(){
      this.getList()
      //公司列表
      this.getTaxSubjectInfoList()
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
        this.companyItem = data
        this.$refs.companyChange.showCompany(data)
      },
      getList() {
        this.loading = true;
        this.$store
          .dispatch("payMasterStore/actionGetEmployeeList", this.ruleForm)
          .then(res => {
            if(res.success){
              this.list = res.data
              this.loading = false
            }
          });
      },
      //批量导入
      batchImport(){
        this.$refs.import.show();
      },
      //导入 按钮切换
      changeRadioValue(val) {
        this.parameterData.importType = val;
        this.uploadFileData.importType= val;
      },
      //删除
      handleDelete(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch("payMasterStore/actionDeleteEmployee", data.empId)
              .then(res => {
                if(res.success){
                  this.$message({type: 'success', message: '删除成功!'});
                  this.getList()
                }
              });
              }).catch(() => {})
      },
      //用工性质
      handleEnumEmpTypes(val){
        this.ruleForm.queryFilterParam.enumEmpTypes = val
      },
      //员工特征
      handleEnumEmpStatuses(val){
        this.ruleForm.queryFilterParam.enumEmpStatuses = val
      },
      //筛选查询
      selectScreen(){
        this.getList()
        this.isShowScreening = false
      },
      //筛选重置
      resetSreen(){
        for(let key in this.ruleForm.queryFilterParam){
          if(!['enumEmpTypes','enumEmpStatuses','regularEmpYn'].includes(key)){
            this.ruleForm.queryFilterParam[key] = ""
            this.ruleForm.queryFilterParam.regularEmpYn = -1;
            this.$refs.enumEmpType.changeNoType();
            this.$refs.employStatus.changeNoType();
          }
        }
      },
      //扣缴义务人列表
      getTaxSubjectInfoList() {
        this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res => {
          if (res.success) {
            this.taxSubjectInfoList = [{'taxSubId':0,'taxSubName':"全部"}].concat(res.data);
            this.ruleForm.queryFilterParam.taxSubId = this.taxSubjectInfoList[0].taxSubId
          }
        });
      },
      //切换扣缴义务人
      changeSubTaxId(){
        this.getList()
      },
      // 关闭更改侧滑框
      hanleClose(isFresh) {
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
        this.$router.push({path:'/employeeDetail',query:{compEmpId:data.compEmpId}})
      },
      //人员基本信息
      checkAllInfo(index){
        this.checkAllList[index]['checkedInfo'] = this.checkAllList[index]['checkAll'] ? this.checkAllList[index]['options'] : [];
        this.checkAllList[index]['isIndeterminate'] = false;
      },
      checkInfo(index){
        let checkedCount = this.checkAllList[index]['checkedInfo'].length;
        this.checkAllList[index]['checkAll'] = checkedCount === this.checkAllList[index]['options'].length;
        this.checkAllList[index]['isIndeterminate'] = checkedCount > 0 && checkedCount < this.checkAllList[index]['options'].length;
      },
      //导出
      handleExport(){
        let exportCompEmpItems = this.checkAllList[0]['checkedInfo']
       let exportCompInfoItems = this.checkAllList[1]['checkedInfo']
        this.$store.dispatch("payMasterStore/actionEmployeeExport",{
           exportCompEmpItems,
           exportCompInfoItems,
           queryParam:this.ruleForm
        }).then(res => {
          this.isShowExport = false
        })
      },
      handleSizeChange(val) {
        this.ruleForm.pageSize = val;
        this.ruleForm.currPage = 1;
        this.getList();
      },
      handleSearch(){
        this.getList()
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

