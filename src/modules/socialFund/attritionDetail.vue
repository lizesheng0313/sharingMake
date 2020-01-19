<template>
  <div class="attrition-detail">
    <full-screen
      :fsTitle="'查看详情'"
      :bgColor="'#fff'"
      class="info-collection"
      :goUrl="'-1'"
    >
      <div slot="fs-container">
          <div class="attrition-detail-con">
            <div class="base-info"><span class="title">基本信息</span></div>
              <div class="base-info-con">
                  <el-form label-width="140px">
                      <el-row>
                          <el-col :span="12"><el-form-item label="姓名：">马大哈</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="工号：">马大哈</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="证件类型：">居民身份证</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="证件号码：">101110198009080922</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="户籍城市：">广东省广州市</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="户口性质：">外阜城镇</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="公司名称：">北京阿拉钉科技有限公司</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="用工性质：">全职</el-form-item></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12"><el-form-item label="入职日期：">2019-01-02</el-form-item></el-col>
                          <el-col :span="12"><el-form-item label="离职日期：">--</el-form-item></el-col>
                      </el-row>
                  </el-form>
              </div>
              <div class="insured-info">
                  <span class="title">参保信息</span>
                  <span class="fun-right">
                      <el-button type="primary" @click="editInsured">编辑</el-button>
                      <el-button type="primary" @click="increaceStaff" v-if="type==='inc'">增员</el-button>
                      <el-button type="primary" @click="decreaceStaff" v-else>减员</el-button>
                  </span>
              </div>
              <div class="base-info-con">
                  <el-form label-width="140px" v-if="!isEdit">
                      <el-row>
                        <el-col :span="12"><el-form-item label="姓名：">马大哈</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="工号：">马大哈</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="证件类型：">居民身份证</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="证件号码：">101110198009080922</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="户籍城市：">广东省广州市</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="户口性质：">外阜城镇</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="公司名称：">北京阿拉钉科技有限公司</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="用工性质：">全职</el-form-item></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12"><el-form-item label="入职日期：">2019-01-02</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="离职日期：">--</el-form-item></el-col>
                      </el-row>
                  </el-form>
                <el-form label-width="150px" :model="insuredForm" ref="insuredForms" v-else>
                  <el-row style="display: flex">
                      <div style="flex:1">
                        <el-form-item label="参保方案" prop="plan" :rules="{required: true, message: '参保方案不能为空', trigger: 'blur'}">
                          <el-select v-model="insuredForm.plan" placeholder="请选择参保方案">
                            <el-option v-for="(item,index) in planOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    <div style="flex:1">
                      <el-form-item label="参保城市：" prop="city" :rules="{required: true, message: '参保城市不能为空', trigger: 'blur'}">
                        <el-select v-model="insuredForm.city" placeholder="请选择参保城市">
                           <el-option v-for="(item,index) in cityOption" :label="item.taxSubName" :value="item.taxSubId" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-row>
                  <el-row style="display: flex">
                    <div style="flex:1">
                      <el-form-item label="社保起缴月份" prop="socialStartMonth" :rules="{required: true, message: '请选择社保起缴月份', trigger: 'blur'}">
                          <el-date-picker v-model="insuredForm.socialStartMonth" type="month" placeholder="请选择"></el-date-picker>
                      </el-form-item>
                    </div>
                    <div style="flex:1">
                      <el-form-item label="员工社保基数" prop="socialBase" :rules="{ required: true, message: '请选择员工社保基数', trigger: 'blur'}">
                      <el-input v-model="insuredForm.socialBase"></el-input>
                    </el-form-item>
                    </div>
                  </el-row>
                  <el-row style="display: flex">
                    <div style="flex:1">
                      <el-form-item label="公积金起缴月份" :prop="insuredForm.providentStartMonthType === '2' ? 'providentStartMonth':'providentStartMonthType'"
                                    :rules="{ required: true, message: '请选择公积金起缴月份', trigger: 'blur'}">
                        <el-radio-group v-model="insuredForm.providentStartMonthType" size="small">
                          <el-radio-button label="1">同社保</el-radio-button>
                          <el-radio-button label="2">选择</el-radio-button>
                        </el-radio-group>
                        <span class="provident-month">
                            <el-date-picker v-if="insuredForm.providentStartMonthType==2" v-model="insuredForm.providentStartMonth" type="month" placeholder="请选择"></el-date-picker>
                        </span>
                      </el-form-item>
                    </div>
                    <div style="flex:1">
                      <el-form-item label="员工公积金基数" prop="providentBase"
                                    :rules="{ required: true, message: '员工公积金基数不能为空', trigger: 'blur'}">
                        <el-input v-model="insuredForm.providentBase"></el-input>
                      </el-form-item>
                    </div>
                  </el-row>
                  <el-row style="display: flex">
                    <div style="flex:1">
                        <el-form-item label="社保停缴月份" prop="socialStopMonth"
                                      :rules="{required: true, message: '请选择社保停缴月份', trigger: 'blur'}">
                          <el-date-picker v-model="insuredForm.socialStopMonth" type="month" placeholder="请选择"></el-date-picker>
                        </el-form-item>
                    </div>
                    <div style="flex:1">
                      <el-form-item label="公积金停缴月份" :prop="insuredForm.providentStopMonthType === '2' ? 'providentStopMonth':'providentStopMonthType'"
                                    :rules="{ required: true, message: '请选择公积金停缴月份', trigger: 'blur'}">
                        <el-radio-group v-model="insuredForm.providentStopMonthType" size="small">
                          <el-radio-button label="1">同社保</el-radio-button>
                          <el-radio-button label="2">选择</el-radio-button>
                        </el-radio-group>
                        <span class="provident-month">
                            <el-date-picker v-if="insuredForm.providentStopMonthType==2" v-model="insuredForm.providentStopMonth" type="month" placeholder="请选择"></el-date-picker>
                        </span>
                      </el-form-item>
                    </div>
                  </el-row>
                </el-form>
                <div style="text-align: center;margin:20px 0px;" v-if="isEdit">
                    <el-button type="primary" @click="saveInfo">保存</el-button>
                    <el-button  @click="cancelEdit">取消</el-button>
                </div>
              </div>
              <div class="table-fun">
                <el-button type="primary" @click="showInfo">预扣缴信息</el-button>
              </div>
              <div v-if="showTable">
                <el-table :data="list" border>
                    <el-table-column prop="type" label="险种">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="缴费基数">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人固定金额">
                        <template slot-scope="scope">
                            <div class="number-right"> {{ scope.row.type }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人缴费金额">
                        <template slot-scope="scope">
                            <div class="number-right"> {{ scope.row.type }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="企业缴费比例">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="企业固定金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="企业缴费金额">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="个人企业合计">
                      <template slot-scope="scope">
                        <div class="number-right"> {{ scope.row.type }}</div>
                      </template>
                    </el-table-column>
                </el-table>
              </div>
          </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
import fullScreen from "@/components/full-screen/index";
import { validatePhone } from "@/util/validate";
import { mapState } from "vuex";

export default {
  components: {
    fullScreen
  },
  computed: {
    ...mapState("taxPageStore", {
      personnelCollection: state => state.personnelCollection
    }),
  },
  data() {
    const t = this;
    return {
      list:[{name:'111'},{name:"2222"}],
      isEdit:false,
      insuredForm:{
        plan:"",
        city:"",
        socialStartMonth:"",
        socialBase:"",
        providentStartMonthType:"1",
        providentStartMonth:"",
        providentBase:"",
        socialStopMonth:"",
        providentStopMonthType:"1",
        providentStopMonth:"",
      },
      planOption:[],
      cityOption:[],
      showTable:false,
      type:this.$route.query.type
    };
  },
  mounted() {

  },
  methods: {
    saveInfo() {
      this.$refs['insuredForms'].validate(valid => {
        if(valid){
          console.log("111")
        }
      })
    },
    //编辑社保信息
    editInsured(){
      this.isEdit = true;
      this.showTable = false
    },
    //增员
    increaceStaff(){


    },
    //减员
    decreaceStaff(){

    },
    cancelEdit(){
      this.isEdit = false
    },
    showInfo(){
      this.showTable = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.attrition-detail {
  background: #fff;
  padding-bottom: 30px;
  .attrition-detail-con {
    width: 1100px;
    margin: 0 auto;
    .title {
      display: inline-block;
      margin-top: 30px;
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .base-info-con {
      width: 1000px;
      margin: 0 auto;
    }
    .insured-info{
      .title{
        margin: 0px 0px 10px 0px;
      }
      .fun-right{
        float: right;
      }
    }
    .table-fun{
      margin:0px 0px 20px 0px;
    }

  }
}
</style>
