<template>
  <div class="attrition-detail">
    <full-screen
      :fsTitle="'查看详情'"
      :bgColor="'#fff'"
      class="info-collection"
      :goUrl="'-1'"
    >
      <div slot="fs-container">
          <div class="attrition-detail-con">
            <div class="base-info"><span class="title">基本信息</span></div>
            <div class="base-info-con">
                <el-form label-width="140px">
                    <el-row>
                        <el-col :span="12"><el-form-item label="姓名：">马大哈</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="工号：">马大哈</el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><el-form-item label="证件类型：">居民身份证</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="证件号码：">101110198009080922</el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><el-form-item label="户籍城市：">广东省广州市</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="户口性质：">外阜城镇</el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><el-form-item label="公司名称：">北京阿拉钉科技有限公司</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="用工性质：">全职</el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><el-form-item label="入职日期：">2019-01-02</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="离职日期：">--</el-form-item></el-col>
                    </el-row>
                </el-form>
            </div>

            <div class="insured-info"><span class="title">参保信息</span></div>
            <div class="base-info-con">
              <el-form label-width="140px">
                <el-row>
                  <el-col :span="12"><el-form-item label="姓名：">马大哈</el-form-item></el-col>
                  <el-col :span="12"><el-form-item label="工号：">马大哈</el-form-item></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><el-form-item label="证件类型：">居民身份证</el-form-item></el-col>
                  <el-col :span="12"><el-form-item label="证件号码：">101110198009080922</el-form-item></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><el-form-item label="户籍城市：">广东省广州市</el-form-item></el-col>
                  <el-col :span="12"><el-form-item label="户口性质：">外阜城镇</el-form-item></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><el-form-item label="公司名称：">北京阿拉钉科技有限公司</el-form-item></el-col>
                  <el-col :span="12"><el-form-item label="用工性质：">全职</el-form-item></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><el-form-item label="入职日期：">2019-01-02</el-form-item></el-col>
                  <el-col :span="12"><el-form-item label="离职日期：">--</el-form-item></el-col>
                </el-row>
              </el-form>
            </div>
          </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import { validatePhone } from "@/util/validate";
import { mapState } from "vuex";

export default {
  components: {
    fullScreen
  },
  computed: {
    ...mapState("taxPageStore", {
      personnelCollection: state => state.personnelCollection
    }),
  },
  mounted() {
    this.employeeFormData = JSON.parse(
      JSON.stringify(this.personnelCollection)
    );
  },
  data() {
    const t = this;
    return {

    };
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.attrition-detail {
  .attrition-detail-con {
    width: 1100px;
    margin: 0 auto;
    .title {
      display: inline-block;
      margin-top: 30px;
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .base-info-con {
      width: 1000px;
      margin: 0 auto;
    }
    .insured-info{
      .title{
        margin: 0px 0px 10px 0px;
      }
    }
  }
}
</style>
