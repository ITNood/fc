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
          :placeholder="$t('message.username')"
        ></el-input>
        <i class="icon iconfont icon-user"></i>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          :placeholder="$t('message.acoountPwd')"
        ></el-input>
        <i class="icon iconfont icon-password"></i>
      </el-form-item>
    </el-form>
    <router-link
      to="/forget"
      class="forget"
      style="text-align:right;display:block"
    >{{$t('message.forget')}}？</router-link>
    <el-button
      class="submit"
      @click="login('form')"
    >{{$t('message.login')}}</el-button>
    <div class="otherLoginWay">
      <el-divider class="otherTitle">{{$t('message.otherLogin')}}</el-divider>
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
      :logo="imgSrc"
      :userMessage="userMsg"
      :type="openType"
      ref="child"
    />
  </div>
</template>

<script>
import * as http from "../public/index";
import api from "../API/index";
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
          {
            required: true,
            message: this.$t("message.entryAccount"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("message.pleasePwd"),
            trigger: "blur"
          }
        ]
      },
      imgSrc: "",
      userMsg: "",
      openType: ""
    };
  },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/home/index");
    }
  },
  methods: {
    login(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let data = this.form;
          api
            .choices(http.LOGIN, data)
            .then(result => {
              if (result.status == 200) {
                localStorage.setItem("token", result.res.token);
                this.$router.push("/home/index");
              } else if (result.status == 400) {
                alert(result.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    openCtc() {
      this.$refs.child.open();
      this.imgSrc = require("../assets/image/ctclogo.png");
      this.userMsg = "CTC";
      this.openType = 1;
    },
    openFc() {
      this.$refs.child.open();
      this.imgSrc = require("../assets/image/fclogo.png");
      this.userMsg = "FC";
      this.openType = 2;
    },
    openRtl() {
      this.$refs.child.open();
      this.imgSrc = require("../assets/image/rtllogo.png");
      this.userMsg = "RTL";
      this.openType = 3;
    },
    openSyl() {
      this.$refs.child.open();
      this.imgSrc = require("../assets/image/syllogo.png");
      this.userMsg = "SYL";
      this.openType = 4;
    }
  }
};
</script>

<style scoped>
</style>
