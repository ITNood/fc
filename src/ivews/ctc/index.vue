<template>
  <div>
    <Footer />
    <el-header class="header">
      <el-row :gutter="15">
        <el-col
          :span="12"
          :offset="6"
          class="title"
        >{{$t('message.ctc')}}</el-col>
        <el-col
          :span="6"
          class="clear"
        >
          <router-link
            to="/ctc/record/index"
            class="news"
          >
            <!-- <el-badge
              :value="number"
              :max="99"
              class="item"
            >
              <i
                size="small"
                class="icon iconfont icon-xiaoxi"
              ></i>
            </el-badge> -->
            <i class="icon iconfont icon-jilu1"></i>
          </router-link>
        </el-col>
      </el-row>
    </el-header>
    <div
      class="layout"
      style="margin-top:0"
    >
      <div class="ctc">
        <h2>{{ctc}}</h2>
        <p>{{$t('message.myctc')}}</p>
      </div>
      <div class="ctclist">
        <ul>
          <li
            v-for="(item,index) in items"
            :key="index"
          >
            <div class="ctcdate">{{$t('message.the')}}<span> {{item.period}} </span>{{$t('message.stage')}}<p>{{item.date}}</p>
            </div>
            <div class="contentlist clear">
              <div class="itemcontent">
                <h5>{{item.number}}</h5>
                <p>{{$t('message.subscription')}}</p>
              </div>
              <div
                class="itemcontent"
                style="text-align:center"
              >
                <h5>$ {{item.price}}</h5>
                <p>{{$t('message.Subscriptionprice')}}</p>
              </div>
              <div
                class="itemcontent"
                style="text-align:right"
              >
                <p v-if="item.is_open==0">{{$t('message.notopen')}}</p>
                <el-button
                  v-else-if="item.is_open==1"
                  @click="buy(item.id,item.price)"
                >{{$t('message.buy')}}</el-button>
                <p v-else>{{$t('message.end')}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <CTC
      ref="ctcs"
      :amount="usdt"
      :todos="select"
      :number="num"
      :total="all"
      :ids="id"
      :price="price"
    />
  </div>
</template>

<script>
import * as http from "../../public/index";
import CTC from "../../components/ctc";
import Footer from "../../components/nav";
import api from "../../API/index";
export default {
  components: { Footer, CTC },
  data() {
    return {
      ctc: "0.00",
      usdt: "",
      select: [],
      num: "",
      all: "0.00",
      id: "",
      price: "",
      items: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    buy(id, price) {
      this.$refs.ctcs.ctc();
      console.log(id, price);
      this.price = price;
      this.id = id;
    },
    getdata() {
      api
        .choices(http.CTC)
        .then(result => {
          if (result.status == 200) {
            this.ctc = result.res.ctc;
            this.items = result.res.data;
            this.usdt = result.res.usdt;
            this.num = result.res.number;
            this.select = result.res.paySet;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
