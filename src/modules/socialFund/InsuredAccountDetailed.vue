<template>
  <div class="insured-account-detail">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span @click="$router.go(-1)" class="back-style">返回</span>
            <span class="header-line">|</span>
            <span>{{ insuredAccoundItem.currentMonth }}参保月度台账</span>
          </el-col>
        </el-row>
      </header>
      <div class="account-detail-content">
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
              <el-button type="primary" class="tax-search" @click="getList">查询</el-button>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" v-if="!insuredAccoundItem.isarchive" @click="handleRecreate"
                v-show="privilegeVoList.includes('salary.social.ledger.generate')">重新生成</el-button>
              <el-button class="add-import" @click="handleExport" v-show="privilegeVoList.includes('salary.social.ledger.exportEmp')">导出</el-button>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
              <span class="wait-report">
                参保人数
                <i>{{ insuredCount }}</i>人
              </span>
              <span class="wait-report">
                本月增员
                <i>{{ currentMonthAdd}}</i>人
              </span>
              <span class="wait-report">
                本月减员
                <i class="num">{{ currentMonthSub}}</i>人
              </span>
            </span>
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
              <el-table-column prop="name" label="姓名" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="工号" width="100"></el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="160"></el-table-column>
              <el-table-column prop="taxSubName" label="公司名称" width="120"></el-table-column>
              <el-table-column prop="insuredCity" label="参保城市" width="140">
                <template slot-scope="scope">{{ scope.row.insuredCity }}</template>
              </el-table-column>
              <el-table-column prop="compInsuredName" label="参保方案" width="120">
                <template slot-scope="scope">{{ scope.row.compInsuredName }}</template>
              </el-table-column>
              <el-table-column prop="empSex" label="数据来源" width="80">
                <template slot-scope="scope">{{ scope.row.ledgerSource ==='IMPORT_LEDGER'?'导入':'生成' }}</template>
              </el-table-column>
              <el-table-column prop="empSex" label="含补缴" width="80">
                <template slot-scope="scope">{{ scope.row.supplementaryPayFlag == 1 ?"是":"否" }}</template>
              </el-table-column>
              <el-table-column prop="realPersonSocilTotal" label="个人社保合计" width="120"></el-table-column>
              <el-table-column prop="realCompSocialTotal" label="单位社保合计" width="120"></el-table-column>
              <el-table-column prop="realPersonFundTotal" label="个人公积金合计" width="120"></el-table-column>
              <el-table-column prop="realCompFundTotal" label="单位公积金合计" width="120"></el-table-column>
              <el-table-column label="操作" fixed="right" width="120px">
                <template slot-scope="scope">
                    <el-button type="text" @click="goInsureAccountDetail(scope.row)">详情</el-button>
                    <el-popover ref="popMore" placement="bottom-end" width="60" trigger="hover">
                       <el-button type="text" @click="paybackCreate(scope.row)"
                                  v-if="scope.row.ledgerSource === 'GENERATE_LEDGER'"
                                  v-show="privilegeVoList.includes('salary.social.ledger.supplement')">补缴</el-button>
                       <div v-else>
                         <div class="funStyle more-style" @click="paybackImport(scope.row)"
                              v-show="privilegeVoList.includes('salary.social.ledger.supplement')">补缴</div>
                         <div class="funStyle more-style" @click="handleDelete(scope.row)"
                              v-if="privilegeVoList.includes('salary.social.ledger.delCompany')">删除</div>
                       </div>
                       <span slot="reference" class="more-choose" v-if="!insuredAccoundItem.isarchive">更多</span>
                    </el-popover>
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
              <el-form-item label="参保城市" label-width="20%" >
                <el-select v-model="ruleForm.queryFilterParam.insuredCity" placeholder="请选择参保城市" filterable @change="changeCity">
                  <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="参保方案" label-width="20%">
                <el-select v-model="ruleForm.queryFilterParam.compInsuredId" placeholder="参保方案">
                  <el-option v-for="(item,index) in planOption" :label="item.insuredName" :value="item.id" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="数据来源" label-width="20%">
                <el-radio-group v-model="ruleForm.queryFilterParam.ledgerSource" class="radio-right">
                  <el-radio-button label="null" class="radio-all">不限</el-radio-button>
                  <el-radio-button label="GENERATE_LEDGER" class="radio-all-right">生成</el-radio-button>
                  <el-radio-button label="IMPORT_LEDGER">导入</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="shortCon" >
              <el-form-item label="是否含补缴" label-width="20%">
                <el-radio-group v-model="ruleForm.queryFilterParam.supplementPayFlag" class="radio-right">
                  <el-radio-button label="null" class="radio-all">不限</el-radio-button>
                  <el-radio-button label="1" class="radio-all-right">是</el-radio-button>
                  <el-radio-button label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleScreen">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </span>
      </el-dialog>
      <payBackCreate ref="paybackCreate" @reFreshList = "reFreshList"></payBackCreate>
      <payBackImport ref="payBackImport" :selectItem="selectItem" @hanleClose="hanleCloseImport"></payBackImport>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  import payBackCreate from "./components/InsuredAccountDetailed/paybackCreate"
  import payBackImport from "./components/InsuredAccountDetailed/paybackImport"
  import rightPop from '@/components/basic/rightPop'
  import fun from "@/util/fun";
  import socialIncreace from './components/socialIncreace'
  let date = fun.headDate();
  let month = new Date().getMonth() + 1;
  let defaultDate =
    date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";
  export default {
    components:{
      payBackCreate,
      payBackImport,
      rightPop,
      socialIncreace
    },
    data() {
      return {
        isShowScreening:false,
        source:this.$route.query.source,
        popShow:{
          isshow:false
        },
        selectItem:{},
        ruleForm:{
          queryMonth:"",
          taxSubId:"",
          currPage:"",
          pageSize:"",
          key:"",
          queryFilterParam:{
            compInsuredId:"",
            insuredCity:"",
            ledgerSource:null,//来源
            supplementPayFlag:null//是否补缴
          }
        },
        planOption:[],
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        list: [],
        closeModel: false,
        total:0,
        loading:false,
        createPlanOption:[],
        currentMonthAdd: 0,
        currentMonthSub: 0,
        insuredCount:0,
      };
    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList,
        cityList:state=>state.cityList
      }),
      ...mapState("socialFundStore", {
        insuredAccoundItem: state => state.insuredAccoundItem
      }),
    },
    created(){
      this.getList()
      this.ruleForm.queryMonth= this.insuredAccoundItem.currentMonth;
      this.ruleForm.taxSubId= this.insuredAccoundItem.taxSubId;
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
      getList() {
        this.loading = true;
        this.$store
          .dispatch("socialFundStore/actionEmpMonthlyLedgerList", this.ruleForm)
          .then(res=>{
            this.loading = false;
            this.list = res.data.data;
            this.total = res.data.count;
            this.currentMonthAdd = res.data.currentMonthAdd
            this.currentMonthSub = res.data.currentMonthSub
            this.insuredCount = res.data.insuredCount
          })

      },
      changeCity(value){
        this.$store
          .dispatch("socialFundStore/actionInsuredGetBase", value)
          .then(res => {
            if(res.success){
              this.planOption = res.data
              console.log(res.data)
            }
          });
      },
      //筛选显示
      onShowScreen(){
        this.isShowScreening = true
      },
      //筛选
      handleScreen(){
        this.getList()
        this.isShowScreening = false;
      },
      // 重置
      handleReset(){
        this.ruleForm.queryFilterParam.compInsuredId="";
        this.ruleForm.queryFilterParam.insuredCity="";
        this.ruleForm.queryFilterParam.ledgerSource=null;//来源
        this.ruleForm.queryFilterParam.supplementPayFlag=null;//是否补缴
      },
      //重新生成
      handleRecreate(){
        this.$confirm("是否重新生成公司本月社保月度台账！", "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center:false
          }
        ).then(() => {
          this.$store
            .dispatch("socialFundStore/actionSaveMonthlyLedger", {
              taxSubList:[this.ruleForm.taxSubId],
              month:this.ruleForm.queryMonth,
            })
            .then(res => {
              if(res.success){
                this.getList()
              }
            })
        }).catch(() => {})
      },
      //员工月度台账导出
      handleExport(){
        this.$store
          .dispatch("socialFundStore/actionEmpMonthlyLedgerExport",this.ruleForm)
          .then(res=>{

          })
      },
      //详情
      goInsureAccountDetail(data){
        this.$router.push({path:'/insuredAccountDetail',query:{id:data.id}})
      },
      //补缴(生成)
      paybackCreate(data){
        this.$refs.paybackCreate.show(data)
      },
      //补缴(导入)
      paybackImport(data){
        this.$refs.payBackImport.show(data)
        this.selectItem = data;
      },
      handleDelete(data){
        this.$confirm(" 是否删除所选记录！", "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center:false
          }
        ).then(() => {
            this.$store
              .dispatch("socialFundStore/actionDeleteEmpMonthly",{
                id:data.id,
              })
              .then(res=>{
                  if(res.success){
                    this.getList()
                  }
              })
           }).catch(() => {})
      },
      //更新
      reFreshList(){
       this.getList()
      },
      hanleCloseImport(){
        this.popShow.isshow = false
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
  .insured-account-detail {
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
    .account-detail-content {
      padding: 20px 20px 0px 20px;
    }
    .screening {
      .check-staff-menu {
        .search-input {
          margin:0px 20px;
          width: 230px;
        }
        .radio-all{
          margin-right: 20px !important;
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
        .staff-page {
          margin-top: 10px;
          text-align: right;
        }
      }
    }
    .wait-report{
      margin-right:20px;
    }
  }
  .screen-dialog{
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

