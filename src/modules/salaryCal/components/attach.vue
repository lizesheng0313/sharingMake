<template>
  <div class="calc-attach el-diy-month">
    <div class="tax-content">
<!--      <div class="content-header head-date">-->
<!--        <i class="el-icon-arrow-left"></i>-->
<!--        <el-date-picker-->
<!--          v-model="totalListForm.queryMonth"-->
<!--          type="month"-->
<!--          @input="changeMonth"-->
<!--          value-format="yyyy-MM"-->
<!--          :editable="false"-->
<!--          :clearable="false"-->
<!--        ></el-date-picker>-->
<!--        <i class="el-icon-arrow-right"></i>-->
<!--      </div>-->
      <div class="screening">
        <div class="clearfix check-staff-menu">
          <el-input
            placeholder="请输入姓名\证件号码"
            v-model="totalListForm.nameOrMore"
            prefix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            @keyup.enter.native="handleSearch"
            class="search-input left"
          ></el-input>
          <div class="left">
            <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
          </div>
          <div class="right">
            <el-button type="warning" plain class="export-button" @click="handleExport">全部下载</el-button>
          </div>
        </div>
        <div class="staff-table">
          <!-- <div class="floating-menu">
        <span>删除</span>
          </div>-->
          <el-table
            :data="list"
            class="check-staff_table"
            v-loading="loading"
          >
            <el-table-column width="55" label="序号" type="index"></el-table-column>
            <el-table-column prop="empName" label="姓名"></el-table-column>
            <el-table-column prop="idNo" label="身份证号"></el-table-column>
            <el-table-column label="入职日期">
              <template slot-scope="scope">
                <span>{{ scope.row.empDay.split(' ')[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="totalChildrenEdu" label="累计子女教育"></el-table-column>
            <el-table-column prop="totalFurtherEdu" label="累计继续教育"></el-table-column>
            <el-table-column prop="totalHomeLoads" label="累计住房贷款利息"></el-table-column>
            <el-table-column prop="totalHouseRent" label="累计住房租金"></el-table-column>
            <el-table-column prop="totalSupportParents" label="累计赡养老人"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            :page-size="totalListForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[20, 50, 100, 200]"
            class="staff-page"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="isShowDownLoadTip"
      width="500px"
      center
      class="diy-el_dialog"
    >
      <div class="downdloadTip"><i class="el-icon-success"></i> <span> 提示</span></div>
      <div class="noDownLoad">申报密码错误，对应人员专项附加扣除未下载</div>
      <div class="dialog-footer-right">
        <el-button type="primary" @click="isShowDownLoadTip=false">我知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import fun from "@/util/fun"
let date = fun.headDate();
let defaultDate =
  date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);

export default {
  components: {},
  data() {
    return {
      loading: false,
      totalListForm: {
        currPage: 1,
        pageSize: 20,
        queryMonth: defaultDate,
        taxSubjectId: "",
        nameOrMore: ""
      },
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      list: [],
      total: 0,
      isShowDownLoadTip:false,
    };
  },
  mounted() {
   this.getList()
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    handleExport() {
      // this.$store.dispatch(
      //   "taxPageStore/actionOtherTotalExport",
      //   this.totalListForm
      // ).then(res=>{
      //   console.log(res)
      // });
      this.isShowDownLoadTip= true;
    },
    changeMonth() {
      this.getList()
    },
    handleSearch() {
      this.totalListForm.currPage = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.totalListForm.pageSize = val;
      this.totalListForm.currPage = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionOtherTotalList", this.totalListForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.total = res.data.count;
            this.list = res.data.data;
          }
        });
    },
    handleCalcSalary() {
      this.$router.push("/salary-cal/start");
    },
    goSalarySet() {
      this.$router.push("/salarySet");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.calc-attach {
  padding:0 22px;
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
  .tax-attach-tips {
    font-size: 12px;
    color: #666;
    margin-bottom: 20px;
  }
  .tax-content {
    .company-collection {
      height: 80px;
      padding: 20px 0;
      overflow-y: scroll;
      background: rgba(247, 248, 250, 1);
      font-size: 14px;
      color: #333333;
      .company-item {
        margin-bottom: 15px;
      }
      .company-item:last-child {
        margin-bottom: 0;
      }
      .company-name {
        padding-left: 40px;
        @include ellipsis;
        width: 200px;
        display: inline-block;
      }
      p {
        margin-top: 7px;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 500;
        text-overflow: ellipsis;
      }
      .update-value {
        height: 35px;
        margin-right: 50px;
        color: $mainColor;
        cursor: pointer;
      }
    }
    .download-total {
      color: #666;
      margin-left: 50px;
      font-size: 12px;
    }
    .content-header {
      position: relative;
      font-size: 18px;
      margin-bottom: 18px;
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
    .select_tax-payer {
      margin-top: 18px;
      font-size: 14px;
      color: #999;
      em {
        font-style: normal;
        color: #333;
        font-weight: 400;
      }
    }
    .footnotes {
      margin-top: 10px;
      p {
        margin-top: 10px;
        color: #999;
        font-size: 12px;
      }
    }
  }
  .check-staff-menu {
    margin-top: 30px;
    .search-input {
      width: 250px;
    }
    .export-button {
      color: #ff8f2c;
      border: 1px solid #ff8f2c;
      background: #fff;
    }
  }
  .tax-search {
    margin-left: 20px;
  }
  .screening {
    .staff-table {
      .check-staff_table {
        overflow-x: auto;
      }
      position: relative;
      margin-top: 27px;
      .staff-page {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
  .diy-el_dialog {
    .company-name {
      @include ellipsis;
      width: 200px;
      display: inline-block;
    }
  }
  .current-tab-sub_name {
    @include ellipsis;
    width: 200px;
    display: inline-block;
  }
  .el-icon-success{
    color:#67C23A;
    font-size: 18px;
  }
  .downdloadTip{
    margin-bottom:20px;
  }
  .dialog-footer-right{
    text-align: right !important;
  }
  .noDownLoad{
    margin-left: 34px;
  }
}
</style>

