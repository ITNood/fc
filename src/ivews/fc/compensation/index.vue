<template>
  <div>
    <el-header
      id="top"
      height="60px"
    >
      <el-row :gutter="15">
        <el-col
          :span="6"
          class="center"
          style="height:60px;"
        >
          <i
            class="el-icon-arrow-left back"
            @click="back()"
          ></i>
        </el-col>
        <el-col
          :span="12"
          class="title"
        >{{title}}</el-col>
        <el-col :span="6">
          <router-link
            to="/fc/compensation/takeHistory/index"
            class="take"
          >取出记录</router-link>
        </el-col>
      </el-row>
    </el-header>
    <div
      class="layout"
      style="margin-bottom:20px;"
    >
      <div
        id="waveEchart"
        ref='waveEchart'
      ></div>
      <ul class="compensation clear">
        <li>
          <h5>{{week}}</h5>
          <p>封顶金额/周</p>
        </li>
        <li>
          <h5>{{intest}}</h5>
          <p>本周收益/周</p>
        </li>
        <li>
          <h5>{{card}}</h5>
          <p>绩效工资卡</p>
        </li>
      </ul>
      <ul class="takeNumber">
        <p>取出数量</p>
        <li>
          <el-input
            placeholder="请输入你需取出的数量"
            v-model="amount"
          ></el-input>
          <el-button @click="takeout()">全部取出</el-button>
        </li>
        <li>
          <p>手续费</p>
          <b>{{fee}}</b>
        </li>
        <li>
          <p>自动兑换股权份额</p>
          <b>{{equity}}</b>
        </li>
        <li>
          <p>自动兑换现金金额</p>
          <b>{{cash}}</b>
        </li>
      </ul>
      <el-button
        @click="submit1()"
        class="submit"
      >{{$t('message.confirm')}}</el-button>
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
import "echarts-liquidfill";
import Pin from "../../../components/pin";
export default {
  components: { Pin },
  data() {
    return {
      title: "薪酬",
      week: 0,
      intest: 0,
      card: 0,
      amount: "",
      fee: 0,
      equity: 0,
      cash: 0,
      show: false,
      prencet: []
    };
  },
  mounted() {
    this.getdata();
    this.echarts();
  },
  methods: {
    getdata() {
      api
        .choices("api/takeOut/index")
        .then(result => {
          if (result.status == 200) {
            //this.prencet.push(result.res.percent)
            console.log(this.percent);
            this.intest = result.res.income;
            this.week = result.res.capsAmount;
            this.card = result.res.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    echarts() {
      var myChart = this.$echarts.init(document.getElementById("waveEchart"));
      let option = {
        title: {
          text: "距离封顶",
          x: "center",
          y: "top",
          textAlign: "left",
          textStyle: {
            color: "white",
            fontSize: 16,
            fontWeight: "normal"
          }
        },
        series: [
          {
            type: "liquidFill",
            radius: "50%",
            data: this.prencet,
            color: "rgba(14,188,249,1)",
            label: {
              normal: {
                color: "#fff",
                insideColor: "transparent",
                textStyle: {
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Microsoft YaHei"
                }
              }
            },
            outline: {
              show: true,
              borderDistance: 0,
              itemStyle: {
                borderColor: "rgba(14,188,249,1)",
                borderWidth: 2
              }
            },
            backgroundStyle: {
              color: "rgba(14,188,249,.3)"
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    back() {
      this.$router.go(-1);
    },
    takeout() {
      this.amount = this.card;
    },
    submit1() {
      let amount = this.amount;
      if (amount) {
        this.$refs.child.open();
      } else {
        alert("请输入数量");
      }
    },
    submit(pwd) {
        api.choices('api/takeOut/insert',{amount:this.amount,safePwd:pwd}).then(result=>{
            if(result.status==200){
                alert(result.msg)
                window.location.reload()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  }
};
</script>

<style scoped>
</style>
