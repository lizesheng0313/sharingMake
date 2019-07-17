<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShowIncrease"
      width="600px"
      center
      class="diy-el_dialog"
    >
      <div>
        <p class="headings">1、选择导入匹配方式</p>
        <div class="diy-el_radio">
          <el-radio-group v-model="type">
            <div v-for="item in radioList" :key="item.label">
              {{item.label}}
              <el-radio :label="item.label">{{item.title}}</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="select-file">
        <el-upload
          class="avatar-uploader"
          :action="apiCheck"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeAvatarUpload"
          :on-success="handleSuccess"
          :data="parameterData"
        >
          <span class="headings">2、</span>
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <div v-show="uuid" style="margin:15px 0 0 28px">
          <span v-if="failCount === 0">
            <i class="el-icon-success"></i>全部导入成功
          </span>
          <span v-if="failCount !== 0 && successCount !==0">
            <i class="el-icon-warning"></i>数据部分校验通过，有
            <strong style="color:red">{{failCount}}</strong>条数据错误
          </span>
          <span v-if="successCount === 0">数据全部未通过校验</span>
          <span>
            <a :href="apiDownloadLog+uuid">下载日志</a>
          </span>
        </div>
        <p>
          支持xlsx和xls文件，文件不超过5M，建议使用标准模板格式
          <span>
            <a :href="apiDownloadTemplate">下载模板</a>
          </span>
        </p>
        <p class="instructions">说明：导入模板中空单元格薪资项，导入后不覆盖系统中对应薪资</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadFile">导入通过数据</el-button>
        <el-button @click="isShowIncrease = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="isShowIncreaseFinish" width="500px" center class="importFinishDialog">
      <div class="title">
        <i class="el-icon-success"></i>导入完成
      </div>
      <div>
        导入成功
        <span style="color:#06B806">{{importFinishForm.successCount}}</span>条数据,
        <span style="color:red">{{importFinishForm.failCount}}</span>条数据导入未通过，忽略导入
      </div>
      <div>
        <a :href="apiDownloadLog+uuid">下载日志</a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="importMemberFinish">确定</el-button>
        <el-button @click="isShowIncreaseFinish = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    radioList: Array,
    isShowIncrease: Boolean, //显示or隐藏
    apiCheck: String, //校验接口
    apiDownloadLog: String, //下载日志接口
    apiDownloadTemplate: String, //下载模板
    parameterData: Object, //校验参数
    impoartAction: String, //导入通过数据接口  需为action
    title: String //标题
  },
  data() {
    return {
      type: 1,
      importFinishForm: {
        failCount: "",
        successCount: ""
      },
      isShowIncreaseFinish: false,
      failCount: "",
      fileList: [],
      successCount: "",
      uuid: ""
    };
  },
  methods: {
    uploadFile() {
      this.$store
        .impoartAction(this.impoartAction, {
          uuid: this.uuid,
          id: this.userForm.checkId
        })
        .then(res => {
          if (res.code === "0000") {
            let importData = res.data;
            this.importFinishForm.failCount = importData.failCount;
            this.importFinishForm.successCount = importData.successCount;
            this.isShowIncrease = false;
            this.isShowIncreaseFinish = true;
          }
        });
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isxls = testmsg === "xls" || testmsg === "xlsx";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isxls) {
        this.$message({
          message: "上传文件类型只能是 xls,xlsx 格式!",
          type: "warning"
        });
        this.fileList = [];
      }
      if (!isLt5M) {
        this.$message({
          message: "上传文件大小不能超过 5MB!",
          type: "warning"
        });
        this.fileList = [];
      }
      return isxls && isLt5M;
    },
    handleSuccess(res, file) {
      let data = res.data;
      this.successCount = data.successCount;
      this.failCount = data.failCount;
      this.uuid = data.uuid;
    },
    importMemberFinish() {
      this.$emit("loading");
    }
  }
};
</script>
<style>
</style>
