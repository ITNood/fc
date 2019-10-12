<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
        <div class="login" style="margin-top:30px;">
            <div class="otherlogin">
            <el-form :model="forgetForm" ref="forgetForm" class="loginWay">
                <el-form-item label="伙伴账号" prop="username">
                    <el-input v-model="forgetForm.username" placeholder="请输入您需邀请的伙伴账号"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="伙伴手机号码">
                    <el-input v-model="forgetForm.mobile" placeholder="请输入您伙伴的手机号码" class="phone"></el-input>
                    <el-select v-model="value" class="area">
                        <el-option v-for="item in items" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
               
            </el-form>
            <el-button class="submit" @click="submit()" style="margin-top:80px;">确认</el-button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:'邀请伙伴',
        forgetForm:{
          username:'',
          mobile:''
      },
      items:[
        {value:'1',label:'中国 +86'},
        {value:'2',label:'中国 +88'}
      ],
      value:'1'
    };
  },
  methods: {
      submit(){}
  },
};
</script>

<style scoped>
</style>
