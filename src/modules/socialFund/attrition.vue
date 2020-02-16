<template>
  <div class="attrition">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span>增减员</span>
          </el-col>
        </el-row>
      </header>
      <div class="attrition-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <div class="left">
              <el-button type="default" @click="isShowScreening=true">筛选</el-button>
            </div>
            <div class="content-header head-date">
              <el-date-picker
                v-model="ruleForm.startMonth"
                @input="getList"
                type="month"
                value-format="yyyy-MM"
                :editable="false"
                :clearable="false"
              ></el-date-picker>
            </div>
            <el-input
              placeholder="请输入姓名\工号\身份证号"
              v-model="ruleForm.nameOrMore"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="getList"
              clearable
              class="search-input"
            ></el-input>
            <div class="select" style="display: inline-block">
              <el-button type="primary" class="tax-search" @click="getList">查询</el-button>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" @click="goQuick">快速增减员</el-button>
              <el-popover
                ref="popMore"
                placement="bottom-end"
                width="60"
                class="button-style"
                trigger="hover">
                <div class="funStyle more-style">增员导入</div>
                <div class="funStyle more-style">减员导入</div>
                <div class="funStyle more-style">编辑导入</div>
                <el-button slot="reference" class="more-choose">批量操作</el-button>
              </el-popover>
              <el-popover
                ref="popMore"
                placement="bottom-end"
                width="60"
                trigger="hover">
                <div class="funStyle more-style">增减员导出</div>
                <div class="funStyle more-style">参保人员导出</div>
                <el-button slot="reference" class="more-choose">更多</el-button>
              </el-popover>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
              <span v-for="(item,index) in numSelect" :class="['wait-report',item.isHasBorder?'left-border':'']" :key="index" @click="selectNum(item)">
                {{ item.label}}
                <i :class="['num', item.isActive?'active':'']">{{ item.value }}</i>人
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
                  <span class="table-name" @click="handleCollectionName(scope.row)" v-if="privilegeVoList.includes('salary.report.personReport.edit')">{{ scope.row.empName }}</span>
                  <span class="table-name" v-else>{{ scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="idCard" label="证件号码" width="180"></el-table-column>
              <el-table-column prop="compName" label="公司名称"></el-table-column>
              <el-table-column prop="insuredStatus" label="参保状态" width="140">
                <template slot-scope="scope">{{ scope.row.insuredCity }}</template>
              </el-table-column>
              <el-table-column prop="insuredCity" label="参保城市" width="140">
                <template slot-scope="scope">{{ scope.row.insuredCity }}</template>
              </el-table-column>
              <el-table-column prop="compInsuredName" label="参保方案" width="140">
                <template slot-scope="scope">{{ scope.row.compInsuredName }}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="社保起缴月份" width="140">
                <template slot-scope="scope">{{ scope.row.socialInsuranceStartMonth }}</template>
              </el-table-column>
              <el-table-column prop="mobile" label="公积金期缴月份" width="140"></el-table-column>
              <el-table-column label="操作" fixed="right" width="280px">
                <template slot-scope="scope">
                  <span class="funStyle" @click="goDetail(scope.row)">详情</span>
                  <el-popover
                    ref="popMore"
                    placement="bottom-end"
                    width="60"
                    trigger="hover">
                    <div class="funStyle more-style">减员</div>
                    <div class="funStyle more-style">删除</div>
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
                <el-select v-model="ruleForm.param.insuredCity" placeholder="请选择参保城市" filterable>
                  <el-option v-for="(item,index) in taxSubjectInfoList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="参保城市" label-width="20%">
                <el-select v-model="ruleForm.city" placeholder="请选择参保城市" @change="changeCity">
                  <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="参保方案" label-width="20%">
                <el-select v-model="ruleForm.plan" placeholder="请选择参保方案">
                  <el-option v-for="(item,index) in planOption" :label="item.insuredName" :value="item.id" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="shortCon">
              <el-form-item label="参保状态" label-width="20%">
                <el-select v-model="ruleForm.param.insuredStatus" placeholder="请选择参保状态">
                  <el-option v-for="(item,index) in insuredStatusOption" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleScreen">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import fun from "@/util/fun";
  let date = fun.headDate();
  let month = new Date().getMonth() + 1;
  let defaultDate =
    date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);
  export default {
    data() {
      return {
        ruleForm:{
          key:"",
          pageSize:1,
          currPage:1,
          startMonth:defaultDate,
          statusFlag:"0",
          param:{
            compId:"",//公司Id
            compInsuredId:"",//参保方案Id
            insuredCity:"",//参保城市
            insuredStatus:"",//参保状态
          }
        },
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        list: [],
        closeModel: false,
        isShowScreening:false,
        total:0,
        loading:false,
        numSelect:[],
        planOption:[],
        insuredStatusOption:[
          {
            label:"参保中",
            value:"INSURED_ING"
          },{
            label:"已停保",
            value:"INSURED_STOP"
          }],

    };
    },
    components:{

    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList,
        cityList:state=>state.cityList,
        taxSubjectInfoList:state=>state.taxSubjectInfoList,
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
      //选择数字
      selectNum(data){
       this.numSelect.forEach(it=>{it.isActive = false})
       data.isActive = true
       this.ruleForm.statusFlag = data.value;
       this.getList('selectNum')
      },
      getList(selectNum) {
        this.loading = false;
        this.$store
          .dispatch("socialFundStore/actionFloatEmployeeList", this.ruleForm)
          .then(res => {
            if (res.success) {
              this.loading = false;
              let responseData = res.data;
              this.total = responseData.pageResponse.count;
              this.list = responseData.pageResponse.data;
              if(!selectNum){
                this.numSelect = [
                  { label:"全部", value:responseData.num, isActive:true, isHasBorder:false },
                  { label:"本月社保：缴纳中", value:responseData.sitaxNum, isActive:false, isHasBorder:true },
                  { label:"增员", value:responseData.sidecreaseNum, isActive:false, isHasBorder:false },
                  { label:"减员", value:responseData.siincreaseNum, isActive:false, isHasBorder:false },
                  { label:"本月公积金：缴纳中", value:responseData.aftaxNum, isActive:false, isHasBorder:true },
                  { label:"增员", value:responseData.afincreaseNum, isActive:false, isHasBorder:false },
                  { label:"减员", value:responseData.afdecreaseNum, isActive:false, isHasBorder:false },
                ]
              }
            }
          });
      },
      //筛选
      handleScreen(){
        this.getList()
        this.isShowScreening = false;
      },
      goQuick(){
        this.$router.push('/quickStaff')
      },
      //详情
      goDetail(data){
        this.$router.push({path:'/attritionDetail',query:{type:data.type}})
      },
      //导出
      handleExport(){
        this.$store
          .dispatch("taxPageStore/actionTaxEmpCollectNewListExport", this.ruleForm)
      },
      handleSizeChange(val) {
        this.totalListForm.pageSize = val;
        this.totalListForm.currPage = 1;
        this.getList();
      },
      changeCity(value){
        this.$store
          .dispatch("socialFundStore/actionInsuredGetBase", value)
          .then(res => {
            if(res.success){
              this.planOption = res.data
              console.log(res)
            }
          });
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
  .attrition {
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
      margin-right:10px;
      cursor: pointer;
      padding-left: 10px;
      height:20px;
      .num{
        font-weight: bold;
        color: $mainColor;
      }
      .active{
        color:#e6a23c;
      }
    }
    .left-border{
      border-left:1.2px solid #c6c6c6;
    }
  }
  .screen-dialog {
    .shortCon{width:450px;}
    .el-select {
      width:100%;
    }
  }

</style>

