<template>
  <div>
      <Footer/>
      <el-header class="header">
        <el-row :gutter="15">
          <el-col :span="12" :offset="6" class="title">套利</el-col>
          <el-col :span="6" class="clear">
            <router-link to="" class="news"><i class="icon iconfont icon-xiaoxi"></i></router-link>
          </el-col>
        </el-row>
      </el-header>
      <div class="layout" style="margin-top:0;">
        <div class="home">
          <el-row :gutter="15">
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
          <el-row :gutter="15" class="purseLists">
            <el-col :span="8" v-for="(list,index) in lists" :key="index">
              <router-link :to="list.url">
                <span><i class="icon iconfont" :class="list.icon" :style="list.fontsize"></i></span>{{list.test}}
              </router-link>
            </el-col>
          </el-row>
        </div>

        <!--套利-->
        <div class="interest">
          <div class="interest-title">套利<router-link to="/home/notes/index" class="icon iconfont icon-jilu1"></router-link></div>
          <div class="walletList">
            <ul>
              <li v-for="(item,index) in items" :key="index" @click="interest(item.id,item.logo,item.name,$event)">
                <img :src="item.logo">
                <i v-if="item.state== 1" class="el-icon-star-off"></i>
                <i v-else class="el-icon-star-on"></i>
                <el-row :gutter="15">
                  <el-col :span="14" class="walletName">
                    {{item.name}}<span v-if="item.state!==1">{{item.amount}}</span>
                  </el-col>
                  <el-col :span="10" class="percent">
                    <h5>$ {{item.price}}</h5>
                    <p v-if="item.code==1" style="color:#05ce7e">+{{item.percent}}%</p>
                    <p v-else style="color:#ff5e52">-{{item.percent}}%</p>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Interest :dialogVisible="show" ref="child" :imgSrc="img" :id="typeId" :name="coinName"/>
  </div>
</template>

<script>
import Interest from '../../components/interest'
import Footer from "../../components/nav";
export default {
  components: { Footer ,Interest},
  data() {
    return {
      show:true,
      avatar:require('../../assets/image/avatar.png'),
      username:'Boy',
      amount:'10000',
      img:'',
      typeId:'',
      coinName:'',
      lists:[
        {url:'/home/invest/index',icon:'icon-meiyuan4',test:'充值'},
        {url:'/home/cash/index',icon:'icon-yinhangqiashezhi',test:'提现'},
        {url:'/home/history/index',icon:'icon-lvzhou_mingxi',test:'明细'}
      ],
      items:[
        {logo:require('../../assets/image/btc.png'),state:1,name:'BTC',amount:'100.00',price:100,percent:8.2,code:1,id:1},
        {logo:require('../../assets/image/eth.png'),state:2,name:'ETH',amount:'100.00',price:100,percent:8.2,code:2,id:2},
        {logo:require('../../assets/image/ltc.png'),state:2,name:'LTC',amount:'100.00',price:100,percent:8.2,code:2,id:3},
        {logo:require('../../assets/image/icon-ctc.png'),state:2,name:'CTC',amount:'100.00',price:100,percent:8.2,code:2,id:4},
        {logo:require('../../assets/image/icon-fc.png'),state:2,name:'FC',amount:'100.00',price:100,percent:8.2,code:2,id:5},
        {logo:require('../../assets/image/icon-rtl.png'),state:2,name:'RTL',amount:'100.00',price:100,percent:8.2,code:2,id:6},
        {logo:require('../../assets/image/icon-syl.png'),state:2,name:'SYL',amount:'100.00',price:100,percent:8.2,code:2,id:7}
      ]
    };
  },
  methods: {
    interest(id,logo,name,ev){
      this.$refs.child.open()
      // console.log(id)
      // console.log(logo)
      // console.log(name)
      this.img=logo
      this.typeId=id
      this.coinName=name
    }
  },
};
</script>

<style scoped>
</style>
