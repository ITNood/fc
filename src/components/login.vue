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
        <h5>登录</h5>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="loginWay"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :placeholder="userMessage+'用户名'"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :placeholder="userMessage+'账号密码'"
            ></el-input>
          </el-form-item>
        </el-form>
        <p
          class="forget"
          @click="forgetPwd()"
        >忘记密码？</p>
        <el-button
          class="submit"
          @click="login1()"
        >登录</el-button>
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
      account:'',
      //img:""
      loginForm: {
        type: "",
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入登录密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    open() {
      this.dialogVisible = !this.dialogVisible;
    },
    forgetPwd() {
      this.$refs.child.close();
      this.dialogVisible = !this.dialogVisible;
      console.log(this.forget);
    }
  },
  updated() {
    //重置表单
    this.$refs["loginForm"].resetFields();
    this.loginForm.type = this.type;
    console.log(this.type)
    this.imgLogo = this.logo;
    this.account=this.userMessage
  }
};
</script>

<style scoped>
</style>
