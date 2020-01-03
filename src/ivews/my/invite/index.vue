<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
      <div
        class="login"
        style="margin-top:30px;"
      >
        <div class="otherlogin">
          <el-form
            :model="forgetForm"
            ref="forgetForm"
            class="loginWay"
          >
            <el-form-item
              :label="$t('message.account')"
              prop="username"
            >
              <el-input
                v-model="forgetForm.username"
                :placeholder="$t('message.inviteAccount')"
              ></el-input>
            </el-form-item>

            <el-form-item
              :label="$t('message.code')"
              prop="code"
            >
              <img
                :src="imageCode"
                class="imgCode"
                @click="code"
              >
              <el-input
                :placeholder="$t('message.enterCode')"
                v-model="forgetForm.code"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="mobile"
              :label="$t('message.partnerPhone')"
            >
              <el-input
                v-model="forgetForm.mobile"
                :placeholder="$t('message.phoneNumber')"
                class="phone"
              ></el-input>
              <el-select
                v-model="value"
                class="area"
                @change="select()"
              >
                <el-option
                  v-for="item in items"
                  :label="item.name+ '+' +item.value"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <el-button
            class="submit"
            @click="submit()"
            style="margin-top:80px;"
          >{{$t('message.confirm')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as http from "../../../public/index";
import api from "../../../API/index";
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      imageCode:'',
      msg: this.$t("message.invite"),
      forgetForm: {
        username: "",
        mobile: "",
        country: "",
        code: ""
      },
      items: [],
      value: ""
    };
  },
  created() {
    this.getArea();
    this.forgetForm.country = this.value;
    this.getCode()
  },
  methods: {
    //国家区号
    getArea() {
      api
        .choices(http.COUNTRY)
        .then(result => {
          if (result.status == 200) {
            this.items = this.items.concat(result.res.data);
            this.value = this.items[0].id;
            console.log(this.value);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    select() {
      console.log(this.value);
      this.forgetForm.country = this.value;
    },
    submit() {
      let username = this.forgetForm.username;
      let mobile = this.forgetForm.mobile;
      if (username && mobile) {
        let data = this.forgetForm;
        api.choices(http.INVITE, data).then(result => {
          if (result.status == 200) {
            alert(result.msg);
            this.$router.push("/my/index");
          }else if(result.status==400){
            this.code()
          }
        });
      } else {
        alert(this.$t("message.invitation"));
      }
    },
    getCode(){
      api.choiced('api/code').then(res=>{
        this.imageCode=res.res
      }).catch(err=>{

      })
    },
    //刷新验证码
    code() {
      api.choiced('api/code').then(res=>{
        this.imageCode=res.res
      }).catch(err=>{

      })
    }
  }
};
</script>

<style scoped>
</style>
