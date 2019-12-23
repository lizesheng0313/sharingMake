
<template>
  <div class="content templates" id="account-wrap">
    <el-row>
      <el-col :span="24"></el-col>
      <el-col>
        <div class="grid-content bg-purple-dark">
          <el-row type="flex" class="row-bg" justify="center" align="middle">
            <el-col :span="3">
              <img :src="imgUrl" />
            </el-col>
            <el-col :span="21" class="rig">
              <h3>{{merchantBase.name}}</h3>
              <el-row>
                <el-col :span="5">
                  <p v-if="merchantBase.bhaAuditStatus == 'PASS'">
                    <i class="el-icon-success"></i>
                    <span>企业认证已通过</span>
                  </p>
                  <p v-else>
                    <i class="el-icon-error"></i>
                    <span>企业认证未通过</span>
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--=================统计===========================-->
    <el-row type="flex" class="rows">
      <el-col :span="8" style="position: relative;">
        <div class="contents">
          <p>账户可用余额(元)</p>
          <p class="texta">{{merchantInfo.availableAmount}}</p>
        </div>
        <div class="btns">
          <el-button type="primary" @click="handleWithdrawal">提现</el-button>
<!--          账户信息-余额提现-->
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24"></el-col>
      <el-col>
        <div class="grid-content bg-purple-dark">
          <el-row type="flex" class="row-bg" justify="center" align="middle">
            <el-col :span="24" class="rig">
              <h3>
                存管账户
                <span>&nbsp;存管账户为在银行开立的资金管理账户，保障您的资金安全</span>
              </h3>
              <el-row>
                <el-col :span="20">
                  <div>
                    <el-button
                      type="text"
                      style="margin-left: 0"
                      v-show="true"
                      @click="handleAlertPassword"
                    >修改存管交易密码</el-button>
<!--                    账户信息-修改交易密码-->
                    <br />
                  </div>
                </el-col>
                <el-col :span="4">
                  <span></span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row v-if="true">
      <el-col :span="24"></el-col>
      <el-col>
        <div class="grid-content bg-purple-dark">
          <el-row type="flex" class="row-bg" justify="center" align="middle">
            <el-col :span="24" class="rig">
              <h3>
                转账充值
                <span>&nbsp;使用绑定卡向中信百信银行个人所得待结算账户直接转账，安全便捷的完成充值</span>
              </h3>
              <el-row type="flex">
                <div style="margin-right:38px;">
                  <el-button type="text" v-if="true">已开通</el-button>
                  <el-button type="text" v-else>未开通</el-button>
                </div>
                <div style="margin-top:10px;width:800px">
                  <template v-if="true">
                    <el-col style="margin-bottom:10px;">当前企业已开通转账充值。</el-col>
                  </template>
                  <template v-else>
                    <el-col style="margin-bottom:10px;">当前企业未开通转账充值。</el-col>
                  </template>
                  <el-col class="table-col">收款方信息</el-col>
                  <el-table border :data="bankTable">
                    <el-table-column label="银行" prop="prop1" width="150"></el-table-column>
                    <el-table-column label="中信百信银行股份有限公司">
                      <template slot-scope="scope">
                        <span class="account-copy">{{scope.row.prop2}}</span>
                        <el-button type="text" @click="handleCopy(scope.row.prop2)">复制</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-card shadow="never" class="card-shadow">
                    <div>提示：</div>
                    <template>
                      <div>
                        1.请使用已绑定的银行卡（卡号：
                        <strong>{{merchantBase.bankNo}}</strong>）进行转账，否则转账资金将会
                        <strong>原路退回</strong>，退款时效为
                        <strong>1个工作日</strong>。
                      </div>
                    </template>
                    <div>
                      2.关于限额：无限额。转账小于5万，请选择
                      <strong>非实时</strong>到账。
                    </div>
                    <div>3.到账时效：约45分钟。</div>
                    <div>
                      4.到账后，系统自动向您公司预留的联系人手机号：{{merchantBase.contactsMobile
                      }}发送到账短信。
                    </div>
                  </el-card>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--=================提现===========================-->
    <el-dialog title="提现" :visible.sync="dialogWithdrawForm" width="30%">
      <el-form ref="refWithdrawForm" :model="withdrawForm" >
        <el-form-item label="提现金额" label-width="120px" prop="withdrawNum">
          <el-input autocomplete="off" style="width:200px" v-model="withdrawForm.withdrawNum"></el-input>
          <span>元</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogWithdrawForm = false">取 消</el-button>
        <el-button type="primary" @click="handleWithdrawForm('refWithdrawForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提现" width="30%">
      <div>您正在进行对{{234234}}公司服务费账户的提现。提现金额：{{234234324}}。提现资金将进入{{2343242}}银行账户。到账卡号：{{2342343}}。</div>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">前往验密</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import utils from "@/utils/utils";
