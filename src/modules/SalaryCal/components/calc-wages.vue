<template>
  <div class="calc-wages">
    <div class="clearfix check-staff-menu">
      <el-button class="screen" size="small" @click="showScreen">筛选</el-button>
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
      <el-row type="flex" class="row-bg tableHeader">
        <el-col :span="4" v-for="item in tableCol"><div class="grid-content bg-purple">{{item}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" v-for="per in tableValue">
        <el-col :span="4" v-for="it in per"><div class="grid-content bg-purple">{{ it }}</div></el-col>
      </el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="salaryForm.currentPage"
        :page-sizes="[1, 50, 100, 200]"
        :page-size="salaryForm.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="count"
        class="staff-page">
      </el-pagination>
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
    <!-- 筛选-->
    <el-dialog
      title=""
      :visible.sync="isShowScreen"
      width="600px"
      center
      class="diy-el_dialog"
    >
      <el-form :model="screenForm" ref="screenForm" label-width="100px" class="demo-ruleForm">
        <div class="shortCon">
          <el-form-item label="纳税主体">
            <el-select v-model="screenForm.taxSubId" placeholder="请选择纳税主体">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="部门">
            <el-input v-model="screenForm.departmentName"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="岗位">
            <el-input v-model="screenForm.departmentName"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="工作地点">
            <el-input v-model="screenForm.departmentName"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="入职日期">
          <el-date-picker
            v-model="screenForm.enterStartTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            v-model="screenForm.enterEndTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离职日期">
          <el-date-picker
            v-model="screenForm.lastEmployStartTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            v-model="screenForm.lastEmployEndTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="员工类型">
          <el-radio-group v-model="screenForm.enumEmpType" size="mini" >
            <el-radio-button v-for="(item,index) in screenOption" :label="item.value"  border >{{item.label}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </span>
    </el-dialog>
    <!-- 到处工资明细  -->
<!--    <el-dialog-->
<!--      title=""-->
<!--      :visible.sync="isShowScreen"-->
<!--      width="600px"-->
<!--      center-->
<!--      class="diy-el_dialog"-->
<!--    >-->
<!--      <template>-->
<!--        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
<!--        <div style="margin: 15px 0;"></div>-->
<!--        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
<!--          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </template>-->
<!--    </el-dialog>-->
  </div>
</template>
<script>
  import { apiSalaryList,apiGetTaxSubjectList} from '../store/api'
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
        taxSubId:"",
        departmentName:"",//部门
        jobTitle:"",//岗位
        workAddress:"",//工作地点
        enterStartTime:"",
        enterEndTime:"",
        lastEmployStartTime:"",
        lastEmployEndTime:"",
        enumEmpType:"null",//用工类型
      },
      screenOption:[
        {
          label:"不限",
          value:"null"
        }, {
          label:"全职",
          value:"FULL_TIME"
        },{
          label:"兼职",
          value:"PART_TIME"
        },{
          label:"实习",
          value:"PRACTICE"
        },{
          label:"劳务",
          value:"LABOUR"
        },{
          label:"退休返聘",
          value:"RE_EMPLOY"
        }
      ],
      salaryForm:{
        checkId:"2",
        currentPage:2,
        pageSize:10,
      },
      salaryTableData:[],
      tableCol:[],
      tableValue:[],
      count:0,
      id:this.$route.query.id
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
    this.loading()

  },
  methods: {
    loading(){
      apiSalaryList(this.salaryForm).then(res=>{
       if(res.code === "0000"){
         let salaryData = res.data;
         this.count = salaryData.count;
         this.salaryTableData = salaryData.tableData;
         this.tableCol = this.salaryTableData[0]['diyrow'].map(item=>item.col);
         this.tableValue = [];
         this.salaryTableData.forEach(item=>{
           let row = item['diyrow'].map(it=>it.val);
           this.tableValue.push(row)
         })
       }
      })
    },
    //切换pageId
    handleCurrentChange(val){
      this.salaryForm.currentPage = val;
      this.loading()
    },
    handleSizeChange(val){
      this.salaryForm.pageSize = val;
      this.loading()
    },
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
    showScreen(){
      this.isShowScreen = true;
      apiGetTaxSubjectList(this.id).then(res=>{
        console.log(res)
      })
    },
    handleCalcSalary(){
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.calc-wages {
  padding: 0 20px;
  box-sizing: border-box;
  .shortCon{width:450px;}
  .el-select{width: 100%;}
  .el-form-item{margin-right:50px;}
  .el-date-editor {width: 180px;}
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
  .iconiconfonticonfontsousuo1 {font-size: 12px;}
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
  .grid-content{
    height: 60px;
    line-height: 60px;
    border-bottom:1px solid #EDEDED;
    text-align: center;
  }
  .tableHeader{
    background:#F1F3F6 ;
    color:#333333;
    font-weight: bold;
  }
}
</style>
