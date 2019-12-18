<template>
    <div class="pay-record page-module">
        <div>
            <el-form :inline="true" label-position="right" label-width="100px" :model="searchFormData" ref="refSearchFrom">
                <el-form-item label="公司名称：" prop="merchantId">
                    <el-select v-model="searchFormData.merchantId">
                        <el-option v-for="(merchant,index) in selectMerchant" :key="index" :label="merchant.val" :value="merchant.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发放月份：" prop="payMonth">
                    <el-date-picker v-model="searchFormData.payMonth" value-format="yyyyMM" type="month" placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="批次状态：" prop="status">
                    <el-select v-model="searchFormData.status">
                        <el-option v-for="(status,index) in selectStatus" :key="index" :label="status.val" :value="status.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代发批次号：" prop="batchId">
                    <el-input v-model="searchFormData.batchId"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：" prop="time">
                    <el-date-picker type="daterange" :clearable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']" v-model="searchFormData.time"></el-date-picker>
                </el-form-item>
                <div>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearchForm">查询</el-button>
                        <el-button @click="resetForm('refSearchFrom')">重置</el-button>
                        <el-button @click="handleExport">导出</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="div-module">
            <el-table border :data="recordList" v-loading="loading" :header-cell-style="{background:'#F5F5F5'}">
                <el-table-column label="批次号" prop="id" min-width="120"></el-table-column>
                <el-table-column label="公司名称" prop="enterpriseName" min-width="170"></el-table-column>
                <el-table-column label="发放月份" prop="payMonth" min-width="170"></el-table-column>
                <el-table-column label="批次状态" prop="statusStr" min-width="170"></el-table-column>
                <el-table-column label="订单总数" prop="orderNum" min-width="120"></el-table-column>
                <el-table-column label="出款成功订单数" prop="orderSuccessNum" min-width="120"></el-table-column>
                <el-table-column label="实发金额" prop="amountSuccess" min-width="170"></el-table-column>
                <el-table-column label="支付时间" prop="payTime" min-width="170"></el-table-column>
                <el-table-column label="操作" min-width="120">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDetail(scope.row.id)" v-if="['PAID','CLOSED'].includes(scope.row.status)">查看</el-button>
                        <el-button type="text" @click="handleDeleteBatch(scope.row.id)" v-if="scope.row.status != 'PAID'">删除</el-button>
                        <el-button type="text" @click="handleContinuePay(scope.row)" v-if="['CHECK_ALL_SUCCESS','CHECK_PART_SUCCESS','CHECK_ALL_FAIL'].includes(scope.row.status)">继续代发</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pages" layout="total, prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="searchFormData.currPage" :page-size="searchFormData.pageSize"
                :total="recordListTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            loading: false,
            searchFormData: {
                currPage: 1,
                pageSize: 10,
                merchantId: "",
                payMonth: "",
                status: "",
                batchId: "",
                time: [],
                startTime: "",
                endTime: ""
            },
            selectMerchant: [],
            selectStatus: []
        };
    },
    computed: {
        ...mapState("payManageStore", {
            recordList: "recordList",
            recordListTotal: "recordListTotal"
        })
    },
    mounted() {
        this.fetchTableList();
        this.fetchSelectMerchant();
        this.fetchSelectStatus();
    },
    methods: {
        fetchTableList(curr) {
            this.loading = true;
            this.searchFormData.currPage = curr || this.searchFormData.currPage;
            this.$store.dispatch("payManageStore/postRecordList", this.filterForm(this.searchFormData)).then(() => {
                this.loading = false;
            });
        },
        handleCurrentChange() {
            this.fetchTableList();
        },
        handleSearchForm() {
            this.fetchTableList(1);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.fetchTableList(1);
        },
        handleDetail(batchId) {
            this.$router.push({
                path: "/record-detail",
                query: {
                    batchId
                }
            });
        },
        handleDeleteBatch(id) {
            this.$confirm("删除批次后不可恢复，是否继续？", "是否删除该代发批次", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$store.dispatch("payManageStore/postDeleteBatch", { id }).then(res => {
                        if (res.success) {
                            this.$message.success("删除成功");
                            this.fetchTableList();
                            this.fetchSelectMerchant();
                            this.fetchSelectStatus();
                        }
                    });
                })
                .catch(() => {});
        },
        fetchSelectMerchant() {
            this.$store.dispatch("payManageStore/postSelectMerchant").then(res => {
                this.selectMerchant = res.data;
            });
        },
        fetchSelectStatus() {
            this.$store.dispatch("payManageStore/postSelectStatus").then(res => {
                this.selectStatus = res.data;
            });
        },
        filterForm(formData) {
            let _formData = { ...formData };
            //由于后端接受日期字段是分开的，所以集中处理下
            _formData["startTime"] = _formData.time[0] || "";
            _formData["endTime"] = _formData.time[1] || "";
            //接口不接受多余key，删除掉自己定义的
            delete _formData.time;
            return _formData;
        },
        handleExport() {
            this.$store.dispatch("payManageStore/postRecordExport", this.filterForm(this.searchFormData)).then(res => {});
        },
        handleContinuePay(row) {
            const salaryInfo = {
                batchId: row.id,
                salaryType: row.source == "XST" ? "create" : "import",
                salaryMerchantId: row.merchantId,
                salaryLevel: row.level,
                monthSelected: row.payMonth,
                salaryMasterId: row.supMerchantId,
                isContinue: true
            };
            this.$store.commit("payManageStore/SET_SALARYINFO", salaryInfo);
            this.$router.push("/batch-edite");
        }
    }
};
</script>

<style lang="scss" scoped>
.pay-record {
}
</style>
