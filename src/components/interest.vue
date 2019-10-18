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
          :placeholder="'请输入'+number+'的倍数'"
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
  props: ["name", "imgSrc", "id", "name", "number"],
  name: "Interest",
  components: { Pin },
  data() {
    return {
      amount: "",
      dialogVisible: false,
      entry: "请输入",
      text: "的倍数",
      type_id: "",
      show: false
    };
  },
  updated() {
    //console.log(this.id);
    this.type_id = this.id;
  },
  methods: {
    submit1() {
      let amount = this.amount;
      if (amount) {
        this.dialogVisible = !this.dialogVisible;
        this.$refs.child.open()
      }else{
        alert('请输入套利金额')
      }
    },
    submit(pwd) {
      api.choices('api/home/algebraSubmit',{safePwd:pwd,type_id:this.type_id,amount:this.amount}).then(result=>{
        if(result.status==200){
          alert(result.msg)
          window.location.reload()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    opening() {
      this.dialogVisible = !this.dialogVisible;
    }
  }
};
</script>

<style scoped>
</style>
