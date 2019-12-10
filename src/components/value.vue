<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <ul class="cash">
        <li>
          <p>{{$t('message.locked')}}</p>
          <h5>{{FC}}</h5>
        </li>
        <li>
          <p>{{$t('message.valueAdd')}}</p>
          <el-input
            v-model="amount"
            :placeholder="$t('message.entryValue')"
            class="entry"
          ></el-input>
        </li>
        <li>
          <p>{{$t('message.eventGet')}}</p>
          <el-input
            v-model="number"
            class="entry"
          ></el-input>
        </li>
      </ul>
      <el-button
        class="submit"
        style="margin-top:80px;"
        @click="submit1()"
      >{{$t('message.confirm')}}</el-button>
    </el-dialog>
    <Pin
      @submit="submit"
      ref="child"
    />
  </div>
</template>

<script>
import * as http from '../public/index'
import api from "../API/index";
import Pin from "../components/pin";
export default {
  components: { Pin },
  props: ["FC", "ratio"],
  name: "Value",
  data() {
    return {
      dialogVisible: false,
      amount: "",
      number: 0
    };
  },
  // mounted() {
  //   console.log(this.ratio)
  // },
  updated() {
      this.number=this.ratio*this.amount
  },
  methods: {
    opening() {
      this.dialogVisible = !this.dialogVisible;
      this.amount=''
    },
    submit1() {
      let amount = this.amount;
      if (amount) {
        this.dialogVisible = !this.dialogVisible;
        this.$refs.child.open();
      }else {
        alert(this.$t('message.entryValue'))
      }
    },
    submit(pwd) {
      api
        .choices(http.VALUE, { amount: this.amount, safePwd: pwd })
        .then(result => {
          if (result.status == 200) {
            alert(result.msg)
            window.location.reload()
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
