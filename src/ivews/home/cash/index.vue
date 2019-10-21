<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <el-tabs v-model="activeName" id="tabs">
            <el-tab-pane :label="$t('message.usdtWith')" name="first">
                <ul class="cash">
                    <li>
                        <p>{{$t('message.myusdt')}}</p>
                        <h5>$ {{usdt}}</h5>
                    </li>
                    <li>
                        <p>{{$t('message.withAmount')}}</p>
                        <el-input v-model="amount" :placeholder="$t('message.please') +number+' '+$t('message.multiple')" class="entry"></el-input>
                    </li>
                </ul>
                <el-button class="submit" style="margin-top:80px;" @click="submit1()">{{$t('message.confirm')}}</el-button>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.record')" name="second">
                <div class="cashList">
                    <ul>
                        <li v-for="(item,index) in items" :key="index">
                            <h5>{{item.usdt}}USDT</h5>
                            <p>{{item.date}}</p>
                            <span v-if="item.state==0" style="color:#0fdc79">{{$t('message.processing')}}</span>
                            <span v-else style="color:#999">{{$t('message.end')}}</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
  </div>
</template>

<script>
import api from '../../../API/index'
import Top from "../../../components/top";
import Pin from '../../../components/pin'
export default {
  components: { Top ,Pin},
  data() {
    return {
        msg:this.$t('message.usdtWith'),
        activeName:'first',
        usdt:'',
        amount:'',
        show:false,
        items:[],
        number:''
    };
  },
  mounted() {
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices('api/withdraw/index').then(result=>{
              if(result.status==200){
                  this.usdt=result.res.usdt
                  this.number=result.res.multiple
                  this.items=this.items.concat(result.res.record)
              }
          }).catch(err=>{
              console.log(err)
          })
      },
      submit1(){
          let amount=this.amount
          if(amount){
              this.$refs.child.open()
          }else{
              alert(this.$t('message.cannot'))
          }
      },
      submit(pwd){
          //console.log(pwd)
          api.choices('api/withdraw/insert',{amount:this.amount,safePwd:pwd}).then(result=>{
              if(result.status==200){
                  alert(result.msg)
                  window.location.reload()
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
