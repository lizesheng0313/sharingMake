<template>
  <div class="task">
    <top-header title="任务详情"></top-header>
    <!-- <div class="task_list">
      <div class="task_list_item">
        <div class="task_list_item_box">
          <div class="task_cover">
            <p class="task_title">{{detailsObj.task_tips}}</p>
          </div>
        </div>
      </div>
    </div> -->
    <div class="task_describe">
      <!-- <p class="title">任务描述</p> -->
      <div class="content">
        <p v-html="detailsObj.task_description"></p>
      </div>
    </div>
    <div class="task_describe task_earnings">
      <div class="earnings_box">
        <div class="earnings flex_dir_center">
          <p>可赚金额</p>
          <span>{{detailsObj.task_money}}元</span>
        </div>
      </div>
    </div>
    <div class="participate flex-space_center">
      <div class="head_img_list">
        <img :src="item" alt v-for="(item,index) in headImgList" :key="index" />
      </div>
      <span>{{detailsObj.task_number_people}}人参与</span>
    </div>
    <div class="participate_btn" @click="handleToActive">参与活动</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import topHeader from "@/components/basic/Header";
export default {
  components: {
    topHeader
  },
  mounted() {
    this.detailsObj = JSON.parse(this.$route.query.details);
    let arr = [];
    let num = 0;
    for (let i = 0; i < 9; i++) {
      num = Math.floor(Math.random() * 24) + 1;
      arr.push(require("@/assets/images/headimg/" + num + ".jpg"));
    }
    this.headImgList = new Set(arr);
  },
  data() {
    return {
      detailsObj: {},
      headImgList: []
    };
  },
  methods: {
    handleToActive() {
      this.$router.push({
        path: "/task-details",
        query: {
          detailsObj: JSON.stringify(this.detailsObj)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.task {
  padding-bottom: 80px;

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
  .head_img_list {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-left: 3px;
      border-radius: 100px;
    }
  }
  .task_list {
    &_item {
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
      padding: 30px 0;
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

