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
          <p>当前锁定FC</p>
          <h5>{{FC}}</h5>
        </li>
        <li>
          <p>增值金额</p>
          <el-input
          @change="change()"
            v-model="amount"
            placeholder="请输入增值金额"
            class="entry"
          ></el-input>
        </li>
        <li>
          <p>最终获得</p>
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
      :centerDialogVisible="show"
    />
  </div>
</template>

<script>
import api from "../API/index";
import Pin from "../components/pin";
export default {
  components: { Pin },
  props: ["FC", "ratio"],
  name: "Value",
  data() {
    return {
      dialogVisible: false,
      show: false,
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
    },
    submit1() {
      let amount = this.amount;
      if (amount) {
        this.dialogVisible = !this.dialogVisible;
        this.$refs.child.open();
      }else {
        alert('请输入增值金额')
      }
    },
    submit(pwd) {
      api
        .choices("api/fc/insert", { amount: this.amount, safePwd: pwd })
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
