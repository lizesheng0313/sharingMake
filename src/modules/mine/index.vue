<template>
  <div class="mine">
    <div class="back_top">
      <p class="iconxiaoxi iconfont"></p>
      <div class="flex-space_center mine_header">
        <div class="flex-start_center">
          <img src="../../assets/images/headimg.jpg" alt class="head_img" />
          <div>
            <span>{{indexObj.userinfo.tel}}</span>
            <p>邀请码：{{indexObj.userinfo.yqm}}</p>
          </div>
        </div>
        <!-- <div class="flex-start_center">
          <div class="flex_dir_end">
            <span>0</span>
            <p>可提现金币</p>
          </div>
          <span class="iconfont iconyou"></span>
        </div>-->
      </div>
    </div>
    <div class="my-task">
      <van-steps direction="vertical" :active="activeNum" active-color="#38f">
        <van-step v-for="(item,index) in step" :key="index">
          <h3>{{item}}</h3>
        </van-step>
      </van-steps>
      <!-- <div class="flex-space_center title">
        <strong>我的任务</strong>
        <span class="flex-start_center">
          查看全部
          <span class="iconfont iconyou"></span>
        </span>
      </div>
      <div class="flex-around_center task_list">
        <router-link
          :to="item.url"
          tag="div"
          class="flex_dir_center"
          v-for="(item,index) in taskList"
          :key="index"
        >
          <span class="iconfont" :class="item.icon"></span>
          <span>{{item.title}}</span>
        </router-link>
      </div>-->
    </div>
    <tarbar></tarbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
import tarbar from "@/components/basic/Footer";
export default {
  components: { tarbar },
  data() {
    return {
      step: [],
      activeNum: 0
      // taskList: [
      //   { title: "待传图", icon: "iconshangchuantupian", num: 1, url: "" },
      //   { title: "图被拒绝", icon: "iconnavicon-dhjsd", num: 1, url: "" },
      //   { title: "审核中", icon: "iconshenhe", num: 1, url: "" },
      //   { title: "已完成", icon: "iconyiwancheng", num: 1, url: "" }
      // ]
    };
  },
  computed: {
    ...mapState({
      indexObj: "indexObj"
    })
  },
  mounted() {
    this.fetchStep();
  },
  methods: {
    fetchStep() {
      this.$store.dispatch("actionSteps").then(res => {
        this.step = res.data.liucheng;
        this.activeNum = res.data.liucheng_now;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.mine {
  margin-bottom: 70px;
  .back_top {
    background: url("../../assets/images/mine_back.png") no-repeat center center;
    position: relative;
    color: #fff;
    align-items: center;
    box-shadow: 0 0 36px 0 #e9e9ea;
  }
  .iconxiaoxi {
    font-size: 28px;
    text-align: right;
    padding-top: 10px;
    margin-right: 10px;
  }
  .mine_header {
    padding: 10px 10px 30px 10px;
    .head_img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 100px;
      display: inline-block;
    }
    .iconyou {
      margin-left: 5px;
      font-size: 20px;
    }
  }
  .my-task {
    padding: 10px 0;
    margin-top: 20px;
    background: #fff;
    // border-radius: 12px;
    // .title {
    //   padding-left: 15px;
    //   padding-right: 5px;
    // }
    // .task_list {
    //   margin-top: 20px;
    //   .iconfont {
    //     font-size: 25px;
    //   }
    // }
  }
}
</style>

