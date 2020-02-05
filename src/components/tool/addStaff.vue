<template>
  <div class="add-staff">
    <el-dialog
      title="增加人员"
      :visible.sync="isShowAddStaff"
      width="52%"
      center
      class="diy-el_dialog"
      :close-on-click-modal="closeModel"
    >
    <div class="add-staff-con">
      <div class="table-con">
          <div class="select-con">
              <el-select v-model="company" placeholder="请选择公司">
                <el-option v-for="item in companyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="workNature" placeholder="请选择用工性质">
                <el-option v-for="item in workNatureOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="workStatus" placeholder="请选择用工状态">
                <el-option v-for="item in workStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-input v-model="search" placeholder="姓名/工号"></el-input>
          </div>
          <el-table :data="staffTable" ref="staffTable" tooltip-effect="dark" height="300px" style="width:100%;margin-top: 10px"
                    @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" fixed="left"></el-table-column>
              <el-table-column label="姓名" width="120">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="工号" width="80">
                <template slot-scope="scope">{{ scope.row.emNo }}</template>
              </el-table-column>
              <el-table-column label="部门" width="80">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="用工性质" width="80">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="人员状态" width="80">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="入职日期" width="120">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="最后工作日" width="120">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
          </el-table>
      </div>
      <div class="choose-con">
          <div class="choose-title">已选 <span class="staff-style">{{ checkedPerson.length }}人</span></div>
        <div v-for="(item,index) in checkedPerson" :key="index" class="choose-item">
            <span>{{ item.name }}</span>
            <span class="emNo">{{ item.emNo }}</span>
            <i class="el-icon-circle-close" @click="removeStaff(item)"></i>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="isShowAddStaff = false">取 消</el-button>
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
      company:"1",
      companyOptions:[
        {
          label:"阿拉丁",
          value:"1"
        }
      ],
      workNature:"1",
      workNatureOptions:[
        {
          label:"全部用工",
          value:"1"
        }
      ],
      workStatus:"1",
      workStatusOptions:[
        {
          label:"全部状态",
          value:"1"
        }
      ],
      search:"",
      isShowAddStaff: false,
      closeModel:false,
      staffTable:[
        {name:"哈哈",emNo:"101012"},
        {name:"哈哈",emNo:"101012"},
      ],
      checkedPerson:[],
    };
  },
  methods: {
    removeStaff(item){
      this.checkedPerson=this.checkedPerson.filter(ite=>ite.emNo!=item.emNo)
      this.$refs.staffTable.toggleRowSelection(item,false);
    },
    handleSubmit(){

    },
    handleSelectionChange(data){
      this.checkedPerson = data;
    },
  }
};
</script>
<style lang="scss" scoped>
.add-staff {
  .add-staff-con{
    display: flex;
    border-top:1.2px solid #f7f7f7;
    .table-con{
      width: 78%;
      padding-top: 10px;
      border-right: 1.2px solid #f7f7f7;
    }
    .choose-con{
      padding:0px 10px;
      width: 22%;
      .choose-title{
        height: 34px;
        line-height: 34px;
        border-bottom: 1.2px solid #f7f7f7;
        padding-top: 10px;
        margin-bottom: 10px;
        .staff-style{
          float: right;
        }
      }
      .choose-item{
        line-height: 24px;
        height: 24px;
        .emNo{
          display: inline-block;
          margin: 0px 26px 0px 6px;
        }
        .el-icon-circle-close{
          font-size: 16px;
          font-weight: bold;
          display:none;
          cursor: pointer;
        }
      }
      .choose-item:hover .el-icon-circle-close{
        display: inline-block;
      }
    }
  }

}
</style>