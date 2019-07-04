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
<!--              </el-form-item>-->
<!--              <el-form-item label="发薪日期" prop="payDay">-->
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
        <el-tab-pane label="薪资项目" name="secend">
          <div class="person-info-con">
            <div class="person-info">
              <span class="title">人员信息</span>
              <span class="person-info-fun" @click="salaryItemDetailShow('人员信息')">
                <i class="el-icon-document"></i>
                <span>新增</span>
              </span>
            </div>
            <el-table :data="tableData" row-key="id" :show-header="showHeader" align="left">
              <el-table-column v-for="(item, index) in dropCol" :key="`dropCol${index}`" :prop="dropCol[index].prop">
                <template slot-scope="scope">
                  <span v-if="dropCol[index].prop === 'name'">{{scope.row.name}}</span>
                  <span v-if="dropCol[index].prop === 'types'">{{scope.row.types}}</span>
                  <span v-if="dropCol[index].prop === 'group'">
                     <el-button type="warning" v-if="scope.row.types.includes('SYSTEM')" plain size="mini">{{scope.row.enable === 'Y'?'禁用':'启用'}}</el-button>
                      <el-popover trigger="hover" placement="top" v-else>
                            <el-button>删除</el-button>
                            <div slot="reference" class="name-wrapper">
                              <i class="el-icon-more"></i>
                            </div>
                      </el-popover>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="need-send-item">
          <div class="person-info">
            <span class="title">应发项</span>
            <span class="person-info-fun" @click="salaryItemDetailShow('应发项')">
              <i class="el-icon-document"></i>
              <span>新增</span>
            </span>
          </div>
          <el-table :data="tableData2" row-key="id" :show-header="showHeader" align="left">
            <el-table-column v-for="(item, index) in dropCol" :key="`dropCol${index}`" :prop="dropCol[index].prop">
              <template slot-scope="scope">
                <span v-if="dropCol[index].prop === 'name'"  @click="salaryItemDetailShow('应发项',scope.row)" style="cursor: pointer">{{scope.row.name}}</span>
                <span v-if="dropCol[index].prop === 'types'">{{scope.row.types}}</span>
                <span v-if="dropCol[index].prop === 'group'">
                     <el-button type="warning" v-if="scope.row.types.includes('SYSTEM')" plain size="mini">{{scope.row.enable === 'Y'?'禁用':'启用'}}</el-button>
                      <el-popover trigger="hover" placement="top" v-else>
                            <el-button
                            >删除</el-button>
                            <div slot="reference" class="name-wrapper">
                              <i class="el-icon-more"></i>
                            </div>
                      </el-popover>
                  </span>
              </template>
            </el-table-column>
          </el-table>
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
        <el-form-item label="" prop="" v-if="salaryType != '人员信息'">
          <el-radio v-model="type1" label="SALARY">收入项</el-radio>
          <el-radio v-model="type1" label="DEDUCT">扣减项</el-radio>
          <el-radio v-model="type1" label="COMPUTE">计算项</el-radio>
          <span class="line">|</span>
          <el-radio v-model="type2" label="AFTER_TAX">税后</el-radio>
          <el-radio v-model="type2" label="BEFORE_TAX">税前</el-radio>
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
        <el-button type="primary" @click="setSalaryItemDetail">确 定</el-button>
        <el-button @click="salaryItemDetailVisible = false">取 消</el-button>
      </span>
    </el-dialog>
<!--应发项-->
  </div>
