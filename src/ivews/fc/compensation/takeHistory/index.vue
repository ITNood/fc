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
import api from '../../../../API/index'
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:'取出记录',
        items:[]
    };
  },
  created(){
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices('api/takeOut/record').then(result=>{
              if(result.status==200){
                  this.items=this.items.concat(result.res.record)
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
