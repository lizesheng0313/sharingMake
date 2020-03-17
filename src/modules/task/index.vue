<template>
  <div class="task">
    <top-header title="活动标题"></top-header>
    <div class="task_list">
      <div class="task_list_item" v-for="(item,index) in taskList" :key="index">
        <div class="task_list_item_box">
          <p class="task_title">{{item.title}}</p>
          <p class="task_time">{{item.time}}</p>
        </div>
      </div>
    </div>
    <div class="task_describe">
      <p class="title">活动描述</p>
      <div class="content">
        <p>1、点击去完成活动按钮，打开活动素材页面</p>
        <p>2、复制笔记标题、复制笔记内容、保存笔记 图片，注意首图不要用错；</p>
        <p>3、在小红书APP发布此笔记</p>
        <p>4、回到此页面，上传你的小红书个人主页截图 ，填写你发布的笔记链接；</p>
        <p>5、截图审核通过，即可获得1元奖励。</p>
      </div>
    </div>
    <div class="task_describe task_earnings">
      <p class="title">活动收益</p>
      <div class="earnings_box">
        <div class="earnings flex_dir_center">
          <p>可赚金币</p>
          <span>10000</span>
        </div>
      </div>
    </div>
    <div class="participate flex-space_center">
      <div>
        <img src alt />
        <img src alt />
      </div>
      <span>10人参与</span>
    </div>
    <div class="participate_btn">参与活动</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import topHeader from "@/components/basic/Header";
export default {
  components: {
    topHeader
  },
  data() {
    return {
      taskList: [
        {
          title: "31379-小红书笔记互动-因为以前很小女孩，所我要用这个",
          time: "2018-02-02 ~ 2019-01-02"
        }
      ]
    };
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

