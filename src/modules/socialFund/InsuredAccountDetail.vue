<template>
  <div class="insured-account-detail">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span @click="$router.go(-1)" class="back-style">返回</span>
            <span class="header-line">|</span>
            <span>参保月度台账</span>
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
              <el-button type="primary" class="add-import" v-if="source==='create'">社保增员</el-button>
              <el-button type="primary" class="add-import" v-else>导入</el-button>
              <el-button class="add-import" @click="handleExport">导出</el-button>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
              <span class="wait-report" @click="selectNum(true)">
                入职未投保
                <i :class="['num', uninsuredActive?'active':'']">{{ uninsuredCount?uninsuredCount:0 }}</i>人
              </span>
              <span class="wait-report" @click="selectNum(false)">
                入职已投保
                <i :class="['num', !uninsuredActive?'active':'']">{{ insuredCount ? insuredCount:0 }}</i>人
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
              <el-table-column prop="name" label="姓名" width="140">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="180"></el-table-column>
              <el-table-column prop="idNo" label="公司名称"></el-table-column>
              <el-table-column prop="empSex" label="参保城市" width="140">
                <template slot-scope="scope">{{ scope.row.empSex }}</template>
              </el-table-column>
              <template v-if="uninsuredActive">
                <el-table-column prop="workerStatus" label="参保方案" width="140">
                  <template slot-scope="scope">{{ scope.row.workerStatus }}</template>
                </el-table-column>
                <el-table-column prop="workerStatus" label="是否含补缴" width="140">
                  <template slot-scope="scope">{{ scope.row.workerStatus }}</template>
                </el-table-column>
                <el-table-column prop="reportStatus" label="养老个人缴费" width="140">
                  <template slot-scope="scope">{{ scope.row.reportStatus }}</template>
                </el-table-column>
                <el-table-column prop="idValidStatus" label="养老医疗缴费" width="140">
                  <template slot-scope="scope">{{ scope.row.idValidStatus }}</template>
                </el-table-column>
              </template>
              <el-table-column label="操作" fixed="right" width="160px">
                <template slot-scope="scope">
                  <el-button type="text">详情</el-button>
                  <el-popover
                    ref="popMore"
                    placement="bottom-end"
                    width="60"
                    trigger="hover">
                    <div class="funStyle more-style" @click="payback(scope.row)">补缴</div>
                    <div class="funStyle more-style" v-if="source==='create'">减员</div>
                    <div class="funStyle more-style" v-else @click="handleDelete(scope.row)">删除</div>
                    <span slot="reference" class="more-choose">更多</span>
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
              <el-form-item label="公司名称" label-width="20%">
                <el-input v-model="ruleForm.companyName" placeholder="请选择公司名称"></el-input>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="参保城市" label-width="20%">
                <el-select v-model="ruleForm.city" placeholder="请选择用工性质">
                  <el-option v-for="(item,index) in cityOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="参保方案" label-width="20%">
                <el-select v-model="ruleForm.plan" placeholder="请选择工作城市">
                  <el-option v-for="(item,index) in planOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="是否挂靠" label-width="20%">
                <el-radio-group v-model="ruleForm.isGk" class="radio-right">
                  <el-radio-button label="null" class="radio-all">不限</el-radio-button>
                  <el-radio-button label="true" class="radio-all-right">是</el-radio-button>
                  <el-radio-button label="false">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="shortCon" >
              <el-form-item label="是否补缴" label-width="20%">
                <el-radio-group v-model="ruleForm.isBj" class="radio-right">
                  <el-radio-button label="null" class="radio-all">不限</el-radio-button>
                  <el-radio-button label="true" class="radio-all-right">是</el-radio-button>
                  <el-radio-button label="false">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </span>
      </el-dialog>
      <payBackCreate ref="paybackCreate" @reFreshList = "reFreshList"></payBackCreate>
      <right-pop :pop-show="popShow" :has-footer="false" popTitle="补缴" :popWidth="600">
        <div slot="pop-content">
          <payBackImport :selectItem="selectItem" @hanleClose="hanleCloseImport"></payBackImport>
        </div>
      </right-pop>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  import payBackCreate from "./components/InsuredAccountDetail/paybackCreate"
  import payBackImport from "./components/InsuredAccountDetail/paybackImport"
  import rightPop from '@/components/basic/rightPop'
  import fun from "@/util/fun";
  let date = fun.headDate();
  let month = new Date().getMonth() + 1;
  let defaultDate =
    date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";
  export default {
    components:{
      payBackCreate,
      payBackImport,
      rightPop,
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
          companyName:"",
          plan:"",
          city:"",
          isGk:null,
          isBj:null
        },
        cityOption:[

        ],
        planOption:[
          {
            label:"111",
            value:"111"
          }
        ],
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        list: [{name:"妞妞",idcard:"123456789123456789"},{name:"丫丫"}],
        closeModel: false,
        total:0,
        uninsuredActive:true,
        insuredActive:false,
        uninsuredCount:0,
        insuredCount:0,
        loading:false,
      };
    },

    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList
      }),
    },
    created(){
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
      },
      getList() {
        this.loading = true;
        console.log('111')
      },
      handleSearch(){

      },
      //筛选
      onShowScreen(){
        this.isShowScreening = true
      },
      // 重置
      handleReset(){
        for(let key in this.ruleForm){
          if(!['isGk','isBj'].includes(key))
          this.ruleForm[key] = ""
        }
      },
      //导出
      handleExport(){
      },
      //补缴
      payback(data){
        if(this.source === 'create'){
          this.$refs.paybackCreate.show()
        }else{
          this.popShow.isshow = true;
          this.selectItem = data;
        }
      },
      handleDelete(){

      },
      //更新
      reFreshList(){
        console.log('111')
      },
      hanleCloseImport(){
        this.popShow.isshow = false
      },
      handleSizeChange(val) {
        this.totalListForm.pageSize = val;
        this.totalListForm.currPage = 1;
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

