<template>
  <div class="check-staff">
    <div class="clearfix check-staff-menu">
      <el-button class="screen" size="small">筛选</el-button>
      <el-input
        placeholder="请输入姓名\手机号"
        v-model="input"
        suffix-icon="iconiconfonticonfontsousuo1 iconfont"
        clearable
        class="search-input left"
      ></el-input>
      <div class="right">
        <el-button type="primary" @click="handleCalcSalary">薪资计算</el-button>
        <el-button type="default" @click="handleCalcSalary">薪资审核</el-button>
      </div>
    </div>
    <div class="staff-situation clearfix">
      <div class="left">
        <span class="staff-total">
          人员总数
          <i class="tatal-number">10</i>人
        </span>
      </div>
      <div class="right calc-table_menu">
        <span>社会公积金导入</span>
        <span class="have-border_right" @click="isShowIncrease = true">浮云项导入</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            更多功能
            <i class="iconsanjiao iconfont"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导出工资明细</el-dropdown-item>
            <el-dropdown-item>导出部门汇总</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="staff-table">
      <!-- <div class="floating-menu">
        <span>删除</span>
      </div>-->
      <el-table :data="tableData" class="check-staff_table" :style="{width:screenWidth-40+'px'}">
        <el-table-column width="55" label="序号" type="index"></el-table-column>
        <el-table-column prop="date" label="姓名" width="140"></el-table-column>
        <el-table-column prop="name" label="工号" width="140"></el-table-column>
        <el-table-column prop="address" label="手机号" width="140"></el-table-column>
        <el-table-column prop="address" label="部门" width="140"></el-table-column>
        <el-table-column prop="address" label="员工类型" width="140"></el-table-column>
        <el-table-column prop="address" label="状态" width="140"></el-table-column>
        <el-table-column prop="address" label="入职日期" width="140"></el-table-column>
        <el-table-column prop="address" label="转正日期" width="140"></el-table-column>
        <el-table-column prop="address" label="最后工作日" width="140"></el-table-column>
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
      title="浮动项导入"
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
              <el-radio :label="2">通过员工工号匹配人员</el-radio>
            </div>
            <div>
              <el-radio :label="1">通过手机号匹配人员</el-radio>
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
          :before-upload="beforeAvatarUpload"
          :on-success="handleSuccess"
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
    <el-dialog
      title=""
      :visible.sync="isShowScreen"
      width="600px"
      center
      class="diy-el_dialog"
    >

    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio:"",
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      input: "",
      isShowIncrease: false,
      tableData: [
        {
          date: "1",
          name: "2",
          address: "123"
        }
      ],
      fileList:[],
      isShowScreen:false,
      screenForm:{

      }
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
    handleCalcSalary() {},
    //文件上传前校验
    beforeAvatarUpload(file) {
      //限制上传文件
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isxls = testmsg === "xls" || testmsg === "xlsx";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isxls) {
        this.$message({
          message: "上传文件类型只能是 xls,xlsx 格式!",
          type: "warning"
        });
        this.fileList = []
      }
      if (!isLt5M) {
        this.$message({
          message: "上传文件大小不能超过 5MB!",
          type: "warning"
        });
        this.fileList = []
      }
      return isxls && isLt5M;
    },
    handleSuccess(res, file) {
      let data = res.data;
      this.successCount = data.successCount;
      this.failCount = data.failCount;
      this.uuid = data.uuid;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.check-staff {
  padding: 0 20px;
  box-sizing: border-box;
  .screen{
    display: inline-block;
    float: left;
    margin-right:20px;
  }
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
    border-top: 1px solid #ededed;
    margin-top: 30px;
    padding-top: 25px;
    font-size: 12px;
    .staff-total {
      color: #999;
      padding-right: 15px;
      margin-right: 15px;
    }
    .have-border_right {
      border-right: 1px solid #e6e6e6;
      padding-right: 20px;
    }
    .tatal-number {
      color: $mainColor;
      font-style: normal;
      padding: 0 3px;
    }
    .calc-table_menu {
      span {
        cursor: pointer;
        margin-right: 20px;
        color: 333;
      }
    }
    .el-dropdown-link {
      font-size: 12px;
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
