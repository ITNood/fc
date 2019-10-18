<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px;"
    >
      <div class="news-title">
        <h5>{{newTitle}}</h5>
        <p>{{date}}</p>
      </div>
      <div
        class="newsContent"
        v-html="detail"
      >{{detail}}</div>
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
      msg: "",
      newTitle: "",
      date: "",
      detail:''
    };
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata(){
      let id=this.$route.query.id
      api.choices('api/msg/get',{id:id}).then(result=>{
        if(result.status==200){
          this.date=result.res.date
          this.newTitle=result.res.title
          this.detail=result.res.detail
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
