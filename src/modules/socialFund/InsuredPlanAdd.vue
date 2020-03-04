<template>
  <div class="insured-account-add">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span @click="$router.go(-1)" class="back-style">返回</span>
            <span class="header-line">|</span>
            <span>参保方案</span>
          </el-col>
        </el-row>
      </header>
      <div class="account-add-con">
        <el-form label-width="120px" :model="insuredForm" ref="insuredForm">
          <el-row style="display: flex;width:800px;margin-top: 20px">
            <div style="flex:1">
              <el-form-item label="参保城市：" prop="insuredCity" :rules="{required: true, message: '参保城市不能为空', trigger: 'blur'}">
                <el-select v-model="insuredForm.insuredCity" placeholder="请选择参保城市" filterable @change="changeCity">
                  <el-option v-for="(item,index) in cityList" :label="item.name" :value="item.code" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div style="flex:1">
              <el-form-item label="参保方案名称" prop="planName" :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
                <el-input v-model="insuredForm.planName"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <div class="social-plan" >
            <div class="social-plan-title">
              <span class="plan-title">社保方案</span>
              <span class="plan-tip" v-if="planOption.length>0">有{{ planOption.length }}个社保方案供您参保 <span class="choose-plan" @click="choosePlan">选择方案</span></span>
            </div>
            <div class="social-plan-table">
                <el-popover ref="socialPlan" placement="bottom" width="140" trigger="click">
                  <el-checkbox-group v-model="socialCheckedType" @change="handleSocialType">
                    <div v-for="(item,index) in socialOption" style="line-height: 20px;text-align: left;margin-left: 20px">
                      <el-checkbox :label="item.value" :key="index">{{ item.label }}</el-checkbox>
                    </div>
                  </el-checkbox-group>
                </el-popover>
                <div class="insurance-type-add">
                  <el-button v-popover:socialPlan type="text" size="mini" @click="handleSocial">
                    <i class="el-icon-circle-plus-outline" :style="iconStyle"></i>
                    <span>选择险种</span>
                  </el-button>
                </div>
                <el-table :data="insuredForm.socialInsuranceList" border >
                  <el-table-column prop="month" label=" " width="130">
                    <template slot-scope="scope">
                      <el-form-item label-width="0">
                        <span>{{ scope.row.insuranceType | insuranceType}}</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="基数下限" width="110">
                    <template slot-scope="scope">
                      <el-form-item label-width="0" :prop="'socialInsuranceList.' + scope.$index +'.baseNumberMin'"
                                    :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                        <el-input v-model="scope.row.baseNumberMin" class="input-right"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="基数上限" width="110">
                    <template slot-scope="scope">
                      <el-form-item label-width="0" :prop="'socialInsuranceList.' + scope.$index +'.baseNumberMax'"
                                    :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                         <el-input v-model="scope.row.baseNumberMax" class="input-right"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="个人比例" width="100">
                    <template slot-scope="scope">
                      <div style="display: flex">
                        <el-form-item label-width="0" :prop="'socialInsuranceList.' + scope.$index +'.personScale'"
                                      :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                          <el-input v-model="scope.row.personScale" class="input-right"/>
                        </el-form-item>
                        <span style="line-height: 42px">%</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="个人固定金额" width="120">
                    <template slot-scope="scope">
                      <el-form-item label-width="0" :prop="'socialInsuranceList.' + scope.$index +'.personFixedAmount'"
                                    :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                         <el-input v-model="scope.row.personFixedAmount" class="input-right"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="个人尾数规则" width="200">
                    <template slot-scope="scope">
                      <el-form-item label-width="0">
                        <el-select v-model="scope.row.personMantissaRule" placeholder="请选择">
                        <el-option
                          v-for="item in ruleOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="公司比例" width="100">
                    <template slot-scope="scope">
                      <div style="display: flex">
                        <el-form-item label-width="0" :prop="'socialInsuranceList.' + scope.$index +'.compScale'"
                                      :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                             <el-input v-model="scope.row.compScale" class="input-right"/>
                        </el-form-item>
                        <span style="line-height: 42px">%</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位固定金额" width="110">
                    <template slot-scope="scope">
                      <el-form-item label-width="0" :prop="'socialInsuranceList.' + scope.$index +'.compFixedAmount'"
                                    :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                         <el-input v-model="scope.row.compFixedAmount" class="input-right"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="公司尾数规则" min-width="200">
                    <template slot-scope="scope">
                     <el-form-item label-width="0">
                        <el-select v-model="scope.row.compMantissaRule" placeholder="请选择">
                        <el-option
                          v-for="item in ruleOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                     </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
            <div class="social-plan-title" style="margin-top: 20px;overflow: hidden">
              <span class="plan-title">公积金方案</span>
              <el-checkbox v-model="accumulationFundYn" style="margin-left: 20px">是否不缴纳公积金</el-checkbox>
            </div>
            <div class="social-plan-table" v-if="!accumulationFundYn">
              <el-popover ref="fundPlan" placement="bottom" width="160" trigger="click">
                <el-checkbox-group v-model="fundCheckedType" @change="handleFundType">
                  <div v-for="(item,index) in fundOption" style="line-height: 20px;text-align: left;margin-left: 20px" >
                    <el-checkbox :label="item.value" :key="index">{{ item.label }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </el-popover>
              <div class="insurance-type-add">
                <el-button v-popover:fundPlan type="text" size="mini"  @click="handleFund">
                  <i class="el-icon-circle-plus-outline" :style="iconStyle"></i>
                  <span>选择险种</span>
                </el-button>
              </div>
              <el-table :data="insuredForm.accumulationFundList" border>
                <el-table-column prop="month" label=" " width="130">
                  <template slot-scope="scope">
                    <el-form-item label-width="0">
                       <span>{{ scope.row.insuranceType | insuranceType}}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="基数下限" width="110">
                  <template slot-scope="scope">
                    <el-form-item label-width="0" :prop="'accumulationFundList.' + scope.$index +'.baseNumberMin'"
                                  :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                       <el-input v-model="scope.row.baseNumberMin" class="input-right"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="基数上限" width="110">
                  <template slot-scope="scope">
                    <el-form-item label-width="0" :prop="'accumulationFundList.' + scope.$index +'.baseNumberMax'"
                                  :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                      <el-input v-model="scope.row.baseNumberMax" class="input-right"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="个人比例" width="110">
                  <template slot-scope="scope">
                    <div style="display: flex">
                      <el-form-item label-width="0" :prop="'accumulationFundList.' + scope.$index +'.personScale'"
                                    :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                         <el-input v-model="scope.row.personScale" class="input-right"/>
                      </el-form-item>
                      <span style="line-height: 42px">%</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="个人固定金额" width="110">
                  <template slot-scope="scope">
                    <el-form-item label-width="0" :prop="'accumulationFundList.' + scope.$index +'.personFixedAmount'"
                                  :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                        <el-input v-model="scope.row.personFixedAmount" class="input-right"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="个人尾数规则" width="200">
                  <template slot-scope="scope">
                    <el-form-item label-width="0">
                      <el-select v-model="scope.row.personMantissaRule" placeholder="请选择">
                      <el-option
                        v-for="item in ruleOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="单位比例" width="120">
                  <template slot-scope="scope">
                    <div style="display: flex">
                      <el-form-item label-width="0" :prop="'accumulationFundList.' + scope.$index +'.compScale'"
                                    :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                          <el-input v-model="scope.row.compScale" class="input-right"/>
                      </el-form-item>
                      <span style="line-height: 42px">%</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="单位固定金额" width="120">
                  <template slot-scope="scope">
                    <div style="display: flex">
                      <el-form-item label-width="0" :prop="'accumulationFundList.' + scope.$index +'.compFixedAmount'"
                                    :rules="{ validator: validateNumber, message: '请输入正确数值', trigger: 'blur'}">
                          <el-input v-model="scope.row.compFixedAmount" class="input-right"/>
                      </el-form-item>
                      <span style="line-height: 42px"></span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="公司尾数规则" min-width="200">
                  <template slot-scope="scope">
                    <el-form-item label-width="0">
                      <el-select v-model="scope.row.compMantissaRule" placeholder="请选择">
                        <el-option
                          v-for="item in ruleOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form>
        <div class="foot-btn">
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>
    </div>
    <!-- 选择方案 -->
    <el-dialog :visible.sync="isShowChoosePlan" title="选择方案" width="600px" center class="screen-dialog" :close-on-click-modal="closeModel">
      <div class="screening-wapper">
        <el-form :model="choosePlanForm" ref="choosePlanForm" label-width="120px" >
          <div class="shortCon">
            <el-form-item label="参保方案" :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
              <el-select v-model="choosePlanForm.baseInsuredId" placeholder="请选择参保方案">
                <el-option v-for="(item,index) in planOption" :label="item.insuredName" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleChoosePlan">确定</el-button>
              <el-button @click="isShowChoosePlan = false">取消</el-button>
            </span>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import fun from "@/util/fun";
  import * as constData from "./util/constData"
  import { validateNumber } from "@/util/validate";
  export default {
    components:{

    },
    data() {
      return {
        insuredForm:{
          planName:"",
          insuredCity:"",
          socialInsuranceList:[
            { insuranceType: "ENDOWMENT_INSURANCE", baseNumberMax: "0.00", baseNumberMin: "0.00", compFixedAmount: "0.00", compMantissaRule: "ROUND_UNTIL_FEN", compScale: "0", personFixedAmount: "0.00", personMantissaRule: "ROUND_UNTIL_FEN", personScale: "0"},
            { insuranceType: "MEDICAL_INSURANCE", baseNumberMax: "0.00", baseNumberMin: "0.00", compFixedAmount: "0.00", compMantissaRule: "ROUND_UNTIL_FEN", compScale: "0", personFixedAmount: "0.00", personMantissaRule: "ROUND_UNTIL_FEN", personScale: "0"},
            { insuranceType: "UNEMPLOYMENT_INSURANCE", baseNumberMax: "0.00", baseNumberMin: "0.00", compFixedAmount: "0.00", compMantissaRule: "ROUND_UNTIL_FEN", compScale: "0", personFixedAmount: "0.00", personMantissaRule: "ROUND_UNTIL_FEN", personScale: "0"},
            { insuranceType: "INJURY_INSURANCE", baseNumberMax: "0.00", baseNumberMin: "0.00", compFixedAmount: "0.00", compMantissaRule: "ROUND_UNTIL_FEN", compScale: "0", personFixedAmount: "0.00", personMantissaRule: "ROUND_UNTIL_FEN", personScale: "0"}
          ],
          accumulationFundList:[
            { insuranceType: "ACCUMULATION_FUND", baseNumberMax: "0.00", baseNumberMin: "0.00", compFixedAmount: "0.00", compMantissaRule: "ROUND_UNTIL_FEN", compScale: "0", personFixedAmount: "0.00", personMantissaRule: "ROUND_UNTIL_FEN", personScale: "0"}
          ],
        },
        id:this.$route.query.id,
        planOption:[],
        chooseCityName:"",
        ruleOption:constData.ruleOption,
        closeModel:false,
        isShowChoosePlan:false,
        socialOption:constData.socialInsuranceType,
        socialCheckedType:[],
        fundOption:constData.funInsuranceType,
        fundCheckedType:[],
        choosePlanForm:{
          baseInsuredId:"",
        },
        accumulationFundYn:false,//是否缴纳公积金
        iconStyle:{
          'font-size':'20px',
          'color':'#108EE9'
        },
        validateNumber:validateNumber,
      };
    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList,
        cityList:state=>state.cityList,
      })
    },
    created(){
      if(this.id){
        this.$store
          .dispatch("socialFundStore/actionInsuredGetEditInfo", this.id)
          .then(res => {
            if(res.success){
              let data = res.data;
              this.insuredForm.socialInsuranceList = data.socialInsuranceList;
              this.insuredForm.accumulationFundList = data.accumulationFundList;
              this.accumulationFundYn = data.accumulationFundYn;
              this.accumulationFundYn = data.accumulationFundYn;
              this.insuredForm.planName = data.insuredName;
              this.choosePlanForm.baseInsuredId = data.baseInsuredId;
              this.insuredForm.insuredCity = data.insuredCity;
              this.changeCity(this.insuredForm.insuredCity)
            }
          })
      }
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
          this.screenHeight = document.body.clientHeight - 330;
        })();
      };
    },
    methods: {
      choosePlan(){
        this.isShowChoosePlan = true;
      },
      //社保选择险种
      handleSocialType(value){
        let socialType = this.insuredForm.socialInsuranceList.map(item=>item.insuranceType)
        if(value.length < socialType.length){
          this.insuredForm.socialInsuranceList = this.insuredForm.socialInsuranceList.filter(item=>value.includes(item.insuranceType))
        }else{
          this.insuredForm.socialInsuranceList.push({
            insuranceType: value[value.length-1],
            baseNumberMax: "0.00",
            baseNumberMin: "0.00",
            compFixedAmount: "0.00",
            compMantissaRule: "ROUND_UNTIL_FEN",
            compScale: "0",
            personFixedAmount: "0.00",
            personMantissaRule: "ROUND_UNTIL_FEN",
            personScale: "0"
          })
        }
      },
      handleSocial(){
        this.socialCheckedType = this.insuredForm.socialInsuranceList.map(item=>item.insuranceType)
      },
      handleFundType(value){
        let fundType = this.insuredForm.accumulationFundList.map(item=>item.insuranceType)
        if(value.length < fundType.length){
          this.insuredForm.accumulationFundList = this.insuredForm.accumulationFundList.filter(item=>value.includes(item.insuranceType))
        }else{
          this.insuredForm.accumulationFundList.push({
            insuranceType: value[value.length-1],
            baseNumberMax: "0.00",
            baseNumberMin: "0.00",
            compFixedAmount: "0.00",
            compMantissaRule: "ROUND_UNTIL_FEN",
            compScale: "0",
            personFixedAmount: "0.00",
            personMantissaRule: "ROUND_UNTIL_FEN",
            personScale: "0",
          })
        }
      },
      handleFund(){
        this.fundCheckedType = this.insuredForm.accumulationFundList.map(item=>item.insuranceType)
      },
      changeCity(value){
        this.$store
          .dispatch("socialFundStore/actionInsuredGetBase", value)
          .then(res => {
            if(res.success){
              this.planOption = res.data
            }
          });
      },
      //选择参保方案
      handleChoosePlan(){
        this.$store
          .dispatch("socialFundStore/actionInsuredGetInfo", this.choosePlanForm.baseInsuredId)
          .then(res => {
            if(res.success){
              let data = res.data;
              this.insuredForm.socialInsuranceList = data.socialInsuranceList
              this.insuredForm.accumulationFundList = data.accumulationFundList
              this.accumulationFundYn = data.accumulationFundYn;
              this.isShowChoosePlan = false
            }
          });
      },
      handleSave(){
          this.$refs['insuredForm'].validate(valid => {
            if(valid){
              this.$store
                .dispatch("socialFundStore/actionInsuredProjectSave",{
                  accumulationFundList:this.insuredForm.accumulationFundList,
                  accumulationFundYn:this.accumulationFundYn,
                  insuredName:this.insuredForm.planName,
                  baseInsuredId:this.choosePlanForm.baseInsuredId,
                  insuredCity:this.insuredForm.insuredCity,
                  socialInsuranceList:this.insuredForm.socialInsuranceList,
                  id:this.id,
                })
                .then(res => {
                    if(res.success){
                      this.$message.success("保存成功")
                      this.$router.go(-1)
                    }
                })
            }
          })
      },
      handleCancel(){
        this.$router.go(-1)
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";
  .insured-account-add {
    height:calc(100vh - 90px);
    .header {
      border-bottom: 1px solid #ededed;
      .add-table {
        cursor: pointer;
        float: right;
        color: $mainColor;
      }
      .iconxinzeng {
        font-size: 18px;
        color: #9c9c9c;
        position: relative;
        top: 1px;
      }
    }
    .account-add-con{
      .social-plan {
        padding-left: 20px;
        .plan-title{
          font-size: 18px;
        }
        .plan-tip{
          display: inline-block;
          width: 261px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          background-color: rgba(255, 247, 231, 1);
          border: 1px solid  rgba(255, 204, 204, 1);
          border-radius: 4px;
          margin-left: 20px;
        }
        .choose-plan{
          color:$mainColor;
          cursor:pointer;
          padding-left: 10px;
        }
        .social-plan-table {
          margin: 20px 20px 0px 0px;
          position: relative;
          overflow: hidden;
          .insurance-type-add {
            position: absolute;
            left: 1px;
            top: 1px;
            padding-left: 10px;
            line-height: 46px;
            height: 45px;
            z-index: 1196;
            width: 119px;
            background: #fff;
          }
        }
      }
    }
    .screen-dialog {
      .shortCon{width:370px;
        margin: 0 auto;}
      .dialog-footer{
        display: inline-block;
        width: 100%;
        margin-top: 10px;
        text-align: center;
      }
    }
    .foot-btn{
      margin-top: 20px;
      text-align: center;
    }
  }

</style>

