<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
        <div class="bind">
            <p>{{$t('message.address')}}</p>
            <el-input type="textarea" v-model="address" :placeholder="$t('message.paste')" :readonly="readonly"></el-input>
            <el-button class="submit" style="margin-top:80px;" @click="submit()" v-show="btn">{{$t('message.confirm')}}</el-button>
        </div>
        <div class="tips" style="color:#999">
                <p>{{$t('message.tips')}}：</p>
                <p>{{$t('message.protocol')}}</p>
                <p>{{$t('message.only')}}</p>
                <p>{{$t('message.error')}}</p>
                <p>{{$t('message.order')}}</p>
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
        msg:this.$t('message.bing'),
        address:'',
        readonly:false,
        btn:false,
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata(){
      api.choices('api/usdt/get').then(result=>{
        if(result.status==200){
          if(result.res.usdt){
            this.readonly=true
            this.address=result.res.usdt
            this.btn=false
          }else{
            this.btn=true
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    submit(){
      api.choices('api/usdt/bind',{usdt:this.address}).then(result=>{
        if(result.status==200){
          alert(result.msg)
          this.$router.puch('/my/index')
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
};
</script>

<style scoped>
</style>
