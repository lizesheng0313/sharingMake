<template>
  <div class="task">
    <top-header title="领取分享素材"></top-header>
    <div class="task_active">
      <div class="flex-space_center">
        <span>分享内容</span>
        <p
          class="btn_copy"
          v-clipboard:copy="detailsObj.task_jop"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制内容</p>
      </div>
      <textarea v-model="detailsObj.task_jop"></textarea>
    </div>
    <div class="task_active">
      <div class="flex-space_center">
        <span>分享图片</span>
        <p class="btn_copy">点击下面图片保存至相册</p>
      </div>
      <img :src="detailsObj.task_image_url" @click="handlePrevview" class="footer_img" alt />
    </div>
    <div
      class="participate_btn"
      @click="handleUpload"
      v-if="statusObj.task_status !== 3 && statusObj.task_status !== 4"
    >我已发布 上传截图</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import topHeader from "@/components/basic/Header";
import { Toast, Dialog, ImagePreview } from "vant";
export default {
  components: {
    topHeader
  },

  data() {
    return {
      show: false,
      detailsObj: {},
      statusObj: {}
    };
  },
  created() {
    this.detailsObj = JSON.parse(this.$route.query.detailsObj);
  },
  activated() {
    this.fetchStatus();
  },
  methods: {
    fetchStatus() {
      this.$store.dispatch("actionTaskstatus").then(res => {
        this.statusObj = res.data;
        if (this.statusObj.message) {
          Dialog.confirm({
            title: "提示",
            message: this.statusObj.message
          }).then(() => {
            this.$router.push("/chat");
          });
        }
      });
    },
    handlePrevview() {
      ImagePreview([this.detailsObj.task_image_url]);
    },
    handleUpload() {
      this.$router.push({
        path: "/task-upload",
        query: { detailsObj: JSON.stringify(this.detailsObj) }
      });
    },
    onCopy() {
      Toast.success("成功复制");
    },
    onError() {
      Toast.fail("复制失败，请重新复制");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.task {
  padding-bottom: 80px;
  .footer_img {
    margin: 10px auto 0 auto;
    display: block;
    max-width: 100%;
  }
  .task_active {
    padding: 0 10px;
    margin-top: 10px;
    font-size: 14px;
    .btn_copy {
      min-width: 100px;
      padding: 0 10px;
      height: 30px;
      color: #fff;
      border-radius: 8px;
      background: $mainColor;
      display: flex;
      font-size: 13px;
      align-items: center;
      justify-content: center;
    }
    input {
      margin-top: 15px;
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      padding-left: 15px;
      font-size: 12px;
      color: #777;
    }
    textarea {
      margin-top: 15px;
      font-size: 13px;
      width: 100%;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #eee;
      min-height: 120px;
    }
  }
  .participate_btn {
    margin: 10px 20px 0 10px;
    @include btn_submit;
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
  .participate {
    height: 30px;
    background: #fff;
    margin-top: 10px;
    padding: 0 20px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .task_list {
    &_item {
      &_box {
        height: 150px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.7);
        .task_title {
          text-align: center;
          padding: 35px 30px 0 30px;
          color: #fff;
          font-size: 15px;
        }
        .task_time {
          padding-top: 10px;
          text-align: center;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
  .task_describe {
    background: #fff;
    .title {
      text-align: center;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 10px 20px;
      font-size: 12px;
      line-height: 28px;
    }
  }
  .task_earnings {
    margin-top: 10px;
    .earnings_box {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      padding-bottom: 50px;
    }
    .earnings {
      width: 200px;
      outline-offset: -8px;
      height: 80px;
      border: 1px solid $mainColor;
      outline: 1px dotted $mainColor;
      p {
        color: #777;
        font-size: 12px;
      }
      span {
        color: $mainColor;
        font-weight: bold;
        padding-top: 5px;
      }
    }
  }
}
</style>

