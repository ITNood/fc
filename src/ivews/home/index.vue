<template>
  <div>
      <Footer/>
      <el-header class="header">
        <el-row :gutter="15">
          <el-col :span="12" :offset="6" class="title">{{$t('message.arbitrage')}}</el-col>
          <el-col :span="6" class="clear">
            <router-link to="/home/news/index" class="news">
                <el-badge :value="number" :max="99" class="item">
                     <i size="small" class="icon iconfont icon-xiaoxi"></i>
                </el-badge>
            </router-link>
          </el-col>
        </el-row>
      </el-header>
      <div class="layout" style="margin-top:0;">
        <div class="home">
          <el-row :gutter="15" style="padding:0 20px;">
            <el-col :span="12">
              <div id="avatar">
                <el-avatar icon="el-icon-user-solid" :src="avatar" :size="60"></el-avatar>
                <p>Hi,{{username}}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="purse">
                <h4><span>$</span>{{amount}}</h4>
                <p>USDT</p>
              </div>
            </el-col>
          </el-row>
          <el-row  class="purseLists">
            <el-col :span="8" v-for="(list,index) in lists" :key="index">
              <router-link :to="list.url">
                <span><i class="icon iconfont" :class="list.icon" :style="list.fontsize"></i></span>{{list.test}}
              </router-link>
            </el-col>
          </el-row>
        </div>

        <!--套利-->
        <div class="interest">
          <div class="interest-title">{{$t('message.arbitrage')}}<router-link to="/home/notes/index" class="icon iconfont icon-jilu1"></router-link></div>
          <div class="walletList">
            <ul>
              <li v-for="(item,index) in items" :key="index" @click="interest(item.id,item.img,item.name,$event)">
                <img :src="item.img">
                <i v-if="item.isCheck== false" class="el-icon-star-off"></i>
                <i v-else class="el-icon-star-on"></i>
                <el-row :gutter="15">
                  <el-col :span="14" class="walletName">
                    {{item.name}}<span v-if="item.isCheck==true">{{item.balance}}</span>
                  </el-col>
                  <el-col :span="10" class="percent">
                    <h5>$ {{item.amount}}</h5>
                    <!-- <p v-if="item.ratio>0" style="color:#05ce7e">+{{item.ratio}}%</p>
                    <p v-else style="color:#ff5e52">{{item.ratio}}%</p> -->
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Interest :dialogVisible="show" ref="child" :imgSrc="img" :id="typeId" :name="coinName" :number="num"/>
  </div>
</template>

<script>
import Interest from '../../components/interest'
import Footer from "../../components/nav";
import api from '../../API/index'
export default {
  components: { Footer ,Interest},
  data() {
    return {
      show:true,
      avatar:'',
      username:'',
      amount:'',
      img:'',
      typeId:'',
      number:'',
      coinName:'',
      num:'',
      lists:[
        {url:'/home/invest/index',icon:'icon-meiyuan4',test:this.$t('message.recharge')},
        {url:'/home/cash/index',icon:'icon-yinhangqiashezhi',test:this.$t('message.withdrawal')},
        {url:'/home/history/index?id=14',icon:'icon-lvzhou_mingxi',test:this.$t('message.detail')}
      ],
      items:[]
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata(){
      api.choices('api/home/index').then(result=>{
        if(result.status==200){
          this.amount=result.res.usdt
          this.username=result.res.user.username,
          this.avatar=result.res.user.avatar
          this.items=this.items.concat(result.res.levelSet)
          if(result.res.msgNumber>0){
            this.number=result.res.msgNumber
          }
          this.num=result.res.multiple
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    interest(id,logo,name,ev){
      this.$refs.child.opening()
      this.img=logo
      this.typeId=id
      this.coinName=name
    }
  },
};
</script>

<style scoped>
</style>
