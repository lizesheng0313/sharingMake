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
        <el-button type="primary" @click="isShowIncrease = true" class="add-import">导入</el-button>
      </div>
    </div>
    <div class="staff-table">
      <!-- <div class="floating-menu">
        <span>删除</span>
      </div>-->
      <el-table :data="tableData" class="check-staff_table" :style="{width:screenWidth-285+'px'}">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column prop="date" label="纳税主体" width="140"></el-table-column>
        <el-table-column prop="name" label="姓名" width="140"></el-table-column>
        <el-table-column prop="address" label="工号" width="140"></el-table-column>
        <el-table-column prop="address" label="证件号码" width="140"></el-table-column>
        <el-table-column prop="address" label="截止月份" width="140"></el-table-column>
        <el-table-column prop="address" label="累计收入" width="140"></el-table-column>
        <el-table-column prop="address" label="累计专项扣除" width="140"></el-table-column>
        <el-table-column prop="address" label="累计其他扣除" width="140"></el-table-column>
        <el-table-column prop="address" label="累计准予扣除的捐赠" width="140"></el-table-column>
        <el-table-column prop="address" label="累计减免税额" width="140"></el-table-column>
        <el-table-column prop="address" label="累计已预缴税额" width="140"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog
      title="累计应纳税所得导入"
      :visible.sync="isShowIncrease"
      width="600px"
      center
      class="diy-el_dialog"
    >
      <div>
        <p class="headings">1、选择导入匹配方式</p>
        <div class="diy-el_radio">
          <el-radio-group v-model="radio">
            <div>
              <el-radio :label="3">通过员工工号匹配人员</el-radio>
            </div>
            <div>
              <el-radio :label="2">通过身份证匹配人员</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="select-file">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :file-list="fileList"
          :on-success="handleScuess"
        >
          <span class="headings">2、</span>
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <p>
          支持xlsx和xls文件，文件不超过5M，建议使用标准模板格式
          <span>下载模板</span>
        </p>
        <p class="instructions">
          说明：导入模板中空单元格薪资项，导入后不覆盖系统中对应薪资
          <span>查看举例</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">导入通过数据</el-button>
        <el-button @click="isShowIncrease = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "",
      fileList: [],
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      input: "",
      isShowIncrease: false,
      tableData: [
        {
          date: "1",
          name: "2",
          address: "123"
        }
      ]
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleScuess() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.check-staff {
  padding: 0 20px;
  box-sizing: border-box;
  .check-staff-menu {
    margin-top: 66.5px;
    .search-input {
      width: 205px;
    }
  }
  .add-import {
    margin-right: 10px;
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
    .check-staff_table {
      overflow-x: auto;
    }
    position: relative;
    margin-top: 27px;
    .floating-menu {
      position: absolute;
      left: 100px;
      width: 500px;
      z-index: 99;
      top: 0;
      line-height: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 3px;
      color: #fff;
      span {
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
