<template>
  <div class="imformation public_input">
    <el-form
      label-width="150px"
      label-position="right"
      :model="accountForm"
      ref="refForm"
      :rules="rules"
    >
      <div>
        <strong>企业基本信息</strong>
        <div class="column">
          <el-form-item label="公司名称：" prop="name" class="input-bigger">
            <el-input v-model="accountForm.name" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="公司简称：" prop="introduction" class="input-bigger">
            <el-input v-model="accountForm.introduction"></el-input>
          </el-form-item>
          <el-form-item label="企业对公邮箱：" prop="email" class="input-bigger">
            <el-input v-model="accountForm.email"></el-input>
          </el-form-item>
          <el-form-item label="公司注册地址：" prop="registerAddress" class="input-bigger">
            <el-input v-model="accountForm.registerAddress"></el-input>
          </el-form-item>
          <el-form-item label="公司经营地址：" prop="contactAddress" class="input-bigger">
            <el-input v-model="accountForm.contactAddress"></el-input>
          </el-form-item>
          <el-form-item label="公司注册电话：" prop="registerContactsMobile" class="input-bigger">
            <el-input v-model="accountForm.registerContactsMobile"></el-input>
          </el-form-item>
          <el-form-item label="公司所在地邮编：" prop="postcode" class="input-bigger">
            <el-input v-model="accountForm.postcode"></el-input>
          </el-form-item>
          <el-form-item label="客户行业：" prop="industry" class="input-bigger">
            <el-input v-model="accountForm.industry"></el-input>
          </el-form-item>
          <el-form-item label="一级分类：" prop="firstCategory" class="input-bigger">
            <el-input v-model="accountForm.firstCategory"></el-input>
          </el-form-item>
          <el-form-item label="二级分类：" prop="secondCategory" class="input-bigger">
            <el-input v-model="accountForm.secondCategory"></el-input>
          </el-form-item>
          <el-form-item label="快递地址：" prop="expressAddress" class="input-bigger">
            <el-input v-model="accountForm.expressAddress"></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <strong>资质信息</strong>
        <div class="column">
          <el-form-item label="统一社会信用代码：" prop="unifiedCode" class="input-bigger">
            <el-input v-model="accountForm.unifiedCode" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="营业执照编码：" prop="businessLicense" class="input-bigger">
            <el-input v-model="accountForm.businessLicense"></el-input>
          </el-form-item>
          <el-form-item label="组织机构代码：" prop="orgNo" class="input-bigger">
            <el-input v-model="accountForm.orgNo"></el-input>
          </el-form-item>
          <el-form-item label="税务登记号：" prop="taxNo" class="input-bigger">
            <el-input v-model="accountForm.taxNo"></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <strong>法人及联系人信息</strong>
        <div class="column">
          <el-form-item label="法人姓名：" prop="legal" class="input-bigger">
            <el-input v-model="accountForm.legal"></el-input>
          </el-form-item>
          <el-form-item label="法人证件类型：" prop="idCardType" class="input-bigger">
            <el-select placeholder="请选择" v-model="accountForm.idCardType">
              <el-option
                v-for="item in typeList"
                :key="item.key"
                :label="item.val"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人证件号：" prop="legalIdCardNo" class="input-bigger">
            <el-input v-model="accountForm.legalIdCardNo"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名：" prop="contacts" class="input-bigger">
            <el-input v-model="accountForm.contacts"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号：" prop="contactsMobile" class="input-bigger">
            <el-input v-model="accountForm.contactsMobile"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱：" prop="contactsEmail" class="input-bigger">
            <el-input v-model="accountForm.contactsEmail"></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <strong>对公账户信息</strong>
        <div class="column">
          <el-form-item label="开户省份：" prop="bankProvince" class="input-bigger">
            <el-input v-model="accountForm.bankProvince"></el-input>
          </el-form-item>
          <el-form-item label="开户城市：" prop="bankCity" class="input-bigger">
            <el-input v-model="accountForm.bankCity"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：" prop="bankNo" class="input-bigger">
            <el-input v-model="accountForm.bankNo" :disabled="isDisabled "></el-input>
          </el-form-item>
          <el-form-item label="开户银行：" prop="bankCode" class="input-bigger">
            <el-select placeholder="请选择" v-model="accountForm.bankCode" @change="handleSelectChange">
              <el-option
                v-for="item in bankList"
                :key="item.key"
                :label="item.val"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户分行全称：" prop="entrustedBranchBankInfoName" class="input-bigger">
            <el-input v-model="accountForm.entrustedBranchBankInfoName"></el-input>
          </el-form-item>
          <el-form-item label="支行编码：" prop="entrustedBranchBankInfo" class="input-bigger">
            <el-input v-model="accountForm.entrustedBranchBankInfo"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="upload_pic">
        <strong>证照副本</strong>
        <div class="column">
          <el-form-item label="营业执照：" prop="businessLicenseImgId">
            <el-upload
              ref="refBusinessImg"
              class="upload-demo"
              :headers="headers"
              :data="obj"
              :before-upload="beforeAvatarUpload"
              action="/api/psalary/file/uploadImage"
              :limit="1"
              :show-file-list="false"
              :on-success="handleSuccess.bind(null,'businessLicenseImgId')"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button
              size="small"
              class="clear-button"
              @click="handleClear('refBusinessImg','businessLicenseImgId')"
              type="default"
            >清空</el-button>
            <img :src="accountForm.businessLicenseImgIdUrl" alt />
          </el-form-item>
          <el-form-item label="法人身份证：" prop="legalIdCardImgId">
            <el-upload
              ref="refLegalCardImg"
              class="upload-demo"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              action="/api/psalary/file/uploadImage"
              :limit="1"
              :show-file-list="false"
              :on-success="handleSuccess.bind(null,'legalIdCardImgId')"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button
              size="small"
              type="default"
              @click="handleClear('refLegalCardImg','legalIdCardImgId')"
              class="clear-button"
            >清空</el-button>
            <img :src="accountForm.legalIdCardImgIdUrl" alt />
          </el-form-item>
          <el-form-item label="开户许可证：" prop="bankLicenseImgId">
            <el-upload
              ref="refbankCardImg"
              class="upload-demo"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              action="/api/psalary/file/uploadImage"
              :limit="1"
              :show-file-list="false"
              :on-success="handleSuccess.bind(null,'bankLicenseImgId')"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button
              size="small"
              type="default"
              @click="handleClear('refbankCardImg','bankLicenseImgId')"
              class="clear-button"
            >清空</el-button>
            <img :src="accountForm.bankLicenseImgIdUrl" alt />
          </el-form-item>
          <el-form-item label="税务登记证：" prop="taxNoImgId">
            <el-upload
              ref="refTaxRegCertificateImg"
              class="upload-demo"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              action="/api/psalary/file/uploadImage"
              :limit="1"
              :show-file-list="false"
              :on-success="handleSuccess.bind(null,'taxNoImgId')"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button
              size="small"
              type="default"
              @click="handleClear('refTaxRegCertificateImg','taxNoImgId')"
              class="clear-button"
            >清空</el-button>
            <img :src="accountForm.taxNoImgIdUrl" alt />
          </el-form-item>
          <el-form-item label="组织机构代码证：" prop="orgNoImgId">
            <el-upload
              ref="refOrganizationCodeImg"
              class="upload-demo"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              action="/api/psalary/file/uploadImage"
              :limit="1"
              :show-file-list="false"
              :on-success="handleSuccess.bind(null,'orgNoImgId')"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button
              size="small"
              type="default"
              @click="handleClear('refOrganizationCodeImg','orgNoImgId')"
              class="clear-button"
            >清空</el-button>
            <img :src="accountForm.orgNoImgIdUrl" alt />
          </el-form-item>
          <el-form-item label="联系人身份证：" prop="contactIdCardImgId">
            <el-upload
              ref="refContactIdImg"
              class="upload-demo"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              action="/api/psalary/file/uploadImage"
              :limit="1"
              :show-file-list="false"
              :on-success="handleSuccess.bind(null,'contactIdCardImgId')"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button
              size="small"
              type="default"
              @click="handleClear('refContactIdImg','contactIdCardImgId')"
              class="clear-button"
            >清空</el-button>
            <img :src="accountForm.contactIdCardImgIdUrl" alt />
          </el-form-item>
        </div>
      </div>
      <div class="information_button">
        <el-button type="primary" @click="onSubmit" v-if="isShowSubmit && privilegeVoList.includes('salary.account.psalaryAccount.saveUpdate')">{{submitText}}</el-button>
