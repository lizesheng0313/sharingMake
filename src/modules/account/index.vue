<template>
  <div class="account router-view min-content">
    <div>
      <div class="intro">
        <div class="intro-title">说明：</div>
        <div class="intro-cnt">
          <p>• 使用工资银行代发服务前，请开通发薪主体公司的资金账户并激活</p>
          <p>• 账户激活后，可在账户详情中充值和提现</p>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="accountList" v-loading="loading" :header-cell-style="{background:'#F5F5F5'}" border>
        <el-table-column label="公司名称" prop="name" min-width="170"></el-table-column>
        <el-table-column label="开户审核状态" min-width="170">
          <template slot-scope="scope">{{accountStatus[scope.row.bhaAuditStatus]}}</template>
        </el-table-column>
        <el-table-column label="激活状态" min-width="170">
          <template slot-scope="scope">{{activeStatus[scope.row.bhaOpenStatus] || '-'}}</template>
        </el-table-column>
        <el-table-column label="申请时间" prop="createTime" min-width="170"></el-table-column>
        <el-table-column label="不通过原因" prop="bhaAuditDesc" min-width="170"></el-table-column>
        <el-table-column label="账户金额" prop="amount" min-width="170"></el-table-column>
        <el-table-column label="操作" min-width="270">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleActivateAccount(scope.row)"
              v-if="scope.row.bhaAuditStatus=='PASS' && scope.row.bhaOpenStatus=='WAIT_ACTIVE'"
            >激活账户</el-button>
            <el-button
              type="text"
              @click="handleAccountDetails(scope.row)"
              v-if="scope.row.bhaAuditStatus=='PASS' && scope.row.platformUserNo"
            >账户详情</el-button>
            <el-button type="text" @click="handleOpenInformation(scope.row)" v-if="scope.row.platformUserNo && scope.row.level == 1">开户信息</el-button>
            <el-button type="text" @click="handleRightOpen(scope.row)" v-if="!scope.row.platformUserNo">立即开户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add_account" @click="handleAddInformation" v-if="accountList.length>0">+新增资金账户</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import utils from "@/utils/utils";
import { accountStatus, activeStatus } from "@/utils/constData";
export default {
  data() {
    return {
      masterId:"",
      accountList: [],
      loading: true,
      accountStatus,
      activeStatus,
    };
  },
  mounted() {
    this.$store
      .dispatch("accountPageStore/actionAllAcount")
      .then(res => {
        if (res.success) {
          this.masterId = res.data[0].masterId,
          this.loading = false;
          this.accountList = res.data;
        }
      })
      .catch(err => {
        console.log("-----错误 ");
        console.log(err);
      });
  },
  methods: {
    //激活账户
    handleActivateAccount(row) {
      let activateForm = {
        level:row.level,
        merchantId:row.id,
        protocol: location.protocol.replace(':',''),
        location: location.host
      };
      this.$store
        .dispatch("accountPageStore/actionActivate", activateForm)
        .then(res => {
          if (res.success) {
            let newTab = window.open("about:blank");
            let html = utils.createAutoCommitFormHtml(res.data);
            newTab.document.write(html);
          }
        });
    },
    //账户详情
    handleAccountDetails(row) {
      this.$router.push({
        path: "/account-details",
        query: {
          level: row.level,
          merchantId: row.id,
          platformUserNo: row.platformUserNo
        }
      });
    },
    //开户信息
    handleOpenInformation(row) {
      this.$router.push({
        path: "/account-information",
        query: {
          level: row.level,
          merchantId: row.id,
          type: "edit"
        }
      });
    },
    handleAddInformation(row) {
      this.$router.push({
        path: "/account-information",
        query: {
          merchantId: this.masterId,//新增的时候merchantId就是父ID
          type: "add"
        }
      });
    },
    //立即开户
    handleRightOpen(row) {
      this.$router.push({
        path: "/account-information",
        query: {
          level: row.level,
          merchantId: row.id,
          type: "right"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.account {
  margin:0px 20px;
  .add_account {
    color: $mainColor;
    font-size: 14px;
    text-align: center;
    margin-top: 15px;
    cursor: pointer;
    margin-bottom: 20px;
  }
}
</style>
