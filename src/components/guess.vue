<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="guess-logo"><img :src="logo"></div>
      <div class="newTreaty">
        <ul>
          <li>
            <p>{{$t('message.myusdt')}}</p>
            <h4>{{usdt}}</h4>
          </li>

          <li>
            <p>{{$t('message.margin')}}</p>
            <el-input
              v-model="total"
              :placeholder="$t('message.contestusdt')"
            ></el-input>
          </li>
        </ul>
        <el-button
          class="submit"
          @click="submit1()"
        >{{$t('message.confirm')}}</el-button>
      </div>
      <div class="tips">
        <p>{{$t('message.explain')}}：</p>
        <p>1、{{$t('message.each')}}；</p>
        <p>2、{{$t('message.daily')}}；</p>
        <p>3、{{$t('message.openday')}}；</p>
        <p>4、{{$t('message.benefit')}}；</p>
        <p>5、{{$t('message.winner')}}。</p>
      </div>
    </el-dialog>
    <Pin
      @submit="submit"
      ref="child"
    />
  </div>
</template>

<script>
import *as http from '../public/index'
import api from '../API/index'
import Pin from "../components/pin";
export default {
  name: "Guess",
  props: ["usdt", "logo", "id"],
  components: { Pin },
  data() {
    return {
      dialogVisible: false,
      total: ""
    };
  },
  methods: {
    guess() {
      this.dialogVisible = !this.dialogVisible;
    },
    submit1() {
      let number = this.total;
      if (number) {
        this.$refs.child.open();
      } else {
        alert(this.$t('message.contestAmount'));
      }
    },
    submit(pwd){
        api.choices(http.SUBMITGUESS,{id:this.id,amount:this.total,safePwd:pwd}).then(result=>{
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
