<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="currency">
        <p>{{$t('message.currency')}}</p>
        <div class="coin"><img :src="imgSrc">{{name}}<i class="el-icon-arrow-right"></i></div>
        <p>{{$t('message.arbitAmount')}}</p>
        <el-input
          v-model="amount"
          :placeholder="$t('message.please')+number+$t('message.multiple')"
          class="coinAmount"
        ></el-input>
        <el-button
          class="submit"
          @click="submit1()"
        >{{$t('message.confirm')}}</el-button>
      </div>
      <div class="tips">
        <p>{{$t('message.tips')}}：</p>
        <p>{{$t('message.open')}}</p>
        <p>{{$t('message.nextDay')}}</p>
        <p>{{$t('message.must')}}{{number}} USDT {{$t('message.multiple')}}</p>
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
        alert(this.$t('message.entryAmount'))
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
