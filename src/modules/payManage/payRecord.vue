<template>
    <div class="pay-record page-module">
        <header class="header main-title">
            <el-row type="flex">
                <el-col :span="12">
                    <span>批量代发记录</span>
                </el-col>
            </el-row>
        </header>
        <div class="flex-center">
            <div>
                <el-button type="default" @click="dlgFilter = true">筛选</el-button>
                <!-- <el-input placeholder="请输入姓名\工号\身份证号" v-model="searchFormData.payMonth" prefix-icon="iconiconfonticonfontsousuo1 iconfont" class="search-input"></el-input> -->
                <el-date-picker v-model="searchFormData.payMonth" value-format="yyyyMM" type="month" placeholder="选择月" class="search-input" clearable>
                </el-date-picker>
                <el-button type="primary" @click="handleSearch">查询</el-button>
            </div>
            <el-button @click="handleExport" v-if="privilegeVoList.includes('salary.psalaryIssuing.batchRecord.export')">导出</el-button>
        </div>
        <div class="main-content">
            <el-table :data="recordList" v-loading="loading" border :height="screenHeight">
                <el-table-column label="批次号" prop="id" min-width="120"></el-table-column>
                <el-table-column label="公司名称" prop="enterpriseName" min-width="170"></el-table-column>
                <el-table-column label="发放月份" prop="payMonth" min-width="170"></el-table-column>
                <el-table-column label="批次状态" prop="statusStr" min-width="170"></el-table-column>
                <el-table-column label="订单总数" prop="orderNum" min-width="120"></el-table-column>
                <el-table-column label="出款成功订单数" prop="orderSuccessNum" min-width="120"></el-table-column>
                <el-table-column label="实发金额" prop="amountSuccess" min-width="170"></el-table-column>
                <el-table-column label="支付时间" prop="payTime" min-width="170"></el-table-column>
                <el-table-column label="操作" min-width="170" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDetail(scope.row.id)"
                            v-if="['PAID','CLOSED'].includes(scope.row.status) && privilegeVoList.includes('salary.psalaryIssuing.batchRecord.select')">查看</el-button>
                        <el-button type="text" @click="handleDeleteBatch(scope.row.id)" v-if="scope.row.status != 'PAID' && privilegeVoList.includes('salary.psalaryIssuing.batchRecord.delete')">删除
                        </el-button>
                        <el-button type="text" @click="handleContinuePay(scope.row)" v-if="['CHECK_ALL_SUCCESS','CHECK_PART_SUCCESS','CHECK_ALL_FAIL'].includes(scope.row.status)&&
                                   privilegeVoList.includes('salary.psalaryIssuing.batchRecord.continue')
                          ">继续代发</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pages" layout="total, prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="searchFormData.currPage" :page-size="searchFormData.pageSize"
                :total="recordListTotal">
            </el-pagination>
        </div>

        <el-dialog width="52%" center :close-on-click-modal="false" v :visible.sync="dlgFilter">
            <el-form label-position="right" label-width="100px" :model="searchFormData" ref="refSearchFrom">
                <el-form-item label="公司名称：" prop="merchantId">
                    <el-select v-model="searchFormData.merchantId">
                        <el-option v-for="(merchant,index) in selectMerchant" :key="index" :label="merchant.val" :value="merchant.key"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="发放月份：" prop="payMonth">
                    <el-date-picker v-model="searchFormData.payMonth" value-format="yyyyMM" type="month" placeholder="选择月">
                    </el-date-picker>
                </el-form-item> -->
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSearchForm">查询</el-button>
                <el-button @click="resetForm('refSearchFrom')">重置</el-button>
            </span>
        </el-dialog>
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
            selectStatus: [],
            dlgFilter: false,
            screenHeight: document.body.clientHeight - 280,
        };
    },
    computed: {
        ...mapState("payManageStore", {
            recordList: "recordList",
            recordListTotal: "recordListTotal"
        }),
        ...mapState({
            privilegeVoList: state => state.privilegeVoList
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
            this.dlgFilter = false;
        },
        handleSearch() {
            const param = {
                currPage: 1,
                pageSize: 10,
                payMonth: this.searchFormData.payMonth
            };
            this.$store.dispatch("payManageStore/postRecordList", param).then(() => {
                this.loading = false;
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.fetchTableList(1);
            this.dlgFilter = false;
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
}
</style>