import imgUrl from "@/assets/images/homeUser.png";
export default {
  data() {
    return {
      bankTable: [
        {
          prop1: "户名",
          prop2: "个人所得待结算账户"
        },
        {
          prop1: "账号",
          prop2: "9000012701039001000513"
        }
      ],
      imgUrl,
      dialogWithdrawForm: false,
      merchantBase: {},
      merchantInfo: {},
      accountInfo:{},
      withdrawForm:{
        withdrawNum: ''
      }
    };
  },
  mounted() {
    let { level, merchantId, platformUserNo } = this.$route.query;
    this.accountInfo = {level,merchantId,platformUserNo};
    this.$store
      .dispatch("accountPageStore/actionGetMerchantBase", { level, merchantId })
      .then(res => {
        if (res.success) {
          this.merchantBase = res.data;
        }
      });
    this.$store
      .dispatch("accountPageStore/actionGetMerchantInfo", {
        platformUserNo
      })
      .then(res => {
        if (res.success) {
          this.merchantInfo = res.data;
        }
      });
  },
  methods: {
    //充值
    handleRecharge() {},
    handleWithdrawal() {
      this.dialogWithdrawForm = true;
    },
    handleOpenAccount() {},
    handleAlertPassword() {
      const {accountInfo} = this;
      const param = {
        level:accountInfo.level,
        protocol: location.protocol.replace(':',''),
        location: location.host,
        merchantId:accountInfo.merchantId,
        platformUserNo:accountInfo.platformUserNo
      };
      this.$store.dispatch("accountPageStore/actionUpdateTradePassWord",param).then(res=>{
        if(res.success){
          let newTab = window.open("about:blank");
          let html = utils.createAutoCommitFormHtml(res.data);
          newTab.document.write(html);
        }
      })
    },
    handleWithdrawForm(){
      const {accountInfo,withdrawForm} = this;
      const param = {
        protocol: location.protocol.replace(':',''),
        location: location.host,
        platformUserNo:accountInfo.platformUserNo,
        merchantId:accountInfo.merchantId,
        level:accountInfo.level,
        amount:withdrawForm.withdrawNum
      }
      this.$store.dispatch("accountPageStore/postWithdrawAmount",param).then(res=>{
        if (res.success) {
          let newTab = window.open("about:blank");
          let html = utils.createAutoCommitFormHtml(res.data.resp);
          newTab.document.write(html);
          this.dialogWithdrawForm = false;
        }
      })
    },
    handleCopy(text){
      this.methodCopyText(text);
    },
    methodCopyText(text){
      let accountWrap = document.getElementById("account-wrap");
      //新建input输入框，将text赋值，不能设置display:none，execCommand检测不到;
      let newInput = document.createElement("input");
      newInput.value = text;
      newInput.style.opacity = "0";
      accountWrap.appendChild(newInput);
      newInput.select();
      //浏览器版本兼容性
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$message.success("复制成功");
      }else{
        this.$message.error("浏览器不支持复制，请更换高版本浏览器");
      }
      //删除新增的input
      newInput.parentNode.removeChild(newInput);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-col {
  border: 1px solid #ebeef5;
  padding: 12px 10px;
  border-bottom: 0;
  background: #4688f5;
  color: #fff;
  line-height: 23px;
}
.home {
  margin: 0 auto;
}
.grid-content {
  border-radius: 4px;
  width: 100%;
  margin: 0 auto;
}
.row-bg {
  border-radius: 4px;
  padding: 9px;
  padding-top: 20px;
  background: #fff;
  -moz-box-shadow: 3px 5px 15px #dae2ea; /* 老的 Firefox */
  box-shadow: 3px 5px 15px #dae2ea;
  img {
    width: 100%;
    max-width: 109px;
  }
  h3 {
    padding-bottom: 15px;
    font-size: 18px;
    color: #4e596c;
    border-bottom: 1px solid #e7ebee;
    margin: 10px 0;

    p {
      font-size: 12px;
    }
  }
  .imgs {
    max-width: 18px;
    display: inline;
    vertical-align: middle;
    margin-right: 8px;
  }
  .rig {
    padding-left: 10px;
  }

  .el-icon-success {
    font-size: 16px;
    margin-right: 8px;
    color: #3ecacb;
  }
  p,
  span {
    font-size: 15px;
    color: #5f6879;
    display: inline;
  }
}
.el-row {
  .infos {
    background: #98a6b0;
    padding: 30px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    margin-top: 10px;
  }
}

.rows {
  border-radius: 4px;
  padding: 20px 0;
  margin: 20px 0;
  background-color: #fff;
  -moz-box-shadow: 5px 5px 15px #c3d0d9; /* 老的 Firefox */
  box-shadow: 5px 5px 15px #c3d0d9;
  .el-col {
    border-right: 1px solid #e9edf0;
    &:last-child {
      border-right: 0;
    }
    .contents {
      text-align: center;
      line-height: 30px;
      font-size: 30px;
      p:nth-child(1) {
        font-size: 15px;
        line-height: 50px;
        height: 50px;
      }
      p:nth-child(2) {
        font-size: 20px;
      }
      .texta {
        color: #9379df;
      }
      .textb {
        color: #3ecacb;
      }
      .textc {
        color: #f95768;
      }
      .textd {
        color: #5fc8f9;
      }
    }
  }
}
.btns {
  position: absolute;
  top: 11px;
  right: 26px;
  display: flex;
  flex-direction: column;
  button:last-child {
    margin-left: 0;
    margin-top: 10px;
  }
}
.el-icon-error {
  font-size: 16px;
  margin-right: 8px;
  color: #d9001b;
}
.card-shadow {
  margin-top: 20px;
  background: #eee;
  strong {
    font-weight: bold;
  }
  div {
    padding: 2px 0;
  }
}
.account-copy {
  width: 215px;
  display: inline-block !important;
}
</style>
