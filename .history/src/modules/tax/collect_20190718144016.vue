<template>
  <div>
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span>人员信息采集</span>
          </el-col>
        </el-row>
      </header>
      <p class="tax-collect-tips">自动获取工资表当月的增减员名单，您只需选择人员“报送”即可，报送后系统会在个税系统中完成人员信息采集</p>
      <div class="tax-content">
        <div class="content-header">
          <i class="el-icon-arrow-left"></i>
          <span>{{selectMonth}}</span>
          <el-date-picker
            v-model="selectMonth"
            type="month"
            value-format="yyyy年MM月"
            :editable="false"
            :clearable="false"
          ></el-date-picker>
          <i class="el-icon-arrow-left rotate-el-icon-arrow-left"></i>
        </div>
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <div class="left">
              <el-button type="default" @click="isShowScreening=true">筛选</el-button>
            </div>
            <el-input
              placeholder="请输入姓名\手机号"
              v-model="ruleForm.nameOrMore"
              prefix-icon="iconiconfonticonfontsousuo1 iconfont"
              @keyup.enter.native="handleSearch"
              clearable
              class="search-input left"
            ></el-input>
            <div class="left">
              <el-button type="primary" class="tax-search" @click="handleSearch">查询</el-button>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import">报送</el-button>
              <el-button type="primary" class="add-import">获取反馈</el-button>
            </div>
          </div>
          <div class="staff-situation">
            <span class="staff-total">
              纳税主体：
              <el-dropdown trigger="click">
                <el-button type="text">
                  <em>懒猫联银科技有限公司</em>
                  <em class="iconsanjiao iconfont"></em>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>懒猫联银科技有限公司</el-dropdown-item>
                  <el-dropdown-item>北京阿拉钉科技有限公司</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
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
            <!-- <div class="floating-menu">
        <span>删除</span>
            </div>-->
            <el-table :data="list" class="check-staff_table" :style="{width:screenWidth-285+'px'}">
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="empNo" label="工号" width="140"></el-table-column>
              <el-table-column prop="empName" label="姓名" width="140">
                <template slot-scope="scope">
                  <span class="table-name" @click="handleCollectionName">{{scope.row.empName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="idType" label="证件类型" width="140"></el-table-column>
              <el-table-column prop="idNo" label="证件号码" width="140"></el-table-column>
              <el-table-column prop="workerStatus" label="人员状态" width="140"></el-table-column>
              <el-table-column prop="reportStatus" label="报送状态" width="140"></el-table-column>
              <el-table-column prop="idValidStatus" label="身份证验证状态" width="140"></el-table-column>
              <el-table-column prop="workerType" label="是否雇员" width="140"></el-table-column>
              <el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>
              <el-table-column prop="country" label="国籍" width="140"></el-table-column>
              <el-table-column prop="empDay" label="任职受雇日期" width="140"></el-table-column>
              <el-table-column prop="leaveDay" label="离职日期" width="140"></el-table-column>
              <el-table-column prop="reportFinishTime" label="更新时间" width="140"></el-table-column>
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
      <el-dialog :visible.sync="isShowScreening" width="52%" center class="screen-dialog">
        <div class="screening-wapper">
          <el-row
            type="flex"
            class="screening-box"
            align="middle"
            v-for="(item,index) in screeningList"
            :key="index"
          >
            <el-col :span="6">{{item.title}}</el-col>
            <el-col>
              <span
                v-for="(it,idx) in item.list"
                :key="idx"
                :class="{active:activeList[index].indexOf(idx)>-1}"
                @click="handleSelectScreening(index,idx)"
              >{{it}}</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">更新时间</el-col>
            <el-col class="el-diy-date">
              <el-date-picker
                v-model="updatedDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row type="flex" class="screening-box" align="middle">
            <el-col :span="6">最近更新时间</el-col>
            <el-col class="el-diy-date">
              <el-date-picker
                v-model="recentlyUpdatedDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button>查询</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
let month = new Date().getMonth() + 1;
let defaultDate =
  new Date().getFullYear() + "年" + (month > 10 ? month : "0" + month) + "月";
let currentDate = defaultDate.replace("年", "-");
currentDate = currentDate.replace("月", "");

export default {
  data() {
    return {
      ruleForm: {
        currPage: 1,
        empStatus: "NORMAL",
        idValidStatus: "",
        iscgl: "",
        nameOrMore: "",
        pageSize: 20,
        queryEndTime: currentDate,
        queryMonth: "",
        queryStartTime: "",
        reportFinishTimeEnd: "",
        reportFinishTimeStart: "",
        reportStatus: "",
        workerType: ""
      },
      selectMonth:defaultDate,
      updatedDate: "",
      recentlyUpdatedDate: "",
      isShowInfoColl: true,
      activeList: [[0], [0], [1], [0], [0]],
      isShowScreening: false,
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      list: [],
      screeningList: [
        {
          title: "身份证状态",
          list: [
            "不限",
            "待验证",
            "验证中",
            "验证通过",
            "验证不通",
            "暂不验证 "
          ]
        },
        {
          title: "报送状态",
          list: ["不限", "待报送", "待反馈", "报送成功", "报送失败"]
        },
        {
          title: "人员状态",
          list: ["不限", "正常", "非正常"]
        },
        {
          title: "是否孤烈",
          list: ["不限", "是", "否"]
        },
        {
          title: "任职受雇从业类型",
          list: ["不限", "雇员", "其他"]
        }
      ]
    };
  },
  mounted() {
    this.getList();
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    handleSearch() {
      this.getList();
    },
    getList() {
      this.$store
        .dispatch("taxPageStore/actionEmpCollectList", this.ruleForm)
        .then(res => {
          this.list = res.data.data;
          console.log(res.data);
          console.log(this.list);
        });
    },
    handleSelectScreening(index, idx) {
      //根据不同的下标 来判断是多选还是单选
      if (index == 0 || index == 1 || index == 4) {
        let cur = this.activeList[index].indexOf(idx);
        if (cur == -1) {
          this.activeList[index].push(idx);
        } else {
          this.activeList[index].splice(cur, 1);
        }
      } else {
        this.$set(this.activeList[index], 0, idx);
      }
    },
    handleCalcSalary() {
      this.$router.push("/salary-cal/start");
    },
    goSalarySet() {
      this.$router.push("/salarySet");
    },
    handleReset() {
      this.activeList = [[0], [0], [1], [0], [0]];
      this.updatedDate = "";
      this.recentlyUpdatedDate = "";
    },
    handleCollectionName() {
      this.$router.push("/tax/info-collection");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.tax {
  .header {
    .add-table {
      cursor: pointer;
      float: right;
      color: $mainColor;
    }
    .iconxinzeng {
      font-size: 18px;
      color: #9c9c9c;
      position: relative;
      top: 1px;
    }
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
  .tax-search {
    margin-left: 20px;
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

