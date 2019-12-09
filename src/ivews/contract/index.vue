<template>
  <div>
    <Footer />
    <el-header class="header">
      <el-row :gutter="15">
        <el-col
          :span="12"
          :offset="6"
          class="title"
        >{{$t('message.contract')}}</el-col>
      </el-row>
    </el-header>

    <div
      class="layout"
      style="margin-top:0"
    >
      <div class="selectContract">
        <p>{{$t('message.selectday')}}</p>
        <div style="position:relative">
          <img
            :src="image"
            class="icon_day"
          >
          <el-select
            v-model="value"
            class="selectDay"
            @change="handleChange()"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.day+ ' Day ' + item.multiple + ' %'"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-button
          class="submit"
          @click="buy()"
        >{{$t('message.buyContract')}}</el-button>
      </div>

      <!--我的合约-->
      <div class="myContract">
        <span>{{$t('message.mycontract')}}</span>
        <el-row>
          <el-col :span="12">
            <h5>{{total}}</h5>
            <p>{{$t('message.currAmount')}}</p>
          </el-col>
          <el-col :span="12">
            <h5>{{comein}}</h5>
            <p>{{$t('message.yesearning')}}</p>
          </el-col>
          <el-col :span="12">
            <h5>{{contract}}</h5>
            <p>{{$t('message.revenue')}}</p>
          </el-col>
          <el-col :span="12">
            <h5>{{share}}</h5>
            <p>{{$t('message.profit')}}</p>
          </el-col>
        </el-row>
      </div>

      <!--记录-->
      <div class="contractHistory">
        <ul>
          <li
            v-for="(list,index) in lists"
            :key="index"
            class="clear"
          >
            <img :src="list.img">
            <span>{{list.day}}Day</span>
            <span>{{list.amount}}</span>
            <span>+{{list.ratio}}%</span>
            <span>
              <!-- <p>+{{list.ratio}}%</p> -->
              <el-button
                @click="over(list.id,list.img,list.day,list.amount,list.ratio,list.period)"
                class="over"
                v-if="list.state==0"
              >终止</el-button>
              <p>{{$t('message.Surplus')}}<b>{{list.period}}</b>Day</p>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <Contract
      :dialogVisible="show"
      ref="child"
      :day="date"
      :moeny="total"
      :img="image"
      :percent="num"
      :id="valId"
      :number="times"
    />
    <OverContract
      :imgSrc="src"
      :days="theday"
      :prt="percents"
      :totals="prices"
      :overday="allday"
      :ids="overId"
      ref="children"
    />
  </div>
</template>

<script>
import api from "../../API/index";
import Contract from "../../components/contract";
import OverContract from "../../components/overContract";
import Footer from "../../components/nav";
export default {
  components: { Footer, Contract, OverContract },
  data() {
    return {
      overId: "",
      src: "",
      theday: "",
      percents: "",
      prices: "",
      allday: "",
      times: "",
      date: "",
      show: false,
      valId: "",
      num: "",
      total: "0.00",
      comein: "0.00",
      contract: "0.00",
      share: "0.00",
      image: "",
      value: "",
      options: [],
      lists: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices("api/investment/index")
        .then(result => {
          if (result.status == 200) {
            this.total = result.res.usdt;
            this.comein = result.res.percent;
            this.contract = result.res.income;
            this.share = result.res.share;
            this.options = result.res.set;
            this.value = this.options[0];
            this.lists = result.res.record;
            this.date = this.options[0].day;
            this.num = this.options[0].multiple;
            this.image = this.options[0].img;
            this.valId = this.options[0].id;
            this.times = result.res.multiple;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    buy() {
      this.$refs.child.opening();
    },
    handleChange() {
      console.log(this.value);
      this.valId = this.value;
      this.options.map(item => {
        if (this.value == item.id) {
          console.log(item);
          this.image = item.img;
          this.num = item.multiple;
          this.date = item.day;
          this.valId = item.id;
        }
      });
    },
    over(id, img, day, amount, ratio, period) {
      console.log(id, img, day, amount, ratio, period);
      this.$refs.children.close();
      this.src = img;
      this.theday = day;
      this.percents = ratio;
      this.prices = amount;
      this.allday = period;
      this.overId=id
    }
  }
};
</script>

<style scoped>
</style>
