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
                            <span v-if="item.state==0" style="color:white">{{$t('message.pending')}}</span>
                            <span v-else-if="item.state==1" style="color:#0fdc79">{{$t('message.processing')}}</span>
                            <span v-else-if="item.state==2" style="color:#999">{{$t('message.end')}}</span>
                            <span v-else style="color:orange">{{$t('message.undo')}}</span>
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
import * as http from '../../../public/index'
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
  created() {
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices(http.CASH).then(result=>{
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
          api.choices(http.CASHSUBMIT,{amount:this.amount,safePwd:pwd}).then(result=>{
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
