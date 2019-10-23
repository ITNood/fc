<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margn-top:70px;margin-bottom:20px;"
    >
      <div
        class="infinite-list-wrapper"
        style="overflow:auto ;height:calc(100vh - 80px)"
      >
        <ul
          class="list"
        >
          <li
            v-for="(item,index) in items"
            :key="index"
            class="list-item"
          >
            <p>{{item.date}}</p>
            <span>{{item.detail}}</span>
            <h6 v-if="item.state==1" style="color:#12c02f">+{{item.amount}}</h6>
            <h6 v-else style="color:#d91717">-{{item.amount}}</h6>
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
      msg: '',
      items: [],
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata(){
      let id=this.$route.query.id
      api.choices('api/wallet/record',{id:id}).then(result=>{
        if(result.status==200){
          this.msg=result.res.name
          this.items=this.items.concat(result.res.record)
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