</template>
<script>
import { mapState } from "vuex";
import Sortable from 'sortablejs';
import { apiSaveSalaryRule,apiSalaryItemInfo,saveSalaryItems } from './store/api'
export default {
  components: {},
  data() {
    return {
      basicInfoForm:{
        name:"",
        taxRule:"SALARY_PAY_RULE",//计税规则
        startMonth:"CURRENT_MONTH",//算新周期开始月份，
        startDay:1,//算新周开始日
        payMonth:"",//发薪月
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
      tableData: [{
        canDelete: false,
        content: null,
        enable: true,
        group: "人员信息",
        id: 1,
        itemDataSrc: "EXCEL",
        name: "1",
        orderNum: 2,
        types: ["SYSTEM"],
      },{
          canDelete: false,
          content: null,
          enable:false,
          group: "人员信息",
          id: 2,
          itemDataSrc: "EXCEL",
          name: "2",
          orderNum: 2,
          types: ["ELA"],
        }
      ],
      tableData2: [{
        canDelete: false,
        content: null,
        enable: "N",
        group: "发项目",
        id: 1,
        itemDataSrc: "EXCEL",
        name: "1",
        orderNum: 2,
        types: ["SYSTEM"],
      },{
        canDelete: false,
        content: null,
        enable: "N",
        group: "人员信息",
        id: 2,
        itemDataSrc: "EXCEL",
        name: "2",
        orderNum: 2,
        types: ["SYSTEM"],
      }
      ],
      dropCol: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'types'
        },
        {
          label: '地址',
          prop: 'group'
        },
      ],
      showHeader:false,
      salaryItemDetailVisible:false,
      salaryItemDetailForm:{
        name:"",
        itemDataSrc :"EXCEL",
        content:"used",
        type:[]
      },
      salaryType:"",
      type1:"SALARY",
      type2:"BEFORE_TAX",
      salaryItemDetailRules:{
        name: [
          { required: true, message: '请输入工资项名称', trigger: 'blur' },
        ],
      },
      issuedItemVisible:false
    };
  },
  mounted(){
  // 初始化算新周期日
    for(let i=1;i<=28;i++){this.days.push({value:i,label:i+'号'})}
    this.getEndTime(this.basicInfoForm.startMonth,this.basicInfoForm.startDay);
  //  初始化发薪日
    this.payDay = [{value:0,label:"最后工作日"}];
    for(let i=1;i<=31;i++){this.payDay.push({value:i,label:i+'号'})}
   this.rowDrop()
  },
  watch:{
    tableData:function(){
      console.log(this.tableData)
    }
  },
  methods:{
    rowDrop() {
      const personInfoTbody = document.querySelector('.person-info-con .el-table__body-wrapper tbody');
      const needSenfTbody = document.querySelector('.need-send-item .el-table__body-wrapper tbody');
      const _this = this
      Sortable.create(personInfoTbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow)
        }
      });
      Sortable.create(needSenfTbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData2.splice(oldIndex, 1)[0]
          _this.tableData2.splice(newIndex, 0, currRow)
        }
      })
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
    SaveSalaryRule(){
      // this.basicInfoForm.enableMiltSalary = "N";
      this.$refs['basicInfoForm'].validate((valid) => {
        if(valid){
          apiSaveSalaryRule(this.basicInfoForm)
            .then(res=>{
              console.log(res)
            })
        }
      })
    },
    onTabClick(tab, event){
     if(this.activeName === "secend"){
       this.getSalaryItem(5)
     }
    },
    //获取薪资项目
    getSalaryItem(id){
      apiSalaryItemInfo(id).then(res=>{
        let data = res.data;
        console.log(data)
      }).catch(res=>{
        console.log(res)
      })
    },
    salaryItemDetailShow(type,data){
      this.salaryItemDetailVisible = true;
      this.salaryType = type;
      if(data){
        console.log(data)
      }
    },
    setSalaryItemDetail(){
      this.salaryItemDetailForm.group = this.salaryType;
      this.salaryItemDetailForm.type = this.salaryType === "人员管理"?[]:[this.type1,this.type2]
      this.$refs['salaryItemDetailForm'].validate((valid) => {
        if(valid){
          saveSalaryItems(this.salaryItemDetailForm)
            .then(res=>{
              console.log(res)
            })
        }
      })
    },
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
}
</style>

