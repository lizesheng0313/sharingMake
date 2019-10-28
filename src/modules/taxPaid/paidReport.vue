<template>
  <div class="taxPaid">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span @click="$router.go(-1)">返回 </span><span class="companyName">{{ $route.query.name }}</span>  缴纳税款</span>
        </el-col>
      </el-row>
    </header>
    <div class="taxPaidCon">
      <div>
        <span>应缴税额：2000元</span>
        <div class="funCon"><el-button type="primary">立即缴款</el-button>  <el-button type="info">缴款反馈</el-button></div>
      </div>
      <div class="tableCon">
        <el-table
          :data="paidList"
          class="check-staff_table"
          v-loading="loading"
        >
          <el-table-column  label="序号" type="index"></el-table-column>
          <el-table-column prop="name" label="所得月份"></el-table-column>
          <el-table-column prop="tableName" label="申报表"></el-table-column>
          <el-table-column prop="status" label="征收品目"></el-table-column>
          <el-table-column prop="isThree" label="税率"></el-table-column>
          <el-table-column prop="paidStatus" label="税款所属期起"></el-table-column>
          <el-table-column prop="time" label="税款所属期止"></el-table-column>
          <el-table-column prop="time" label="应补(退)税额"></el-table-column>
          <el-table-column prop="time" label="缴款期限"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import  fun from "@/util/fun"
export default {
  components: {},
  data() {
    return {
      currentDate:"",
      loading:"",
      paidList:[
        { name:"北京懒猫联银科技有限公司",tableName:"综合所得预扣预缴表",status:"申报成功",isThree:"是",paidStatus:"无需缴款",time:"2019-12-12" }
      ],
      closeModel: false,
      isShowReturn:false,
      returnMsg:"",
    };
  },
  created(){
    let nowDate = fun.headDate();
    let year = nowDate.year;
    let month = nowDate.month >= 10 ? nowDate.month : "0" + nowDate.month;
    this.currentDate = year+"-"+month;
  },
  methods:{
    changeDate(data){
      console.log(data)
    },
    //立即缴款
    handlePaid(data){
      console.log(data)
    },
    //缴款反馈
    handlePaidReturn(data){
      this.$alert('这是一段内容', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {}
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.taxPaid {
  .header {
    padding:0 20px;
    font-size: 14px;
    height: 61px;
    border-bottom: 1px solid #ededed;
    line-height: 61px;
  }
  .funCon{
    float: right;
  }
  .taxPaidCon{
    padding:22px;
  }
  .tableCon{
    margin-top:40px;
  }
  .companyName{
    display: inline-block;
    padding:0 20px;
  }
}
</style>

