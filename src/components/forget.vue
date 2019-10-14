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
        <h5>忘记密码</h5>
        <el-form :model="forgetForm" ref="forgetForm" :rules="rules" class="loginWay">
            <el-form-item prop="username">
                <el-input v-model="forgetForm.username" :placeholder="user+'用户名'"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="forgetForm.mobile" placeholder="手机号码"></el-input>
                <el-select v-model="value">
                  <el-option v-for="item in items" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="mobileCode">
                <el-input v-model="forgetForm.mobileCode" placeholder="短信验证码"></el-input>
                <el-button class="send">发送</el-button>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="forgetForm.password" placeholder="新登录密码"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd">
                <el-input type="password" v-model="forgetForm.confirmPwd" placeholder="确认登录密码"></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit" @click="forgetSub()" >登录</el-button>
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
          callback(new Error('请输入密码'));
        } else {
          if (this.forgetForm.confirmPwd !== '') {
            this.$refs.forgetForm.validateField('confirmPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.forgetForm.password) {
          callback(new Error('两次输入密码不一致!'));
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
              {required:true,message:'请输入账号',trigger:'blur'}
          ],
          mobile:[
              {required:true,message:'请输入手机号码',trigger:'blur'}
          ],
          mobileCode:[
              {required:true,message:'请输入短信验证码',trigger:'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmPwd: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
      items:[
        {value:'1',label:'中国 +86'}
      ],
      value:'1'
    };
  },
  updated() {
    console.log(this.forgetDialog);
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
