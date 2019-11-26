<template>
  <div class="paid-eidt">
        <el-form
          :rules="taxListRules"
          label-width="130px"
          ref="taxListForm"
          class="addForm"
          :model="newBodyFormData"
        >
          <div class="secTitle">扣缴义务人基本信息</div>
          <el-form-item label="扣缴义务人名称" prop="taxSubName">
            <el-input v-model="newBodyFormData.taxSubName"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="taxPayerNo">
            <el-input v-model="newBodyFormData.taxPayerNo"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人" prop="legalName">
            <el-input v-model="newBodyFormData.legalName"></el-input>
          </el-form-item>
          <el-form-item label="经办人姓名" prop="remark">
            <el-input v-model="newBodyFormData.remark"></el-input>
          </el-form-item>
          <div class="tip">在自然人税收管理系统扣缴客户端中个税申报操作人员姓名</div>
          <div class="secTitle">扣缴义务人信息验证</div>
          <el-form-item label="申报密码" prop="pwd">
            <el-input v-model="newBodyFormData.pwd" type="password"></el-input>
          </el-form-item>
          <div class="tip">自然人税收管理系统扣缴客户端的申报密码</div>
          <div class="checkStyle">
            <el-checkbox v-model="checked">授权"薪税通"实现扣缴义务人中人员的算税、报税、缴税</el-checkbox>
          </div>
        </el-form>
        <span slot="footer" class="con-footer">
          <el-button type="primary" @click="handleNewBody">授权</el-button>
          <el-button @click="handleCancel(false)">取消</el-button>
        </span>
        <!-- 下载-->
        <selectSY ref="selectSY" :sign="sign" :timeObj="timeObj"></selectSY>
    </div>
</template>
<script>
import { mapState } from "vuex";
import selectSY from "./tool/partSelectSY";
export default {
  selectItem:{
    type: Object,
    default:{}
  },
  components: {
    selectSY,
  },
  data() {
    return {
      timeObj:{
        first:3000,
        second:10000,
        third:15000,
      },
      sign:"paidEdit",
      newBodyFormData: {
        legalName: "",
        remark: "",
        taxPayerNo: "",
        taxSubId: "",
        taxSubName: "",
        pwd:""
      },
      taxListRules: {
        taxSubName: [
          {
            required: true,
            message: "请输入扣缴义务人名称",
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
            message: "请输入经办人姓名",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入申报密码",
            trigger: "blur"
          }
        ]
      },
      currentTypeName: "",
      list: [],
      isShowScreen: false,
      screenWidth: document.body.clientWidth,// 屏幕尺寸
      closeModel:false,
      checked:true
    };
  },
  mounted() {
    this.newBodyFormData = { ...this.$parent.$parent.selectItem }
  },
  methods: {
    //子组件触发刷新
    freshList(data,isClose){
      if((data === this.sign) && isClose){
        this.handleCancel(true)
      }
    },
    //授权
    handleNewBody() {
      let paramsObj = {
        validParameter : this.newBodyFormData,
        querytAction : "taxPageStore/actionAccreditQuery",
        validAction : "taxPageStore/actionDealTaxSubject",
        stopTip:"授权",
      }
      this.$refs.selectSY.show(true,paramsObj)
    },
    handleCancel(data){
      this.$emit("hanleClose",data)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.paid-eidt {
  .secTitle{
    margin:30px auto;
    font-size: 16px;
  }
  .tip{
    font-size: 12px;
    color:#333;
    padding-left: 130px;
    margin-top:-5px;
  }
  .checkStyle{
    margin-top: 40px;
  }
  .con-footer{
    position: absolute;
    bottom:20px;
    left:40%;
  }
}
</style>

