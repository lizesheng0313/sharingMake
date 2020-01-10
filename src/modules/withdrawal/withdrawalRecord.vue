<template>
  <div class="withdraw public_input">
    <header class="header main-title">
      <el-row type="flex">
        <el-col :span="12">
          <span>提现记录</span>
        </el-col>
      </el-row>
    </header>
    <div class="flex-center">
      <div>
        <el-button type="default" @click="dlgFilter = true">筛选</el-button>
        <span class="picker-time">
          <el-date-picker
              v-model="searchFormData.completeTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              :unlink-panels="true"
              type="daterange"
              range-separator="至"
              start-placeholder="完成时间始"
              end-placeholder="完成时间止"
              :clearable="clearable"
            ></el-date-picker>
        </span>

        <el-button type="primary" @click="changeCompleteTime">查询</el-button>
      </div>
      <el-button @click="handleExport" v-if="privilegeVoList.includes('salary.account.withdraw.export')">导出</el-button>
    </div>
    <div class="main-content">
      <el-table :data="tableList" v-loading="loading" border :height="screenHeight">
        <el-table-column label="提现订单ID" prop="id" min-width="120"></el-table-column>
        <el-table-column label="订单状态" prop="mercialName" min-width="170">
          <template slot-scope="scope">{{withdrawStatus[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="到账账户名" prop="realName" min-width="170"></el-table-column>
        <el-table-column label="到账卡号" prop="bankCardNo" min-width="200"></el-table-column>
        <el-table-column label="到账金额" prop="amount" min-width="170"></el-table-column>
        <el-table-column label="手机号" prop="phoneNo" min-width="170"></el-table-column>
        <el-table-column label="完成时间" prop="completeTime" min-width="170"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="170"></el-table-column>
        <el-table-column label="提现失败原因" prop="failReason" min-width="170"></el-table-column>
      </el-table>
      <el-pagination
        class="pages"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="searchFormData.currPage"
        :page-size="searchFormData.pageSize"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog width="52%" center :close-on-click-modal="false" v :visible.sync="dlgFilter" class="select-dialog">
      <el-form
        label-position="right"
        label-width="100px"
        ref="refSearchForm"
        :model="searchFormData"
      >
        <!-- <el-form-item label="提现订单ID：" prop="id">
          <el-input v-model="searchFormData.id"></el-input>
        </el-form-item> -->
        <el-form-item label="订单状态：" prop="status">
          <el-select v-model="searchFormData.status">
            <el-option :label="item.val" :value="item.key" v-for="item in option" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到账账户名：" prop="realName">
          <el-input v-model="searchFormData.realName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" prop="countTime">
          <el-date-picker
            v-model="searchFormData.countTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            :unlink-panels="true"
            type="daterange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :clearable="clearable"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSearchForm">查询</el-button>
        <el-button @click="handleResetForm('refSearchForm')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { withdrawStatus } from "@/utils/constData";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      option: [],
      withdrawStatus,
      total: 0,
      loading: false,
      searchFormData: {
        completedTimeEnd: null,
        completedTimeStart: null,
        endTime: null,
        id: "",
        pageSize: 10,
        realName: "",
        currPage: 1,
        startTime: null,
        status: "",
        countTime: [],
        completeTime: [],
      },
      tableList: [],
      dlgFilter: false,
      screenHeight : document.body.clientHeight - 280,
      clearable:false,
    };
  },
  computed: {
    ...mapState({
      agentInfoObj: state => state.agentInfoObj
    }),
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList
    })
  },
  created(){
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight - 280;
      })();
    };
  },
  mounted() {
    this.$store
      .dispatch("withdrawalPageStore/actionWithdrawStatusComb")
      .then(res => {
        this.option = res.data;
      });
    this.fetchTableList();
  },
  methods: {
    handleExport() {
      this.$store
        .dispatch(
          "withdrawalPageStore/actionWithdrawExport",
          this.collatingFormData(this.searchFormData)
        )
    },
    fetchTableList(curr) {
      this.loading = true;
      this.searchFormData.currPage = curr || this.searchFormData.currPage;
      this.$store
        .dispatch(
          "withdrawalPageStore/actionWithdrawList",
          this.collatingFormData(this.searchFormData)
        )
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.tableList = res.data.list;
        });
    },
    handleSearchForm() {
      this.fetchTableList(1);
      this.dlgFilter = false;
    },
    handleResetForm(formName) {
      this.searchFormData.startTime = null;
      this.searchFormData.endTime = null;
      this.searchFormData.completedTimeStart = null;
      this.searchFormData.completedTimeEnd = null;
      this.$refs[formName].resetFields();
      this.fetchTableList(1);
      this.dlgFilter = false;
    },
    //开始结束时间筛选
    changeCompleteTime() {
      this.fetchTableList()
    },
    handleCurrentChange(e) {
      this.fetchTableList(e);
    },
    collatingFormData(formData) {
      let copyFormData = { ...formData };
      copyFormData["startTime"] = copyFormData.countTime[0] || null;
      copyFormData["endTime"] = copyFormData.countTime[1] || null;
      copyFormData["completedTimeStart"] = copyFormData.completeTime[0] || null;
      copyFormData["completedTimeEnd"] = copyFormData.completeTime[1] || null;
      delete copyFormData.countTime;
      delete copyFormData.completeTime;
      return copyFormData;
    },
    handleGoDetails(row) {
      this.$router.push({
        path: "/my-merchant-details",
        query: {
          mercialId: row.mercialId
        }
      });
    },
    handleGoExport() {
      this.$router.push("/agent-report-records");
    }
  }
};
</script>
<style lang="scss" scoped>
.withdraw{
  .flex-center {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding:20px 20px 0px 20px;
  }
  .header {
    border-bottom: 1px solid #ededed;
  }
  .el-select,
  .el-input,
  .el-date-editor--month {
    width: 200px !important;
  }
  .search-input{
    margin:0 20px;
  }
  .select-dialog{
    .el-range-editor.el-input__inner {
      line-height: 35px;
      height: 35px;
    }
  }
  .el-range-editor.el-input__inner {
    line-height:39px;
  }
  .picker-time {
    display: inline-block;
    margin:0 20px;
  }
}
</style>
