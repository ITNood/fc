<template>
  <div>
    <Footer />
    <el-header class="header">
      <el-row :gutter="15">
        <el-col
          :span="12"
          :offset="6"
          class="title"
        >{{$t('message.arbitrage')}}</el-col>
        <el-col
          :span="6"
          class="clear"
        >
          <router-link
            to="/home/news/index"
            class="news"
          >
            <el-badge
              :value="number"
              :max="99"
              class="item"
            >
              <i
                size="small"
                class="icon iconfont icon-xiaoxi"
              ></i>
            </el-badge>
          </router-link>
        </el-col>
      </el-row>
    </el-header>
    <div
      class="layout"
      style="margin-top:0;"
    >
      <div class="home">
        <el-row
          :gutter="15"
          style="padding:0 20px;"
        >
          <el-col :span="12">
            <div id="avatar">
              <el-avatar
                icon="el-icon-user-solid"
                :src="avatar"
                :size="50"
              ></el-avatar>
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
        <el-row class="purseLists">
          <el-col
            :span="8"
            v-for="(list,index) in lists"
            :key="index"
          >
            <router-link :to="list.url">
              <span><i
                  class="icon iconfont"
                  :class="list.icon"
                  :style="list.fontsize"
                ></i></span>{{list.test}}
            </router-link>
          </el-col>
        </el-row>
      </div>

      <!--合约钱包-->
      <div class="treaty">
        <div class="treatybag">
          {{$t('message.contractWallet')}}：<span>{{bag}}</span>
          <router-link to="/home/contractdetails/index?id=17">{{$t('message.financial')}}<i class="el-icon-arrow-right"></i></router-link>
        </div>
        <div class="addTreaty">
          <ul
            v-if="show"
            class="treatyContent clear"
          >
            <li>
              <h5 style="font-family:number">{{day}} Day</h5>
              <p>{{date}}</p>
            </li>
            <li>
              <h5 style="font-family:number">+{{percent}}%</h5>
              <p>{{$t('message.Surplus')}}<span style="color:#0fbcfa">{{days}}</span>Day</p>
            </li>
            <li>
              <el-button
                @click="getout()"
                class="sizebuttom"
              >{{$t('message.checkout')}}</el-button>
            </li>
            <li>
              <el-button
                @click="comein()"
                class="sizebuttom"
              >{{$t('message.cover')}}</el-button>
            </li>
          </ul>
          <el-button
            v-else
            @click="addtreaty()"
          >+{{$t('message.creatContract')}}</el-button>

        </div>
      </div>

      <!--套利-->
      <div class="interest">
        <div class="interest-title">{{$t('message.arbteam')}}
          <router-link
            to="/home/notes/index"
            class="icon iconfont icon-jilu1"
          ></router-link>
        </div>
        <div class="walletList">
          <ul>
            <li
              v-for="(item,index) in items"
              :key="index"
              @click="interest(item.id,item.img,item.name,$event)"
            >
              <img :src="item.img">
              <i
                v-if="item.isCheck== false"
                class="el-icon-star-off"
              ></i>
              <i
                v-else
                class="el-icon-star-on"
              ></i>
              <el-row :gutter="15">
                <el-col
                  :span="8"
                  class="walletName"
                >
                  {{item.name}}<span v-if="item.isCheck==true">{{item.balance}}</span>
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
                  <h5>{{item.amount}}</h5>
                  <!-- <p v-if="item.ratio>0" style="color:#05ce7e">+{{item.ratio}}%</p>
                    <p v-else style="color:#ff5e52">{{item.ratio}}%</p> -->
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Interest
      ref="child"
      :imgSrc="img"
      :id="typeId"
      :name="coinName"
      :number="num"
      :wallet="bag"
    />
    <!--创建合约-->
    <Treaty
      :todos="select"
      :amount="amount"
      :number="beishu"
      ref="treatys"
    />
    <!--合约出仓-->
    <Checkout
      ref="check"
      :numday="day"
      :numpercent="percent"
      :price="bag"
      :surplus="days"
      :checkid="id"
    />
    <!--合约补仓-->
    <Cover
      ref="cover"
      :addDay="day"
      :addPercent="percent"
      :usdt="amount"
      :addAmount="bag"
      :addSurplus="days"
      :coverid="id"
      :beishu="bs"
    />
  </div>
</template>

<script>
import Cover from "../../components/covering";
import Checkout from "../../components/checkout";
import Treaty from "../../components/addtreaty";
import * as http from "../../public/index";
import Interest from "../../components/interest";
import Footer from "../../components/nav";
import api from "../../API/index";
export default {
  components: { Footer, Interest, Treaty, Checkout, Cover },
  data() {
    return {
      avatar: "",
      username: "",
      amount: "",
      img: "",
      typeId: "",
      number: "",
      coinName: "",
      num: "",
      bag: "0.00",
      select: [],
      beishu: "",
      percent: "",
      day: "",
      date: "",
      days: "",
      treatyAmount: "",
      id: "",
      bs: "",
      show: false,
      lists: [
        {
          url: "/home/invest/index",
          icon: "icon-meiyuan4",
          test: this.$t("message.recharge")
        },
        {
          url: "/home/cash/index",
          icon: "icon-yinhangqiashezhi",
          test: this.$t("message.withdrawal")
        },
        {
          url: "/home/financial/index",
          icon: "icon-lvzhou_mingxi",
          test: this.$t("message.detail")
        }
      ],
      items: []
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices(http.HOME)
        .then(result => {
          if (result.status == 200) {
            this.amount = result.res.usdt;
            this.username = result.res.user.nickname
              this.avatar = result.res.user.avatar
            this.items =result.res.levelSet
            if (result.res.msgNumber > 0) {
              this.number = result.res.msgNumber;
            }
            this.num = result.res.multiple;
            //合约钱包
            this.bag = result.res.contract.amount;
            this.bs = result.res.contract.multiple;
            //创建合约
            this.select = result.res.contract.set;
            // console.log(result.res.contract.record.id);
            if (result.res.contract.record.id) {
              this.show = true;
              this.id = result.res.contract.record.id;
              this.percent = result.res.contract.record.ratio;
              this.days = result.res.contract.record.period; //剩余天数
              this.day = result.res.contract.record.day; //天数
              this.date = result.res.contract.record.date; //日期
            } else {
              this.show = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    interest(id, logo, name, ev) {
      this.$refs.child.opening();
      this.img = logo;
      this.typeId = id;
      this.coinName = name;
    },
    //创建合约
    addtreaty() {
      this.$refs.treatys.treaty();
    },
    //提前出仓
    getout() {
      this.$refs.check.check();
    },
    //合约补仓
    comein() {
      this.$refs.cover.covering();
    }
  }
};
</script>

<style scoped>
</style>
