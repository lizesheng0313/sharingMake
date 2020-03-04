<template>
  <div class="paid-eidt">
        <el-form
          :rules="taxListRules"
          label-width="130px"
          ref="taxListForm"
          class="addForm"
          :model="newBodyFormData"
        >
          <el-form-item label="公司名称" prop="taxSubName">
            <el-input v-model="newBodyFormData.taxSubName"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="taxPayerNo">
            <el-input v-model="newBodyFormData.taxPayerNo"></el-input>
          </el-form-item>
          <el-form-item label="办税人员姓名" prop="remark">
            <el-input v-model="newBodyFormData.remark"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人" prop="legalName">
            <el-input v-model="newBodyFormData.legalName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleNewBody">确定</el-button>
          <el-button @click="isShowScreen=false">取消</el-button>
        </span>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      newBodyFormData: {
        legalName: "",
        remark: "",
        taxPayerNo: "",
        taxSubId: "",
        taxSubName: ""
      },
      taxListRules: {
        taxSubName: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur"
          }
        ],
        taxPayerNo: [
          {
            required: true,
            message: "请输入纳税人识别号",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入办税人员姓名",
            trigger: "blur"
          }
        ]
      },
      currentTypeName: "",
      list: [],
      isShowScreen: false,
      screenWidth: document.body.clientWidth,// 屏幕尺寸
      closeModel:false
    };
  },
  mounted() {
  },
  methods: {
    //新增
    handleShowBox() {
      this.newBodyFormData.taxSubId = "";
      this.currentTypeName = "新增";
      this.isShowScreen = true;
      this.$nextTick(() => {
        this.$refs.taxListForm.resetFields();
      });
    },

    handleNewBody() {
      this.$refs.taxListForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("taxPageStore/actionDealTaxSubject", this.newBodyFormData)
            .then(res => {
              if (res.success) {
                this.getList();
                this.isShowScreen = false;
              }
            });
        }
      });
    },
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionTaxSubjectList", this.taxListFormData)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.list = res.data;
          }
        });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.paid-eidt {
}
</style>

