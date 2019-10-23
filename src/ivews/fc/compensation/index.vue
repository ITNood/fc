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
          >{{$t('message.takeRecord')}}</router-link>
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
          <p>{{$t('message.cap')}}</p>
        </li>
        <li>
          <h5>{{intest}}</h5>
          <p>{{$t('message.earning')}}</p>
        </li>
        <li>
          <h5>{{card}}</h5>
          <p>{{$t('message.card')}}</p>
        </li>
      </ul>
      <ul class="takeNumber">
        <p>{{$t('message.takeNum')}}</p>
        <li>
          <el-input
            :placeholder="$t('message.needtake')"
            v-model="amount"
          ></el-input>
          <el-button @click="takeout()">{{$t('message.allout')}}</el-button>
        </li>
        <li>
          <p>{{$t('message.poundage')}}</p>
          <b>{{fee}}</b>
        </li>
        <li>
          <p>{{$t('message.shars')}}</p>
          <b>{{equity}}</b>
        </li>
        <li>
          <p>{{$t('message.auto')}}</p>
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
      title: this.$t('message.compensation'),
      week: 0,
      intest: 0,
      card: 0,
      amount: "",
      fee: 0,
      equity: 0,
      cash: 0,
      show: false,
      prencet: ["0"]
    };
  },
  mounted() {
    this.getdata();
    this.echarts(this.prencet)
  },
  methods: {
    getdata() {
      let that = this
      api
        .choices("api/takeOut/index")
        .then(result => {
          if (result.status == 200) {
            let newpercent = [(result.res.percent/100).toFixed(1)]
            that.percent=newpercent
            that.echarts(that.percent)
            that.card=result.res.result
            that.intest=result.res.income
            that.week=result.res.capsAmount
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    echarts(data) {
      var myChart = this.$echarts.init(document.getElementById("waveEchart"));
      let option = {
        title: {
          text: this.$t('message.top'),
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
            data:data,
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
