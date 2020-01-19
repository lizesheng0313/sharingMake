<template>
  <div class="attrition">
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
              <el-button type="primary" class="add-import">新增人员</el-button>
              <el-popover
                ref="popMore"
                placement="bottom-end"
                width="60"
                trigger="hover">
                <div class="funStyle more-style">增减员导出</div>
                <div class="funStyle more-style">参保人员导出</div>
                <el-button slot="reference" class="more-choose">导出</el-button>
              </el-popover>
            </div>
          </div>
          <div class="staff-situation">

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
                  <span class="funStyle" @click="onChange">调动</span>
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
    <right-pop :pop-show="popShow" :has-footer="false" popTitle="变更公司" :popWidth="600">
      <div slot="pop-content">

      </div>
    </right-pop>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  import rightPop from '@/components/basic/rightPop'
  import fun from "@/util/fun";
  let date = fun.headDate();
  let month = new Date().getMonth() + 1;
  let defaultDate =
    date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";
  export default {
    data() {
      return {
        activeName:"emplyeeInfo",
        ruleForm:{
          companyName:"",
          plan:"",
          city:"",
          insuredStart:"",
          insuredEnd:"",
          stopInsuranceStart:"",
          stopInsuranceEnd:"",
        },
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        selectMonth: defaultDate,
        list: [{name:"减员",type:'dec'}],
        closeModel: false,
        isShowScreening:false,
        total:0,
        loading:false,
        popShow:{
          isshow:false
        }
      };
    },
    components:{
      rightPop
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
      handleClick(){

      },
      onChange(){
        this.popShow.isshow = true
      },
      getList() {
        this.loading = true;
        this.$store
          .dispatch("taxPageStore/actionEmpCollectList", this.ruleForm)
          .then(res => {
            if (res.success) {
              this.loading = false;
              this.total = res.data.count;
              this.list = res.data.data;
            }
          });
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
      handleSearch(){

      },
      // 重置
      handleReset(){
        for(let key in this.ruleForm){
          this.ruleForm[key] = ""
        }
        console.log(this.ruleForm)
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

</style>

