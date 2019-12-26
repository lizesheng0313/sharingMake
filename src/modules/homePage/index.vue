<template>
  <div class="homePage">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span>首页</span>
        </el-col>
        <el-col :span="12">
          <div class="add-table">
<!--            <i class="iconxinzeng iconfont"></i>-->
<!--            <span>新增工资表</span>-->
          </div>
        </el-col>
      </el-row>
    </header>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      userType:"",
    };
  },
  computed:{
    ...mapState({
      token: state => state.token
    })
  },
  created() {
    this.$store.dispatch("homePageStore/actionGetUserInfo",{
      token:this.token
    }).then(res => {
      if(res.success){
        this.userType = res.data.userType
       if(this.userType === 'ENTERPRISE'){
         this.$notify({
           title: '',
           duration:0,
           message: '企业管理员不能进行薪税通业务操作，请使用已分配薪税通权限的业务操作员登陆。',
           type: 'warning'
         });
       }
      }else{
        this.$message.warning(res.message)
      }
    })
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.homePage {
  height:calc(100vh - 90px);
  .header {
    padding:0 20px;
    font-size: 14px;
    height: 61px;
    border-bottom: 1px solid #ededed;
    line-height: 61px;
    font-size: 17px;
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
}
</style>

