<template>
  <div>
    <div class="tax el-diy-month">
      <header class="header">
        <el-row type="flex">
          <el-col :span="12">
            <span>纳税主体</span>
          </el-col>
        </el-row>
      </header>
      <div class="tax-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <el-input
              placeholder="请输入姓名\手机号"
              v-model="search_words"
              suffix-icon="iconiconfonticonfontsousuo1 iconfont"
              clearable
              class="search-input left"
            ></el-input>
            <div class="right">
              <el-button type="primary" class="add-import" @click="isShowScreen=true">新增</el-button>
            </div>
          </div>
          <div class="staff-table">
            <!-- <div class="floating-menu">
        <span>删除</span>
            </div>-->
            <el-table
              :data="tableData"
              class="check-staff_table"
              :style="{width:screenWidth-285+'px'}"
            >
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column prop="address" label="纳税主体名称"></el-table-column>
              <el-table-column prop="address" label="纳税人识别号"></el-table-column>
              <el-table-column prop="address" label="法定代表人"></el-table-column>
              <el-table-column prop="address" label="备注"></el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button size="primary" @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
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
        </div>
      </div>
      <el-dialog title="新增" :visible.sync="isShowScreen" width="550px" center class="diy-el_dialog">
        <el-form ref="screenForm" label-width="100px" class="demo-ruleForm">
          <div class="shortCon">
            <el-form-item label="纳税主体名称">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="纳税人识别号">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="法定代表人">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="shortCon">
            <el-form-item label="备注">
              <el-input></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary">确定</el-button>
          <el-button @click="isShowScreen=false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search_words: "",
      isShowScreen:false,
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      tableData: [
        {
          date: "1",
          name: "2",
          address: "123"
        }
      ],
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
    this.getList();
  },
  methods: {
    getList() {
      console.log("list")
       this.$store.dispatch("taxPageStore/actionTaxSubjectList").then(res=>{
         console.log(res);
       })
    },
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.tax {
  .header {
    border-bottom: 1px solid #ededed;
    padding: 0 20px;
    font-size: 14px;
    height: 61px;
    line-height: 61px;
    .add-table {
      cursor: pointer;
      float: right;
      color: $mainColor;
    }
  }
  .tax-collect-tips {
    background: #fff6e2;
    padding-left: 20px;
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    color: #666;
  }
  .tax-content {
    padding: 22px;
    .content-header {
      position: relative;
      font-size: 18px;
      margin-bottom: 30px;
      cursor: pointer;
      i {
        font-size: 16px;
        color: #ccc;
      }
      .rotate-el-icon-arrow-left {
        transform: rotate(180deg);
      }
      span {
        position: absolute;
        left: 32px;
        top: 3px;
        z-index: 0;
      }
    }
  }
  .screening {
    .check-staff-menu {
      .search-input {
        margin-left: 10px;
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
      em {
        color: #333;
        font-style: normal;
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
      .table-name {
        color: $mainColor;
        cursor: pointer;
      }
    }
  }
}
.shortCon{width:450px;}
.screen-dialog {
  .screening-box {
    margin-bottom: 20px;
    .el-col-6 {
      text-align: right;
    }
    .el-col-24 {
      margin-left: 15px;
    }
    span {
      display: inline-block;
      text-align: center;
      border: 1px solid #bdbdbd;
      border-radius: 5px;
      margin-right: 10px;
      padding: 5px 15px;
      cursor: pointer;
    }
    .active {
      color: $lineBorderPointer;
      border: 1px solid $lineBorderPointer;
    }
  }
  .el-diy-date .el-date-editor {
    opacity: 1;
    width: auto;
  }
  .el-input__inner {
    height: auto;
  }
}
</style>

