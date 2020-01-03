<template>
  <div>
    <el-dialog
      :visible.sync="forgetDialog"
      :close-on-click-modal="false"
      width="85%"
      center
      class="login"
    >
      <div class="otherlogin">
        <img :src="imgSrc">
        <h5>{{$t('message.forget')}}</h5>
        <el-form :model="forgetForm" ref="forgetForm" :rules="rules" class="loginWay">
            <el-form-item prop="username">
                <el-input v-model="forgetForm.username" :placeholder="user+$t('message.username')"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="forgetForm.mobile" :placeholder="$t('message.phone')"></el-input>
                <!-- <el-select v-model="value">
                  <el-option v-for="item in items" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item prop="mobileCode">
                <el-input v-model="forgetForm.mobileCode" :placeholder="$t('message.smsCode')"></el-input>
                <el-button class="send">{{$t('message.send')}}</el-button>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="forgetForm.password" :placeholder="$t('message.entryNewPwd')"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd">
                <el-input type="password" v-model="forgetForm.confirmPwd" :placeholder="$t('message.entryconfirmLgoinPwd')"></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit" @click="forgetSub()">{{$t('message.login')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["imgSrc","user"],
  name: "Forget",
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('message.entryNewPwd')));
        } else {
          if (this.forgetForm.confirmPwd !== '') {
            this.$refs.forgetForm.validateField('confirmPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('message.againPwd')));
        } else if (value !== this.forgetForm.password) {
          callback(new Error(this.$t('message.match')));
        } else {
          callback();
        }
      };
    return {
      forgetDialog:false,
      forgetForm:{
          username:'',
          mobile:'',
          mobileCode:'',
          password:'',
          confirmPwd:''
      },
      rules:{
          username:[
              {required:true,message:this.$t('message.entryAccount'),trigger:'blur'}
          ],
          mobile:[
              {required:true,message:this.$t('message.phone'),trigger:'blur'}
          ],
          mobileCode:[
              {required:true,message:this.$t('message.smsCode'),trigger:'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmPwd: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
    };
  },
  methods: {
      close(){
          this.forgetDialog=!this.forgetDialog
      }
  },
};
</script>

<style scoped>
</style>
