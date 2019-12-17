<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
      <div class="guesshistry">
        <ul>
          <li
            v-for="(item,index) in items"
            :key="index"
          >
            <img :src="item.img">
            <div class="half">
              <h5>${{item.amount}}</h5>
              <p>{{item.date}}</p>
            </div>
            <div class="half">
              <h5
                v-if="item.state==0"
                :style="{'color':(item.state==0?'#0ebcf9':'')}"
              >{{$t('message.waitAward')}}</h5>
              <h5
                v-else-if="item.state==1"
                :style="{'color':(item.state==1?'#179d60':'')}"
              >{{$t('message.correctly')}}</h5>
              <h5 v-else style="color:#999999">{{$t('message.quiz')}}</h5>
              <p v-if="item.state==0"></p>
              <p v-else-if="item.state==1" style="color:white">+${{item.text}}</p>
              <p v-else style="color:#0ebcf9">{{$t('message.champion')}}：{{item.text}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import *as http from '../../public/index'
import api from '../../API/index'
import Top from "../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t('message.myguess'),
      items: []
    };
  },
  created() {
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices(http.GUESSHISTRY).then(result=>{
              if(result.status==200){
                  this.items=result.res.record
              }
          }).catch(err=>{
              console.log(err)
          })
      }
  },
};
</script>

<style scoped>
</style>
