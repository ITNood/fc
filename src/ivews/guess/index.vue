<template>
  <div>
    <Footer />
    <el-header
      class="header"
      style="position:fixed;top:0;left:0;right:0;z-index:999"
    >
      <el-row :gutter="15">
        <el-col
          :span="12"
          :offset="6"
          class="title"
        >{{$t('message.guess')}}</el-col>
      </el-row>
    </el-header>
    <!--竞猜总金额-->
    <div class="guessAmount">
        <div class="allAmount">
            <h1>$<span>{{total}}</span></h1>
            <p>{{$t('message.competition')}}</p>
        </div>
        <!--昨日竞猜-->
        <ul class="yesteday clear">
            <li>
                <h5>{{yestedayAmount}}</h5>
                <p>{{$t('message.contest')}}</p>
            </li>
            <li>
                <h5>{{champion}}</h5>
                <p>{{$t('message.chamteam')}}</p>
            </li>
        </ul>
    </div>
    
    <div class="interest" style="padding: 0 15px">
        <div class="interest-title">{{$t('message.groupguess')}}
          <router-link
            to="/guess/guessHistry"
            style="font-size:14px;color:#0fbcfa"
          >{{$t('message.myguess')}}<i class="el-icon-arrow-right"></i></router-link>
        </div>
        <div class="walletList">
          <ul style="height:calc(100vh - 318px)">
            <li
            style="padding-right:0"
              v-for="(item,index) in items"
              :key="index"
            >
              <img :src="item.img">
              <el-row>
                <el-col
                  :span="8"
                  class="walletName"
                >
                  {{item.name}}
                </el-col>
                <el-col
                  :span="8"
                  class="amount"
                >
                  <h5 style="font-family:number">{{item.income}}</h5>
                </el-col>
                <el-col
                  :span="8"
                  class="percent"
                >
                 <el-button class="btn-guess" @click="guess(item.id,item.img)" v-if="show==true" :class="item.isBuy==true&&show==true?'classA':'classB'" :disabled="disabled">{{text}}</el-button>
                 <el-button class="btn-guess" @click="guess(item.id,item.img)" v-else :disabled="disabled">{{text}}</el-button>
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </div>
      <Guess :usdt="amount" :logo="img" :id="val" ref="guess"/>
  </div>
</template>

<script>
import * as http from '../../public/index'
import api from '../../API/index'
import Guess from '../../components/guess'
import Footer from "../../components/nav";
export default {
  components: { Footer ,Guess},
  data() {
    return {
        total:'0.00',
        yestedayAmount:'0.00',
        champion:'',
        amount:'',
        items:[],
        text:'',
        show:false,
        disabled:false,
        img:'',
        val:''
    };
  },
  created() {
      this.getdata()
  },
  updated() {
      console.log(this.show)
  },
  methods: {
      getdata(){
          api.choices(http.GUESS).then(result=>{
              if(result.status==200){
                  this.amount=result.res.usdt
                  this.champion=result.res.yesterdayName
                  this.yestedayAmount=result.res.yesterdayBouns
                  this.total=result.res.todayBouns
                  this.items=result.res.data
                  if(result.res.isTime==true){
                      this.text=this.$t('message.gus')
                      this.disabled=false
                      this.items.map(item=>{
                          if(item.isBuy==true){
                              this.show=true
                              console.log(item)
                              this.text=this.$t('message.guessed')
                              this.disabled=true
                          }
                      })
                  }else{
                      this.text=this.$t('message.waitopen')
                      this.show=false
                      this.disabled=true
                  }
              }
          }).catch(err=>{
              console.log(err)
          })
      },
      guess(id,img){
          this.$refs.guess.guess()
          this.img=img
          this.val=id
      }
  },
};
</script>

<style scoped>
</style>
