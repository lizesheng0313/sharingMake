<template>
  <div class="recharge public_input">
    <el-form
      :inline="true"
      label-position="right"
      label-width="100px"
      ref="refSearchForm"
      :model="searchFormData"
    >
      <el-form-item label="充值订单ID：" prop="id">
        <el-input v-model="searchFormData.id"></el-input>
      </el-form-item>
      <el-form-item label="订单状态：" prop="orderStatus">
        <el-select v-model="searchFormData.orderStatus">
          <el-option :label="item.val" :value="item.key" v-for="item in option" :key="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称：" prop="subMerchantId">
        <el-select v-model="searchFormData.subMerchantId">
          <el-option
            :label="item.val"
            :value="item.key"
            v-for="item in companyOption"
            :key="item.key"
          ></el-option>
        </el-select>
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="完成时间：" prop="completeTime">
        <el-date-picker
          v-model="searchFormData.completeTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :unlink-panels="true"
          type="daterange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        ></el-date-picker>
      </el-form-item>
      <p>
        <el-form-item>
          <el-button type="primary" @click="handleSearchForm">查询</el-button>
          <el-button @click="handleResetForm('refSearchForm')">重置</el-button>
          <el-button @click="handleExport">导出</el-button>
        </el-form-item>
      </p>
    </el-form>
    <el-card>
      <el-table
      border
        style="width: 100%"
        :data="tableList"
        v-loading="loading"
        :header-cell-style="{background:'#F5F5F5'}"
      >
        <el-table-column label="充值订单ID" prop="id" min-width="170"></el-table-column>
        <el-table-column label="订单状态" prop="mercialName" min-width="120">
          <template slot-scope="scope">{{rechargeStatus[scope.row.rstatus]}}</template>
        </el-table-column>
        <el-table-column label="公司名称" prop="childMerchatName" min-width="170"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="170"></el-table-column>
        <el-table-column label="完成时间" prop="rlastUpdateTime" min-width="170"></el-table-column>
        <el-table-column label="订单金额" prop="amount" min-width="170"></el-table-column>
        <el-table-column label="订单类型" min-width="170">
          <template slot-scope="scope">{{orderType[scope.row.rchannel]}}</template>
        </el-table-column>
        <el-table-column label="失败原因" prop="lastErrorInfo" min-width="170"></el-table-column>
      </el-table>
      <el-pagination
        class="pages"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="searchFormData.currPage"
        :page-size="searchFormData.pageSize"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { rechargeStatus, orderType } from "@/utils/constData";
export default {
  data() {
    return {
      option: [],
      companyOption: [],
      rechargeStatus,
      orderType,
      total: 0,
      loading: false,
      searchFormData: {
        subMerchantId: "",
        completeEndTime: "",
        completeStartTime: "",
        endTime: "",
        id: "",
        pageSize: 10,
        currPage: 1,
        startTime: "",
        orderStatus: "",
        countTime: [],
        completeTime: [],
      },
      tableList: []
    };
  },
  computed: {
    ...mapState({
      agentInfoObj: state => state.agentInfoObj
    })
  },
  mounted() {
    this.$store
      .dispatch("withdrawalPageStore/actionRechargeStatusComb")
      .then(res => {
        this.option = res.data;
      });
    this.$store
      .dispatch("withdrawalPageStore/actionGetMerchantComb")
      .then(res => {
        this.companyOption = res.data;
      });
    this.fetchTableList(1);
  },
  methods: {
    handleExport() {
      this.$store.dispatch(
        "withdrawalPageStore/actionRechargeExport",
        this.collatingFormData(this.searchFormData)
      );
    },
    fetchTableList(curr) {
      this.loading = true;
      this.searchFormData.currPage = curr || this.searchFormData.currPage;
      this.$store
        .dispatch(
          "withdrawalPageStore/actionRecordslist",
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
    },
    handleResetForm(formName) {
      this.searchFormData.startTime = null;
      this.searchFormData.endTime = null;
      this.searchFormData.completeStartTime = null;
      this.searchFormData.completeEndTime = null;
      this.$refs[formName].resetFields();
      this.fetchTableList(1);
    },
    handleCurrentChange(e) {
      this.fetchTableList(e);
    },
    collatingFormData(formData) {
      let copyFormData = { ...formData };
      copyFormData["startTime"] = copyFormData.countTime[0] || null;
      copyFormData["endTime"] = copyFormData.countTime[1] || null;
      copyFormData["completeStartTime"] = copyFormData.completeTime[0] || null;
      copyFormData["completeEndTime"] = copyFormData.completeTime[1] || null;
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
</style>
