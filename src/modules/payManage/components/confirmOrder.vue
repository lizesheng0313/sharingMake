<template>
    <el-row class="confirm-order" v-loading="wrapLoading">
        <div class="intro">
            <div class="intro-title">说明：</div>
            <div class="intro-cnt">
                <p>• 仅校验通过的订单可进行代发，校验失败的订单不可进行代发(说明：每条数据都是1个独立订单)</p>
                <p>• 请确认发薪公司名称是否准确，发薪公司名称会显示在员工银行卡的交易详情中</p>
            </div>
        </div>
        <div class="pre">
            <div>
                <div class="nav">
                    <div :class="['nav-item', filterStatus == '' ? 'nav-item-active' : '']" @click="handleFilterStatus('')">
                        <div class="nav-title">
                            <div>
                                <span>全部订单</span>
                                <span>（笔数 / 总金额）</span>
                            </div>
                        </div>
                        <div class="nav-cnt">{{batchInfo.sumNum}}笔<span class="nav-line">|</span>{{batchInfo.sumAmount}}元</div>
                    </div>
                    <div :class="['nav-item', filterStatus == 'CHECK_SUCCESS' ? 'nav-item-active' : '']" @click="handleFilterStatus('CHECK_SUCCESS')">
                        <div class="nav-title">
                            <div>
                                <span class="color-succ">校验成功订单</span>
                                <span>（笔数 / 总金额）</span>
                            </div>
                        </div>
                        <div class="nav-cnt">{{batchInfo.checkSuccessNum}}笔<span class="nav-line">|</span>{{batchInfo.checkSuccessAmount}}元</div>
                    </div>
                    <div :class="['nav-item', filterStatus == 'CHECK_FAIL' ? 'nav-item-active' : '']" @click="handleFilterStatus('CHECK_FAIL')">
                        <div class="nav-title">
                            <div>
                                <span class="color-fail">校验失败订单</span>
                                <span>（笔数 / 总金额）</span>
                            </div>
                            <p class="nav-down" @click="handleDownload">
                                <i class="el-icon-download" style="font-size:16px;"></i>
                                <span>下载</span>
                            </p>
                        </div>
                        <div class="nav-cnt nav-flex">
                            <div>
                                {{batchInfo.checkFailNum}}笔<span class="nav-line">|</span>{{batchInfo.checkFailAmount}}元
                            </div>
                            <!-- <div class="nav-down">
                                <span>批量编辑</span>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <el-button @click="handleDeleteBatch">删除批次</el-button>
        </div>
        <div class="total">
            <div>
                <div>发薪公司名称：{{batchInfo.enterpriseName}}<span style="margin-left:20px;">{{batchInfo.payMonth}}工资</span></div>
                <div>可代发订单：<span class="color-green">{{batchInfo.checkSuccessNum}} 笔</span></div>
                <div>总代发金额：<span class="color-green">{{batchInfo.checkSuccessAmount}} 元</span></div>
            </div>
            <el-button type="primary" @click="handleConfirmOrder" v-if="privilegeVoList.includes('salary.psalaryIssuing.batchRecord.pay')">确认代发</el-button>
        </div>
        <el-table border :data="orderList" v-loading="loading" :header-cell-style="{background:'#F5F5F5'}">
            <el-table-column label="批次号" prop="orderBatchId"></el-table-column>
            <el-table-column label="姓名" prop="realName"></el-table-column>
            <el-table-column label="证件号码" prop="idCard"></el-table-column>
            <el-table-column label="手机号" prop="phoneNo"></el-table-column>
            <el-table-column label="开户行" prop="openingBank"></el-table-column>
            <el-table-column label="银行卡号" prop="bankCardNo"></el-table-column>
            <el-table-column label="实发金额" prop="amount"></el-table-column>
            <el-table-column label="订单状态" prop="statusStr"></el-table-column>
            <el-table-column label="失败原因" prop="failReason"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEdite(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleDeleteOrder(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pages" layout="total, prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="searchFormData.currPage" :page-size="searchFormData.pageSize"
            :total="orderListTotal">
        </el-pagination>
        <!-- 编辑弹窗 -->
        <el-dialog title="编辑" :visible.sync="dlgEdite" width="550px">
            <el-form :model="dlgFormData" label-position="right" label-width="90px">
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="dlgFormData.realName" :disabled="dlgOrder.source == 'XST'"></el-input>
                </el-form-item>
                <el-form-item label="证件号码" prop="idCard">
                    <el-input v-model="dlgFormData.idCard" :disabled="dlgOrder.source == 'XST'"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankCardNo">
                    <el-input v-model="dlgFormData.bankCardNo"></el-input>
                </el-form-item>
                <el-form-item label="实发金额" prop="amount">
                    <el-input v-model="dlgFormData.amount" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirmEdite">确定</el-button>
                <el-button @click="dlgEdite = false">取消</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import { mapState } from "vuex";
import utils from "@/utils/utils";
export default {
    data() {
        return {
            loading: false,
            wrapLoading: false,
            dlgEdite: false,
            filterStatus: "",
            searchFormData: {
                currPage: 1,
                pageSize: 10,
                status: "",
                batchId: null
            },
            dlgFormData: {
                realName: "",
                idCard: "",
                bankCardNo: "",
                amount: ""
            },
            dlgOrder: ""
        };
    },
    computed: {
        ...mapState("payManageStore", {
            salaryInfo: "salaryInfo",
            batchInfo: "batchInfo",
            orderList: "orderList",
            orderListTotal: "orderListTotal"
        }),
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList
      }),
    },
    mounted() {
        const { salaryInfo } = this;
        this.searchFormData.batchId = salaryInfo.batchId;
        this.fetchBatchInfo();
        this.fetchTableList();
    },
    methods: {
        fetchBatchInfo() {
            const { salaryInfo } = this;
            const params = {
                id: salaryInfo.batchId
            };
            this.$store.dispatch("payManageStore/postBatchInfo", params).then(res => {});
        },
        fetchTableList(curr) {
            this.loading = true;
            this.searchFormData.currPage = curr || this.searchFormData.currPage;
            this.$store.dispatch("payManageStore/postOrderList", this.searchFormData).then(() => {
                this.loading = false;
            });
        },
        handleCurrentChange() {
            this.fetchTableList();
        },
        handleDeleteBatch() {
            const { salaryInfo } = this;
            this.$confirm("删除批次后不可恢复，是否继续？", "是否删除该代发批次", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$store.dispatch("payManageStore/postDeleteBatch", { id: salaryInfo.batchId }).then(res => {
                        if (res.success) {
                            this.$message.success("删除成功");
                            this.$router.push("/pay-record");
                        }
                    });
                })
                .catch(() => {});
        },
        handleDeleteOrder(id) {
            this.$confirm("是否从此批次中删除订单，删除后不可恢复，是否继续？", "是否删除订单", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$store.dispatch("payManageStore/postDeleteOrder", { id }).then(res => {
                        if (res.success) {
                            this.$message.success("删除成功");
                            this.fetchBatchInfo();
                            this.fetchTableList();
                        }
                    });
                })
                .catch(() => {});
        },
        handleConfirmOrder() {
            const { batchInfo, requestConfirmOrder } = this;
            if (batchInfo.checkFailNum > 0) {
                this.$confirm("存在校验失败的数据，是否继续代发校验成功人员的工资", "提示", {
                    confirmButtonText: "继续",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        requestConfirmOrder();
                    })
                    .catch(() => {});
            } else {
                requestConfirmOrder();
            }
        },
        requestConfirmOrder() {
            const { salaryInfo, batchInfo } = this;
            const param = {
                batchId: salaryInfo.batchId,
                protocol: location.protocol.replace(":", ""),
                location: location.host,
                totalAmount: batchInfo.checkSuccessAmount
            };
            this.$store.dispatch("payManageStore/postConfirmPay", param).then(res => {
                if (res.success) {
                    let newTab = window.open("about:blank");
                    let html = utils.createAutoCommitFormHtml(res.data.resp);
                    newTab.document.write(html);
                }
            });
        },
        handleEdite(row) {
            this.dlgEdite = true;
            this.dlgOrder = row;
            for (let key in row) {
                if (this.dlgFormData.hasOwnProperty(key)) {
                    this.dlgFormData[key] = row[key];
                }
            }
        },
        handleConfirmEdite() {
            const params = {
                ...this.dlgFormData
            };
            params.id = this.dlgOrder.id;
            delete params.amount;
            this.$store.dispatch("payManageStore/postOrderEdite", params).then(res => {
                if (res.success) {
                    this.$message.success("编辑成功");
                    this.dlgEdite = false;
                    this.fetchBatchInfo();
                    this.fetchTableList();
                }
            });
        },
        handleFilterStatus(status) {
            this.filterStatus = status;
            this.searchFormData.status = status;
            this.fetchTableList(1);
        },
        handleDownload() {
            const { salaryInfo } = this;
            const param = {
                status: "CHECK_FAIL",
                batchId: salaryInfo.batchId
            };
            this.$store.dispatch("payManageStore/postOrderExport", param).then(res => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.confirm-order {
    .pre {
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tip {
            color: #999999;
            font-size: 12px;
        }
        .nav {
            display: flex;
            .nav-item {
                width: 260px;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 10px;
                padding-bottom: 0;
                margin-right: 20px;
                cursor: pointer;
                .nav-title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #999;
                }
                .nav-cnt {
                    padding: 20px 0;
                }
                .nav-line {
                    margin: 0 10px;
                }
            }
            .nav-item-active {
                background: #eee;
            }
            .nav-flex {
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .total {
        padding: 20px;
        margin-bottom: 20px;
        background: rgba(228, 228, 228, 1);
        border-radius: 4px;
        line-height: 1.8;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .color-succ {
        color: rgb(31, 192, 79);
    }
    .color-fail {
        color: #ff0000;
    }
    .color-green {
        color: #008000;
    }
    .nav-down {
        display: flex;
        align-items: center;
        color: #4688f5;
        cursor: pointer;
    }
}
</style>
