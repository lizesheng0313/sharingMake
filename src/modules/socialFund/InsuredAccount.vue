<template>
  <div class="insured-account">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span>参保月度台账</span>
          </el-col>
        </el-row>
      </header>
      <div class="insured-account-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <el-select v-model="ruleForm.companyName" placeholder="公司名称">
              <el-option v-for="(item,index) in companyList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
            <div class="content-header head-date">
              <el-date-picker
                v-model="ruleForm.month"
                type="month"
                placeholder="参保月份"
                value-format="yyyy年MM月"
                :editable="false"
                :clearable="false"
              ></el-date-picker>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import">生成月度台账</el-button>
              <el-button  class="add-import">导入月度台账</el-button>
            </div>
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
              <el-table-column prop="name" label="参保月份" width="140">
                <template slot-scope="scope">
                  <span class="table-name">{{ scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="公司名称" width="140"></el-table-column>
              <el-table-column prop="idNo" label="参保人数" width="180"></el-table-column>
              <el-table-column prop="idNo" label="本月增员人数" width="100"></el-table-column>
              <el-table-column prop="empSex" label="本月减员人数" width="100">
                <template slot-scope="scope">{{ scope.row.empSex }}</template>
              </el-table-column>
              <el-table-column prop="workerStatus" label="个人社保合计" width="140">
                <template slot-scope="scope">{{ scope.row.workerStatus }}</template>
              </el-table-column>
              <el-table-column prop="reportStatus" label="公司社保合计" width="140">
                <template slot-scope="scope">{{ scope.row.reportStatus }}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="个人公积金合计" width="140">
                <template slot-scope="scope">{{ scope.row.idValidStatus }}</template>
              </el-table-column>
              <el-table-column prop="mobile" label="公司公积金合计" width="140"></el-table-column>
              <el-table-column prop="mobile" label="台账来源" width="140"></el-table-column>
              <el-table-column prop="mobile" label="是否归档" width="140"></el-table-column>
              <el-table-column label="操作" fixed="right" width="280px">
                <template slot-scope="scope">
                  <span class="funStyle" @click="goDetail(scope.row)">归档</span>
                  <el-popover
                    ref="popMore"
                    placement="bottom-end"
                    width="60"
                    trigger="hover">
                    <div class="funStyle more-style">重新生成</div>
                    <div class="funStyle more-style">导出</div>
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
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  export default {
    data() {
      return {
        ruleForm:{
          companyName:"",
          currPage:"1",
          pageSize:"20",
          month:""
        },
        companyList:[],
        loading:false,
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        list: [{name:"减员",type:'dec'},{name:"增员",type:'inc'}],
        closeModel: false,
        total:0,
    };
    },
    components:{

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
      getList() {
        this.loading = true;
        this.$store
          .dispatch("taxPageStore/actionEmpCollectList", this.ruleForm)
          .then(res => {
            if (res.success) {
              this.loading = false;
              this.total = res.data.count;
              this.list = res.data.data;
              this.increaseCount = res.data.increaseCount;
              this.decreaseCount = res.data.decreaseCount;
              this.awaitReportCount = res.data.awaitReportCount;
              this.normalCount = res.data.normalCount;
              this.failReportCount = res.data.failReportCount;
              this.awaitFeedBackCount = res.data.awaitFeedBackCount;
            }
          });
      },
      //导出
      handleSizeChange(val) {
        this.totalListForm.pageSize = val;
        this.totalListForm.currPage = 1;
        this.getList();
      },
      changeMonth(){

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
  .insured-account {
    .header {
      border-bottom: 1px solid #ededed;
    }
    .insured-account-content {
      padding: 20px 20px 0px 20px;
      .content-header {
        display: inline-block;
        font-size: 16px;
        margin:0px 0px 6px 20px;
        i {
          font-size: 16px;
          color: #ccc;
        }
        span {
          position: absolute;
          left: 32px;
          top: 3px;
          z-index: 0;
        }
      }
    }
    .screening {
      .check-staff-menu {
        .search-input {
          margin:0px 20px;
          width: 230px;
        }
      }
      .staff-table {
        position: relative;
        margin-top: 14px;
        .check-staff_table {
          overflow-x: auto;
        }
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
  }

</style>

