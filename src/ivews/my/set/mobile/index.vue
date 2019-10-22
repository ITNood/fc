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
            :rules="rules"
            class="loginWay"
          >
            <el-form-item
              :label="$t('message.currentMobile')"
              prop="mobile"
            >
              <el-input
                v-model="forgetForm.mobile"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="oldCode"
              :label="$t('message.messageCode')"
            >
              <el-input
                v-model="forgetForm.oldCode"
                :placeholder="$t('message.smsCode')"
              ></el-input>
              <el-button
                class="send"
                :disabled="disabled"
                @click="send()"
              >{{text}}{{text2}}</el-button>
            </el-form-item>
            <el-form-item
              prop="newMobile"
              :label="$t('message.newMobile')"
            >
              <el-input
                v-model="forgetForm.newMobile"
                :placeholder="$t('message.entryMobile')"
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
            <el-form-item
              prop="newCode"
              :label="$t('message.messageCode')"
            >
              <el-input
                v-model="forgetForm.newCode"
                :placeholder="$t('message.smsCode')"
              ></el-input>
              <el-button
                class="send"
                :disabled="disabled2"
                @click="newsend()"
              >{{newtext}}{{newtext2}}</el-button>
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
import api from "../../../../API/index";
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t('message.mobile'),
      disabled: false,
      disabled2: false,
      text: "",
      text2: this.$t('message.send'),
      newtext: "",
      newtext2: this.$t('message.send'),
      forgetForm: {
        mobile: "",
        oldCode: "",
        newMobile: "",
        newCode: "",
        country: ""
      },
      rules: {},
      items: [],
      value: ""
    };
  },
  created() {
    this.getMobile();
    this.getArea()
    this.forgetForm.country = this.value;
  },
  methods: {
    //国家区号
    getArea(){
      api.choices('api/getCountryRegion').then(result=>{
        if(result.status==200){
          this.items=this.items.concat(result.res.data)
          this.value=this.items[0].id
          console.log(this.value)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //选择国家
    select() {
      console.log(this.value)
      this.forgetForm.country = this.value;
    },
    //获取手机号码
    getMobile() {
      api
        .choices("api/user/getMobile")
        .then(result => {
          if (result.status == 200) {
            this.forgetForm.mobile = result.res.mobile;
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //旧手机验证码
    send() {
      api
        .choices("api/safeSet/oldPhoneCode")
        .then(result => {
          if (result.status == 200) {
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.disabled = true;
              this.text = TIME_COUNT;
              this.text2 = "S"+this.$t('message.resend');
              this.timer = setInterval(() => {
                if (this.text > 0 && this.text <= TIME_COUNT) {
                  this.text--;
                } else {
                  this.disabled = false;
                  clearInterval(this.timer);
                  this.timer = null;
                  this.text = this.$t('message.resend');
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

    //新手机验证码
    newsend() {
      let mobile = this.forgetForm.newMobile;
      let oldCode = this.forgetForm.oldCode;
      let country = this.forgetForm.country;
      if (mobile && oldCode) {
        api
          .choices("api/safeSet/newPhoneCode", {
            country: country,
            oldCode: oldCode,
            newMobile: mobile
          })
          .then(result => {
            if (result.status == 200) {
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.disabled2 = true;
                this.newtext = TIME_COUNT;
                this.newtext2 = "S"+this.$t('message.resend');
                this.timer = setInterval(() => {
                  if (this.newtext > 0 && this.newtext <= TIME_COUNT) {
                    this.newtext--;
                  } else {
                    this.disabled2 = false;
                    clearInterval(this.timer);
                    this.timer = null;
                    this.newtext = this.$t('message.resend');
                    this.newtext2 = "";
                  }
                }, 1000);
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert(this.$t('message.empty'));
      }
    },
    submit() {
        let newCode=this.forgetForm.newCode
        if(newCode){
            api.choices('api/safeSet/updatePhone',{newCode:newCode,newMobile:this.forgetForm.newMobile,country:this.forgetForm.country}).then(result=>{
                if(result.status==200){
                    alert(result.msg)
                    this.$router.push('/my/set/index')
                }
            }).catch(err=>{
                console.log(err)
            })
        }else {
            alert(this.$t('message.newCode'))
        }

    }
  }
};
</script>

<style scoped>
</style>
