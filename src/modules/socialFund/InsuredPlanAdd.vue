<template>
  <div class="insured-account-add">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span @click="$router.go(-1)" class="back-style">返回</span>
            <span class="header-line">|</span>
            <span>参保月度台账</span>
          </el-col>
        </el-row>
      </header>
      <div class="account-add-con">
        <el-form label-width="100px" :model="insuredForm" ref="insuredForms">
          <el-row style="display: flex;width:800px;margin-top: 20px">
            <div style="flex:1">
              <el-form-item label="参保方案" prop="plan" :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
                <el-select v-model="insuredForm.plan" placeholder="请选择参保方案">
                  <el-option v-for="(item,index) in planOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div style="flex:1">
              <el-form-item label="参保城市：" prop="city" :rules="{required: true, message: '参保城市不能为空', trigger: 'blur'}">
                <el-select v-model="insuredForm.city" placeholder="请选择参保城市">
                  <el-option v-for="(item,index) in cityOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-row>
          <div class="social-plan">
            <div class="social-plan-title">
              <span class="plan-title">社保方案</span>
              <span class="plan-tip">北京有2个社保方案供您参保 <span class="choose-plan">选择方案</span></span>
            </div>
            <div class="social-plan-table">
              <el-table :data="socailList" border>
                <el-table-column prop="month" label=" " >
                  <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="基数下限">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.baseDown" class="input-right"/>
                  </template>
                </el-table-column>
                <el-table-column label="基数上限">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.baseUp" class="input-right"/>
                  </template>
                </el-table-column>
                <el-table-column label="个人比例">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.personelRatiol" class="input-right"/>
                  </template>
                </el-table-column>
                <el-table-column label="个人固定金额">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.personelMoney" class="input-right"/>
                  </template>
                </el-table-column>
                <el-table-column label="个人尾数规则">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.personRule" placeholder="请选择">
                      <el-option
                        v-for="item in socailRule"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="公司比例">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.companyRatiol" class="input-right"/>
                  </template>
                </el-table-column>
                <el-table-column label="公司比例">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.companyMoney" class="input-right"/>
                  </template>
                </el-table-column>
                <el-table-column label="公司尾数规则">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.companyRule" placeholder="请选择">
                      <el-option
                        v-for="item in socailRule"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  import fun from "@/util/fun";
  export default {
    components:{
    },
    data() {
      return {
        insuredForm:{
          plan:"",
          city:""
        },
        planOption:[],
        cityOption:[],
        socailList:[
          {
            type:"养老保险",
            baseDown:"9%",
            baseUp:"8%",
            personelRatiol:"8%",
            personelMoney:"100",
            personRule:"",
            companyRatiol:"8%",
            companyMoney:"122",
            companyRule:"",
          }
        ],
        socailRule:[
          {
            label:"四舍五入至分",
            value:"1"
          }
        ]

      };
    },

    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList
      }),
    },
    created(){
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

    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";
  .insured-account-add {
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
        }
      }
    }
  }

</style>

