<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
        <div class="income">
            <p>今日收入</p>
            <ul>
                <li>
                    <h5>{{share}}</h5>
                    <span>分享奖励</span>
                </li>
                <li>
                    <h5>{{leader}}</h5>
                    <span>领导奖励</span>
                </li>
            </ul>
        </div>
        <div class="income">
            <p>本周收入</p>
            <ul>
                <li>
                    <h5>{{share1}}</h5>
                    <span>分享奖励</span>
                </li>
                <li>
                    <h5>{{leader1}}</h5>
                    <span>领导奖励</span>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import api from '../../../API/index'
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:this.$t('message.detail'),
        share:0,
        leader:0,
        share1:0,
        leader1:0
    };
  },
  created() {
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices('api/home/earnings').then(result=>{
              if(result.status==200){
                  this.share=result.res.today.share
                  this.leader=result.res.today.leader
                  this.share1=result.res.week.share
                  this.leader1=result.res.week.leader
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
