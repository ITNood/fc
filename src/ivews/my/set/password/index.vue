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
              :label="$t('message.oldPwd')"
            >
              <el-input
                v-model="forgetForm.oldPwd"
                type="password"
                :placeholder="$t('message.entryOldPwd')"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="pwd"
              :label="$t('message.newPwd')"
            >
              <el-input
                type="password"
                v-model="forgetForm.pwd"
                :placeholder="$t('message.entryNewPwd')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="confirmPwd"
              :label="$t('message.confirmLoginPwd')"
            >
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
import * as http from '../../../../public/index'
import api from "../../../../API/index";
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('message.entryNewPwd')));
      } else {
        if (this.forgetForm.confirmPwd !== "") {
          this.$refs.forgetForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('message.againPwd')));
      } else if (value !== this.forgetForm.pwd) {
        callback(new Error(this.$t('message.match')));
      } else {
        callback();
      }
    };
    return {
      msg: this.$t('message.loginPwd'),
      text: "",
      text2: this.$t('message.send'),
      forgetForm: {
        oldPwd: "",
        pwd: "",
        confirmPwd: ""
      },
      disabled: false,
      rules: {
        oldPwd : [
          { required: true, message: this.$t('message.entryOldPwd'), trigger: "blur" }
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
            .choices(http.LOGINPASSWORD, data)
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
