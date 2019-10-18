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
                    <el-select v-model="value" class="area" @change="select()">
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
import api from '../../../API/index'
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:'邀请伙伴',
        forgetForm:{
          username:'',
          mobile:'',
          country:''
        },
        items:[
          {value:'1',label:'中国 +86'},
          {value:'2',label:'中国 +88'}
        ],
        value:'1'
    };
  },
  mounted() {
    this.forgetForm.country=this.value
  },
  methods: {
      select(){
        this.forgetForm.country=this.value
      },
      submit(){
        let username=this.forgetForm.username
        let mobile=this.forgetForm.mobile
        if(username&&mobile){
          let data=this.forgetForm
          api.choices('api/register/index',data).then(result=>{
            if(result.status==200){
              alert(result.msg)
              this.$router.push('/my/index')
            }
          })
        }else{
          alert('邀请账号和手机号码不能为空')
        }
      }
  },
};
</script>

<style scoped>
</style>
