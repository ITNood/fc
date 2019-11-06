<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px"
    >
      <el-tabs
        v-model="activeName"
        id="tabs"
      >
        <el-tab-pane
          :label="$t('message.exchange')"
          name="first"
        >
          <ul class="cash">
            <li>
              <p>{{$t('message.myfc')}}</p>
              <h5>{{fc}}</h5>
            </li>
            <li>
              <p>{{$t('message.lockfc')}}</p>
              <h5>{{close}}</h5>
            </li>
            <li>
              <p>{{$t('message.currentfc')}}</p>
              <el-input
                v-model="amount"
                class="entry"
                :placeholder="$t('message.exchangeNumber')"
              ></el-input>
            </li>
          </ul>
          <el-button
            class="submit"
            style="margin-top:80px;"
            @click="submit1()"
          >{{$t('message.confirm')}}</el-button>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('message.forRecord1')"
          name="second"
        >
          <div class="cashList">
            <ul>
              <li
                v-for="(item,index) in items"
                :key="index"
              >
                <p>{{item.date}}</p>
                <h5 style="font-size:12px">{{item.text}}</h5>
                <span
                  style="color:#0fbcfa"
                >+{{item.amount}}{{item.name}}</span>
                <!-- <span
                  v-else
                  style="color:#999"
                >{{item.amount}}</span> -->
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
import Pin from "../../../components/pin";
import Top from "../../../components/top";
export default {
  components: { Top, Pin },
  data() {
    return {
      msg: this.$t("message.exchange"),
      activeName: "first",
      show: false,
      fc: 0,
      close: 0,
      amount: "",
      items: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices("api/change/index")
        .then(result => {
          if (result.status == 200) {
            this.fc = result.res.flowFc;
            this.close = result.res.lockFc;
            this.items=this.items.concat(result.res.record)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit1() {
      let amount = this.amount;
      if (amount) {
        this.$refs.child.open();
      }else{
          alert(this.$t('message.exchangeNumber'))
      }
    },
    submit(pwd) {
        api.choices('api/change/insert',{amount:this.amount,type:1,safePwd:pwd}).then(result=>{
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
