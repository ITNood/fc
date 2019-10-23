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
          label="回购"
          name="first"
        >
          <ul class="cash">
            <li>
              <p>我的流通FC</p>
              <h5>{{fc}}</h5>
            </li>
            <li>
              <p>选择回购份额（USDT）</p>
              <h5>
                <el-input-number
                  v-model="amount"
                  :min="1"
                  size="small"
                  class="stepNumber"
                ></el-input-number>
                <span>
                  <el-button
                    size="small"
                    @click="getmax()"
                    class="max"
                  >最大</el-button>
                </span>
              </h5>
            </li>
            <li>
              <p>回购到账(USDT)</p>
              <h5 style="color:white">{{account}}</h5>
            </li>
          </ul>
          <div
            class="tips"
            style="color:#999"
          >
            <p>交易须知：</p>
            <p>您将流通FC回购于平台，平台将付于对应价格的USDT作为支付货币，并扣除5%作为手续费。</p>
          </div>
          <el-button
            class="submit"
            style="margin-top:80px;"
            @click="submit1()"
          >{{$t('message.confirm')}}</el-button>
        </el-tab-pane>
        <el-tab-pane
          label="回购记录"
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
                >已撤销</span>
                <span
                  v-else-if="item.state==3"
                  style="color:#999"
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
import api from "../../../API/index";
import Top from "../../../components/top";
import Pin from "../../../components/pin";
export default {
  components: { Top, Pin },
  data() {
    return {
      msg: "回购",
      activeName: "first",
      fc: 0,
      amount: 1,
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
    this.account = (
      Math.floor(
        (this.amount * this.repo - this.amount * this.repo * this.fee) * 100
      ) / 100
    ).toFixed(2);
  },
  methods: {
    getdata() {
      api
        .choices("api/repo/index")
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
      //console.log(pwd)
      api
        .choices("api/repo/insert", { amount: this.amount, safePwd: pwd })
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
