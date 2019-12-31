<template>
    <div class="pay-batch page-module">
        <header class="header main-title">
            <el-row type="flex">
                <el-col :span="12">
                    <span>批量代发</span>
                </el-col>
            </el-row>
        </header>
        <div class="main-content">
            <div class="intro">
                <div class="intro-title">说明：</div>
                <div class="intro-cnt">
                    <p>• 发薪主体公司需开通资金账户和激活账户后，才能使用工资银行代发功能服务。</p>
                    <p>• 工资卡避免使用二类户，二类户全国日限额为1万元，若超限会导致失败，具体账户类型请咨询发卡行。</p>
                </div>
            </div>
            <el-table :data="batchList" v-loading="loading" border :height="screenHeight">
                <el-table-column label="公司名称" prop="name" min-width="170"></el-table-column>
                <el-table-column label="开户审核状态" min-width="170">
                    <template slot-scope="scope">{{scope.row.platformUserNo ? scope.row.bhaAuditStatusStr : '-'}}</template>
                </el-table-column>
                <el-table-column label="激活状态" min-width="170">
                    <template slot-scope="scope">{{scope.row.platformUserNo ? scope.row.bhaOpenStatusStr : '-'}}</template>
                </el-table-column>
                <el-table-column label="最近代发日期" min-width="170">
                    <template slot-scope="scope">{{scope.row.platformUserNo ? scope.row.payDate : '-'}}</template>
                </el-table-column>
                <el-table-column label="操作" min-width="270">
                    <template slot-scope="scope">
                        <div v-if="scope.row.bhaOpenStatus == 'ACTIVED' && scope.row.platformUserNo">
                            <el-button type="text" @click="handleShowMonth('create',scope.row)" v-if="privilegeVoList.includes('salary.psalaryIssuing.batch.create')">生成代发数据</el-button>
                            <el-button type="text" @click="handleShowMonth('import',scope.row)" v-if="privilegeVoList.includes('salary.psalaryIssuing.batch.import')">导入</el-button>
                        </div>
                        <div v-if="scope.row.bhaAuditStatus=='PASS' && scope.row.bhaOpenStatus=='WAIT_ACTIVE' && privilegeVoList.includes('salary.psalaryIssuing.batch.activation')">
                            <el-button type="text" @click="handleActivateAccount(scope.row)">激活账户</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination class="pages" layout="total, prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="searchFormData.currPage" :page-size="searchFormData.pageSize"
                :total="batchListTotal">
            </el-pagination> -->
        </div>
        <el-dialog title="选择工资月份" :visible.sync="dlgMonth" width="500px">
            <el-form label-position="right" label-width="90px">
                <el-form-item label="发放月份" class="input-bigger">
                    <el-date-picker v-model="monthSelected" value-format="yyyyMM" type="month" placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirmSelect">确 定</el-button>
                <el-button @click="dlgMonth = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import utils from "@/utils/utils";
export default {
    data() {
        return {
            loading: false,
            searchFormData: {
                currPage: 1,
                pageSize: 10
            },
            dlgMonth: false,
            salaryType: "",
            salaryMerchantId: "",
            salaryLevel: null,
            salaryMasterId: null,
            monthSelected: "",
            screenHeight: document.body.clientHeight - 326,
        };
    },
    computed: {
        ...mapState("payManageStore", {
            batchList: "batchList",
            batchListTotal: "batchListTotal"
        }),
        ...mapState({
            privilegeVoList: state => state.privilegeVoList
        })
    },
    created(){
      window.onresize = () => {
        return (() => {
          this.screenHeight = document.body.clientHeight - 326;
        })();
      };
    },
    mounted() {
        this.fetchTableList();
    },
    methods: {
        fetchTableList(curr) {
            this.loading = true;
            this.searchFormData.currPage = curr || this.searchFormData.currPage;
            this.$store.dispatch("payManageStore/postBatchList", this.searchFormData).then(() => {
                this.loading = false;
            });
        },
        handleCurrentChange() {
            this.fetchTableList();
        },
        handleShowMonth(type, row) {
            this.dlgMonth = true;
            this.salaryType = type;
            this.salaryMerchantId = row.id;
            this.salaryLevel = row.level;
            this.salaryMasterId = row.masterId;
        },
        handleConfirmSelect() {
            const { salaryType } = this;
            if (salaryType == "create") {
                this.cbCreateSalary();
            } else {
                this.cbImportSalary();
            }
        },
        cbCreateSalary() {
            const { salaryMerchantId, monthSelected, salaryLevel } = this;
            const param = {
                merchantId: salaryMerchantId,
                payMonth: monthSelected,
                level: salaryLevel
            };
            this.$store.dispatch("payManageStore/postCreateSalary", param).then(res => {
                if (res.success) {
                    this.cbSalary(res.data);
                }
            });
        },
        cbImportSalary() {
            this.cbSalary();
        },
        cbSalary(data) {
            const { salaryType, salaryMerchantId, salaryLevel, monthSelected, salaryMasterId } = this;
            const salaryInfo = {
                salaryType,
                salaryMerchantId,
                salaryLevel,
                monthSelected,
                salaryMasterId,
                ...data
            };
            this.$store.commit("payManageStore/SET_SALARYINFO", salaryInfo);
            this.$router.push("/batch-edite");
        },
        handleActivateAccount(row) {
            let activateForm = {
                level: row.level,
                merchantId: row.id,
                protocol: location.protocol.replace(":", ""),
                location: location.host
            };
            this.$store.dispatch("accountPageStore/actionActivate", activateForm).then(res => {
                if (res.success) {
                    let newTab = window.open("about:blank");
                    let html = utils.createAutoCommitFormHtml(res.data);
                    newTab.document.write(html);
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.pay-batch {
    .header {
        border-bottom: 1px solid #ededed;
        margin-bottom: 10px;
    }
}
</style>
