<template>
    <div class="pay-order page-module">
        <header class="header main-title">
            <el-row type="flex">
                <el-col :span="12">
                    <span>代发订单</span>
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
            <el-button @click="handleExport">导出</el-button>
        </div>
        <div>
            <el-table :data="orderList" v-loading="loading">
                <el-table-column label="公司名称" prop="enterpriseName" min-width="170"></el-table-column>
                <el-table-column label="发放月份" prop="payMonth" min-width="170"></el-table-column>
                <el-table-column label="姓名" prop="realName" min-width="170"></el-table-column>
                <el-table-column label="银行卡号" prop="bankCardNo" min-width="200"></el-table-column>
                <el-table-column label="实发金额" prop="amount" min-width="170"></el-table-column>
                <el-table-column label="订单状态" prop="statusStr" min-width="170"></el-table-column>
                <el-table-column label="身份证号" prop="idCard" min-width="170"></el-table-column>
                <el-table-column label="手机号" prop="phoneNo" min-width="170"></el-table-column>
                <el-table-column label="代发订单号" prop="id" min-width="120"></el-table-column>
                <el-table-column label="批次号" prop="orderBatchId" min-width="120"></el-table-column>
                <el-table-column label="失败原因" min-width="170">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.failReason" placement="top">
                            <div class="width-fixed">{{scope.row.failReason}}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" min-width="170"></el-table-column>
                <el-table-column label="支付时间" prop="payTime" min-width="170"></el-table-column>
            </el-table>
            <el-pagination class="pages" layout="total, prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="searchFormData.currPage" :page-size="searchFormData.pageSize"
                :total="orderListTotal">
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
                <el-form-item label="订单状态：" prop="status">
                    <el-select v-model="searchFormData.status">
                        <el-option v-for="(status,index) in orderStatus" :key="index" :label="status.val" :value="status.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代付订单号：" prop="id">
                    <el-input v-model="searchFormData.id"></el-input>
                </el-form-item>
                <el-form-item label="批次号：" prop="batchId">
                    <el-input v-model="searchFormData.batchId"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="realName">
                    <el-input v-model="searchFormData.realName"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="idCard">
                    <el-input v-model="searchFormData.idCard"></el-input>
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
                endTime: "",
                id: "",
                realName: "",
                idCard: ""
            },
            selectMerchant: [],
            orderStatus: [],
            dlgFilter: false
        };
    },
    computed: {
        ...mapState("payManageStore", {
            orderList: "orderList",
            orderListTotal: "orderListTotal"
        })
    },
    mounted() {
        this.fetchTableList();
        this.fetchSelectMerchant();
        this.fetchOrderStatus();
    },
    methods: {
        fetchTableList(curr) {
            this.loading = true;
            this.searchFormData.currPage = curr || this.searchFormData.currPage;
            this.$store.dispatch("payManageStore/postOrderList", this.filterForm(this.searchFormData)).then(() => {
                this.loading = false;
            });
        },
        fetchSelectMerchant() {
            this.$store.dispatch("payManageStore/postSelectMerchant").then(res => {
                this.selectMerchant = res.data;
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
            this.$store.dispatch("payManageStore/postOrderList", param).then(() => {
                this.loading = false;
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.fetchTableList(1);
            this.dlgFilter = false;
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
        fetchOrderStatus() {
            this.$store.dispatch("payManageStore/postOrderStatus").then(res => {
                this.orderStatus = res.data;
            });
        },
        handleExport() {
            this.$store.dispatch("payManageStore/postOrderExport", this.filterForm(this.searchFormData)).then(res => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.pay-order {
    .flex-center {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding:20px 20px 0px 20px;
    }
    .width-fixed {
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
    }
    .header {
        border-bottom: 1px solid #ededed;
        margin-bottom: 10px;
    }
    .el-select,
    .el-input,
    .el-date-editor--month {
        width: 200px !important;
    }
}
</style>
