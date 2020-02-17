<template>
  <div class="attrition-detail">
    <full-screen
      :fsTitle="'查看详情'"
      :bgColor="'#fff'"
      class="info-collection"
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
                          <el-col :span="12"><el-form-item label="参保方案：">2019-01-02</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="参保城市：">--</el-form-item></el-col>
                      </el-row>
                  </el-form>
              </div>
              <div class="insured-info">
                  <span class="title">缴费信息</span>
              </div>
              <div>
                <div>缴费月份：12.12.12 <el-button type="text">删除补缴</el-button></div>
                <el-table :data="list" border>
                    <el-table-column prop="type" label="险种">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="缴费基数">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人固定金额">
                        <template slot-scope="scope">
                            <div class="number-right"> {{ scope.row.type }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人缴费金额">
                        <template slot-scope="scope">
                            <div class="number-right"> {{ scope.row.type }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="企业缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="企业固定金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="企业缴费金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人企业合计">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                </el-table>
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
  data() {
    const t = this;
    return {
      id:this.$route.query.id,
      list:[],
    };
  },
  created(){
    this.getList()
  },
  mounted() {

  },
  methods: {
    getList(){
      this.$store
        .dispatch("socialFundStore/actionEmpMonthlyLedgerDetail",{id:this.id})
        .then(res=>{
          console.log(res)
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.attrition-detail {
  background: #fff;
  padding-bottom: 30px;
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
        margin: 0px 0px 30px 0px;
      }
      .fun-right{
        float: right;
      }
    }
    .table-fun{
      margin:0px 0px 20px 0px;
    }

  }
}
</style>
