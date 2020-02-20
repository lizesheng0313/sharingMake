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
                          <el-col :span="12"><el-form-item label="姓名：">{{ floatEmployeeBaseInfoVo?floatEmployeeBaseInfoVo.empName:"_" }}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="工号：">{{ floatEmployeeBaseInfoVo ? floatEmployeeBaseInfoVo.empNo:"_"}}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="证件类型：">{{ floatEmployeeBaseInfoVo.idType | filterIdType}}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="证件号码：">{{ floatEmployeeBaseInfoVo?floatEmployeeBaseInfoVo.idNo:"_" }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="户籍城市：">{{ floatEmployeeBaseInfoVo?floatEmployeeBaseInfoVo.householdCountry:"_" }}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="户口性质：">{{ floatEmployeeBaseInfoVo.householdRegistrationType | householdRegistrationType}}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="公司名称：">{{ floatEmployeeBaseInfoVo?floatEmployeeBaseInfoVo.compName:"_" }}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="用工性质：">{{ floatEmployeeBaseInfoVo.empType|filterEmpType }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="入职日期：">{{ floatEmployeeBaseInfoVo?floatEmployeeBaseInfoVo.empDay:""}}</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="离职日期：">{{ floatEmployeeBaseInfoVo?floatEmployeeBaseInfoVo.leaveDay:""}}</el-form-item></el-col>
                      </el-row>
                  </el-form>
              </div>
              <div class="insured-info">
                  <span class="title">参保信息</span>
                  <span class="fun-right">
                      <el-button type="primary" @click="editInsured">编辑</el-button>
                      <el-button type="primary" @click="decreaceStaff" v-if="attritionItem.insuredStatus === 'INSURED_ING'">减员</el-button>
                      <el-button type="primary" @click="increaceStaff" v-else>继续参保</el-button>

                </span>
              </div>
              <div class="base-info-con">
                  <el-form label-width="140px" v-if="!isEdit">
                      <el-row>
                        <el-col :span="12"><el-form-item label="参保方案：">{{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.compInsuredName :"_"}}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="参保城市："> {{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.insuredCity:"_" }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="社保起缴月份：">{{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.socialInsuranceStartMonth:"_" }}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="社保基数：">{{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.socialInsuranceBaseNumber:"_" }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="公积金起缴月份：">{{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.accumulationFundStartMonth:"_" }}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="公积金基数：">{{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.accumulationFundBaseNumber:"_" }}</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="社保停缴月份：">{{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.socialInsuranceEndMonth:"_" }}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="公积金停缴月份：">{{ floatEmployeeInsuredInfoVo?floatEmployeeInsuredInfoVo.accumulationFundEndMonth:"_" }}</el-form-item></el-col>
                      </el-row>
                  </el-form>
                <el-form label-width="150px" :model="insuredForm" ref="insuredForms" v-else>
                  <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="参保方案" prop="compInsuredId" :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
                          <el-select v-model="insuredForm.compInsuredId" placeholder="请选择参保方案" @change="changeInsure">
                            <el-option v-for="(item,index) in planOption" :label="item.insuredName" :value="item.id" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    <div style="flex:1">
                      <el-form-item label="参保城市：" prop="insuredCity" :rules="{required: true, message: '参保城市不能为空', trigger: 'blur'}">
                        <el-input v-model="insuredForm.insuredCity" disabled></el-input>
                      </el-form-item>
                    </div>
                  </el-row>
                  <el-row style="display: flex">
                    <div style="flex:1">
                      <el-form-item label="社保起缴月份" prop="socialInsuranceStartMonth" :rules="{required:true, message: '请选择社保起缴月份', trigger: 'blur'}">
                          <el-date-picker v-model="insuredForm.socialInsuranceStartMonth"
                                          type="month" value-format="yyyy-MM"  placeholder="请选择"></el-date-picker>
                      </el-form-item>
                    </div>
                    <div style="flex:1">
                      <el-form-item label="社保基数" prop="socialInsuranceBaseNumber" :rules="{ required: true, message: '请选择员工社保基数', trigger: 'blur'}">
                        <el-input v-model="insuredForm.socialInsuranceBaseNumber"></el-input>
                      </el-form-item>
                    </div>
                  </el-row>
                  <el-row style="display: flex">
                    <div style="flex:1">
                      <el-form-item label="公积金起缴月份" prop="accumulationFundStartMonth"
                                    :rules="{ required: true, message: '请选择公积金起缴月份', trigger: 'blur'}">
                        <el-radio-group v-model="insuredForm.providentStartMonthType" size="small" :disabled="accumulationFundYn">
                          <el-radio-button label="1">同社保</el-radio-button>
                          <el-radio-button label="2">选择</el-radio-button>
                        </el-radio-group>
                        <span class="provident-month">
                            <el-date-picker v-if="insuredForm.providentStartMonthType==2" value-format="yyyy-MM"
                                            :disabled="accumulationFundYn"
                                            v-model="insuredForm.accumulationFundStartMonth" type="month" placeholder="请选择"></el-date-picker>
                        </span>
                      </el-form-item>
                    </div>
                    <div style="flex:1">
                      <el-form-item label="公积金基数" prop="accumulationFundBaseNumber"
                                    :rules="{ required: true, message: '公积金基数不能为空', trigger: 'blur'}">
                        <el-input v-model="insuredForm.accumulationFundBaseNumber" :disabled="accumulationFundYn"></el-input>
                      </el-form-item>
                    </div>
                  </el-row>
                  <el-row style="display: flex">
                    <div style="flex:1">
                        <el-form-item label="社保停缴月份" prop="socialInsuranceEndMonth"
                                      :rules="{required: attritionItem.insuredStatus === 'INSURED_STOP' && !accumulationFundYn, message: '请选择社保停缴月份', trigger: 'blur'}">
                          <el-date-picker v-model="insuredForm.socialInsuranceEndMonth" type="month"
                                          :disabled="attritionItem.insuredStatus === 'INSURED_ING'"
                                          placeholder="请选择" value-format="yyyy-MM"></el-date-picker>
                        </el-form-item>
                    </div>
                    <div style="flex:1">
                      <el-form-item label="公积金停缴月份" prop="accumulationFundEndMonth"
                                    :disabled="accumulationFundYn"
                                    :rules="{ required: attritionItem.insuredStatus === 'INSURED_STOP' && !accumulationFundYn, message: '请选择公积金停缴月份', trigger: 'blur'}">
                        <el-radio-group v-model="insuredForm.providentStopMonthType" size="small"
                                        :disabled="accumulationFundYn || attritionItem.insuredStatus === 'INSURED_ING'">
                          <el-radio-button label="1">同社保</el-radio-button>
                          <el-radio-button label="2">选择</el-radio-button>
                        </el-radio-group>
                        <span class="provident-month">
                            <el-date-picker v-if="insuredForm.providentStopMonthType==2"
                                            :disabled="accumulationFundYn || attritionItem.insuredStatus === 'INSURED_ING'"
                                            v-model="insuredForm.accumulationFundEndMonth" type="month"
                                            value-format="yyyy-MM" placeholder="请选择">

                            </el-date-picker>
                        </span>
                      </el-form-item>
                    </div>
                  </el-row>
                </el-form>
                <div style="text-align: center;margin:20px 0px;" v-if="isEdit">
                    <el-button type="primary" @click="saveInfo">保存</el-button>
                    <el-button @click="cancelEdit">取消</el-button>
                </div>
              </div>
              <div class="table-fun">
                <el-button type="primary" @click="showInfo">预扣缴信息</el-button>
              </div>
              <div v-if="showTable">
                <el-table :data="insuredPayDetailVoList" border>
                    <el-table-column prop="insuranceType" label="险种">
                      <template slot-scope="scope">
                        <div> {{ scope.row.insuranceType | insuranceType}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="baseNumber" label="缴费基数">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.baseNumber ? scope.row.baseNumber:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="personScale" label="个人缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.personScale ? scope.row.personScale+'%' :"_"}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="personFixedAmount" label="个人固定金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.personFixedAmount ? scope.row.personFixedAmount :"_"}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="personPayAmount" label="个人缴费金额">
                      <template slot-scope="scope">
                        <div class="number-right">{{ scope.row.personPayAmount ? scope.row.personPayAmount :"_"}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="compScale" label="企业缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right">{{ scope.row.compScale ? scope.row.compScale+'%':"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="compFixedAmount" label="企业固定金额">
                      <template slot-scope="scope">
                        <div class="number-right">{{ scope.row.compFixedAmount ? scope.row.compFixedAmount:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="compPayAmount" label="企业缴费金额">
                      <template slot-scope="scope">
                        <div class="number-right">{{ scope.row.compPayAmount ? scope.row.compPayAmount:"_" }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPayAmount" label="个人企业合计">
                      <template slot-scope="scope">
                        <div class="number-right">{{ scope.row.totalPayAmount ? scope.row.totalPayAmount:"_" }}</div>
                      </template>
                    </el-table-column>
                </el-table>
              </div>
          </div>
      </div>
    </full-screen>
    <!-- 社保增员 -->
    <socialIncreace ref="socialIncreace" @freshList ="getInfo"></socialIncreace>
    <!-- 社保减员 -->
    <social-decreace ref="socialDecreace" @freshList ="getInfo"></social-decreace>
  </div>
</template>
<script>
import socialDecreace from './components/socialDecrease'
import socialIncreace from './components/socialIncreace'
import fullScreen from "@/components/full-screen/index";
import { validatePhone } from "@/util/validate";
import { mapState } from "vuex";

export default {
  components: {
    fullScreen,
    socialDecreace,
    socialIncreace,
  },
  computed: {
    ...mapState("socialFundStore", {
      attritionItem: state => state.attritionItem
    })
  },
  data() {
    const t = this;
    return {
      isEdit:false,
      insuredForm:{
        compEmpId:"",
        compInsuredId:null,
        insuredCity:"",

        socialInsuranceStartMonth:"",
        socialInsuranceBaseNumber:"",

        providentStartMonthType:"1",
        accumulationFundStartMonth:"",
        accumulationFundBaseNumber:"",

        providentStopMonthType:"1",
        socialInsuranceEndMonth:"",
        accumulationFundEndMonth:"",
      },
      floatEmployeeBaseInfoVo:[],
      floatEmployeeInsuredInfoVo:[],
      insuredPayDetailVoList:[],
      planOption:[],
      accumulationFundYn:false,
      showTable:false,
    };
  },
  created(){
    this.insuredForm.compEmpId = this.attritionItem.compEmpId
    this.getInfo()
  },
  mounted(){
  },
  methods: {
    getInfo(){
      this.$store
        .dispatch("socialFundStore/actionFloatEmployeeManageInfo",{
          "empId":this.attritionItem.empId,
          "empInsuredId":this.attritionItem.empInsuredId
        })
        .then(res => {
          if(res.success){
            this.floatEmployeeBaseInfoVo = res.data.floatEmployeeBaseInfoVo
            this.floatEmployeeInsuredInfoVo = res.data.floatEmployeeInsuredInfoVo
            this.insuredPayDetailVoList = res.data.insuredPayDetailVoList

            for(let key in this.floatEmployeeInsuredInfoVo){
              if(this.floatEmployeeInsuredInfoVo[key]){
                this.insuredForm[key]=this.floatEmployeeInsuredInfoVo[key]
              }
            }
            console.log(this.insuredForm.socialInsuranceEndMonth)
            this.insuredForm.compInsuredId = this.insuredForm.compInsuredId-0
            //获取参保方案列表
            this.getPlanList()
            this.insuredForm.providentStartMonthType =
              this.insuredForm.accumulationFundStartMonth === this.insuredForm.socialInsuranceStartMonth?'1':'2'
            this.insuredForm.providentStopMonthType =
              this.insuredForm.accumulationFundEndMonth === this.insuredForm.socialInsuranceEndMonth?'1':'2'
          }
        })
    },
    getPlanList(){
      this.$store
        .dispatch("socialFundStore/actionGetCompInsuredProject", )
        .then(res => {
          if(res.success){
            this.planOption = res.data
            this.changeInsure(this.insuredForm.compInsuredId)
          }
        });
    },
    changeInsure(value){
      let selectItem = this.planOption.filter(item=>item.id == value)
      this.insuredForm.insuredCity =selectItem[0].insuredCity
      this.accumulationFundYn = selectItem[0].accumulationFundYn
    },
    saveInfo() {
      this.$refs['insuredForms'].validate(valid => {
        if(valid){
          this.$store
            .dispatch("socialFundStore/actionFloatEmployeeManageSave",this.insuredForm)
            .then(res => {
              if(res.success){
                this.$message.success('保存成功')
                this.isEdit = false;
                this.getInfo()
              }
            })
        }
      })
    },
    //编辑社保信息
    editInsured(){
      this.isEdit = true;
      this.showTable = false
    },
    //增员
    increaceStaff(){
      let compEmpIds = [this.attritionItem.compEmpId]
      let nameList = [this.floatEmployeeBaseInfoVo.empName]
      this.$refs.socialIncreace.show(compEmpIds,nameList)
    },
    //减员
    decreaceStaff(){
      let compEmpInfo= [
        {
          compEmpId:this.attritionItem.compEmpId,
          taxSubId:this.attritionItem.taxSubId
        }
      ]
      this.$refs.socialDecreace.show(compEmpInfo)
    },
    cancelEdit(){
      this.isEdit = false
    },
    showInfo(){
      this.showTable = true;
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
