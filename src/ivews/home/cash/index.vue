<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <el-tabs v-model="activeName" id="tabs">
            <el-tab-pane label="USDT提现" name="first">
                <ul class="cash">
                    <li>
                        <p>我的USDT</p>
                        <h5>$ {{usdt}}</h5>
                    </li>
                    <li>
                        <p>提现数量</p>
                        <el-input v-model="amount" :placeholder="'请输入'+number+'的倍数'" class="entry"></el-input>
                    </li>
                </ul>
                <el-button class="submit" style="margin-top:80px;" @click="submit1()">确认</el-button>
            </el-tab-pane>
            <el-tab-pane label="提现记录" name="second">
                <div class="cashList">
                    <ul>
                        <li v-for="(item,index) in items" :key="index">
                            <h5>{{item.usdt}}USDT</h5>
                            <p>{{item.date}}</p>
                            <span v-if="item.state==0" style="color:#0fdc79">处理中</span>
                            <span v-else style="color:#999">已完成</span>
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
        msg:'USDT提现',
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
              alert('提现数量不能为0')
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
