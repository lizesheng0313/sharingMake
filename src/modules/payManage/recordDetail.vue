<template>
    <div class="page-module record-detail">
        <div class="div-module">
            <div class="flex-bottom">
                <div style="margin-right:20px;">
                    <img :src="imgSrc" class="logo">
                </div>
                <div>
                    <div class="title">
                        <span>{{recordInfo.id}}</span>
                        <p>{{recordInfo.statusStr}}</p>
                    </div>
                    <div type="flex" class="div-flex">
                        <div>{{recordInfo.enterpriseName}} | {{recordInfo.payMonth}}</div>
                        <div>代发笔数：{{recordInfo.orderNum}}</div>
                        <div>实发金额：{{recordInfo.amountSuccess}}元</div>
                        <div>支付完成时间：<span class="color-succ">{{recordInfo.payTime}}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="div-module">
            <div class="module">
                <div class="filter">
                    <div :class="['filter-item',filterStatus == item.status ? 'filter-item-active' : '']" v-for="(item,index) in filterArr" :key="index" @click="handleFilterStatus(item.status)">
                        <div>{{item.label}}</div>
                        <p>{{item.value}}</p>
                    </div>
                </div>
            </div>
            <div class="module">
                <div class="module-title">代发订单明细</div>
                <div class="module-cnt">
                    <el-table border :data="orderList" v-loading="loading" :header-cell-style="{background:'#F5F5F5'}">
                        <el-table-column label="订单号" prop="id"></el-table-column>
                        <el-table-column label="订单状态" prop="statusStr"></el-table-column>
                        <el-table-column label="姓名" prop="realName"></el-table-column>
                        <el-table-column label="证件号码" prop="idCard" width="170"></el-table-column>
                        <el-table-column label="手机号" prop="phoneNo" width="120"></el-table-column>
                        <el-table-column label="开户行" prop="openingBank"></el-table-column>
                        <el-table-column label="银行卡号" prop="bankCardNo" width="180"></el-table-column>
                        <el-table-column label="实发金额" prop="amount"></el-table-column>
                        <el-table-column label="失败原因" prop="failReason"></el-table-column>
                        <el-table-column label="创建时间" prop="createTime" width="160"></el-table-column>
                        <el-table-column label="操作" width="140">
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleEdite('edite',scope.row)" v-if="scope.row.status == 'CHECK_FAIL' && privilegeVoList.includes('salary.psalaryIssuing.batchRecord.detailsEdit')">编辑</el-button>
                                <el-button type="text" @click="handleEdite('resend',scope.row)"
                                           v-if="['BACK_SUCCESS','ROLL_BACK_SUCCESS','CHECK_SUCCESS'].includes(scope.row.status) &&
                                           privilegeVoList.includes('salary.psalaryIssuing.batchRecord.detailsContinue')">重发</el-button>
                                <el-button type="text" @click="handleCloseOrder(scope.row.id)" v-if="['CHECK_FAIL','BACK_SUCCESS','ROLL_BACK_SUCCESS'].includes(scope.row.status) && privilegeVoList.includes('salary.psalaryIssuing.batchRecord.close')">关闭订单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pages" layout="total, prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="searchFormData.currPage"
                        :page-size="searchFormData.pageSize" :total="orderListTotal">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog :title="editeTitle" :visible.sync="dlgEdite" width="550px">
            <el-form :model="dlgFormData" label-position="right" label-width="90px">
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="dlgFormData.realName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="证件号码" prop="idCard">
                    <el-input v-model="dlgFormData.idCard" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankCardNo">
                    <el-input v-model="dlgFormData.bankCardNo"></el-input>
                </el-form-item>
                <el-form-item label="实发金额" prop="amount">
                    <el-input v-model="dlgFormData.amount" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirmEdite">确定代发</el-button>
                <el-button @click="dlgEdite = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import utils from "@/utils/utils";
