<template>
  <div class="salarySet-page">
    <header class="header">
      <el-row type="flex">
        <el-col :span="12">
          <span @click="$router.back(-1)" style="cursor: pointer;">返回</span>
          <span class="header-line">|</span>
          <span>工资表设置</span>
        </el-col>
      </el-row>
    </header>
    <div class="salarySet_con">
      <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="basicInfo-con">
            <el-form :model="basicInfoForm" :rules="basicInfoRule" ref="basicInfoForm" label-width="140px" class="demo-ruleForm">
              <el-form-item label="工资表名称" prop="name">
                <el-input v-model="basicInfoForm.name"></el-input>
              </el-form-item>
              <el-form-item label="计税规则" prop="taxRule" class="taxRule">
                <el-select v-model="basicInfoForm.taxRule" placeholder="请选择" @change="selectMonth">
                  <el-option v-for="item in taxRuleOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="算薪周期">
                 <el-select v-model="basicInfoForm.startMonth" placeholder="请选择" @change="selectMonth">
                   <el-option v-for="item in startDayOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
                 <el-select v-model="basicInfoForm.startDay" @change="selectDay">
                  <el-option
                    v-for="item in days"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>至{{this.endTime}}</span>
              </el-form-item>
              <el-form-item label="发薪日期" prop="">
                <el-select v-model="basicInfoForm.payMonth" placeholder="请选择">
                  <el-option v-for="item in payMonthOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="basicInfoForm.payDay">
                  <el-option
                    v-for="item in payDay"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="启动单月多次算发薪">
                <el-switch
                  v-model="basicInfoForm.enableMiltSalary"
                  active-text=""
                  inactive-text="">
                </el-switch>
                <i class="iconfont question">&#xe64e;</i>
              </el-form-item>
              <div class="buttonCon"><el-button type="primary" @click="SaveSalaryRule">保存设置</el-button></div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="薪资项目" name="secend" :disabled="salaryItemDisabled" v-loading="salaryItemLoding">
          <div v-for="(items,indexs) in tableData" :key="indexs">
            <div class="person-info">
              <span class="title">{{items[0]['group']}}</span>
              <span class="person-info-fun" @click="salaryItemDetailShow(items[0]['group'],false)">
                <i class="el-icon-document"></i>
                <span>新增</span>
              </span>
            </div>
            <draggable animation=150  v-model="tableData[indexs]" @change="changeDragger(tableData[indexs])">
              <el-row v-for="(item,index) in items" :key="index">
                <el-col :span="8" v-if="item.group ==='人员信息' || item.types.sys"><div class="grid-content bg-purple">{{item.name}}</div></el-col>
                <el-col :span="8" v-else><div class="grid-content bg-purple" @click="salaryItemDetailShow(items[0]['group'],item)" style="cursor:pointer">{{item.name}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{item.typeDesc}}</div></el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-popover trigger="hover" placement="top" v-if="item.canDelete">
                      <el-button @click="deleteItem(item.id)">删除</el-button>
                      <div slot="reference" class="name-wrapper">
                        <i class="el-icon-more"></i>
                      </div>
                    </el-popover>
                    <el-button type="warning" plain size="mini" v-else @click="changeStatus(item)">{{item.enable?'禁用':'启用'}}</el-button>
                </div>
                </el-col>
              </el-row>
            </draggable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
<!--人员信息-->
    <el-dialog
      title="工资项目详情"
      :visible.sync="salaryItemDetailVisible"
      width="30%"
      center>
        <el-form :model="salaryItemDetailForm" :rules="salaryItemDetailRules" ref="salaryItemDetailForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="salaryItemDetailForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="" v-if="salaryType != '人员信息'">
            <el-radio v-for="(item,index) in typeOption1" v-model="salaryItemDetailForm.type1" :label="item.value" :key="item.value">{{item.label}}</el-radio>
            <span class="line"></span>
            <el-radio v-model="salaryItemDetailForm.type2" label="AFTER_TAX">税后</el-radio>
            <el-radio v-model="salaryItemDetailForm.type2" label="BEFORE_TAX">税前</el-radio>
          </el-form-item>
          <el-form-item label="薪资数据" prop="itemDataSrc">
            <el-radio v-model="salaryItemDetailForm.itemDataSrc" label="EXCEL">浮动项-录入/excel导入</el-radio>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="salaryItemDetailForm.content" placeholder="请选择">
              <el-option label="下月延用" value="used"></el-option>
              <el-option label="下月清零" value="zero"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="setSalaryItem">确 定</el-button>
          <el-button @click="salaryItemDetailVisible = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import draggable from 'vuedraggable'
