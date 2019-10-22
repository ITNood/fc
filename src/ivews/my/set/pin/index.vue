<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
      <div class="pay-tool">
        <div class="pay-tool-title border-bottom">
          <span class="icon1 icon-back"></span>
          <p>{{tips}}</p>
        </div>
        <!--密码输入框-->
        <div class="pay-tool-content">
          <div class="pay-tool-inputs">
            <div
              class="item"
              v-for="i in items"
              :key="i"
            ><span
                class="icon_dot"
                v-if="password[i]"
              ></span></div>
          </div>
        </div>
        <!--键盘-->
        <div class="pay-tool-keyboard">
          <ul>
            <li
              @click="keyUpHandle($event)"
              v-for="val in keys"
              :key="val"
            >
              {{ val }}
            </li>
            <li
              class="del"
              @click="delHandle"
            >
              <span class="icon-del el-icon-back"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../../API/index";
import Top from "../../../../components/top";
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0];
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t('message.payPwd'),
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: [],
      a: 1,
      tips:this.$t('message.setPwd'),
      oldPwd:'',
      pwd:'',
      confirmPwd:''
    };
  },
  created() {
      this.isSetPassword()
  },
  methods: {
      //是否设置了PIN密码
    isSetPassword() {
      let that = this;
      api
        .choices("api/safeSet/isSetPayPwd")
        .then(response => {
          if (response.status == 200) {
            console.log(response);
            if (response.res == true) {
              that.tips = this.$t("message.oldPin");
              that.a = 1;
            } else if (response.res == false) {
              that.tips = this.$t("message.setPwd");
              that.a = 2;
            }
          } else if (response.status == 400) {
            alert(response.msg);
          }
        })
        .catch(err => {
          alert(err.msg);
        });
    },
    ajaxData() {
      if (this.password.length >= 6) {
        let that = this;
        //输完密码后执行操作
        if (this.a == 1) {
          this.oldPwd = this.password.join("");
          this.clearPasswordHandle();
          this.a = 2;
          that.tips = this.$t('message.newPinCode');
        } else if (this.a == 2) {
          this.pwd = this.password.join("");
          this.clearPasswordHandle();
          this.a = 3;
          that.tips = this.$t('message.confirmPinCode');
        } else if (this.a == 3) {
          this.confirmPwd = this.password.join("");
          //提交PIN密码
          api.choices("api/safeSet/changeSafePwd",{oldPwd:this.oldPwd,pwd:this.pwd,confirmPwd:this.confirmPwd} )
            .then(response => {
              if (response.status == 200) {
                alert(response.msg);
                this.$router.push('/my/index')
              } 
            })
            .catch(err => {
              alert(err.msg);
            });
        }
      }
      return false;
    },
    keyUpHandle(e) {
      let text = e.currentTarget.innerText;
      let len = this.password.length;
      if (!text || len >= 6) return;
      this.password.push(text);
      this.ajaxData();
    },
    //删除密码
    delHandle() {
      if (this.password.length <= 0) return false;
      this.password.shift();
    },
    //清除密码
    clearPasswordHandle: function() {
      this.password = [];
    }
  }
};
</script>

<style scoped>
</style>
