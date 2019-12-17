<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margn-top:70px;margin-bottom:20px;"
    >
      <div
        class="infinite-list-wrapper"
        style="overflow:auto ;height:calc(100vh - 90px)"
      >
        <ul class="list">
          <li
            v-for="(item,index) in items"
            :key="index"
            class="list-item"
          >
            <span>{{item.detail}}</span>
            <p>{{item.date}}</p>

            <h6
              v-if="item.state==1"
              style="color:#0fbcfa"
            >+{{item.amount}}</h6>
            <h6
              v-else
              style="color:red"
            >-{{item.amount}}</h6>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as http from "../../../public/index";
import api from "../../../API/index";
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t("message.financial"),
      items: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      let id = this.$route.query.id;
      api
        .choices(http.CONTRACTDETAILS, { id: id })
        .then(result => {
          if (result.status == 200) {
            this.items = result.res.record;
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