import { apiSaveSalaryRule,apiSalaryItemInfo,saveSalaryItems,deleteSalaryItems,updateSalaryItems,apiSalaryItemsSort} from './store/api'
export default {
  components: {},
  data() {
    return {
      basicInfoForm:{
        name:"",
        taxRule:"SALARY_PAY_RULE",//计税规则
        startMonth:"CURRENT_MONTH",//算新周期开始月份，
        startDay:1,//算新周开始日
        payMonth:null,//发薪月
        payDay:null,//发薪日
        enableMiltSalary:"N"
        },
      basicInfoRule:{
        name: [
          { required: true, message: '请输入工资表名称', trigger: 'blur' },
        ],
        taxRule: [
          { required: true, message: '请选择计税规则', trigger: 'change' }
        ],
        payMonth: [
          { required: true, message: '请选择计月', trigger: 'change' }
        ],
        payDay: [
          { required: true, message: '请选择日', trigger: 'change' }
        ],
      },
      startDayOptions:[
        {
          value: 'LAST_MONTH',
          label: '上月'
        }, {
          value: 'CURRENT_MONTH',
          label: '本月'
        },
      ],
      taxRuleOptions:[
        {
          value: 'SALARY_PAY_RULE',
          label: '按工资薪资所得计算个税'
        }, {
          value: 'PERSON_PAY_RULE',
          label: '按劳务报酬所得计算个税'
        }
      ],
      payMonthOptions:[
        {
          value: 'LAST_MONTH',
          label: '上月'
        }, {
          value: 'CURRENT_MONTH',
          label: '本月'
        }, {
          value: 'NEXT_MONTH',
          label: '下月'
        }
      ],
      days:[],
      payDay:[],
      endTime:"",
      activeName:"first",
      salaryItemDetailVisible:false,
      salaryItemDetailForm:{//工资项编辑
        name:"",
        itemDataSrc :"EXCEL",
        content:"used",
        types:[],
        type1:"SALARY",
        type2:"BEFORE_TAX",
      },
      salaryType:"",
      typeOption1:[
        {
          value: 'SALARY',
          label: '收入项'
        }, {
          value: 'DEDUCT',
          label: '扣减项'
        }, {
          value: 'COMPUTE',
          label: '计算项'
        }
      ],
      typeOption2:[
          {
            value: 'AFTER_TAX',
            label: '税后'
          }, {
            value: 'BEFORE_TAX',
            label: '税前'
          }
        ],
      salaryItemDetailRules:{
        name: [
          { required: true, message: '请输入工资项名称', trigger: 'blur' },
        ],
      },
      issuedItemVisible:false,
      ruleId:"",
      salaryItemDisabled:true,
      tableData:[],
      salaryItemLoding:false,
      isEdit: this.$route.query.isEdit,
      selectStep: this.$route.query.selectStep,
    };
  },
  components: {
    draggable,
  },
  computed:{
    ...mapState("salaryCalStore", {
      rouleId: "rouleId",
      sendBasicInfoForm:"basicInfoForm"
    })
  },
  watch:{
  },
  mounted(){
   // 初始化算新周期日
    for(let i=1;i<=28;i++){this.days.push({value:i,label:i+'号'})}
    this.getEndTime(this.basicInfoForm.startMonth,this.basicInfoForm.startDay);
   //  初始化发薪日
    this.payDay = [{value:0,label:"最后工作日"}];
    for(let i=1;i<=31;i++){this.payDay.push({value:i,label:i+'号'})}
   // 第二步骤刷新
    if(this.rouleId){ this.ruleId = this.rouleId; this.salaryItemDisabled = false; }
    if(this.isEdit && this.sendBasicInfoForm){
      for(let key in this.basicInfoForm){
        this.basicInfoForm[key] = this.sendBasicInfoForm[key];
      }
    }
  //  薪资项目
    if(this.selectStep === 2){
      this.activeName = "secend";
      this.onTabClick()
    }
  },
  methods:{
    //工资表排序
    changeDragger(data){
     let sortMap = {};
     data.forEach((item,index)=>{
       sortMap[item['id']] = index
     });
      apiSalaryItemsSort({'sortMap':JSON.stringify(sortMap)}).then(res=>{
       if(res.code === "0000"){
         this.getSalaryItem()
       }
      });
    },
    //算薪周期月
    selectDay(val){
      this.getEndTime(this.basicInfoForm.startMonth,val)
    },
    //算新周期日
    selectMonth(val){
      this.getEndTime(val,this.basicInfoForm.startDay)
    },
    //算薪周期结束时间
    getEndTime(monthType,day){
      //上月
      if(monthType === "LAST_MONTH") {
        if(day == "1"){
          this.endTime = "上月月底"
        } else{
          this.endTime = "本月"+(day-1)+"号"
        }
      }else{
        if(monthType === "CURRENT_MONTH"){
          if(day == "1"){
            this.endTime = "本月月底"
          } else{
            this.endTime = "下月"+(day-1)+"号"
          }
        }
      }
    },
    //保存基本信息
    SaveSalaryRule(){
      this.$refs['basicInfoForm'].validate((valid) => {
        if(valid){
          this.basicInfoForm.name = this.basicInfoForm.name.trim();
          this.basicInfoForm.id =  this.isEdit ? this.sendBasicInfoForm.id:null;
          apiSaveSalaryRule(this.basicInfoForm)
            .then(res=>{
              if(res.code == "0000"){
                this.ruleId = res.data.id;
                this.$store.commit("salaryCalStore/SET_ROULEID", res.data.id);
                this.salaryItemDisabled = false;
                this.$store.commit("salaryCalStore/SET_BASICINFOFORM",this.basicInfoForm);
                this.$message.success('设置成功');
                //基本信息成功跳转到第二步
                // this.activeName = "secend";
                this.onTabClick()
              }
            })
        }
      })
    },
    //切换薪资项目Tab
    onTabClick(){
     if(this.activeName === "secend"){
       this.getSalaryItem(this.ruleId)
     }
    },
    //获取薪资项目
    getSalaryItem(){
      this.salaryItemLoding = true;
      this.tableData = [];
      apiSalaryItemInfo(this.ruleId).then(res=>{
        let tableData = res.data;
        this.tableData = tableData.filter(it=>it)
        this.salaryItemLoding = false;
      }).catch(res=>{})
    },
    //显示新增薪资项
    salaryItemDetailShow(type,data){
      this.salaryItemDetailVisible = true;
      this.salaryType = type;
      //如果是编辑页面
      if(data){
        this.salaryItemDetailForm.name = data.name;
        this.salaryItemDetailForm.content = data.content;
        this.salaryItemDetailForm.type1 = data.types.type1;
        this.salaryItemDetailForm.type2 = data.types.type2;
        this.salaryItemDetailForm.id = data.id
      }else{
        this.$refs['salaryItemDetailForm']?this.$refs['salaryItemDetailForm'].resetFields():"";
        this.salaryItemDetailForm.id = null;
      }
    },
    //新增工资项
    setSalaryItem(){
      this.salaryItemDetailForm.group = this.salaryType;
      this.salaryItemDetailForm.types = this.salaryType === "人员信息"?[]:[this.salaryItemDetailForm.type2,this.salaryItemDetailForm.type1];
      this.salaryItemDetailForm.salaryRuleId = this.ruleId;
      this.$refs['salaryItemDetailForm'].validate((valid) => {
        if(valid){
          saveSalaryItems(this.salaryItemDetailForm)
            .then(res=>{
                if(res.code == "0000"){
                  this.salaryItemDetailVisible = false;
                  this.getSalaryItem()
                }
            })
        }
      })
    },
    //删除工资表项
    deleteItem(id){
      this.$confirm('您确定删除工资项目，如果是，请点击“确定”，如果否，请点击“取消”?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteSalaryItems(id).then(res=>{
         if(res.code == "0000"){
           this.$message.success('删除成功!');
           this.getSalaryItem();
         }
        })
      }).catch(() => {});
    },
    // 修改工资表项状态
    changeStatus(row){
      updateSalaryItems({
          id:row.id,
          enable:!row.enable
        }
      )
      .then(res=>{
        if(res.code == "0000"){
          this.getSalaryItem()
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.salarySet-page {
  .header {
    padding:0 20px;
    font-size: 14px;
    height: 61px;
    border-bottom: 1px solid #ededed;
    line-height: 61px;
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
  .header-line{
    display: inline-block;
    padding:0 10px;
  }
  .salarySet_con{
    padding:30px;
    .basicInfo-con{
      width: 666px;
    }
    .taxRule{
      .el-select{
        width: 526px;
      }
    }
    .question{display:inline-block;margin:0px 4px;color:#DBDBDB;font-size: 18px;cursor: pointer;}
    .buttonCon{text-align: center;}
  }
  .person-info{
    height: 40px;
    line-height: 40px;
    background: #F5F5F5;
    .title{
      display: inline-block;
      margin-left: 20px;
    }
    .person-info-fun{
      float:right;
      margin-right:40px;
      color:#2C7CFF;
      cursor:pointer;
      .el-icon-document{
        color:#9C9C9C;
        font-size: 20px;
        display: inline-block;
        margin-right:10px;
      }
    }
  }
  .el-col-8{
    height: 46px;
    line-height: 46px;
    text-align: center;
  }
}
</style>

