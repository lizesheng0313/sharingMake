<template>
  <div class="insured-plan">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span>参保方案</span>
          </el-col>
        </el-row>
      </header>
      <div class="plan-content">
          <div class="clearfix insured-plan-menu">
            <el-input
              placeholder="请输入姓名\工号\身份证号"
              v-model="ruleForm.nameOrMore"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input"
            ></el-input>
            <div class="right">
              <el-button type="primary" class="add-import" @click="addInsuredPlan">新增参保方案</el-button>
            </div>
          </div>
          <div class="table-contant">
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              :height="screenHeight"
              :style="{width:screenWidth-255+'px'}"
              border
            >
              <el-table-column type="index" label="编号" width="50"></el-table-column>
              <el-table-column prop="name" label="参保方案"></el-table-column>
              <el-table-column prop="empNo" label="参保城市"></el-table-column>
              <el-table-column prop="idNo" label="使用人数"></el-table-column>
              <el-table-column prop="idNo" label="最近修改日期"></el-table-column>
              <el-table-column label="操作" fixed="right" width="140px">
                <template slot-scope="scope">
                  <span class="funStyle" @click="editPlan(scope.row)">编辑</span>
                  <span class="funStyle" @click="deletePlan(scope.row)">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  import fun from "@/util/fun";
  let date = fun.headDate();
  let month = new Date().getMonth() + 1;
  let defaultDate =
    date.year + "年" + (date.month >= 10 ? date.month : "0" + date.month) + "月";
  export default {
    data() {
      return {
        ruleForm:{
          nameOrMore:"",
        },
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        list: [{name:"减员",type:'dec'},{name:"增员",type:'inc'}],
        loading:false,
    };
    },
    components:{

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
      getList() {
        this.loading = true;
      },
      handleSearch(){

      },
      editPlan(data){

      },
      deletePlan(data){

      },
      //新增方案
      addInsuredPlan(){
        this.$router.push('/insuredPlanAdd')
      },

    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";
  .insured-plan {
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
    .plan-content {
      padding: 20px 20px 0px 20px;
      .button-style{
        margin:0 20px;
      }
    }
    .insured-plan-menu {
      margin:4px 0px;
      .search-input {
        width: 230px;
      }
    }
    .table-contant{
      margin-top: 18px;
    }

  }

</style>

