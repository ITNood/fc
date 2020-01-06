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
                :placeholder="$t('message.entryAccount')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
              <el-input
                v-model="forgetForm.mobile"
                :placeholder="$t('message.phone')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="mobileCode">
              <el-input
                v-model="forgetForm.mobileCode"
                :placeholder="$t('message.smsCode')"
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
                :placeholder="$t('message.entryNewPwd')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd">
              <el-input
                type="password"
                v-model="forgetForm.confirmPwd"
                :placeholder="$t('message.entryconfirmLgoinPwd')"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            class="submit"
            @click="forgetSub('forgetForm')"
          >{{$t('message.confirm')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as http from "../public/index";
import api from "../API/index";
import Top from "../components/top";
export default {
  components: { Top },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("message.entryNewPwd")));
      } else {
        if (this.forgetForm.confirmPwd !== "") {
          this.$refs.forgetForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("message.againPwd")));
      } else if (value !== this.forgetForm.password) {
        callback(new Error(this.$t("message.match")));
      } else {
        callback();
      }
    };
    return {
      msg: this.$t("message.forget"),
      text: "",
      text2: this.$t("message.send"),
      forgetForm: {},
      disabled: false,
      rules: {
        username: [
          {
            required: true,
            message: this.$t("message.entryAccount"),
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: this.$t("message.phone"), trigger: "blur" }
        ],
        mobileCode: [
          {
            required: true,
            message: this.$t("message.smsCode"),
            trigger: "blur"
          }
        ],
        password: [
          { validator: validatePass, trigger: "blur", required: true }
        ],
        confirmPwd: [
          { validator: validatePass2, trigger: "blur", required: true }
        ]
      }
    };
  },
  methods: {
    //发送验证码
    send() {
      api
        .choices(http.FORGETCODE, {
          username: this.forgetForm.username,
          mobile: this.forgetForm.mobile
        })
        .then(result => {
          if (result.status == 200) {
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.disabled = true;
              this.text = TIME_COUNT;
              this.text2 = "S" + this.$t("message.resend");
              this.timer = setInterval(() => {
                if (this.text > 0 && this.text <= TIME_COUNT) {
                  this.text--;
                } else {
                  this.disabled = false;
                  clearInterval(this.timer);
                  this.timer = null;
                  this.text = this.$t("message.resend");
                  this.text2 = "";
                }
              }, 1000);
            }
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
          api
            .choices(http.FORGET, data)
            .then(result => {
              if (result.status == 200) {
                alert(result.msg);
                this.$router.push("/");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
