<template>
  <div class="check-staff">
    <div class="clearfix check-staff-menu">
      <el-input
        placeholder="请输入姓名\手机号"
        v-model="input"
        suffix-icon="iconiconfonticonfontsousuo1 iconfont"
        clearable
        class="search-input left"
      ></el-input>
      <div class="right">
        <el-button type="primary" @click="handleCalcSalary">增员导入</el-button>
        <el-dropdown trigger="click">
          <el-button type="default">
            更多
            <i class="iconsanjiao iconfont"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>全部删除</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="staff-situation">
      <span class="staff-total">
        人员总数
        <i>10</i>人
      </span>
      <span>
        本月：入职
        <i>1</i>人
      </span>
      <span>
        调动
        <i>1</i>人
      </span>
    </div>
    <div class="staff-table">
      <div class="floating-menu">
        <span>删除</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="姓名"></el-table-column>
        <el-table-column prop="name" label="工号"></el-table-column>
        <el-table-column prop="address" label="手机号"></el-table-column>
        <el-table-column prop="address" label="部门"></el-table-column>
        <el-table-column prop="address" label="员工类型"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="入职日期"></el-table-column>
        <el-table-column prop="address" label="转正日期"></el-table-column>
        <el-table-column prop="address" label="最后工作日"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
        class="staff-page"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      tableData: [
        {
          date: "1",
          name: "2",
          address: "123"
        }
      ]
    };
  },
  methods: {
    handleCalcSalary() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.check-staff {
  padding: 0 20px;
  .check-staff-menu {
    margin-top: 66.5px;
    .search-input {
      width: 205px;
    }
  }
  .iconiconfonticonfontsousuo1 {
    font-size: 12px;
  }
  .staff-situation {
    .staff-total {
      border-right: 1px solid #e6e6e6;
      padding-right: 15px;
      margin-right: 15px;
    }
    margin-top: 20px;
    color: #999;
    font-size: 12px;
    i {
      color: $mainColor;
      font-style: normal;
      padding: 0 3px;
    }
  }
  .staff-table {
    position: relative;
    margin-top: 27px;
    .floating-menu{
      position: absolute;
      left:100px;
      width:500px;
      z-index:99;
      top:0;
      line-height:40px;
      height:40px;
      background:rgba(0,0,0,0.8);
      border-radius:3px;
      color:#fff;
      span{
        margin: 0 10px;
      }
    }
    .staff-page {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
