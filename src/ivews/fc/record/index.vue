<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px;"
    >
      <div
        class="record"
        style="overflow:auto;height:calc(100vh - 80px)"
      >
        <ul
        >
          <li
            v-for="(item,index) in items"
            :key="index"
            class="list-item"
          >
            <p>{{item.date}}</p>
            <!-- <span>{{item.name}}</span> -->
            <h6
              v-if="item.state==1"
              style="color:#12c02f"
            >+{{item.amount}}</h6>
            <h6
              v-else
              style="color:#d91717"
            >-{{item.amount}}</h6>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import * as http from '../../../public/index'
import api from '../../../API/index'
import Top from "../../../components/top";

export default {
  components: { Top },
  data() {
    return {
      msg: "",
      items: [],
      //page: 1,
      show:true
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      let id=this.$route.query.id
      api
        .choices(http.FCRECORD,{id:id})
        .then(result => {
          if (result.status == 200) {
            this.items = this.items.concat(result.res.record);
            this.msg=result.res.name
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
