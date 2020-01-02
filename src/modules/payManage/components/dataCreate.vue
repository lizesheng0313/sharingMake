<template>
    <el-row class="data-create" v-loading="loading" element-loading-text="员工工资银行卡鉴权中，请稍等…" element-loading-spinner="el-icon-loading">
        <div class="intro">
            <div class="intro-cnt">
                <p>未从薪税通中检测到公司所选月份存在待发薪数据，请确认薪税通中是否已提交工资代发数据</p>
            </div>
        </div>
        <div class="form-con">
          <el-form label-position="right" label-width="250px">
              <el-form-item label="公司名称:">
                  <span>{{salaryInfo.enterpriseName}}</span>
              </el-form-item>
              <el-form-item label="发放月份:">
                  <span>{{salaryInfo.payMonth}}</span>
              </el-form-item>
              <el-form-item label="总人数:">
                  <span>{{salaryInfo.count}}</span>
              </el-form-item>
              <el-form-item label="已发薪人数:">
                  <span>{{salaryInfo.successNum}}</span>
              </el-form-item>
              <el-form-item label="发薪中人数:">
                  <span>{{salaryInfo.sendingNum}}</span>
              </el-form-item>
              <el-form-item label="代发薪人数:">
                  <span>{{salaryInfo.readyNum}}</span>
              </el-form-item>
          </el-form>
        </div>
        <div class="footer-con">
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button @click="handleCancle">取消</el-button>
        </div>
    </el-row>
</template>

<script>
import { mapState } from "vuex";
import utils from "@/utils/utils";
export default {
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapState("payManageStore", {
            salaryInfo: "salaryInfo"
        })
    },
    methods: {
        handleSubmit() {
            let { salaryInfo } = this;
            let params = {
                queryDate: salaryInfo.queryDate,
                merchantId: salaryInfo.salaryMerchantId,
                payMonth: salaryInfo.payMonth,
                level: salaryInfo.salaryLevel
            };
            this.loading = true;
            this.$store
                .dispatch("payManageStore/postSaveCreate", params)
                .then(res => {
                    if (res.success) {
                        let info = utils.deepCopy(salaryInfo);
                        info.batchId = res.data.batchId;
                        this.$store.commit("payManageStore/SET_SALARYINFO", info);
                        this.$store.commit("payManageStore/SET_CURRSTEP", 1);
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleCancle() {
            this.$router.push("/pay-batch");
        }
    }
};
</script>

<style lang="scss" scoped>
.data-create {
  .form-con{
    width: 500px;
    margin: 0 auto;
    border:1px solid #eee;
  }
  .footer-con{
    text-align: center;
    margin-top: 20px;
  }
}
</style>
