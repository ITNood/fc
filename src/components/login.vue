<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="otherlogin">
        <img :src="logo">
        <h5>{{$t('message.login')}}</h5>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="loginWay"
        >

          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :placeholder="userMessage+$t('message.username')"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :placeholder="userMessage+$t('message.acoountPwd')"
            ></el-input>
          </el-form-item>

        </el-form>
        <p
          class="forget"
          @click="forgetPwd()"
        >{{$t('message.forget')}}？</p>
        <el-button
          class="submit"
          @click="login1()"
        >{{$t('message.confirm')}}</el-button>
      </div>
    </el-dialog>
    <Forget
      :forgetDialog="forget"
      ref="child"
      :imgSrc="imgLogo"
      :user="account"
    />
  </div>
</template>

<script>
import api from "../API/index";
import Forget from "../components/forget";
export default {
  props: ["logo", "userMessage", "type"],
  name: "Login",
  components: { Forget },
  data() {
    return {
      dialogVisible: false,
      forget: false,
      imgLogo: "",
      account: "",
      isreset:false,
      loginForm: {
        type: "",
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
      }
    };
  },
  methods: {
    open() {
      this.dialogVisible = !this.dialogVisible;
      if (this.isreset == false) {
        return (this.isreset = true);
      } else {
        this.$refs["loginForm"].resetFields();
      }
    },
    forgetPwd() {
      this.$refs.child.close();
      this.dialogVisible = !this.dialogVisible;
      console.log(this.forget);
    },
    login1() {
      let data = this.loginForm;
      api
        .choices("api/login/loginIn", data)
        .then(result => {
          if (result.status == 200) {
            this.$store.commit("setToken", result.res.token);
            this.$router.push("/home/index");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    this.loginForm.type = this.type;
    //console.log(this.type)
    this.imgLogo = this.logo;
    this.account = this.userMessage;
  }
};
</script>

<style scoped>
</style>
