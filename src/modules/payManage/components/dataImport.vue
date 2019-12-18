<template>
    <div class="data-import">
        <div class="intro">
            <div class="intro-title">说明：</div>
            <div class="intro-cnt">
                <p>• 发放时请避免使用二类户，二类户全国日限额为1万元，易超限导致失败，具体账户类型可咨询发卡行。</p>
            </div>
        </div>
        <div class="wrap">
            <div>
                <el-row style="margin:40px 0;">
                    <span>请下载批量代付导入模板，按规定格式上传</span>
                    <el-button size="mini" @click="handleDownloadTemplate">下载模板</el-button>
                </el-row>
                <el-row v-loading="uploadLoading" element-loading-text="正在上传文件，请耐心等待....">
                    <el-col>
                        <el-upload :action="action" ref="upload" drag :limit="1" :auto-upload="false" :on-change="handleFileChange" :on-success="handleSubmitSucc" :on-error="handleSubmitErr"
                            :headers="headers" :data="uploadData">
                            <div>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text"><em>点击</em>或将文件拖拽到这里上传</div>
                                <div class="upload-tip">支持扩展名：.xls、.xlsx格式文件</div>
                            </div>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row style="text-align:center;margin-top:20px;">
                    <el-button type="primary" :disabled="uploadDisabled" @click="handleSubmit">上传</el-button>
                </el-row>
            </div>
        </div>
        <el-dialog title="文件上传失败" :visible.sync="dlgFail" width="800px">
            <div class="dlg-fail">
                <p style="margin-bottom:20px;">共上传{{failInfo.count}}条数据，{{failInfo.successCount}}条校验通过，<span class="color-red">{{failInfo.errorCount}}条校验失败</span></p>
                <el-table border :data="failInfo.errorList" :max-height="300">
                    <el-table-column label="错误行" prop="errorRow"></el-table-column>
                    <el-table-column label="姓名" prop="realName"></el-table-column>
                    <el-table-column label="手机号" prop="cellphoneNo"></el-table-column>
                    <el-table-column label="身份证号" prop="idCardNo"></el-table-column>
                    <el-table-column label="银行卡号" prop="bankCardNo"></el-table-column>
                    <el-table-column label="金额（元）" prop="amount"></el-table-column>
                    <el-table-column label="错误说明">
                        <template slot-scope="scope">
                            <span class="color-red">{{scope.row.message}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <p style="margin-top:20px;"><i class="el-icon-warning" style="margin-right:4px;"></i>您可以点击下载错误文件，修改完成后重新上传代付文件</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleDownloadFail" type="primary">下载错误文件</el-button>
                <el-button @click="dlgFail = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import utils from "@/utils/utils";
export default {
    data() {
        return {
            action: "/api/psalary/wages/doImport",
            headers: {
                Authorization: sessionStorage.getItem("token")
            },
            uploadData: {},
            uploadLoading: false,
            uploadDisabled: true,
            dlgFail: false,
            failInfo: {}
        };
    },
    computed: {
        ...mapState("payManageStore", {
            salaryInfo: "salaryInfo"
        })
    },
    mounted() {
        const { salaryInfo } = this;
        this.uploadData = {
            merchantId: salaryInfo.salaryMerchantId,
            merchantLevel: salaryInfo.salaryLevel,
            payMonth: salaryInfo.monthSelected,
            superMerchantId: salaryInfo.salaryMasterId
        };
    },
    methods: {
        handleDownloadTemplate() {
            const param = {
                fileName: "代发模板.xlsx",
                templateName: "wagesTemplate.xlsx"
            };
            this.$store.dispatch("payManageStore/postDownloadTemplate", param);
        },
        handleDownloadFail() {
            const { failInfo } = this;
            location.href = failInfo.url;
        },
        handleFileChange(file) {
            this.uploadLoading = false;
            if (file.status == "ready") {
                //添加文件
                this.uploadDisabled = false;
            } else {
                //上传成功和上传失败
                this.uploadDisabled = true;
                this.$refs.upload.clearFiles();
            }
        },
        handleSubmit() {
            console.log("handleSubmit");
            this.$refs.upload.submit();
            this.uploadLoading = true;
            this.uploadDisabled = true;
        },
        handleSubmitSucc(res) {
            const { salaryInfo } = this;
            const { message, success, data } = res;
            if (success) {
                if (data.success) {
                    let info = utils.deepCopy(salaryInfo);
                    info.batchId = data.batchId;
                    this.$message.success("上传成功");
                    this.$store.commit("payManageStore/SET_SALARYINFO", info);
                    this.$store.commit("payManageStore/SET_CURRSTEP", 1);
                } else {
                    this.dlgFail = true;
                    this.failInfo = data;
                }
            } else {
                this.$message.error(message);
            }
        },
        handleSubmitErr(err) {
            let { status } = err;
            if (status == 504) {
                this.$message.error(`鉴权超时`);
                this.$router.push("/pay-record");
            } else {
                this.$message.error(`上传失败${status}`);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.data-import {
    .wrap {
        display: flex;
        justify-content: center;
    }
    .el-upload-dragger {
        .el-icon-document {
            font-size: 67px;
            color: #c0c4cc;
            margin: 40px 0 16px;
            line-height: 50px;
        }
    }
    .dlg-fail {
        // height: 400px;
    }
    .upload-tip {
        font-size: 12px;
        color: #999999;
        margin-top: 5px;
    }
    .color-red {
        color: red;
    }
}
</style>
