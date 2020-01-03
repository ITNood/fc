<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px;"
    >
      <el-tabs
        v-model="activeName"
        id="tabs"
      >
        <el-tab-pane
          :label="$t('message.appointment')"
          name="first"
        >
          <ul class="cash">
            <li>
              <p>{{$t('message.myfc')}}</p>
              <h5>{{fc}}</h5>
            </li>
            <li>
              <p>{{$t('message.selectback')}}</p>
              <h5>
                <el-input-number
                  v-model="amount"
                  :min="0"
                  :step="100"
                  size="small"
                  class="stepNumber"
                ></el-input-number>
                <span>
                  <el-button
                    size="small"
                    @click="getmax()"
                    class="max"
                  >{{$t('message.max')}}</el-button>
                </span>
              </h5>
            </li>
            <li>
              <p>{{$t('message.backAccount')}}(FC)</p>
              <h5 style="color:white">{{account}}</h5>
            </li>
          </ul>
          <div
            class="tips"
            style="color:#999"
          >
            <p>{{$t('message.trading')}}：</p>
            <p>{{$t('message.hand')}}</p>
          </div>
          <el-button
            class="submit"
            style="margin-top:80px;"
            @click="submit1()"
          >{{$t('message.confirm')}}</el-button>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('message.forRecord')"
          name="second"
        >
          <div class="cashList">
            <ul>
              <li
                v-for="(item,index) in items"
                :key="index"
              >
                <h5>{{item.amount}}USDT</h5>
                <p>{{item.date}}</p>
                <span
                  v-if="item.state==1"
                  style="color:#0fdc79"
                >{{$t('message.processing')}}</span>
                <span
                  v-else-if="item.state==2"
                  style="color:red"
                >{{$t('message.had')}}</span>
                <span
                  v-else-if="item.state==3"
                  style="color:#fff"
                >{{$t('message.end')}}</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Pin
      @submit="submit"
      ref="child"
      :centerDialogVisible="show"
    />
  </div>
</template>

<script>
import * as http from '../../../public/index'
import api from "../../../API/index";
import Top from "../../../components/top";
import Pin from "../../../components/pin";
export default {
  components: { Top, Pin },
  data() {
    return {
      msg: this.$t('message.appointment'),
      activeName: "first",
      fc: 0,
      amount: 0,
      show: false,
      account: 0,
      items: [],
      number: "",
      max: "",
      repo: "",
      fee: ""
    };
  },
  created() {
    this.getdata();
  },
  updated() {
    this.account=(Math.floor(this.amount/this.repo*100)/100).toFixed(2)
  },
  methods: {
    getdata() {
      api
        .choices(http.RECYCLING)
        .then(result => {
          if (result.status == 200) {
            this.fc = result.res.flowFc;
            this.max = result.res.max;
            this.repo = result.res.repoPrice;
            this.fee = result.res.fee;
            this.items=this.items.concat(result.res.record)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getmax() {
      this.amount = this.max;
    },
    submit1() {
      let amount = this.amount;
      if (amount) {
        this.$refs.child.open();
      } else {
        alert(this.$t("message.cannot"));
      }
    },
    submit(pwd) {
      api
        .choices(http.RECYCLINGSUBMIT, { amount: this.amount, safePwd: pwd })
        .then(result => {
          if (result.status == 200) {
            alert(result.msg);
            window.location.reload();
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
