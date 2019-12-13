<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <ul class="recharge">
            <li v-for="(item,index) in items" :key="index">
                <p>{{item.date}}</p>
                <div class="contentRight">
                    <p>{{$t('message.recharge')}}{{item.amount}}USDT</p>
                    <span v-if="item.state==1" style="color:#0fbcfa">{{$t('message.ongoing')}}</span>
                    <span v-else-if="item.state==2" style="color:#e01d43">{{$t('message.failed')}}</span>
                    <span v-else style="color:#999">{{$t('message.successful')}}</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import api from '../../../../API/index'
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:this.$t('message.rechargeRecord'),
        items:[]
    };
  },
  created() {
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices('api/recharge/order').then(result=>{
              if(result.status==200){
                  this.items=this.items.concat(result.res.data)
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
