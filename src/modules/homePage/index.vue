<template>
  <div class="homePage">
    <div class="h1">
      <span class="sign">专属客户</span>
      <p>分享赚</p>
      <span class="app">APP</span>
    </div>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="(item,index) in banner_list" :key="index">
        <img :src="item.url" alt />
      </swiper-slide>
    </swiper>
    <van-steps :active="active" class="steps">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <div class="task_list">
      <div class="task_list_item" v-for="(item,index) in taskList" :key="index">
        <div class="task_list_item_box">
          <span class="task_type">{{item.type}}</span>
          <p class="task_title">{{item.title}}</p>
          <div class="task_form_box">
            <span class="task_form">{{item.form}}</span>
          </div>
        </div>
        <div class="task_list_footer">
          <div class="task_list_footer_price">
            <svg class="red_env" aria-hidden="true">
              <use xlink:href="#iconhongbao" />
            </svg>
            <span>{{item.price}}金币</span>
          </div>
          <span>
            剩余数量
            <i>{{item.num}}</i>
          </span>
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
export default {
  components: { tarbar, swiper, swiperSlide },
  data() {
    return {
      active: 1,
      banner_list: [
        { url: require("../../assets/images/b1.jpg") },
        { url: require("../../assets/images/b1.jpg") }
      ],
      taskList: [
        {
          type: "已错失",
          title: "31379-小红书笔记互动-因为以前很小女孩，所我要用这个",
          form: "文章互动任务",
          price: "150",
          num: 2
        },{
          type: "已错失",
          title: "31379-小红书笔记互动-因为以前很小女孩，所我要用这个",
          form: "文章互动任务",
          price: "150",
          num: 2
        },
      ],
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
  created() {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.homePage {
  padding-top: 50px;
  margin-bottom: 70px;
  padding: 50px 10px 0 10px;
  .swiper {
    height: 100px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .steps {
    border-radius: 5px;
  }
  .task_list {
    &_item {
      margin-top: 15px;
      &_box {
        height: 150px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.7);
        .task_type {
          background: #8d8c88;
          color: #fff;
          border-radius: 5px;
          padding: 3px 3px;
          display: inline-block;
          margin-top: 10px;
          margin-left: 10px;
        }
        .task_title {
          text-align: center;
          padding: 0 30px;
          margin-top: 5px;
          color: #fff;
          font-size: 15px;
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
    z-index:2;
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

