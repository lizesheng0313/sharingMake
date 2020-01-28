<template>
  <div class="insured-account">
    <div class="tax el-diy-month">
      <header class="header main-title">
        <el-row type="flex">
          <el-col :span="12">
            <span>参保月度台账</span>
          </el-col>
        </el-row>
      </header>
      <div class="insured-account-content">
        <div class="screening">
          <div class="clearfix check-staff-menu">
            <el-select v-model="ruleForm.companyName" placeholder="公司名称">
              <el-option v-for="(item,index) in companyList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
            <div class="content-header head-date">
              <el-date-picker
                v-model="ruleForm.month"
                type="month"
                placeholder="参保月份"
                value-format="yyyy年MM月"
                :editable="false"
                :clearable="false"
              ></el-date-picker>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" @click="isShowCreateAccount = true">生成月度台账</el-button>
              <el-button  class="add-import">导入月度台账</el-button>
            </div>
          </div>
          <div class="staff-table">
            <el-table
              v-loading="loading"
              :data="list"
              class="check-staff_table"
              :height="screenHeight"
              :style="{width:screenWidth-255+'px'}"
              border
            >
              <el-table-column prop="month" label="参保月份" width="140">
                <template slot-scope="scope">
                  <span class="table-name">{{ scope.row.month }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="companyName" label="公司名称" width="140"></el-table-column>
              <el-table-column prop="idNo" label="参保人数" width="180"></el-table-column>
              <el-table-column prop="idNo" label="本月增员人数" width="100"></el-table-column>
              <el-table-column prop="empSex" label="本月减员人数" width="100">
                <template slot-scope="scope">{{ scope.row.empSex }}</template>
              </el-table-column>
              <el-table-column prop="workerStatus" label="个人社保合计" width="140">
                <template slot-scope="scope">{{ scope.row.workerStatus }}</template>
              </el-table-column>
              <el-table-column prop="reportStatus" label="公司社保合计" width="140">
                <template slot-scope="scope">{{ scope.row.reportStatus }}</template>
              </el-table-column>
              <el-table-column prop="idValidStatus" label="个人公积金合计" width="140">
                <template slot-scope="scope">{{ scope.row.idValidStatus }}</template>
              </el-table-column>
              <el-table-column prop="mobile" label="公司公积金合计" width="140"></el-table-column>
              <el-table-column prop="source" label="台账来源" width="140"></el-table-column>
              <el-table-column prop="mobile" label="是否归档" width="140"></el-table-column>
              <el-table-column label="操作" fixed="right" width="160px">
                <template slot-scope="scope">
                  <span class="funStyle" @click="placeFile(scope.row)">归档</span>
                  <el-popover
                    ref="popMore"
                    placement="bottom-end"
                    width="60"
                    trigger="hover">
                    <div class="funStyle more-style">重新生成</div>
                    <div class="funStyle more-style">导出</div>
                    <div class="funStyle more-style">删除</div>
                    <span slot="reference" class="more-choose">更多</span>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleSelectionChange"
              @size-change="handleSizeChange"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[20, 50, 100, 200]"
              :total="total"
              class="staff-page"
            ></el-pagination>
          </div>
          <!-- 生成月度台账-->
          <el-dialog
            :visible.sync="isShowCreateAccount"
            title="生成月度台账"
            width="52%"
            center
            class="screen-dialog"
            :close-on-click-modal="closeModel"
          >
            <div class="screening-wapper">
              <el-form :model="createForm" ref="createForm" label-width="100px" class="demo-ruleForm">
                <div class="shortCon">
                  <el-form-item label="台账月份" label-width="20%" prop="month" :rules="{required: true, message: '请选择台账月份', trigger: 'blur'}">
                    <el-date-picker v-model="createForm.month" type="month" placeholder="请选择"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="公司范围" label-width="20%" prop="area" :rules="{required: true, message: '请选择公司范围', trigger: 'blur'}">
                    <el-select v-model="createForm.area" placeholder="请选择公司范围">
                      <el-option v-for="(item,index) in areaOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleCreate">确定</el-button>
                    <el-button @click="isShowCreateAccount = false">取消</el-button>
                  </span>
                </div>
              </el-form>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import * as AT from "./store/actionTypes";
  export default {
    data() {
      return {
        ruleForm:{
          companyName:"",
          currPage:"1",
          pageSize:"20",
          month:""
        },
        createForm:{
          month:"",
          area:"",
        },
        isShowCreateAccount:false,
        companyList:[],
        loading:false,
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        list: [{name:"减员",companyName:"123",month:"12",type:'dec',source:"create"},{month:"11",name:"增员",companyName:"123",type:'inc',source:"import"}],
        closeModel: false,
        total:0,
        areaOption:[]
    };
    },
    components:{

    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList
      }),
    },
    created(){

    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
          this.screenHeight = document.body.clientHeight - 330;
        })();
      };
    },
    methods: {
      getList() {
        this.loading = true;
        this.$store
          .dispatch("taxPageStore/actionEmpCollectList", this.ruleForm)
          .then(res => {
            if (res.success) {
              this.loading = false;
              this.total = res.data.count;
              this.list = res.data.data;
              this.increaseCount = res.data.increaseCount;
              this.decreaseCount = res.data.decreaseCount;
              this.awaitReportCount = res.data.awaitReportCount;
              this.normalCount = res.data.normalCount;
              this.failReportCount = res.data.failReportCount;
              this.awaitFeedBackCount = res.data.awaitFeedBackCount;
            }
          });
      },
      //重新生成
      handleCreate(){
        this.$refs['createForm'].validate(valid => {
          if(valid){
            console.log("111")
          }
        })
      },
      //归档
      placeFile(){
        this.$confirm('是否归档公司本月社保台账，薪资计算时能获取已归档的社保公积金数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
        });
      },
      handleSizeChange(val) {
        this.totalListForm.pageSize = val;
        this.totalListForm.currPage = 1;
        this.getList();
      },
      changeMonth(){

      },
      //翻页
      handleSelectionChange(val) {
        this.ruleForm.currPage = val;
        this.getList();
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";
  .insured-account {
    .header {
      border-bottom: 1px solid #ededed;
    }
    .insured-account-content {
      padding: 20px 20px 0px 20px;
      .content-header {
        display: inline-block;
        font-size: 16px;
        margin:0px 0px 6px 20px;
        i {
          font-size: 16px;
          color: #ccc;
        }
        span {
          position: absolute;
          left: 32px;
          top: 3px;
          z-index: 0;
        }
      }
    }
    .screen-dialog {
      .shortCon{width:450px;
        margin: 0 auto;}
      .dialog-footer{
        display: inline-block;
        width: 100%;
        margin-top: 10px;
        text-align: center;
      }
    }
    .screening {
      .check-staff-menu {
        .search-input {
          margin:0px 20px;
          width: 230px;
        }
      }
      .staff-table {
        position: relative;
        margin-top: 14px;
        .check-staff_table {
          overflow-x: auto;
        }
        .staff-page {
          margin-top: 10px;
          text-align: right;
        }
        .table-name {
          color: $mainColor;
          cursor: pointer;
        }
      }
    }
  }

</style>

