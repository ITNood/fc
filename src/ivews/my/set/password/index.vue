<template>
  <div>
    <Top :title="msg" />
    <div
      id="login"
      style="margin-top:60px;min-height:100%;padding:0;"
    >
      <div class="login">
        <div class="otherlogin">
          <el-form
            :model="forgetForm"
            ref="forgetForm"
            :rules="rules"
            class="loginWay"
          >
            <el-form-item
              prop="oldPwd"
              label="原登录密码"
            >
              <el-input
                v-model="forgetForm.oldPwd"
                type="password"
                placeholder="请输入原登录密码"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="pwd"
              label="新登录密码"
            >
              <el-input
                type="password"
                v-model="forgetForm.pwd"
                placeholder="请输入新登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="confirmPwd"
              label="确认新登录密码"
            >
              <el-input
                type="password"
                v-model="forgetForm.confirmPwd"
                placeholder="请确认新登录密码"
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
import api from "../../../../API/index";
import Top from "../../../../components/top";
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
      } else if (value !== this.forgetForm.pwd) {
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
        oldPwd: "",
        pwd: "",
        confirmPwd: ""
      },
      disabled: false,
      rules: {
        oldPwd : [
          { required: true, message: "请输入原登录密码", trigger: "blur" }
        ],
        pwd: [{ validator: validatePass, trigger: "blur",required:true }],
        confirmPwd: [{ validator: validatePass2, trigger: "blur",required:true }]
      },
    };
  },
  methods: {
    forgetSub(forgetForm) {
      this.$refs[forgetForm].validate(valid => {
        if (valid) {
          let data = this.forgetForm;
          api
            .choices("api/safeSet/changPwd", data)
            .then(result => {
              if (result.status == 200) {
                alert(result.msg);
                this.$router.push("/my/index");
              } else if (result.status == 400) {
                alert(result.msg);
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
