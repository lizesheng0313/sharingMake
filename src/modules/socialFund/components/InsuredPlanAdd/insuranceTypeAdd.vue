<template>
  <div class="insurance-type-add">
    <div class="icon-con" @click="show3 = !show3">
      <i class="el-icon-circle-plus-outline" :style="iconStyle"></i>
      <div :style="iconTitleStyle" class="icon-title-style">{{ iconTitle }}</div>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="show3" class="transition-box">
        <el-checkbox-group v-model="checkedType" @change="handleCheckedType">
          <div v-for="item in typeOption" style="line-height: 20px"><el-checkbox :label="label" :key="item.label">{{ item.label }}</el-checkbox></div>
        </el-checkbox-group>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props:{
    iconStyle:{
      type:Object,
      default:{}
    },
    iconTitleStyle:{
      type:Object,
      default:{}
    },
    iconTitle:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      show3: true,
      checkedType:'',
      typeOption:[
        {
          label:"养老保险",
          value:"111"
        },
        {
          label:"医疗保险",
          value:"121"
        }
      ]
    };
  },
  created(){
    console.log("111")
  },
  methods: {
    handleCheckedType(){

    }
  }
};
</script>
<style lang="scss" scoped>
.insurance-type-add {
  cursor: pointer;
  box-sizing: border-box;
  .icon-con{
    display: flex;
    .icon-title-style{
      margin-left: 10px;
      vertical-align: middle;
    }
  }
  .check-con {
    position: absolute;
    top:26px;
    left:-30px;
    border-radius: 4px;
    background: #fff;
    box-sizing: border-box;
    margin: 5px 0;
  }
  .transition-box{
    position: absolute;
    top:30px;
    left:-20px;
    z-index: 9999;
    padding: 10px 0px;
    min-width: 130px;
    text-align: center;
    height: 100px;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-sizing: border-box;
  }
}
</style>