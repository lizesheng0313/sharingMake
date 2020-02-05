<template>
  <div class="salary-area"  @click="showSearch = false">
    <el-dialog
      title="请选择范围"
      :visible.sync="isShowSalaryArea"
      width="600px"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
      :show-close="closeModel"
    >
      <div class="company-box">
        <div class="company-box-con all">
          <el-tabs v-model="chooseType">
            <el-tab-pane label="公司" name="company"></el-tab-pane>
            <el-tab-pane label="人员" name="employee"></el-tab-pane>
          </el-tabs>
          <span v-if="chooseType === 'employee'">
             <span class="input-style">
                <el-input v-if="showSearch" v-model="searchCon" placeholder="姓名搜索" class="salary-area-input"
                  @click.stop.native="showSearch = true"
                ></el-input>
             </span>
            <i class="el-icon-search" v-if="!showSearch" @click.stop="showSearch = true"></i>
          </span>
          <div>
              <div style="margin-bottom: 10px" v-if="chooseType === 'company'">全部公司</div>
              <div v-else style="margin-bottom: 10px">
                  <el-select v-model="company" placeholder="请选择公司" style="margin-bottom: 10px;border:none">
                    <el-option v-for="item in companyOptions" key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </div>
              <el-checkbox :indeterminate="chooseTypeObj[chooseType]['isIndeterminate']" v-model="chooseTypeObj[chooseType]['checkAll']" @change="handleCheckAll">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="chooseTypeObj[chooseType]['checkedCities']" @change="handleCheckedCities" class="check-con">
                  <el-checkbox v-for="city in chooseTypeObj[chooseType]['cities']" :label="city" :key="city" class="check-style">{{ city }}</el-checkbox>
              </el-checkbox-group>
          </div>
        </div>
        <div class="company-box-con choose">
              <div class="choose-title">已选：<span class="clear" @click="hanleClearAll">清除</span></div>
              <div class="choose-con">
                <div v-for="(item,index) in chooseTypeObj[chooseType]['checkedCities']" :key="index" class="choose-item">
                  {{ item }}
                  <i class="el-icon-circle-close" @click="handleRemoveItem(item)"></i>
                </div>
              </div>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="isShowSalaryArea = false">取 消</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      closeModel:false,
      isShowSalaryArea:false,
      chooseType:"company",
      companyOptions: [{
        value: '1',
        label: '懒猫'
      }],
      company:"1",
      chooseTypeObj:{
        "company":{
          checkAll: false,
          checkedCities: [],
          cities: ['上海', '北京', '广州', '深圳',"厦门","河北","山东"],
          isIndeterminate: false
        },
        "employee":{
          checkAll: false,
          checkedCities: [],
          cities: ['张三', '李四', '赵武'],
          allCitys:['张三', '李四', '赵武'],
          isIndeterminate: false,
        }
      },
      searchCon:"",
      focus:false,
      showSearch:false,
    };
  },
  watch:{
    searchCon:function(){
      if(this.searchCon.trim()){
        this.chooseTypeObj.employee.cities = this.chooseTypeObj.employee.allCitys.filter(item=>item.indexOf(this.searchCon)!= -1)
      }else{
        this.chooseTypeObj.employee.cities = this.chooseTypeObj.employee.allCitys
      }
    },
  },
  created(){

  },
  methods: {
    handleCheckAll(val) {
      this.chooseTypeObj[this.chooseType]['checkedCities'] = val ? this.chooseTypeObj[this.chooseType]['cities'] : [];
      this.chooseTypeObj[this.chooseType]['isIndeterminate'] = false;
    },
    handleCheckedCities(value) {
      let checkedCount = value.length;
      this.chooseTypeObj[this.chooseType]['checkAll'] = checkedCount === this.chooseTypeObj[this.chooseType]['cities'].length;
      this.chooseTypeObj[this.chooseType]['isIndeterminate'] = checkedCount > 0 && checkedCount < this.chooseTypeObj[this.chooseType]['cities'].length;
    },
    handleRemoveItem(item){
      this.chooseTypeObj[this.chooseType]['checkedCities'] = this.chooseTypeObj[this.chooseType]['checkedCities'].filter(ite=>ite != item)
    },
    hanleClearAll(){
      this.chooseTypeObj[this.chooseType]['checkedCities'] = [];
      this.chooseTypeObj[this.chooseType]['isIndeterminate'] = false; //选择部分标志
      this.chooseTypeObj[this.chooseType]['checkAll'] = false // 全选标志
    },
    handleSubmit(){
      let sendStr = " ";
      if(this.chooseTypeObj[this.chooseType]['checkedCities']){
        this.chooseTypeObj[this.chooseType]['checkedCities'].forEach(item=>{
          sendStr+=item+' '
        })
      }
      this.$emit("sendSalayArea",sendStr)
      this.isShowSalaryArea = false;
    },
    handleClick(){
      this.chooseTypeObj[this.chooseType]['checkedCities'] = []
    }
  }
};
</script>
<style lang="scss" scoped>
.salary-area {
  .company-box{
    display: flex;
    width: 540px;
    margin:0 auto;
    .company-box-con{
      width: 270px;
      min-height: 260px;
      border:1px solid #F7F7F7;
      border-radius: 4px;
      margin-left: 20px;
      padding: 0 10px;
      .check-style{
        display: block;
        margin-bottom: 10px;
      }
      .check-con{
        height: 140px;
        overflow-y: auto;
      }
      .choose-con{
        height: 200px;
        overflow-y: auto;
      }
      .choose-title{
        border-bottom:1.2px solid #E4E7ED;
        padding:10px 0px;
        margin-bottom:16px;
      }
      .clear{
        float: right;
        color:#2C7CFF;
        cursor: pointer;
      }
      .choose-item{
        margin-bottom:10px;
        cursor: pointer;
      }
      .el-icon-circle-close{
        display: none;
        float: right;
        margin-top: 6px;
      }
      .choose-item:hover .el-icon-circle-close{
        display: inline-block;
      }
    }
    .all{
      position: relative;
      .input-style{
        display: inline-block;
        width:120px;
        position:absolute;
        top:7px;
        right:10px;
      }
    }
    .el-icon-search{
      position:absolute;
      top:10px;
      right:10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .dialog-footer{
    margin-top: 20px;
    text-align: center;
  }
}
</style>