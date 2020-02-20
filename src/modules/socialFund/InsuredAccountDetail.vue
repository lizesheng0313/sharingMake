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
                          <el-col :span="12"><el-form-item label="姓名：">{{ insuredInfo.empName}}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="工号：">{{ insuredInfo.empNo}}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="证件类型：">{{ insuredInfo.idType | filterIdType}}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="证件号码：">{{ insuredInfo.idNo}}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="户籍城市：">{{ insuredInfo.householdCountry}}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="户口性质：">{{ insuredInfo.householdRegistrationType | householdRegistrationType }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="公司名称：">{{ insuredInfo.taxSubName}}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="用工性质：">{{ insuredInfo.empType | filterEmpType}}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="参保方案：">{{ insuredInfo.compInsuredName }}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="参保城市：">{{ insuredInfo.insuredCity }}</el-form-item></el-col>
                      </el-row>
                  </el-form>
              </div>
              <div class="insured-info">
                  <span class="title">缴费信息</span>
              </div>
              <div v-for="(item,index) in insuredPayList" :key="index">
                <div>缴费月份：{{ item.month }} <el-button type="text" @click="deletePayBack(item)" v-if="item.isSupplement">删除补缴</el-button></div>
                <el-table :data="item.payDetailList" border>
                    <el-table-column prop="type" label="险种">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.insuranceType | insuranceType }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="baseNumber" label="缴费基数">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.baseNumber?scope.row.baseNumber:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="personScale" label="个人缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.personScale?scope.row.personScale:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="personFixedAmount" label="个人固定金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.personFixedAmount?scope.row.personFixedAmount:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="personPayAmount" label="个人缴费金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.personPayAmount?scope.row.personPayAmount:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="compScale" label="企业缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.compScale?scope.row.compScale:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="compFixedAmount" label="企业固定金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.compFixedAmount?scope.row.compFixedAmount:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="compPayAmount" label="企业缴费金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.compPayAmount?scope.row.compPayAmount:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPayAmount" label="个人企业合计">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.totalPayAmount?scope.row.totalPayAmount:"_" }}</div>
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
      insuredInfo:[],
      insuredPayList:[]
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
           this.insuredInfo = res.data
           this.insuredPayList = res.data.insuredPayList
        })
    },
    deletePayBack(data){
      this.$confirm(" 是否删除所选记录！", "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center:false
        }
      ).then(() => {
        this.$store
          .dispatch("socialFundStore/actionEmpMonthlyLedgerDelete",{
            id:this.id,
            month:data.month
          })
          .then(res=>{
            if(res.success){
              this.getList()
            }
          })
      }).catch(() => {})
    },
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
