<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="currency">
        <p>套利币种</p>
        <div class="coin"><img :src="imgSrc">{{name}}<i class="el-icon-arrow-right"></i></div>
        <p>套利金额</p>
        <el-input
          v-model="amount"
          placeholder="请输入100的倍数"
          class="coinAmount"
        ></el-input>
        <el-button
          class="submit"
          @click="submit1()"
        >确认</el-button>
      </div>
      <div class="tips">
        <p>温馨提示：</p>
        <p>套利开放时间为9：00 ~ 18：00 （每周日不支持套利服务）</p>
        <p>每日所产生的利润将在次日开盘前结算</p>
        <p>套利金额必须为100USDT的倍数</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["name","imgSrc","id","name"],
  name: "Interest",
  data() {
    return {
      amount: "",
      dialogVisible:false
    };
  },
  methods: {
    submit1() {
      this.dialogVisible = !this.dialogVisible;
    },
    open() {
      this.dialogVisible = !this.dialogVisible;
    }
  }
};
</script>

<style scoped>
</style>
