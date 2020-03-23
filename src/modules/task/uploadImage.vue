<template>
  <div class="task-upload">
    <top-header title="上传截图"></top-header>
    <div>
      <p class="tips flex_all_center" v-html="detailsObj.shili_title"></p>
      <div class="flex-space_center upload_box">
        <div :style="{backgroundImage:`url(${detailsObj.shili_img[0]})`}" class="upload_image zsy">
          <div class="cover"></div>
        </div>
        <div class="upload_image cover1">
          <van-uploader v-model="fileList1" :max-count="1" :after-read="afterRead">
            <div class="diy_upload">
              <span>点击上传文件</span>
            </div>
          </van-uploader>
        </div>
      </div>
      <div class="flex-space_center upload_box">
        <div :style="{backgroundImage:`url(${detailsObj.shili_img[1]})`}" class="upload_image zsy">
          <div class="cover"></div>
        </div>
        <div class="upload_image cover1">
          <van-uploader v-model="fileList2" :max-count="1" :after-read="afterRead">
            <div class="diy_upload">
              <span>点击上传文件</span>
            </div>
          </van-uploader>
        </div>
      </div>
      <div class="flex-space_center upload_box">
        <div :style="{backgroundImage:`url(${detailsObj.shili_img[2]})`}" class="upload_image zsy">
          <div class="cover"></div>
        </div>
        <div class="upload_image cover1">
          <van-uploader v-model="fileList3" :max-count="1" :after-read="afterRead">
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
      fileList1: [],
      fileList2: [],
      fileList3: [],
      detailsObj: {}
    };
  },
  created() {
    this.detailsObj = JSON.parse(this.$route.query.detailsObj);
  },
  methods: {
    afterRead(e) {
      this.$store.dispatch("actionUploader",e)
    },
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
.van-uploader__preview {
  position: relative;
  margin: 0;
  width: 100%;
}
.van-uploader__preview-image {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
}
</style>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.task-upload {
  padding-bottom: 100px;
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
  .zsy {
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: left center;
  }
  .upload_box {
    margin: 20px 15px 0 15px;
    .upload_image {
      height: 300px;
      width: 48%;
      border-radius: 15px;
      position: relative;
    }
    .cover1 {
      background: rgba(0, 0, 0, 0.4);
    }
    .cover {
      border-radius: 15px;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
    }
    .van-uploader {
      width: 100%;
      height: 100%;
    }
    .diy_upload {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

