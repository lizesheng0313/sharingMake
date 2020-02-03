<template>
  <div class="radios">
    <el-radio-group v-model="noEnumEmpType" size="small" @change="changeNoType">
      <el-radio-button  label=null>不限</el-radio-button>
    </el-radio-group>
    <el-checkbox-group v-model="enumEmpType" size="small" @change="changeType" class="check-right">
      <el-checkbox-button  v-for="(item,index) in screenOption" :label="item.value" :key="item.index">{{item.label}}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    screenOption:{
      type:Array,
      default:[]
    },
  },
  data() {
    return {
      enumEmpType:[],//用工类型
      noEnumEmpType:null,
    };
  },
  created(){

  },
  methods: {
    //选择用工类型
    changeType(val){
      if(val.length>0){
        this.noEnumEmpType = "";
        this.$emit("handleRadio",val)
      }else{
        this.noEnumEmpType = null;
        this.$emit("handleRadio",[])
      }
    },
    //不限制用工类型
    changeNoType(val){
      this.noEnumEmpType = null;
      this.enumEmpType = [];
      this.$emit("handleRadio",[])
    },
  }
};
</script>
<style lang="scss" scoped>
.radios{
  display: flex;
  width: 400px;
  line-height: 20px;
  height: 20px;
  .check-right{
    display: inline-block;
    margin-left:20px;
  }
}
</style>