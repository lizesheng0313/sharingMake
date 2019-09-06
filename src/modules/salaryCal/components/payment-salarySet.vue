<template>
  <div class="paymentSalarySet">
    <div class="title">选择显示项目<span class="title-tip">(请勾选需要显示在移动端的工资条项目)</span></div>
    <div class="title-fun">
      <div class="diy-all">
        <el-checkbox :indeterminate="isIndeterminateAll" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <div v-for="(item,index) in stubsItems" :key="index" class="diy-Item">
        <div class="check-all">
          <img src="../../../assets/images/itemT.png" alt="" width="14px" >
          <el-checkbox :indeterminate="isIndeterminates[index]" v-model="checkAlls[index]" @change="handleDiyCheckAllChange(index,item.stubsItems)">{{item.stubsGroup}}</el-checkbox>
        </div>
        <div style="margin-bottom:10px; border-bottom:1px solid #E5E5E5"></div>
        <el-checkbox-group v-model="diyCheckeds[index]" @change="handleDiyCheckedChange(index,item.stubsItems)">
          <div v-for="it in item.stubsItems">
            <img src="../../../assets/images/item.png" alt="" width="12px" >
            <el-checkbox :label="it.itemId" :key="it.itemId">{{it.itemName}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div class="line"></div>
      <div class="salary-tip">工资条说明<span class="title-tip">(将显示在员工的工资条最后)</span></div>
      <el-form :model="stubsMsgForm" ref="stubsMsgForm" :rules="rules" class="demo-ruleForm">
        <el-form-item  prop="stubsMsg">
          <el-input  type="textarea" v-model="stubsMsgForm.stubsMsg" placeholder="温馨提示：工资条属于敏感信息，请保密"></el-input>
        </el-form-item>
        <p class="stubs-info">不超过60个字</p>
      </el-form>
      <div class="btn-con">
        <el-button type="primary" @click ="handleSave">保存</el-button>
        <el-button @click="cancelSave">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { apiGetStubs,apiEditStubs} from '../store/api'
export default {
  data() {
    return {
      salaryRuleId:this.$route.query.salaryRuleId,
      isIndeterminateAll:false,
      checkAll:"",
      stubsItems:[],
      diyCheckeds:{},
      isIndeterminates:{},
      checkAlls:{},
      stubsMsgForm:{
        stubsMsg:""
      },
      rules:{
        stubsMsg: [
          { max: 60, message: '内容过长', trigger: 'blur' }
        ],
      }
    };
  },
  created(){
    apiGetStubs(this.salaryRuleId).then(res=>{
      if(res.code === "0000"){
        this.stubsItems = res.data.stubsItems;
        this.stubsMsgForm.stubsMsg = res.data.stubsMsg;
        //  初始化导出配置项数据、
        let allId = [];
        let checkedId = [];
        this.stubsItems.forEach((item,index)=>{
          allId = allId.concat(item.stubsItems.map(it=>it.itemId));
          checkedId = checkedId.concat(item.stubsItems.filter(it=>it.isSelect).map(it=>it.itemId));
          let diyCheckds = item.stubsItems.filter(it=>it.isSelect).map(it=>it.itemId);
          this.$set(this.diyCheckeds, index, diyCheckds);
          this.isIndeterminates[index] = diyCheckds.length>0 && diyCheckds.length !== item.stubsItems.length;
          this.checkAlls[index] = diyCheckds.length === item.stubsItems.length;
        })
        if(allId.length === checkedId.length){
          this.checkAll = true;//默认全选
        }else{
          if(checkedId.length !=0){
            this.isIndeterminateAll = true;
          }else{
            this.isIndeterminateAll = false;
            this.checkAll = false
          }
        }

      }
    })
  },
  mounted() {
  },
  computed:{
  },
  methods: {
    //全局全选
    handleCheckAllChange(val){
      if(val){
        this.stubsItems.forEach((item,index)=>{
          let itemId = item.stubsItems.map(it=>it.itemId);
          this.$set(this.diyCheckeds, index, itemId);
          this.isIndeterminates[index] = false;
          this.checkAlls[index] = true;
          this.isIndeterminateAll = false
        })
      }else{
        this.stubsItems.forEach((item,index)=>{
          this.$set(this.diyCheckeds, index, []);
          this.isIndeterminates[index] = false;
          this.checkAlls[index] = false;
        })
      }
    },
    //每一项全选
    handleDiyCheckAllChange(index,item){
      this.diyCheckeds[index] = this.checkAlls[index] ? item.map(it=>it.itemId) : [];
      this.isIndeterminates[index] = false;
    },
    //每一项单选
    handleDiyCheckedChange(index,item){
      let checkedCount =this.diyCheckeds[index].length;
      this.checkAlls[index] = checkedCount === item.map(it=>it.itemId).length;
      this.isIndeterminates[index] = checkedCount > 0 && checkedCount < item.map(it=>it.itemId).length;
      this.$forceUpdate();
    },
    handleSave(){
      this.$refs['stubsMsgForm'].validate((val)=>{
        if(val){
          let itemIds = "";
          for(let key in this.diyCheckeds){
            this.diyCheckeds[key].forEach(item=>{
              itemIds+=item+","
            })
          }
          itemIds = itemIds.substr(0,itemIds.length-1);
          if(itemIds){
            apiEditStubs({
              salaryId:this.salaryRuleId,
              stubsMsg:this.stubsMsgForm.stubsMsg,
              itemIds:itemIds
            }).then(res=>{
              if(res.code === "0000"){
                this.$emit('changeSatus',false);
                this.$message.success("设置成功");
              }
            })
          }else{
            this.$message.warning("未选择工资条项目");
          }
        }
      })
      console.log(this.$refs['stubsMsgForm'].validate)
    },
    cancelSave(){
      this.$emit('changeSatus',false)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
  .paymentSalarySet{
    margin-top:10px;
    padding-right:16px;
    .title-tip{
      color:#999999;
      font-size: 10px;
      margin-left: 20px;
    }
    .title-fun{
      height:36px;
      line-height: 36px;
      margin-top: 20px;
      padding-left:20px;
      background: #F7F7F7;
      color:#666666;
      clear: both;
    }
    .el-checkbox{
      width:80%;
      margin-left: 12px;
    }
    .el-textarea{
      /*width: 90%;*/
    }
    .diy-all{
      margin-bottom: 10px;
    }
    .diy-Item{
      border-top:1px solid #E6E6E6;
      border-left:1px solid #E6E6E6;
      border-right:1px solid #E6E6E6;
      img{
        margin-left: 24px;
      }
    }
    .check-all{
      padding-left:0px;
     img{
       vertical-align: middle;
       margin-left: 6px;
     }
    }
    .salary-tip{
      margin:10px;
    }
    .stubs-info{
      position: relative;
      bottom:20px;
      left:10px;
      font-size: 12px;
    }
    .btn-con{
      position: absolute;
      left:40%;
      bottom: 20px;
    }
  }
</style>