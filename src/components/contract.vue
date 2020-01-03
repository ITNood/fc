<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="contractDay">
        <p>{{$t('message.conday')}}</p>
        <div class="contractContent">
          <img :src="img">
          <p>{{day}}Day</p>
          <p>+{{percent}}%</p>
        </div>
        <p>{{$t('message.myusdt')}}</p>
        <div class="amounttotal">{{moeny}}</div>
        <p>{{$t('message.buycontract')}}</p>
        <el-input
          v-model="price"
          class="allTotal"
          :placeholder="$t('message.enter100')+number+$t('message.times')"
        ></el-input>
        <el-button
          @click="submit1()"
          class="submit"
        >{{$t('message.confirm')}}</el-button>
      </div>
    </el-dialog>
    <Pin
      @submit="submit"
      ref="childs"
    />
  </div>
</template>

<script>
import * as http from "../public/index";
import api from "../API/index";
import Pin from "../components/pin";
export default {
  props: ["moeny", "img", "day", "percent", "id", "number"],
  components: { Pin },
  name: "Contract",
  data() {
    return {
      price: "",
      dialogVisible: false
    };
  },
  methods: {
    opening() {
      this.dialogVisible = !this.dialogVisible;
    },
    submit1() {
      let val = this.price;
      if (val) {
        this.dialogVisible = !this.dialogVisible;
        this.$refs.childs.open();
      } else {
        alert(this.$t("message.contractbe"));
      }
    },
    submit(pwd) {
      api
        .choices(http.BUYCONTRACT, {
          id: this.id,
          amount: this.price,
          safePwd: pwd
        })
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
