<template>
  <div class="paid-eidt">
        <el-form
          :rules="taxListRules"
          label-width="130px"
          ref="taxListForm"
          class="addForm"
          :model="newBodyFormData"
        >
          <div class="secTitle">公司基本信息</div>
          <el-form-item label="公司名称" prop="taxSubName">
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
          <div class="secTitle">公司信息验证</div>
          <el-form-item label="申报密码" prop="pwd">
            <el-input v-model="newBodyFormData.pwd" type="password"></el-input>
          </el-form-item>
          <div class="tip">自然人税收管理系统扣缴客户端的申报密码</div>
          <div class="checkStyle">
            <el-checkbox v-model="checked">授权"薪税通"实现公司中人员的算税、报税、缴税</el-checkbox>
          </div>
        </el-form>
        <span slot="footer" class="con-footer">
          <el-button type="primary" @click="handleNewBody">确定</el-button>
          <el-button @click="handleCancel(false)">取消</el-button>
        </span>
        <!-- 下载-->
        <initSelectS ref="selectSY" :sign="sign" :timeObj="timeObj"></initSelectS>
    </div>
</template>
<script>
import { mapState } from "vuex";
import initSelectS from "./tool/initSelectS";
export default {
  selectItem:{
    type: Object,
    default:{}
  },
  components: {
    initSelectS,
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
      this.$refs.taxListForm.validate(valid => {
        if(valid){
          let paramsObj = {
            validParameter : this.newBodyFormData,
            querytAction : "taxPageStore/actionAccreditQuery",
            validAction : "taxPageStore/actionDealTaxSubject",
            stopTip:"授权",
            freeBackTip:'【授权反馈】'
          }
          this.$refs.selectSY.show(true,paramsObj)
        }
      })

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
  padding:0px 30px;
  .secTitle{
    margin:20px auto;
    font-size: 16px;
  }
  .tip{
    font-size: 12px;
    color:#C0C4CC;
    padding-left: 130px;
    margin-top:-5px;
  }
  .checkStyle{
    margin: 20px 0px 10px 0px;
  }
  .con-footer{
    position: absolute;
    bottom:20px;
    left:40%;
  }
}
</style>

