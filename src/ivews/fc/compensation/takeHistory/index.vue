<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <div class="takeout">
            <ul>
                <li v-for="(item,index) in items" :key="index">
                    <p>{{item.date}}</p>
                    <span>{{item.text}}</span>
                    <h5>-{{item.amount}}</h5>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import * as http from '../../../../public/index'
import api from '../../../../API/index'
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:this.$t('message.takeRecord'),
        items:[]
    };
  },
  created(){
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices(http.TAKERECORD).then(result=>{
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
