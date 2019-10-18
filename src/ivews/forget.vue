<template>
  <div>
    <Top :title="msg" />
    <div
      id="login"
      style="margin-top:60px;min-height:100%"
    >
      <img
        src="../assets/image/logo.png"
        class="logo"
      >
      <div
        class="login"
        style="margin-top:30px;"
      >
        <div class="otherlogin">
          <el-form
            :model="forgetForm"
            ref="forgetForm"
            :rules="rules"
            class="loginWay"
          >
            <el-form-item prop="username">
              <el-input
                v-model="forgetForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
              <el-input
                v-model="forgetForm.mobile"
                placeholder="手机号码"
              ></el-input>
              <!-- <el-select v-model="value">
                <el-option
                  v-for="item in items"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item prop="mobileCode">
              <el-input
                v-model="forgetForm.mobileCode"
                placeholder="短信验证码"
              ></el-input>
              <el-button
                class="send"
                :disabled="disabled"
                @click="send()"
              >{{text}}{{text2}}</el-button>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="forgetForm.password"
                placeholder="新登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd">
              <el-input
                type="password"
                v-model="forgetForm.confirmPwd"
                placeholder="确认登录密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            class="submit"
            @click="forgetSub('forgetForm')"
          >确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../API/index";
import Top from "../components/top";
export default {
  components: { Top },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.forgetForm.confirmPwd !== "") {
          this.$refs.forgetForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      msg: "忘记密码",
      text: "",
      text2: "发送",
      forgetForm: {
        username: "",
        mobile: "",
        mobileCode: "",
        password: "",
        confirmPwd: ""
      },
      disabled: false,
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        mobileCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur",required:true }],
        confirmPwd: [{ validator: validatePass2, trigger: "blur",required:true }]
      },
      items: [
        { value: "1", label: "中国 +86" },
        { value: "2", label: "中国 +88" }
      ],
      value: "1"
    };
  },
  methods: {
    //发送验证码
    send() {
      api.choices("api/resetPwd/sendPhoneCode", {
          username: this.forgetForm.username,
          mobile: this.forgetForm.mobile
        })
        .then(result => {
          if (result.status == 200) {
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.disabled = true;
              this.text = TIME_COUNT;
              this.text2 = "S重新发送";
              this.timer = setInterval(() => {
                if (this.text > 0 && this.text <= TIME_COUNT) {
                  this.text--;
                } else {
                  this.disabled = false;
                  clearInterval(this.timer);
                  this.timer = null;
                  this.text = "重新发送";
                  this.text2 = "";
                }
              }, 1000);
            }
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    forgetSub(forgetForm) {
      this.$refs[forgetForm].validate(valid => {
        if (valid) {
          let data = this.forgetForm;
          api.choices("api/resetPwd/update", data).then(result=>{
            if(result.status==200){
              alert(result.msg)
              this.$router.push('/')
            }else if(result.status==400){
              alert(result.msg)
            }
          }).catch(err=>{
            console.log(err)
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
