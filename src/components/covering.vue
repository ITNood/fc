<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="newTreaty">
        <h5>{{$t('message.cover')}}</h5>
        <ul>
          <li>
            <p>{{$t('message.contractdays')}}</p>
            <div class="daycontent">
              {{addDay}} Day <span>+{{addPercent}}%</span>
            </div>
          </li>
          <li>
            <p>{{$t('message.myusdt')}}</p>
            <h4>{{usdt}}</h4>
          </li>
          <li>
            <p>{{$t('message.currcontractamount')}}</p>
            <h4 style="color:black">{{addAmount}}</h4>
          </li>
          <li>
            <p>{{$t('message.remainday')}}</p>
            <h4 style="color:black">{{addSurplus}} Day</h4>
          </li>
          <li>
            <p>{{$t('message.margin1')}}</p>
            <el-input
              v-model="total"
              :placeholder="$t('message.enter100')+beishu+$t('message.times')"
            ></el-input>
          </li>
        </ul>
        <el-button
          class="submit"
          @click="submit1()"
        >{{$t('message.confirm')}}</el-button>
      </div>
    </el-dialog>
    <Pin
      @submit="submit"
      ref="child"
    />
  </div>
</template>

<script>
import * as http from "../public/index";
import api from "../API/index";
import Pin from "../components/pin";
export default {
  name: "Cover",
  components: { Pin },
  props: [
    "coverid",
    "addDay",
    "addPercent",
    "usdt",
    "addAmount",
    "addSurplus",
    "beishu"
  ],
  data() {
    return {
      dialogVisible: false,
      total: ""
    };
  },
  methods: {
    submit1() {
      let number = this.total;
      if (number) {
        this.$refs.child.open();
      } else {
        alert(this.$t("message.covering"));
      }
    },
    submit(pwd) {
      api.choices(http.COVERING,{amount:this.total,safePwd:pwd}).then(result=>{
        if(result.status==200){
          alert(result.msg)
          window.location.reload()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    covering() {
      this.dialogVisible = !this.dialogVisible;
    }
  }
};
</script>

<style scoped>
</style>
