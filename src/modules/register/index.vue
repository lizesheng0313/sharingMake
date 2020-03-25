<template>
  <div class="register">
    <div class="header">
      <span v-if="isLogin" @click="handleToHome">首页</span>
      <span class="iconfont iconyou" v-if="!isLogin" @click="handleToLogin"></span>
      <p>{{title}}</p>
      <i v-if="rightTitle" class="right_title" @click="handleToRegister">{{rightTitle}}</i>
    </div>
    <img src="../../assets/images/headimg.jpg" class="login-logo" />
    <div v-if="isLogin">
      <div class="login-input">
        <input class="pas" type="text" placeholder="请输入手机号" v-model="ruleForm.tel" maxlength="11" />
      </div>
      <div class="login-input">
        <input
          type="password"
          placeholder="请输入密码"
          v-model="ruleForm.password"
          maxlength="20"
          class="pas"
        />
      </div>
      <div class="flex-space_center">
        <van-checkbox v-model="checked" shape="square" class="remember_password">记住密码</van-checkbox>
        <p class="forget_pas" @click="handleToChat">忘记密码</p>
      </div>
      <div class="login-button" @click="handleFetchLogin">登录</div>
    </div>
    <div v-else>
      <div class="login-input">
        <input class="pas" type="text" placeholder="请输入手机号" v-model="ruleForm.tel" maxlength="11" />
      </div>
      <div class="login-input">
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="ruleForm.yzm"
          maxlength="6"
          class="input-basis pas"
        />
        <button class="login-getcode" @click="handleCheckUser" :disabled="isGetCode">
          <span>{{countDown}}</span>
        </button>
      </div>
      <div class="login-input">
        <input
          type="password"
          placeholder="6-20位数字、字母或符号两种组合"
          v-model="ruleForm.password"
          maxlength="20"
          class="pas"
        />
      </div>
      <div class="login-input">
        <input type="text" placeholder="请输入邀请码" v-model="ruleForm.yqm" class="pas" />
      </div>
      <div class="login-button" @click="handleFetchRegister">注册</div>
    </div>
  </div>
</template>
<script>
import { Checkbox, Toast } from "vant";
export default {
  data() {
    return {
      checked: true,
      rightTitle: "注册",
      title: "登录",
      isLogin: true,
      ruleForm: {
        tel: "",
        password: "",
        yqm: "",
        yzm: ""
      },
      countDown: "获取验证码",
      timmer: null,
      isGetCode: false
    };
  },
  mounted() {
    this.ruleForm.tel = localStorage.getItem("fx_tel");
    this.ruleForm.password = localStorage.getItem("fx_pas");
    if (this.$route.query.yqm) {
      this.ruleForm.yqm = this.$route.query.yqm;
      this.handleToRegister();
    }
  },
  methods: {
    handleToChat() {
      this.$router.push("/chat");
    },
    handleToHome() {
      this.$router.push("/home");
    },
    handleFetchLogin() {
      this.$store.dispatch("actionLogin").then(res => {
        if (res.success) {
          if (this.checked) {
            localStorage.setItem("fx_tel", this.ruleForm.tel);
            localStorage.setItem("fx_pas", this.ruleForm.password);
          } else {
            localStorage.clear();
          }
          this.$router.push("/");
        }
      });
    },
    handleFetchRegister() {
      this.$store.dispatch("actionRegister", this.ruleForm).then(res => {
        if (res.success) {
          this.handleToLogin(true);
        }
      });
    },
    handleToLogin(flag) {
      if (!flag) {
        this.ruleForm.tel = localStorage.getItem("fx_tel");
        this.ruleForm.password = localStorage.getItem("fx_pas");
      }
      this.isLogin = true;
      this.rightTitle = "注册";
      this.title = "登录";
    },
    handleToRegister() {
      this.ruleForm.tel = "";
      this.ruleForm.password = "";
      this.ruleForm.yzm = "";
      this.isLogin = false;
      this.rightTitle = "";
      this.title = "注册";
    },
    handleCheckUser() {
      if (this.ruleForm.tel) {
        Toast.loading({
          message: "发送中"
        });
        this.$store
          .dispatch("actionGetCode", {
            tel: this.ruleForm.tel
          })
          .then(res => {
            if (res.success) {
              clearInterval(this.timmer);
              Toast("已发送验证码，请注意查收");
              this.isGetCode = true;
              let second = 60;
              this.timmer = setInterval(() => {
                this.countDown = --second + "秒后重新发送";
                if (second < 0) {
                  clearInterval(this.timmer);
                  this.countDown = "获取验证码";
                  this.isGetCode = false;
                }
              }, 1000);
            }
          });
      }
    }
  }
};
</script>
<style>
button {
  border: none;
  outline: none;
}
</style>
<style lang="scss" scoped>
@import "../../assets/scss/helpers.scss";
.register {
  background: #fff;
  min-height: 100vh;
  .forget_pas {
    color: #2d78ed;
  }
  .flex-space_center {
    margin: 0 30px;
  }
  .remember_password {
  }
  .footer_tips {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  label {
    color: #333;
    padding: 0 10px 0 11px;
    display: inline-block;
    width: 20%;
    font-size: 15px;
  }
  .login-logo {
    width: 71px;
    height: 71px;
    margin: 0 auto;
    display: block;
    margin-bottom: 35.5px;
  }
  .login-button {
    @include btn_submit;
    margin: 50px 28px 0 28px;
  }
  .login-input {
    display: flex;
    margin: 0 27.5px 20px 27.5px;
    height: 45px;
    border-radius: 22.5px;
    background: #f5f5f5;
    line-height: 45px;
    position: relative;
    input {
      height: 100%;
      color: #303030;
      font-size: 14px;
      flex-grow: 1;
      padding-right: 20px;
    }
  }
  .input-basis {
    width: 100px;
  }
  .login-logo {
    height: 79.5px;
    width: auto;
    width: 97.5px;
    display: block;
    margin: 35px auto;
  }
  .login-input {
    display: flex;
    margin: 0 27.5px 20px 27.5px;
    height: 45px;
    border-radius: 22.5px;
    background: #f5f5f5;
    line-height: 45px;
    position: relative;
    .pas {
      padding-left: 30px;
    }
    .iconfont {
      color: #969699;
      width: 35px;
      display: inline-block;
      text-align: center;
    }
    input {
      height: 100%;
      color: #303030;
      font-size: 15px;
    }
    .login-getcode {
      position: absolute;
      right: 19.5px;
      top: 0;
      z-index: 2;
      color: $mainColor;
      font-size: 13px;
      background: none;
      span {
        border-left: 1px solid #c1c1c1;
        padding-left: 12.5px;
      }
    }
    .iconfont_right {
      right: 120px;
      z-index: 999;
    }
    .login-remember {
      position: absolute;
      right: 10px;
      top: 0;
      z-index: 999;
    }
  }
  .header {
    height: 40px;
    text-align: center;
    position: relative;
    line-height: 40px;
    font-size: 18px;
    span {
      position: absolute;
      left: 15px;
      transform: translateY(-50%);
      top: 50%;
      font-size: 14px;
    }
    .iconfont {
      transform: translateY(-50%) rotate(180deg);
    }
    .right_title {
      font-style: normal;
      font-size: 14px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

