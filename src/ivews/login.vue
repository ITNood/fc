<template>
  <div id="login">
    <img
      src="../assets/image/logo.png"
      class="logo"
    >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      class="loginForm"
    >
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名"
        ></el-input>
        <i class="icon iconfont icon-user"></i>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="账号密码"
        ></el-input>
        <i class="icon iconfont icon-password"></i>
      </el-form-item>
    </el-form>
    <p
      class="forget"
      style="text-align:right"
    >忘记密码？</p>
    <el-button
      class="submit"
      @click="login()"
    >登录</el-button>
    <div class="otherLoginWay">
      <el-divider class="otherTitle">其他登录方式</el-divider>
      <ul class="loginList">
        <li @click="openCtc()">
          <span><img src="../assets/image/ctc.png"></span>
          <p>CTC</p>
        </li>
        <li @click="openFc()">
          <span><img src="../assets/image/fc.png"></span>
          <p>FC</p>
        </li>
        <li @click="openRtl()">
          <span><img src="../assets/image/rtl.png"></span>
          <p>RTL</p>
        </li>
        <li @click="openSyl()">
          <span><img src="../assets/image/syl.png"></span>
          <p>SYL</p>
        </li>
      </ul>
    </div>
    <Login
      :dialogVisible="show"
      :logo="imgSrc"
      :userMessage="userMsg"
      :passwordMessage="pwdMsg"
      :type="openType"
      ref="child"
    />
  </div>
</template>

<script>
import Login from "../components/login";
export default {
  components: { Login },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      show: false,
      imgSrc: "",
      userMsg: "",
      pwdMsg: "",
      openType:''
    };
  },
  methods: {
    login() {},
    openCtc() {
      this.$refs.child.open();
      this.imgSrc = require("../assets/image/ctclogo.png");
      this.userMsg = "CTC";
      this.pwdMsg = "CTC";
      this.openType=1
    },
    openFc() {
      this.$refs.child.open();
      this.imgSrc=require('../assets/image/fclogo.png')
      this.userMsg = "FC";
      this.pwdMsg = "FC";
      this.openType=2
    },
    openRtl() {
      this.$refs.child.open();
      this.imgSrc = require("../assets/image/rtllogo.png");
      this.userMsg = "RTL";
      this.pwdMsg = "RTL";
      this.openType=3
    },
    openSyl() {
      this.$refs.child.open();
      this.imgSrc = require("../assets/image/syllogo.png");
      this.userMsg = "SYL";
      this.pwdMsg = "SYL";
      this.openType=4
    }
  }
};
</script>

<style scoped>
</style>
