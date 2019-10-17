<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
        <div class="login" style="margin-top:30px;">
          <div class="otherlogin">
            <el-form :model="forgetForm" ref="forgetForm" :rules="rules" class="loginWay">
                <el-form-item label="当前手机号码" prop="mobile">
                    <el-input v-model="forgetForm.mobile" readonly></el-input>
                </el-form-item>
                <el-form-item prop="mobileCode" label="短信验证码">
                    <el-input v-model="forgetForm.mobileCode" placeholder="短信验证码"></el-input>
                    <el-button class="send">发送</el-button>
               </el-form-item>
                <el-form-item prop="newmobile" label="新手机号码">
                    <el-input v-model="forgetForm.newmobile" placeholder="请输入您的新手机号码" class="phone"></el-input>
                    <el-select v-model="value" class="area">
                        <el-option v-for="item in items" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="newmobileCode" label="短信验证码">
                    <el-input v-model="forgetForm.newmobileCode" placeholder="短信验证码"></el-input>
                    <el-button class="send">发送</el-button>
               </el-form-item>
            </el-form>
            <el-button class="submit" @click="submit()" style="margin-top:80px;">确认</el-button>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: "手机号码",
      forgetForm:{
          mobile:'',
          mobileCode:'',
          newmobile:'',  
          newmobileCode:'' 
      },
      rules:{

      },
      items:[
          {value:'1',label:'中国 +86'},
          {value:'2',label:'中国 +88'}
      ],
      value:'1'
    };
  },
  methods: {
      submit(){},
  },
};
</script>

<style scoped>
</style>
