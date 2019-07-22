<template>
  <div class="check-staff">
    <div class="clearfix check-staff-menu">
      <el-input
        placeholder="请输入姓名\手机号"
        v-model="userForm.key"
        suffix-icon="iconiconfonticonfontsousuo1 iconfont"
        clearable
        class="search-input left"
        @keyup.enter.native="searchUser"
      ></el-input>
      <div class="right">
        <el-button type="primary" @click="showIncrease" class="add-import">增员导入</el-button>
        <el-dropdown trigger="click" @command="handleDropdown">
          <el-button type="default">
            更多
            <i class="iconsanjiao iconfont"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="delete">全部删除</el-dropdown-item>
            <el-dropdown-item command="export">导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="staff-situation">
      <span class="staff-total">
        人员总数
        <i>{{this.summryTotal}}</i>人
      </span>
      <span>
        本月：入职
        <i>{{this.newEmployeeCount}}</i>人
      </span>
      <span>
        调动
        <i>{{this.changeEmployeeCount}}</i>人
      </span>
    </div>
    <div class="staff-table">
      <!-- <div class="floating-menu">
        <span>删除</span>
      </div>-->
      <el-table :data="userList" class="check-staff_table" :style="{width:screenWidth-40+'px'}" v-loading="userLoading"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
             <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="工号">
          <template slot-scope="scope">
            <span>{{scope.row.empNo}}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号">
          <template slot-scope="scope">
            <span>{{scope.row.idCardNo}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="手机号">
          <template slot-scope="scope">
            <span>{{scope.row.phoneNo}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="用工性质">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="纳税主体">
          <template slot-scope="scope">
            <span>{{scope.row.taxSubject}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="部门">
          <template slot-scope="scope">
            <span>{{scope.row.departName}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="岗位">
          <template slot-scope="scope">
            <span>{{scope.row.jobTitle}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="工作地点">
          <template slot-scope="scope">
            <span>{{scope.row.workAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="入职时间">
          <template slot-scope="scope">
            <span>{{scope.row.empStartDate?scope.row.empStartDate.split(" ")[0]:""}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="工资卡银行">
          <template slot-scope="scope">
            <span>{{scope.row.bank}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="工资卡号">
          <template slot-scope="scope">
            <span>{{scope.row.bankNo}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="userForm.currPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="userForm.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
    <!--  增员导入  -->
    <el-dialog
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
              <el-radio :label="3">通过身份证号匹配人员</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="select-file">
        <el-upload
          class="avatar-uploader"
          action="/api/salary/salaryCheck/verify"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeAvatarUpload"
          :on-success="handleSuccess"
          :data="{'id':userForm.checkId}"
        >
          <span class="headings">2、</span>
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <div v-show="uuid" style="margin:15px 0 0 28px">
          <span v-if="failCount === 0"><i class="el-icon-success"></i>全部导入成功</span>
          <span v-if="failCount !== 0 && successCount !==0"><i class="el-icon-warning"></i>数据部分校验通过，有<strong style="color:red">{{this.failCount}}</strong>条数据错误</span>
          <span v-if="successCount === 0"><i class="el-icon-error">数据全部未通过校验</i></span>
          <span><a :href="'/api/salary/checkMember/errorRecord/download/'+uuid">下载日志</a></span>
        </div>
        <p>
          支持xlsx和xls文件，文件不超过5M，建议使用标准模板格式
          <span><a href="/api/salary/checkMember/template/download">下载模板</a></span>
        </p>
        <p class="instructions">
          说明：导入模板中空单元格薪资项，导入后不覆盖系统中对应薪资
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadFile">导入通过数据</el-button>
        <el-button @click="isShowIncrease = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 导入完成 -->
    <el-dialog
      :visible.sync="isShowIncreaseFinish"
      width="500px"
      center
      class="importFinishDialog"
    >
      <div class="title"><i class="el-icon-success"></i>导入完成</div>
      <div>导入成功<span style="color:#06B806">{{this.importFinishForm.successCount}}</span>条数据,<span style="color:red">{{this.importFinishForm.failCount}}</span>条数据导入未通过，忽略导入</div>
      <div><a :href="'/api/salary/checkMember/errorRecord/download/'+uuid">下载日志</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="importMemberFinish">我知道了</el-button>
<!--        <el-button @click="isShowIncreaseFinish = false">取 消</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { apiCheckMember,apiImportMember,apiCheckMemberdelete,apiCheckMemberSummary} from '../store/api'
export default {

  data() {
    return {
      radio: 3,
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
      ],
      userForm:{
        "checkId":this.$route.query.id,
        "currPage": 1,
        "key": "",
        "pageSize":20 ,
      },
      userList:[],
      count:0,
      fileList:[],
      userLoading:false,
      imgFlag:false,
      percent:0,
      failCount: "",
      successCount:"",
      uuid: "",
      selectUserIdList:[],
      summryTotal:"",
      changeEmployeeCount:"",
      newEmployeeCount:"",
      isShowIncreaseFinish:false,
      importFinishForm:{
        failCount:"",
        successCount:""
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
    this.loading();
    this.summary();
  },
  methods: {
    loading(){
      this.userLoading = true;
      apiCheckMember(this.userForm).then(res=>{
        if(res.code === "0000"){
          this.userLoading = false;
          this.userList = res.data.data;
          this.count = res.data.count;
        }
      })
    },
    summary(){
      apiCheckMemberSummary(this.userForm.checkId)
        .then(res=>{
          if(res.code === "0000") {
            let data = res.data;
            this.summryTotal = data.total;
            this.newEmployeeCount = data.newEmployeeCount;
            this.changeEmployeeCount = data.changeEmployeeCount;
          }
        })
    },
    handleDelete(id) {
      this.$confirm("您确定要删除数据，如果是，请点击“确定”，如果否，请点击“取消”", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiCheckMemberdelete(id).then(res=>{
            if(res.code === "0000"){
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.loading()
            }
          })
        }).catch(() => {});
    },
    //切换pageId
    handleCurrentChange(val){
      this.userForm.currPage = val;
      this.loading()
    },
    handleSizeChange(val){
      this.userForm.pageSize = val;
      this.loading()
    },
    searchUser(){
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
  // 导出通过数据
    uploadFile(){
       apiImportMember({
         uuid:this.uuid,
         id:this.userForm.checkId
       }).then(res=>{
       if(res.code === '0000'){
         let importData = res.data;
         this.importFinishForm.failCount = importData.failCount;
         this.importFinishForm.successCount = importData.successCount;
         this.isShowIncrease = false;
         this.isShowIncreaseFinish = true;
       }
       })
    },
    handleSelectionChange(val){
      this.selectUserIdList = val.map((item,index)=>item.id);
    },
    handleDropdown(val){
      if(val === 'delete'){
        if(this.selectUserIdList.length === 0){
          this.$message.warning("请选择要删除的人员");
        }else{
          this.handleDelete(this.selectUserIdList)
        }
      }else{
        window.location.href = "/api/salary/checkMember/export?checkId="+this.userForm.checkId+"&"+"key="+this.userForm.key
      }
    },
    showIncrease(){
      this.isShowIncrease = true;
      this.fileList = [];
      this.uuid = ""
    },
    importMemberFinish(){
      this.loading();
      this.isShowIncreaseFinish = false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
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
  .el-pagination{
    text-align: right;
  }
  .importFinishDialog{
    .title{
      font-size: 20px;
    }
    .el-icon-success{color:#06B806;}
    div{
      width: 300px;
      margin: 0 auto;
      margin-top:10px;
    }
  }
}
</style>