<template>
  <div class="socialProvident el-diy-month">
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
            v-model="totalListForm.key"
            prefix-icon="iconiconfonticonfontsousuo1 iconfont"
            clearable
            @keyup.enter.native="handleSearch"
            class="search-input left"
          ></el-input>
          <div class="left">
            <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
          </div>
          <div class="right">
            <el-button type="primary" plain @click="handleCopyData">复制上月数据</el-button>
            <el-button type="primary" plain @click="handleImport">导入</el-button>
            <el-button type="warning" plain class="export-button" @click="handleExport">导出</el-button>
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
            :style="{width:screenWidth-40+'px'}"
          >
            <el-table-column width="55" label="序号" type="index"></el-table-column>
            <el-table-column prop="empNo" label="工号"></el-table-column>
            <el-table-column prop="empName" label="姓名"></el-table-column>
            <el-table-column label="证件号码" prop="idNo"></el-table-column>
            <el-table-column label="扣缴义务人名称" prop="taxSubName"></el-table-column>
            <el-table-column prop="pensionInsurancePerson" label="养老个人"></el-table-column>
            <el-table-column prop="medicalInsurancePerson" label="医疗个人"></el-table-column>
            <el-table-column prop="unemploymentInsurancePerson" label="失业个人"></el-table-column>
            <el-table-column prop="seriousMedicalInsurancePerson" label="大病医疗个人" width="100px"></el-table-column>
            <el-table-column prop="socialSecurityPerson" label="社保个人合计" width="100px"></el-table-column>
            <el-table-column prop="pensionInsuranceComp" label="养老单位"></el-table-column>
            <el-table-column prop="medicalInsuranceComp" label="医疗单位"></el-table-column>
            <el-table-column prop="unemploymentInsuranceComp" label="失业单位"></el-table-column>
            <el-table-column prop="industrialInjuryInsuranceComp" label="工伤单位"></el-table-column>
            <el-table-column prop="birthInsuranceComp" label="生育单位"></el-table-column>
            <el-table-column prop="seriousMedicalInsuranceComp" label="大病医疗单位" width="100px"></el-table-column>
            <el-table-column prop="socialSecurityComp" label="社保单位合计" width="100px"></el-table-column>
            <el-table-column prop="socialSecurityTotal" label="社保合计"></el-table-column>
            <el-table-column prop="housingFundPerson" label="公积金个人"></el-table-column>
            <el-table-column prop="housingFundComp" label="公积金单位"></el-table-column>
            <el-table-column prop="housingFundTotal" label="公积金合计"></el-table-column>
            <el-table-column prop="disabilityInsuranceFee" label="残保金"></el-table-column>
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
      <import-data
        ref="import"
        :radioList="radioList"
        :title="'公积金导入'"
        :apiCheck="'/api/salary/socialProvident/verify'"
        :apiDownloadLog="'salaryCalStore/actionSocialProvidentRecord'"
        :apiDownloadTemplate="'salaryCalStore/actionSocialProvidentTemplate'"
        :parameterData="parameterData"
        sendRadio="BY_EMP_NO"
        @changeRadioValue="changeRadioValue"
        :impoartAction="'salaryCalStore/actionSocialProvident'"
        @getLoading="refresh"
        :uploadFileData="uploadFileData"
        :tips="'说明：导入模板中空单元格薪资项，导入后不覆盖系统中对应薪资'"
      ></import-data>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import importData from "@/components/tool/importData";
import fun from "@/util/fun"
let date = fun.headDate();
let defaultDate =
  date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month);

export default {
  components: {
    importData,
  },
  data() {
    return {
      loading: false,
      totalListForm: {
        currPage: 1,
        pageSize: 20,
        checkId:this.$route.query.id,
        key: "",
      },
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      list: [],
      total: 0,
      radioList: [
          { lable: "BY_EMP_NO", title: "通过员工工号匹配人员" },
          { lable: "BY_ID_NO", title: "通过身份证匹配人员" }
        ],
        parameterData: {
          'checkId':this.$route.query.id,
          'importType':'BY_EMP_NO'
        },
        uploadFileData: {
          uuid: "",
          checkId:this.$route.query.id,
          importType:"BY_EMP_NO"
        },
        setWarning:false,
    };
  },
  computed:{

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
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionSocialBenefitsList", this.totalListForm)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.total = res.data.count;
            this.list = res.data.data;
          }
        });
      this.getSalaryStatus();
    },
    //查看工资表状态
    getSalaryStatus(){
      this.$store.dispatch('salaryCalStore/actionGetSalaryStatus',this.totalListForm.checkId).then(res=>{
        if(res.code === "0000"){
          this.checkStatus = res.data.checkStatus;
          this.setWarning = (this.checkStatus ==='CHECKED_SALARY' || this.checkStatus ==='PAID' || this.checkStatus ==='FINISH');
        }
      })
    },
    handleExport() {
      this.$store.dispatch(
        "salaryCalStore/actionSocialProvidentExport",this.totalListForm
      );
    },
    changeRadioValue(val) {
      this.parameterData.importType = val;
      this.uploadFileData.importType= val;
    },
    refresh(data) {
      this.getList();
    },
    //导入
    handleImport() {
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        this.$refs.import.show();
      }
    },
    //复制上月数据
    handleCopyData(){
      if(this.setWarning){
        this.$message.warning("工资表已审核，不允许操作。")
      }else{
        this.$confirm('您确定复制上月的社保公积金数据，复制后将覆盖本月相同人员的社保公积金数据', '复制确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$store
            .dispatch("salaryCalStore/actionSyncLastMonthSocial", {
              checkId:this.$route.query.id
            })
            .then(res => {
              if(res.success){
                this.$message({
                  type: 'success',
                  message: '复制成功'+res.data+'条数据!'
                });
                this.getList()
              }
            })
        }).catch(() => {
        });
      }
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
.socialProvident {
  padding:0 20px;
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
}
</style>

