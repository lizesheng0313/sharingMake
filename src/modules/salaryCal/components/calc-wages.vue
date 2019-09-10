<template>
  <div class="calc-wages">
    <div class="clearfix check-staff-menu">
      <el-button class="screen" size="small" @click="showScreen">筛选</el-button>
      <el-input
        placeholder="请输入姓名\手机号"
        v-model="salaryForm.key"
        prefix-icon="iconiconfonticonfontsousuo1 iconfont"
        clearable
        class="search-input"
        @keyup.enter.native="searchSalary"
      ></el-input>
      <el-button class="search" size="small" @click="searchSalary" type="primary">搜索</el-button>
      <div class="right">
        <el-button type="primary" :disabled="salaryDisabled" v-show="salaryShow" @click="handleCalcSalary">薪资计算</el-button>
        <el-button type="default" :disabled="checkDisabled" v-show="auditedShow" @click="handleCheckSalary('AUDIT')">薪资审核</el-button>
        <el-button type="default" v-show="cancelAuditeShow" @click="handleCheckSalary('UN_AUDIT')">取消审核</el-button>
      </div>
    </div>
    <div class="staff-situation clearfix">
      <div class="left">
        <span class="staff-total">
          人员总数
          <i class="tatal-number">{{count}}</i>人
        </span>
      </div>
      <div class="right calc-table_menu">
        <span @click="showImport('social')">社会公积金导入</span>
        <span class="have-border_right" @click="showImport('floatItem')">浮动项导入</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            更多功能
            <i class="iconsanjiao iconfont"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="exportSalaryDetail('salaryDetail')">导出工资明细</el-dropdown-item>
            <el-dropdown-item @click.native="exportDepartTotal('summy')">导出部门汇总</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="staff-table">
      <el-table :data="salaryTableDataAll" class="check-staff_table" :style="{width:screenWidth-40+'px'}" :cell-style="cellStyle"  width="100%" v-loading="tableLoading">
        <el-table-column
          v-for="(col,index) in salaryTableDataAll[0]"
          min-width="120px"
          :label="col.col" :key="index" :resizable = "!col.floatItem" :fixed="col.col == '序号' || col.col == '姓名' || col.col == '工号' || col.col == '部门'">
          <template slot-scope="scope">
            <span v-if="scope['row'][index]['val'] != 'icon'">{{scope['row'][index]['val']}}</span>
<!--            <span v-else> <el-switch v-model="showCount"></el-switch> </span>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="salaryForm.currPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="salaryForm.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="count"
        class="staff-page">
      </el-pagination>
    </div>
   <!-- 公积金导入  -->
    <el-dialog
      :title="this.importT === 'social'?'公积金导入':'浮动项导入'"
      :visible.sync="isShowImport"
      width="600px"
      center
      class="screen-dialog"
      :close-on-click-modal="closeModel"
    >
      <div>
        <p class="headings">1、选择导入匹配方式</p>
        <div class="diy-el_radio">
          <el-radio-group v-model="importType">
            <div>
              <el-radio label="BY_EMP_NO">通过员工工号匹配人员</el-radio>
            </div>
            <div>
              <el-radio label="BY_ID_NO" v-if="importT === 'social'">通过身份证号匹配人员</el-radio>
              <el-radio label="BY_PHONE_NO" v-else>通过手机号匹配人员</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="select-file">
        <el-upload
          class="avatar-uploader"
          :action="actionUrl"
          :limit="1"
          :file-list="fileList"
          :headers="myHeaders"
          :before-upload="beforeAvatarUpload"
          :on-success="handleSuccess"
          :data="{'checkId':salaryForm.checkId,'importType':importType}"
        >
          <span class="headings">2、</span>
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <div v-show="uuid" style="margin:15px 0 15px 28px">
          <span v-if="failCount === 0"><i class="el-icon-success"></i>数据全部校验通过</span>
          <span v-if="failCount !== 0 && successCount !==0"><i class="el-icon-warning"></i>数据部分校验通过，有<strong style="color:red">{{this.failCount}}</strong>条数据错误</span>
          <span v-if="successCount === 0"><i class="el-icon-error"></i>数据全部未通过校验</span>
          <span>
            <a :href="'/api/salary/socialProvident/errorRecord/download/'+uuid" v-if="importT === 'social'">下载日志</a>
            <a :href="'/api/salary/floatData/errorRecord/download/'+uuid+'/'+salaryForm.checkId" v-else>下载日志</a>
          </span>
        </div>
        <p class="file-tip">
          支持xlsx和xls文件，文件不超过5M，建议使用标准模板格式
          <span>
             <a href="/api/salary/socialProvident/template/download" v-if="importT === 'social'">下载模板</a>
             <a :href="'/api/salary/floatTemplate/download/'+salaryForm.checkId" v-else>下载模板</a>
          </span>
        </p>
        <p class="instructions">
          说明：导入模板中空单元格薪资项，导入后不覆盖系统中对应薪资
