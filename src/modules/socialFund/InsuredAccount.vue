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
            <el-select v-model="ruleForm.taxSubId" placeholder="公司名称" @change="getList">
              <el-option v-for="(item,index) in taxSubjectInfoList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
            <div class="content-header head-date">
              <el-date-picker
                v-model="ruleForm.queryMonth"
                type="month"
                placeholder="参保月份"
                value-format="yyyy-MM-dd"
                :editable="false"
                :clearable="false"
                @change="getList"
              ></el-date-picker>
            </div>
            <div class="right">
              <el-button type="primary" class="add-import" @click="handleShowCreate(false)">生成月度台账</el-button>
              <el-button class="add-import">导入月度台账</el-button>
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
                  <span class="table-name" @click="goAccountDetail(scope.row)">{{ scope.row.currentMonth }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="taxSubName" label="公司名称" width="140"></el-table-column>
              <el-table-column prop="insuredPersonCount" label="参保人数" width="180"></el-table-column>
              <el-table-column prop="currentMonthAdd" label="本月增员人数" width="100"></el-table-column>
              <el-table-column prop="currentMonthSub" label="本月减员人数" width="100"></el-table-column>
              <el-table-column prop="personSocialSumAmount" label="个人社保合计" width="140"></el-table-column>
              <el-table-column prop="compSocialSumAmount" label="公司社保合计" width="140"></el-table-column>
              <el-table-column prop="personFundSumAmount" label="个人公积金合计" width="140"></el-table-column>
              <el-table-column prop="compFundSumAmount" label="公司公积金合计" width="140"></el-table-column>
              <el-table-column prop="isarchive" label="是否归档" width="140">
                <template slot-scope="scope">{{ scope.row.isarchive ?"是":"否" }}</template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="160px">
                <template slot-scope="scope">
                  <span class="funStyle" @click="placeFile(scope.row)">{{ scope.row.isarchive?'归档':"取消归档" }}</span>
                  <el-popover
                    ref="popMore"
                    placement="bottom-end"
                    width="60"
                    trigger="hover">
                    <div class="funStyle more-style" @click="handleReCreate(scope.row)" v-if="!scope.row.isarchive">重新生成</div>
                    <div class="funStyle more-style">导出</div>
                    <div class="funStyle more-style" v-if="!scope.row.isarchive">删除</div>
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
                  <el-form-item label="公司范围" label-width="20%" prop="taxSubId" :rules="{required: true, message: '请选择公司范围', trigger: 'blur'}">
                    <el-select v-model="createForm.taxSubId" placeholder="请选择公司范围">
                      <el-option v-for="(item,index) in taxSubjectInfoList" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <div style="color: #333;font-size: 13px;margin-left: 20px;margin-top: -10px">只能选择所选月份没有月度台账的公司</div>
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
          taxSubId:0,
          currPage:"1",
          pageSize:"20",
          queryMonth:""
        },
        createForm:{
          taxSubId:"",
          month:"",
        },
        isShowCreateAccount:false,
        loading:false,
        screenWidth: document.body.clientWidth,// 屏幕尺寸
        screenHeight: document.body.clientHeight - 330,
        list: [],
        closeModel: false,
        total:0,
        areaOption:[]
    };
    },
    components:{

    },
    computed:{
      ...mapState({
        privilegeVoList:state=>state.privilegeVoList,
        taxSubjectInfoList:state=>state.taxSubjectInfoList
      }),
    },
    created(){
      this.getList()
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
          .dispatch("payMasterStore/actionGetCompMonthlyLedgerList", this.ruleForm)
          .then(res => {
            this.loading = false
            if (res.success) {
              this.list = res.data.data;
              this.loading = false;
            }
          });
      },
      //生成展示
      handleShowCreate(){
        this.isShowCreateAccount = true
        this.$refs['createForm']?this.$refs['createForm'].clearValidate():"";
      },
      //重新生成
      handleReCreate(data){
        this.$confirm("是否重新生成公司本月月度台账！", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch("payMasterStore/actionSaveMonthlyLedger", {
              taxSubId:data.taxSubId,
              month:data.currentMonth,
            })
            .then(res => {
              if(res.success){
                this.getList()
              }
            })
        }).catch(() => {
        });
      },
      //生成操作
      handleCreate(){
        this.$refs['createForm'].validate(valid => {
          if(valid){
            this.$store
              .dispatch("payMasterStore/actionSaveMonthlyLedger", this.createForm)
              .then(res => {
                  if(res.success){
                    this.getList()
                    this.isShowCreateAccount = false
                  }
              })
          }
        })
      },
      //归档
      placeFile(data){
        let title = data.isarchive?"是否取消存档本月社保台账，取消后薪资计算时不能获取社保数据":"是否归档公司本月社保台账，薪资计算时能获取已归档的社保公积金数据?";
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch("payMasterStore/actionArchiveMonthlyLedger",{
              archiveType:data.isarchive?'CANCEL_ARCHIVE':"ARCHIVE",
              month:data.currentMonth,
              taxSubId:data.taxSubId
            })
            .then(res => {
              if(res.success){
                this.$message.success("操作成功")
                this.getList()
              }
            })

        }).catch(() => {
        });
      },
      //生成、导入台账明细
      goAccountDetail(data){
        this.$router.push({path:'/insuredAccountDetailed',query:{source:data.source}})
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

