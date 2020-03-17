<template>
  <div class="task-upload">
    <top-header title="上传截图"></top-header>
    <div>
      <p class="tips flex_all_center">参考左边的示例截图，上传你的小红书个人主页截图，截图需要包含刚刚发布的笔记</p>
      <div class="flex-space_center upload_box">
        <div class="upload_image">
          <img src alt />
        </div>
        <div class="upload_image">
          <van-uploader v-model="fileList" multiple :max-count="1">
            <div class="diy_upload">
              <span>点击上传文件</span>
            </div>
          </van-uploader>
        </div>
      </div>
    </div>
    <div class="participate_btn" @click="handleUpload">提交</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import topHeader from "@/components/basic/Header";
import { Toast } from "vant";
export default {
  components: {
    topHeader
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handleUpload() {
      this.$router.push({ path: "/task-upload" });
    }
  }
};
</script>
<style >
.van-uploader__wrapper {
  width: 100%;
  height: 100%;
}
.van-uploader__input-wrapper {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.task-upload {
  .participate_btn {
    margin: 10px 20px 0 10px;
    @include btn_submit;
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
  .tips {
    background: #fff;
    font-size: 12px;
    margin: 0 15px;
    padding: 20px;
    box-sizing: border-box;
    color: #777;
    border-radius: 15px;
  }
  .upload_box {
    margin: 20px 15px 0 15px;
    .upload_image {
      height: 300px;
      width: 48%;
      border-radius: 15px;
      background: rgba(0, 0, 0, 0.4);
    }
    .van-uploader {
      width: 100%;
      height: 100%;
    }
    .diy_upload {
      display: flex;
      justify-content: center;
      align-items: center;
      color:#fff;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