<!--          <span>查看举例</span>-->
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="successCount===0" @click="uploadFile">导入通过数据</el-button>
        <el-button @click="isShowImport = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 导入完成 -->
    <el-dialog
      :visible.sync="isShowFinish"
      width="500px"
      center
      class="importFinishDialog"
      :close-on-click-modal="closeModel"
    >
      <div class="title"><i class="el-icon-success"></i>导入完成</div>
      <div>导入成功<span style="color:#06B806">{{this.importFinishForm.successCount}}</span>条数据,<span style="color:red">{{this.importFinishForm.failCount}}</span>条数据导入未通过，忽略导入</div>
      <div>
        <a :href="'/api/salary/socialProvident/errorRecord/download/'+uuid" v-if="importT === 'social'">下载日志</a>
        <a :href="' /api/salary/floatData/errorRecord/download/'+uuid+'/'+salaryForm.checkId" v-else>下载日志</a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="importFinish">我知道了</el-button>
      </span>
    </el-dialog>
    <!-- 筛选-->
    <el-dialog
      title=""
      :visible.sync="isShowScreen"
      width="52%"
      center
      class="screen-dialog"
      :close-on-click-modal="closeModel"
    >
      <el-form :model="salaryForm.queryFilterParam" ref="screenForm" label-width="100px" class="demo-ruleForm">
        <div class="shortCon">
          <el-form-item label="扣缴义务人" label-width="38%">
            <el-select v-model="salaryForm.queryFilterParam.taxSubId" placeholder="请选择扣缴义务人">
              <el-option v-for="(item,index) in screenTaxOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="部门" label-width="38%">
            <el-input v-model="salaryForm.queryFilterParam.departmentName"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="岗位" label-width="38%">
            <el-input v-model="salaryForm.queryFilterParam.jobTitle"></el-input>
          </el-form-item>
        </div>
        <div class="shortCon">
          <el-form-item label="工作地点" label-width="38%">
            <el-input v-model="salaryForm.queryFilterParam.workAddress"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="入职日期" label-width="22%">
          <el-date-picker
            v-model="salaryForm.queryFilterParam.enterStartTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            v-model="salaryForm.queryFilterParam.enterEndTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离职日期" label-width="22%">
          <el-date-picker
            v-model="salaryForm.queryFilterParam.lastEmployStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          至
          <el-date-picker
            v-model="salaryForm.queryFilterParam.lastEmployEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="员工类型" label-width="22%">
          <el-radio-group v-model="noEnumEmpType" size="small" @change="changeNoEmployType">
            <el-radio-button  label="null">不限</el-radio-button>
          </el-radio-group>
          <el-checkbox-group v-model="enumEmpType" size="small" @change="changeEmployType">
            <el-checkbox-button  v-for="(item,index) in screenOption" :label="item.value" :key="item.index">{{item.label}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click ="selectScreen">查询</el-button>
        <el-button @click="resetSreen">重置</el-button>
      </span>
    </el-dialog>
   <!-- 导出工资明细  -->
    <el-dialog
      title="选择导出项"
      :visible.sync="showExportSalaryDetail"
      width="600px"
      left
      class="exportSalaryDetailDialog"
      :close-on-click-modal="closeModel"
      v-loading="exportLoading"
    >
      <div v-show="isShowUserInfo">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkedPersonAllChange"><b>人员信息</b></el-checkbox>
        <div style="margin:10px 0px; border-bottom:1px solid #E5E5E5"></div>
        <el-checkbox-group v-model="checkedPerson" @change="checkedPersonChange">
          <el-checkbox v-for="item in personOptions" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-for="(item,index) in diyOption" :key="index" class="diyOptionItem">
        <el-checkbox :indeterminate="isIndeterminates[index]" v-model="checkAlls[index]" @change="handleDiyCheckAllChange(index,item.value)"><b>{{item.title}}</b></el-checkbox>
        <div style="margin:10px 0px; border-bottom:1px solid #E5E5E5"></div>
        <el-checkbox-group v-model="diyCheckeds[index]" @change="handleDiyCheckedChange(index,item.value)">
          <el-checkbox v-for="(it,index) in item.value" :label="it.id" :key="index">{{it.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click ="onExportSalaryItem">确定</el-button>
        <el-button @click="showExportSalaryDetail = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { apiSalaryList,apiGetTaxSubjectList,apiSalaryItemEnableInfo,apiSalaryDetailExport,socialProvident,floatItem,apiSalaryComputes,apiAuditSalaryCheck,apiExportDepartSum} from '../store/api'
export default {
  data() {
    return {
      salaryTableDataAll:[],
      myHeaders:{Authorization:this.$store.state.token},
      actionUrl:"",
      downloadLog:"",
      downLoadTemplate:"",
      isShowImport:false,//公积金方式
      importType:"BY_EMP_NO",
      failCount:0,
      successCount:0,
      uuid:"",
      isShowFinish:false,
      importT:"",
      importFinishForm:{
        failCount:"",
        successCount:""
      },
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      fileList:[],
      isShowScreen:false,
      screenOption:[
        {
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
      screenTaxOption:[],
      salaryForm:{
        checkId:this.$route.query.id,
        key:"",
        currPage:1,
        pageSize:20,
        queryFilterParam:{
          taxSubId:"",
          departmentName:"",//部门
          jobTitle:"",//岗位
          workAddress:"",//工作地点
          enterStartTime:"",
          enterEndTime:"",
          lastEmployStartTime:"",
          lastEmployEndTime:"",
          enumEmpType:[],//用工类型
        },
      },
      enumEmpType:[],//用工类型
      noEnumEmpType:null,
      salaryTableData:[],
      tableCol:[],
      tableValue:[],
      count:0,
      salaryRuleId:this.$route.query.salaryRuleId,
      checkAll: false,
      checkedPerson: [],
      personOptions:['工号', '姓名', '身份证号', '部门',"岗位","工作地点","工作性质","入职日期","离职日期"],
      isIndeterminate: false,
      showExportSalaryDetail:false,
      isDiyIndeterminate:[],
      diyOption:[],
      diyCheckeds:{},
      diyChecked:[],
      isIndeterminates:{},
      checkAlls:{},
      isShowUserInfo:true,
      checkStatus:"",
      checkDisabled:false,//审核禁用
      salaryDisabled:false,//计算薪资禁用
      uploadFileDisabled:true,//导入通过数据禁用
      tableAllData:[],
      showCount:true,
      tableLoading:false,
      closeModel:false,
      exportLoading:false,
    };
  },
  computed:{
    nowDate:function () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1):date.getMonth()+1;
      let day = date.getDate();
      return year+"-"+month+"-"+day+ " 00:00:00";
    },
    salaryShow:function () {
      return this.checkStatus === "INIT" || this.checkStatus === "COMPUTED" || this.checkStatus==="AUDITED"
    },
    auditedShow:function(){
      return this.checkStatus === "COMPUTED"
    },
    cancelAuditeShow:function(){
      return this.checkStatus === "AUDITED" || this.checkStatus === "PAID" || this.checkStatus === "FINISH"
    },
    // checkShow:function(){
    //   return this.checkStatus === "FINISH" || this.checkStatus === "PAID" || this.checkStatus === "PAID"
    // }
  },
  created(){
    this.loading();
    this.resetSreen();
    this.salaryForm.queryFilterParam.lastEmployEndTime = ""
  },
  watch:{
    showCount:function(){
     this.salaryTableDataAll[this.salaryTableDataAll.length-1]=(this.showCount?this.countData:this.noCountData)
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    this.$store.commit("salaryCalStore/SET_ROULEID", this.salaryRuleId);
  },
  methods: {
    loading(){
      this.tableLoading = true;
      apiSalaryList(this.salaryForm).then(res=>{
       if(res.code === "0000"){
         let salaryData = res.data;
         this.count = salaryData.count;
         this.tableValue = [];
         this.salaryTableData = salaryData.tableData;
         this.salaryTableDataAll = this.salaryTableData.map(item=>item.diyrow);
         // 查看合计
         this.$store.dispatch('salaryCalStore/actionPostSalarySum',this.salaryForm).then(res=>{
           if(res.code === "0000"){
             this.countData = res.data.tableData[0]['diyrow']
             this.countData.forEach(item=>{
               if(item.col==="序号"){item.val="合计"}
               if(item.col == '姓名'){item.val = null}
             })
             // this.noCountData = [];
             // this.countData.forEach(item=>{
             //   let obj={}
             //   if(item.col =="序号" || item.col == "姓名"){
             //      obj = {"col":item.col,"val":item.val,"floatItem":item.floatItem}
             //   }else{
             //     obj = {"col":item.col,"val":"--","floatItem":item.floatItem}
             //   }
             //   this.noCountData.push(obj)
             // });
             this.salaryTableDataAll.push(this.countData);
             this.tableLoading = false
           }else{
             this.$message.error(res.message)
           }
         })
       }
      })
      //查看工资表状态
     this.getSalaryStatus()
    },
    //查看工资表状态
    getSalaryStatus(){
      this.$store.dispatch('salaryCalStore/actionGetSalaryStatus',this.salaryForm.checkId).then(res=>{
        if(res.code === "0000"){
          this.checkStatus = res.data.checkStatus;
          this.salaryDisabled = this.checkStatus ==='AUDITED'
        }
      })
    },
    cellStyle(data){
      if(data.column.resizable){return "background:#F7F7F7"}
    },
    //选择用工类型
    changeEmployType(val){
      if(val.length>0){
        this.noEnumEmpType = "";
        this.salaryForm.queryFilterParam.enumEmpType= val;
      }else{
        this.noEnumEmpType = null;
        this.salaryForm.queryFilterParam.enumEmpTyp = [null];
      }
    },
    //不限制用工类型
    changeNoEmployType(val){
      this.noEnumEmpType = null;
      this.enumEmpType = "";
      this.salaryForm.queryFilterParam.enumEmpType=[null];
    },
    //获取工资表配置中启动的信息项
    getSalaryItem(){
      this.exportLoading = true;
      apiSalaryItemEnableInfo(this.salaryRuleId).then(res=>{
        if(res.code === "0000"){
          this.exportLoading = false
          let salaryItemData = res.data;
          this.diyOption=[];
          salaryItemData.forEach((item,index)=>{
            if(item)
            {
              if(item[0]['group'] != "人员信息"){
                let value = item.map(it =>{
                  return {'name':it.name,'id':it.id}
                });
                this.diyOption.push({"title":item[0].group, "value":value})
              }
            }
          })
          //  初始化导出配置项数据、
            //人员信息
          this.checkedPerson = [];
          this.isIndeterminate = false;
           // 配置项
          this.diyOption.forEach((item,index)=>{
            this.$set(this.diyCheckeds, index, []);
            this.isIndeterminates[index] = false;
            this.checkAlls[index] = false;
          })
        }
      })
    },
    //搜索
    searchSalary(){
      this.loading()
    },
    //切换pageId
    handleCurrentChange(val){
      this.salaryForm.currPage = val;
      this.loading()
    },
    handleSizeChange(val){
      this.salaryForm.pageSize = val;
      this.loading()
    },
    //导入页面展示
    showImport(type){
      //未计算、已计算状态可导入
      if(this.checkStatus ==="INIT" || this.checkStatus ==="COMPUTED"){
        this.successCount = 0;
        this.failCount = 0;
        this.uuid = "";
        this.fileList=[];
        this.importType="BY_EMP_NO";
        this.importT = type;
        this.actionUrl = type == "social"?"/api/salary/socialProvident/verify":"/api/salary/floatItem/verify";
        this.isShowImport = true;
      }else{
        this.$message.warning('本期工资数据已审核');
      }

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
      if(res.code == "0000"){
        let data = res.data;
        this.successCount = data.successCount;
        // this.uploadFileDisabled = this.;
        this.failCount = data.failCount;
        this.uuid = data.uuid;
      }else{
        this.$message.error(res.message);
      }
    },
    // 导出通过数据
    uploadFile(){
      let methods = this.importT == "social"?socialProvident:floatItem;
        methods({
        uuid:this.uuid,
        id:this.salaryForm.checkId,
        importType:this.importType,
      }).then(res=>{
        if(res.code === '0000'){
          let importData = res.data;
          this.importFinishForm.failCount = importData.failCount;
          this.importFinishForm.successCount = importData.successCount;
          this.isShowImport = false;
          this.isShowFinish = true;
        }
      })
    },
    importFinish(){
      this.loading();
      this.isShowFinish = false
    },
    //显示筛选dialog
    showScreen(){
      this.isShowScreen = true;
      //重置筛选条件
      // this.resetSreen();
      //获取个税列表
      apiGetTaxSubjectList(this.id).then(res=>{
        if(res.code == "0000"){
          this.screenTaxOption = res.data;
        }else{
          this.$message.error(res.message)
        }
      })
    },
    //查询筛选条件
    selectScreen(){
     this.loading();
     this.isShowScreen = false;
    },
    //重置筛选条件
    resetSreen(){
      for(let key in this.salaryForm.queryFilterParam){
        this.salaryForm["queryFilterParam"][key] = "";
      }
      this.salaryForm.queryFilterParam.enterEndTime = this.nowDate;
      this.noEnumEmpType = null;
      this.enumEmpType = [];
      this.salaryForm.queryFilterParam.enumEmpType = ["null"];
    },
    //导出工资表明细  dalog 显示
    exportSalaryDetail(type){
      this.isShowUserInfo = true;
      this.showExportSalaryDetail = true;
      this.exportType = type;
      this.getSalaryItem();
    },
    //导出工资表明细  人员信息（全选）
    checkedPersonAllChange(val) {
      this.checkedPerson = val ? this.personOptions : [];
      this.isIndeterminate = false;
    },
    //导出工资表明细  人员信息（单个选择）
    checkedPersonChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.personOptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.personOptions.length;
    },
    handleDiyCheckedChange(index,value){
      let checkedCount =this.diyCheckeds[index].length;
      this.checkAlls[index] = checkedCount === value.length;
      this.isIndeterminates[index] = checkedCount > 0 && checkedCount < value.length;
      this.$forceUpdate();
    },
    handleDiyCheckAllChange(index,value) {
      this.diyCheckeds[index] = this.checkAlls[index] ? value.map(item=>item.id) : [];
      this.isIndeterminates[index] = false;
    },
    //导出工资表明细（提交）
    onExportSalaryItem(){
      console.log()
      let exportItems = []
      let methed = this.exportType === "salaryDetail" ? apiSalaryDetailExport:apiExportDepartSum;
      for(let key in this.diyCheckeds){
        exportItems = exportItems.concat(this.diyCheckeds[key])
      }
      methed({
      "exportPersonItems":this.checkedPerson,
      "exportItems":exportItems,
      "queryParam":this.salaryForm
      }).then(res=>{
        if(res.status == "200"){
          this.showExportSalaryDetail = false;
        }else{
          this.$message.error(res.message)
        }
      })
    },
    //导出部门汇总
    exportDepartTotal(type){
      this.exportType = type;
      this.isShowUserInfo = false;
      this.showExportSalaryDetail = true;
      this.getSalaryItem();
    },
    //薪资计算
    handleCalcSalary(){
      apiSalaryComputes(this.salaryForm.checkId)
        .then(res=>{
          if(res.code === "0000"){
            //查看状态
            this.$message.success('薪资计算成功');
            this.loading()
          }
        })
    },
  //  薪资审核
    handleCheckSalary(type){
      if(type === "UN_AUDIT"){
        if(this.checkStatus === "PAID"){
          this.$message.warning("本月工资条已发放，请先撤回并删除已发放工资条后再取消审核？")
        }else{
          this.audited(type)
        }
      }else{
          this.audited(type)
      }
    },
    audited(type){
      let status = this.checkStatus ==='AUDITED'?"":"AUDIT";
      let message = type ==='UN_AUDIT'?'已发放本期工资条，如取消审核，将撤回本期工资条，确定要继续取消审核吗？':"薪资审核后，将锁定工资表数据，您可以发送工资条、银行报盘等操作"
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        apiAuditSalaryCheck({
          "checkAuditStatus":type,
          "checkId": this.salaryForm.checkId
        })
          .then(res=>{
            if(res.code === "0000"){
              this.$message.success(this.checkStatus ==='AUDITED'?'取消审核成功':"审核成功");
              this.loading()
            }else{
              this.$message.error(res.message)
            }
          })
      }).catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/helpers.scss";
.calc-wages {
  padding: 0 20px;
  box-sizing: border-box;
  .search{
    display: inline-block;
    margin-left: 20px;
  }
  .shortCon{width:450px;}
  .el-select{width: 100%;}
  .el-form-item{margin-right:50px;}
  .el-date-editor {width: 180px;}
  .screen{
    display: inline-block;
    margin-right:20px;
  }
  .file-tip{
    margin-top:15px;
    line-height: 30px;
    height:30px;
    margin-left:26px;
  }
  .instructions{
    margin-left:26px;
  }
  .check-staff-menu {
    margin-top: 30px;
    .search-input {
      width: 215px;
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
        color: #333;
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
  .exportSalaryDetailDialog{
    b{
      display: inline-block;
      padding:12px 0px;
    }
    .el-checkbox{
      height: 30px;
    }
  }
  .importFinishDialog{
    .title{
      font-size: 20px;
    }
    .el-icon-success{
      color:#06B806;
      font-size: 20px;
      display: inline-block;
      margin-right: 10px;
    }
    div{
      width: 300px;
      margin: 0 auto;
      margin-top:10px;
    }
  }
  .el-checkbox-group{
    display: inline-block;
    vertical-align: middle;
  }
  .screen-dialog{
    .headings{
      margin-bottom:20px;
    }
    .avatar-uploader{
      margin-top:20px;
    }
  }
}
</style>
