<template>
  <div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="85%"
      :close-on-click-modal="false"
      class="login"
    >
      <div class="contractDay">
        <p>{{$t('message.conday')}}</p>
        <div class="contractContent">
          <img :src="imgSrc">
          <p>{{days}}Day</p>
          <p>+{{prt}}%</p>
        </div>
        <p>{{$t('message.currcontractamount')}}</p>
        <div class="amounttotal">{{totals}}</div>
        <p>{{$t('message.remainday')}}</p>
        <div class="amounttotal">{{overday}}Day</div>
        <p>{{$t('message.those')}}</p>
        <el-button
          @click="submit1()"
          class="submit"
        >{{$t('message.over')}}</el-button>
      </div>
    </el-dialog>
    <Pin
      @submit="submit"
      ref="child"
    />
  </div>
</template>

<script>
import * as http from '../public/index'
import api from '../API/index'
import Pin from "../components/pin";
export default {
  props: ["imgSrc", "days", "prt", "totals", "overday",'ids'],
  components: { Pin },
  name: "OverContract",
  data() {
    return {
      centerDialogVisible: false,
    };
  },
  methods: {
    close() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    submit1() {
        this.$refs.child.open()
    },
    submit(pwd) {
        api.choices(http.OVERCONTRACT,{id:this.ids,safePwd:pwd}).then(result=>{
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
