<template>
  <div class="social-increace">
    <el-dialog
      :visible.sync="isShowIncrease"
      title="社保增员"
      width="52%"
      center
      class="social-increace-dialog"
      :close-on-click-modal="closeModel"
    >
      <div class="screening-wapper">
        <div class="increase-tip">温馨提示：若参保人基数/方案不同，请选择【批量增员】方式导入实现增员</div>
        <div class="name-con">
          <span class="name-box" v-for="(item,index) in nameList" :key="index">{{ item }}、</span>
        </div>
        <el-form :model="socialIncreaceForm" ref="socialIncreaceForm" label-width="140px" class="demo-ruleForm">
          <div class="shortCon">
            <el-form-item label="参保方案"
                          prop="plan"
                          :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
              <el-input v-model="socialIncreaceForm.plan"></el-input>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="社保起缴月份" prop="socialMonth"
                          :rules="{required: true, message: '请选择社保起缴月份', trigger: 'blur'}">
              <el-date-picker v-model="socialIncreaceForm.socialMonth" type="month" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="员工社保基数" prop="socialBase"
                          :rules="{ required: true, message: '请选择员工社保基数', trigger: 'blur'}">
              <el-input v-model="socialIncreaceForm.socialBase"></el-input>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="公积金起缴月份" :prop="socialIncreaceForm.providentMonthType === '2' ? 'providentMonth':'providentMonthType'"
                          :rules="{ required: true, message: '请选择公积金起缴月份', trigger: 'blur'}">
              <el-radio-group v-model="socialIncreaceForm.providentMonthType">
                <el-radio-button label="1">同社保</el-radio-button>
                <el-radio-button label="2">选择</el-radio-button>
              </el-radio-group>
              <span class="provident-month">
                    <el-date-picker v-if="socialIncreaceForm.providentMonthType==2" v-model="socialIncreaceForm.providentMonth" type="month" placeholder="请选择"></el-date-picker>
                </span>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="员工公积金基数" prop="providentBase"
                          :rules="{ required: true, message: '员工公积金基数不能为空', trigger: 'blur'}">
              <el-input v-model="socialIncreaceForm.providentBase"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleIncreateSocial">确定</el-button>
          <el-button @click ="isShowIncrease = false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      socialIncreaceForm:{
        plan:"",
        socialMonth:"",
        socialBase:"",
        providentMonth:"",
        providentBase:"",
        providentMonthType:"1",
      },
      isShowIncrease:false,
      closeModel: false,
      nameList:[]
    };
  },
  methods: {
    show(nameList,params) {
      this.isShowIncrease = true;
      this.nameList = nameList;
      console.log(this.nameList)
    },
    //增员导入
    handleIncreateSocial(){
      this.$refs.socialIncreaceForm.validate(valid => {

      })
    },
  }
};
</script>
<style lang="scss" scoped>
.social-increace {
  .screening-wapper{
    width: 560px;
    margin: 0 auto;
  }
  .shortCon{width:450px;}
  .name-con{
    margin:10px 0px;
    .name-box{
      padding-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>