<template>
  <div class="paid">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span>扣缴义务人</span>
          </el-col>
        </el-row>
      </header>
      <div class="tax-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <el-input
              placeholder="请输入名称"
              v-model="taxListFormData.name"
              @keyup.enter.native="handleSearch"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              clearable
              class="search-input left"
            ></el-input>
            <div class="left">
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" @click="handleShowBox">新增</el-button>
            </div>
          </div>
          <div class="staff-table">
            <!-- <div class="floating-menu">
        <span>删除</span>
            </div>-->
            <el-table
              :data="list"
              class="check-staff_table"
              :style="{width:screenWidth-285+'px'}"
              v-loading="loading"
            >
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column prop="taxSubName" label="扣缴义务人名称"></el-table-column>
              <el-table-column prop="taxPayerNo" label="纳税人识别号"></el-table-column>
              <el-table-column prop="legalName" label="法定代表人"></el-table-column>
              <el-table-column prop="remark" label="经办人姓名"></el-table-column>
              <el-table-column prop="accreditStatus" label="授权状态"></el-table-column>
              <el-table-column prop="failReason" label="未通过原因"></el-table-column>
              <el-table-column label="操作" fixed="right" width="200px">
                <template slot-scope="scope" >
                  <el-button size="primary" @click="handleEditor(scope.row)">编辑</el-button>
                  <el-button size="mini" @click="handleDelete(scope.row.taxSubId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <right-pop :pop-show="popShow" :has-footer="false" popTitle="扣缴义务人" :popWidth="600">
      <div slot="pop-content">
        <paidEdit @hanleClose="hanleClose" :selectItem="selectItem"></paidEdit>
      </div>
    </right-pop>
  </div>
</template>
<script>
import { mapState } from "vuex";
import rightPop from '@/components/basic/rightPop'
import paidEdit from './components/paidEdit'
export default {
  components:{
    rightPop,
    paidEdit
  },
  data() {
    return {
      loading: false,
      taxListFormData: {
        name: ""
      },
      newBodyFormData: {
        legalName: "",
        remark: "",
        taxPayerNo: "",
        taxSubId: "",
        taxSubName: ""
      },
      taxListRules: {
        taxSubName: [
          {
            required: true,
            message: "请输入扣缴义务人名称",
            trigger: "blur"
          }
        ],
        taxPayerNo: [
          {
            required: true,
            message: "请输入纳税人识别号",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入办税人员姓名",
            trigger: "blur"
          }
        ]
      },
      currentTypeName: "",
      list: [],
      isShowScreen: false,
      screenWidth: document.body.clientWidth,// 屏幕尺寸
      closeModel:false,
      popShow:{isshow:false},
      selectItem:{}
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    this.getList();
  },
  methods: {
    //新增
    handleShowBox() {
      this.selectItem = {};
      this.popShow.isshow = true;
    },
    //编辑
    handleEditor(row) {
      this.selectItem = row;
      this.popShow.isshow = true;
    },
    hanleClose(data){
      this.popShow.isshow = false;
      if(data){this.getList()}
    },
    handleSearch() {
      this.getList();
    },
    getList() {
      this.loading = true;
      this.$store
        .dispatch("taxPageStore/actionTaxSubjectList", this.taxListFormData)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.list = res.data;
          }
        });
    },
    handleDelete(id) {
      this.$confirm(
        "您确定删除扣缴义务人，如果是，请点击'确定',如果否,请点击'取消'",
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center:false
        }
      )
        .then(() => {
          this.$store
            .dispatch("taxPageStore/actionDelTaxSubject", id)
            .then(res => {
              if (res.success) {
                this.getList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
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
.paid {
  .tax-search {
    margin-left: 20px;
  }
  .header {
    border-bottom: 1px solid #ededed;
    .add-table {
      cursor: pointer;
      float: right;
      color: $mainColor;
    }
  }
  .tax-content {
    padding: 30px;
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