import imgSrc from "@/assets/images/record-detail.png";
export default {
    data() {
        return {
            loading: false,
            imgSrc: imgSrc,
            batchId: "",
            searchFormData: {
                currPage: 1,
                pageSize: 10,
                status: "",
                batchId: ""
            },
            filterStatus: "",
            filterArr: [
                {
                    status: "",
                    label: "订单总数",
                    value: null
                },
                {
                    status: "CHECK_FAIL",
                    label: "校验失败",
                    value: null
                },
                {
                    status: "MERCHANT_REMIT_ING",
                    label: "出款中",
                    value: null
                },
                {
                    status: "SUCCESS",
                    label: "出款成功",
                    value: null
                },
                {
                    status: "BACK_SUCCESS",
                    label: "出款失败",
                    value: null
                },
                {
                    status: "ROLL_BACK_SUCCESS",
                    label: "已退汇",
                    value: null
                },
                {
                    status: "CLOSED",
                    label: "关闭订单",
                    value: null
                }
            ],
            dlgEdite: false,
            dlgFormData: {
                realName: "",
                idCard: "",
                bankCardNo: "",
                amount: ""
            },
            editeTitle: "编辑",
            editeRow: {}
        };
    },
    computed: {
        ...mapState("payManageStore", {
            recordInfo: "recordInfo",
            orderList: "orderList",
            orderListTotal: "orderListTotal"
        }),
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList
      }),
    },
    mounted() {
        const { batchId } = this.$route.query;
        this.batchId = batchId;
        this.searchFormData.batchId = batchId;
        this.fetchBatchInfo();
        this.fetchTableList();
    },
    methods: {
        fetchBatchInfo() {
            const params = {
                id: this.batchId
            };
            this.$store.dispatch("payManageStore/postRecordInfo", params).then(res => {
                const { recordInfo } = this;
                this.filterArr[0].value = recordInfo.orderNum; //订单总数
                this.filterArr[1].value = recordInfo.checkFailNum; //校验失败
                this.filterArr[2].value = recordInfo.payingNum; //出款中
                this.filterArr[3].value = recordInfo.orderSuccessNum; //出款成功
                this.filterArr[4].value = recordInfo.failNum; //出款失败
                this.filterArr[5].value = recordInfo.rollBackNum; //已退汇
                this.filterArr[6].value = recordInfo.closeNum; //关闭订单
            });
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
        handleFilterStatus(status) {
            this.filterStatus = status;
            this.searchFormData.status = status;
            this.fetchTableList(1);
        },
        handleEdite(type, row) {
            //重发跟编辑操作逻辑一样，只是根据不同状态修改文案而已
            this.dlgEdite = true;
            this.editeRow = row;
            this.editeTitle = type == "edite" ? "编辑" : "重发";
            for (let key in row) {
                if (this.dlgFormData.hasOwnProperty(key)) {
                    this.dlgFormData[key] = row[key];
                }
            }
        },
        handleConfirmEdite() {
            const { editeRow, dlgFormData } = this;
            //编辑参数
            const paramsEdite = {
                ...dlgFormData,
                id: editeRow.id
            };
            delete paramsEdite.amount;
            //重发参数
            const paramsSend = {
                protocol: location.protocol.replace(":", ""),
                location: location.host,
                remitOrderId: editeRow.id,
                totalAmount: editeRow.amount
            };

            this.$store.dispatch("payManageStore/postOrderEdite", paramsEdite).then(res => {
                if (res.success) {
                    this.$store.dispatch("payManageStore/postReSend", paramsSend).then(res => {
                        if (res.success) {
                            this.dlgEdite = false;
                            let newTab = window.open("about:blank");
                            let html = utils.createAutoCommitFormHtml(res.data.resp);
                            newTab.document.write(html);
                        }
                    });
                }
            });
        },
        handleCloseOrder(id) {
            this.$confirm("关闭订单后不可恢复，是否继续？", "是否关闭订单", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$store.dispatch("payManageStore/postCloseOrder", { id }).then(res => {
                        if (res.success) {
                            this.$message.success("成功");
                            this.fetchBatchInfo();
                            this.fetchTableList();
                        }
                    });
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.record-detail {
  height: calc(100vh - 90px);
    .summary {
        display: flex;
        justify-content: space-between;
    }
    .logo {
        width: 100px;
        height: auto;
    }
    .color-succ {
        color: #1fc04f;
    }
    .color-red {
        color: red;
    }
    .title {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        span {
            font-size: 18px;
            font-weight: bold;
        }
        p {
            color: #1fc04f;
            border: 1px solid #1fc04f;
            border-radius: 20px;
            padding: 2px 10px;
            font-size: 12px;
            margin-left: 10px;
        }
        p.color-fail {
            color: red;
            border: 1px solid red;
        }
    }
    .module {
        margin-bottom: 40px;
        .module-title {
            color: #666;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
        }
    }
    .step-title {
        font-weight: normal;
        font-size: 14px;
    }
    .step-des-curr {
        color: #007aff;
        cursor: pointer;
    }
    .div-flex {
        min-width: 900px;
        display: flex;
        align-items: center;
    }
    .div-flex div {
        margin-right: 60px;
    }
    .flex-bottom {
        display: flex;
        align-items: flex-end;
    }
    .nav {
        display: flex;
        margin: 20px 0 40px;
        .nav-item {
            width: 296px;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 10px;
            padding-bottom: 0;
            margin-right: 20px;
            display: flex;
            flex-direction: column;
            .nav-title {
                color: #999;
            }
            .nav-cnt {
                padding: 10px 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                line-height: 1.8;
                .nav-cnt-item {
                    display: flex;
                    p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    p:first-child {
                        width: 100px;
                        margin-right: 40px;
                    }
                }
            }
            .nav-line {
                margin: 0 10px;
            }
        }
    }
    .intro {
        margin-bottom: 20px;
    }
    .filter {
        display: flex;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 3px;
        .filter-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            cursor: pointer;
            p {
                color: #0e7ccc;
                padding-top: 10px;
            }
        }
        .filter-item:first-child {
            border-right: 1px solid #ccc;
        }
        .filter-item-active {
            background: #eee;
        }
    }
}
</style>
