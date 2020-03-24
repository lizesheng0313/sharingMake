<template>
  <div class="homePage">
    <div class="h1">
      <span class="sign" @click="handleToChat">专属客服</span>
      <p>分享赚</p>
      <span class="app" @click="handleToApp">APP</span>
    </div>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="(item,index) in indexObj.banner" :key="index">
        <img :src="item" alt />
      </swiper-slide>
    </swiper>
    <van-notice-bar :text="indexObj.indextext" left-icon="volume-o" class="notice" />
    <van-steps
      :active="indexObj.liucheng_now"
      class="steps"
      active-icon="success"
      active-color="#38f"
    >
      <van-step v-for="(item,index) in indexObj.liucheng" :key="index">{{item}}</van-step>
    </van-steps>
    <div class="task_list">
      <div
        class="task_list_item"
        v-for="(item,index) in indexObj.task"
        :key="index"
        @click="handleToTask(item)"
      >
        <div class="task_list_item_box" :style="{backgroundImage:`url(${item.task_image_url})`}">
          <div class="task_cover">
            <span class="task_type" :class="{active:item.isok === '1'}">{{item.isok_title}}</span>
            <p class="task_title">{{item.task_name}}</p>
            <div class="task_form_box">
              <span class="task_form">{{item.task_tips}}</span>
            </div>
            <div class="task_list_footer">
              <div class="task_list_footer_price">
                <svg class="red_env" aria-hidden="true">
                  <use xlink:href="#iconhongbao" />
                </svg>
                <span>{{item.task_money}}元</span>
              </div>
              <span>
                参加人数
                <i>{{item.task_number_people}}</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tarbar></tarbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
import tarbar from "@/components/basic/Footer";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Toast, NoticeBar, Notify } from "vant";
export default {
  components: { tarbar, swiper, swiperSlide },
  data() {
    return {
      message: "",
      timer: null,
      indexObj: {},
      swiperOption: {
        autoplay: true,
        speed: 1000,
        loop: true
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted() {
    this.fetchIndex();
    clearInterval(this.timer);
    this.fetchNotice();
  },
  methods: {
    fetchNotice() {
      this.$store.dispatch("actionNotify").then(res => {
        if (res.islogin) {
          Notify({
            type: "primary",
            message: res.data.indextext,
            duration: 3000
          });
          this.timer = setTimeout(() => {
            this.fetchNotice();
          }, 30000);
        }
      });
    },
    fetchIndex() {
      Toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0
      });
      this.$store.dispatch("actionIndex").then(res => {
        this.indexObj = res.data;
      });
    },
    handleToChat() {
      this.$router.push("/chat");
    },
    handleToApp() {
      this.$router.push("/app");
    },
    handleToTask(item) {
      this.$router.push({
        path: "/task",
        query: {
          details: JSON.stringify(item)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.homePage {
  padding-top: 50px;
  margin-bottom: 70px;
  padding: 50px 10px 0 10px;
  .notice {
    margin: 10px 0;
  }
  .swiper {
    height: 150px;
    border-radius: 5px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .steps {
    border-radius: 5px;
  }
  .task_list {
    &_item {
      margin-top: 15px;
      &_box {
        height: 130px;
        border-radius: 10px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: left center;
        position: relative;
        .task_cover {
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.8);
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
        }
        .task_list_footer {
          color: #fff;
          padding: 0 10px;
        }
        .task_type {
          background: #8d8c88;
          color: #fff;
          border-radius: 5px;
          padding: 3px 3px;
          display: inline-block;
          margin-top: 10px;
          font-size: 12px;
          margin-left: 10px;
        }
        .active {
          background: $mainColor;
          color: #fff;
        }
        .task_title {
          text-align: center;
          padding: 0 30px;
          margin-top: 5px;
          color: #fff;
          font-size: 14px;
        }
        .task_form_box {
          text-align: center;
          margin-top: 10px;
          .task_form {
            background: #d7d6d8;
            color: #333;
            border-radius: 100px;
            padding: 3px 10px;
            font-size: 12px;
          }
        }
      }
    }
    &_footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      &_price {
        display: flex;
        align-items: center;
        .red_env {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
      i {
        font-style: normal;
        margin-left: 5px;
        color: #ed6c5e;
      }
    }
  }
  .h1 {
    background: #fff;
    font-size: 18px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    z-index: 2;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    .sign {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
    }
    .app {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
    }
  }
}
</style>