<!--        //开户信息-保存修改-->
        <el-button @click="handleReturn">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import { mapState } from "vuex";
export default {
  data() {
    return {
      obj: {
        id: 123,
        name: "小明"
      },
      fileList: [],
      headers: {
        Authorization: sessionStorage.getItem("token")
      },
      accountForm: {
        businessLicenseImgIdUrl: "",
        orgNoImgIdUrl: "",
        contactIdCardImgIdUrl: "",
        legalIdCardImgIdUrl: "",
        taxNoImgIdUrl: "",
        bankLicenseImgIdUrl: "",
        businessLicenseImgId: "",
        bankLicenseImgId: "",
        orgNoImgId: "",
        contactIdCardImgId: "",
        legalIdCardImgId: "",
        taxNoImgId: "",
        businessLicense: "",
        bankNo: "",
        entrustedBranchBankInfo: "",
        legalIdCardNo: "",
        idCardType: "",
        contactAddress: "",
        email: "",
        name: "",
        registerContactsMobile: "",
        postcode: "",
        registerAddress: "",
        introduction: "",
        contactsEmail: "",
        contacts: "",
        contactsMobile: "",
        unifiedCode: "",
        industry: "",
        expressAddress: "",
        legal: "",
        bankCity: "",
        bankProvince: "",
        bankCode: "",
        bankName: "",
        entrustedBranchBankInfoName: "",
        orgNo: "",
        firstCategory: "",
        secondCategory: "",
        taxNo: "",
        type: ""
      },
      rules: {
        // businessLicense: [
        //   { required: true, message: "请输入", trigger: "blur" }
        // ],
        bankNo: [{ required: true, message: "请输入", trigger: "blur" }],
        entrustedBranchBankInfo: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        businessLicenseImgId: [
          { required: true, message: "请上传", trigger: "blur" }
        ],
        legalIdCardNo: [{ required: true, message: "请输入", trigger: "blur" }],
        // idCardType: [{ required: true, message: "请选择", trigger: "blur" }],
        // contactAddress: [
        //   { required: true, message: "请输入", trigger: "blur" }
        // ],
        email: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        // registerContactsMobile: [
        //   { required: true, message: "请输入", trigger: "blur" }
        // ],
        // postcode: [{ required: true, message: "请输入", trigger: "blur" }],
        registerAddress: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        // introduction: [{ required: true, message: "请输入", trigger: "blur" }],
        // contactsEmail: [{ required: true, message: "请输入", trigger: "blur" }],
        // contactIdCardImgId: [
        //   { required: true, message: "请上传", trigger: "blur" }
        // ],
        contacts: [{ required: true, message: "请输入", trigger: "blur" }],
        contactsMobile: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        unifiedCode: [{ required: true, message: "请输入", trigger: "blur" }],
        // industry: [{ required: true, message: "请输入", trigger: "blur" }],
        // expressAddress: [
        //   { required: true, message: "请输入", trigger: "blur" }
        // ],
        legalIdCardImgId: [
          { required: true, message: "请上传", trigger: "blur" }
        ],
        legal: [{ required: true, message: "请输入", trigger: "blur" }],
        // bankCity: [{ required: true, message: "请输入", trigger: "blur" }],
        // bankProvince: [{ required: true, message: "请输入", trigger: "blur" }],
        // bankCode: [{ required: true, message: "选择", trigger: "blur" }],
        entrustedBranchBankInfoName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        // orgNo: [{ required: true, message: "请输入", trigger: "blur" }],
        // orgNoImgId: [{ required: true, message: "请上传", trigger: "blur" }],
        // firstCategory: [{ required: true, message: "请输入", trigger: "blur" }],
        // secondCategory: [
        //   { required: true, message: "请输入", trigger: "blur" }
        // ],
        // taxNoImgId: [{ required: true, message: "请上传", trigger: "blur" }],
        // taxNo: [{ required: true, message: "请输入", trigger: "blur" }],
        // type: [{ required: true, message: "请输入", trigger: "blur" }],
        bankLicenseImgId: [
          { required: true, message: "请上传", trigger: "blur" }
        ]
      },
      submitText: "",
      bankList: [],
      typeList: []
    };
  },
  computed: {
    //账户状态是审核通过或为已激活 三个字段置灰
    isDisabled() {
      if (
        this.$route.query.bhaAuditStatus === "PASS" ||
        this.$route.query.bhaOpenStatus === "ACTIVED"
      ) {
        return true;
      }
      return false;
    },
    isShowSubmit() {
      // let status = this.$route.query.bhaAuditStatus;
      // let level = this.$route.query.level;
      // let type = this.$route.query.type;
      // if(type == 'right'){
      //   this.submitText = "提交开户";
      //   return true;
      // }
      // if (
      //   status == "SUBMITTED" ||
      //   status == "WAIT" ||
      //   status == "FAIL" ||
      //   level == "0"
      // ) {
      //   return false;
      // } else if (status) {
      //   this.submitText = "保存修改";
      //   return true;
      // } else {
      //   this.submitText = "提交开户";
      //   return true;
      // }
      const {type,bhaAuditStatus} = this.$route.query;

      if(type == "add" || type == "right"){
        this.submitText = "提交开户";
        return true;
      }

      if(type == "edit"){
        if(bhaAuditStatus == 'SUBMITTED' || bhaAuditStatus == 'WAIT' || bhaAuditStatus == 'FAIL'){
          this.submitText = "";
          return false;
        }
        if(bhaAuditStatus == 'PASS' || bhaAuditStatus == 'BACK'){
          this.submitText = "保存修改";
          return true;
        }
      }

    },
    ...mapState({
      privilegeVoList:state=>state.privilegeVoList
    })
  },
  mounted() {
    if (this.$route.query.type == "edit" || this.$route.query.type == "right") {
      let { level, merchantId } = this.$route.query;
      let accountInfoForm = {
        level,
        merchantId
      };
      this.$store
        .dispatch("accountPageStore/actionAccountInfo", accountInfoForm)
        .then(res => {
          this.accountForm = res.data;
          this.accountForm.type = "edit";
        });
    } else {
      this.accountForm = { ...this.accountForm, ...this.$route.query };
    }
    this.$store.dispatch("accountPageStore/actionBankAndType").then(res => {
      if (res.success) {
        this.bankList = res.data.banks;
        this.typeList = res.data.types;
      }
    });
  },
  methods: {
    //返回按钮
    handleReturn() {
      this.$router.go(-1);
    },
    onSubmit() {
      const {type} = this.$route.query;
      this.$refs["refForm"].validate(valid => {
        if (valid) {
          let _accountForm = {...this.accountForm};
          if(type == 'right'){
            _accountForm.id = "";
            _accountForm.type = "add";
          }
          this.$store
            .dispatch("accountPageStore/actionCreateAccount", _accountForm)
            .then(res => {
              if (res.success) {
                if (this.$route.query.type == "edit") {
                  this.$message({
                    message: "修改资金账户成功",
                    type: "success"
                  });
                  this.$router.go(-1);
                } else {
                  this.$alert(
                    "开户信息提交成功，系统将在 1 ~ 2 个工作日内完成审核，审核通过后请激活账户",
                    "提交成功",
                    {
                      confirmButtonText: "我知道了",
                      callback: action => {
                        this.handleReturn();
                      }
                    }
                  );
                }
              }
            });
        }
      });
    },
    handleuploadImg(params) {
      let { file } = params;
      this.$store.dispatch("actionUploadImage", file).then(res => {});
    },
    handleClear(ref, dom) {
      this.$refs[ref].clearFiles();
      this.accountForm[dom + "Url"] = "";
      this.accountForm[dom] = "";
    },
    handleSuccess(dom, response) {
      this.accountForm[dom] = response.data.fileId;
      this.accountForm[dom + "Url"] = response.data.fileUrl;
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isxls =
        testmsg === "jpg" || testmsg === "jpeg" || testmsg === "png";
      const isLt5M = file.size / 1024 / 1024 < 10;
      if (!isxls) {
        this.$message({
          message: "上传文件类型只能是 jpg,jpeg,png 格式!",
          type: "warning"
        });
        this.fileList = [];
      }
      if (!isLt5M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
        this.fileList = [];
      }
      return isxls && isLt5M;
    },
    handleSelectChange(key){
      const {bankList} = this;
      let selected = bankList.find(bank => bank.key == key);
      this.accountForm.bankName = selected.val;
    }
  }
};
</script>
<style lang="scss" scoped>
.imformation {
  padding-bottom: 80px;
  height: calc(100vh - 90px);
  strong {
    font-size: 14px;
    padding: 5px 0;
    margin: 10px 0 10px 12px;
    display: block;
  }
  .column {
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 15px 0 5px 30px;
    margin: 10px;
  }
  .information_button {
    padding:20px;
    background: #fff;
    width: 100%;
    position: fixed;
    bottom:0px;
    margin-top: 25px;
    margin-left: 12px;
  }
  .clear-button {
    position: absolute;
    top: 4px;
    left: 120px;
  }
  .upload_pic {
    img {
      width: 80px;
      margin-top: 5px;
      display: block;
    }
  }
}
</style>
