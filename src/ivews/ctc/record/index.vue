<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px;"
    >
      <ul class="recharge">
        <li
          v-for="(item,index) in items"
          :key="index"
        >
          <p>{{item.date}}</p>
          <div class="contentRight">
            <p>{{$t('message.buy')}} {{item.number}} CTC</p>
            <span
              style="color:#0fbcfa"
            >{{$t('message.buyed')}}</span>
          </div>
        </li>
      </ul>
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
      msg: this.$t('message.buyRecord'),
      items: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices(http.CTCRECORD)
        .then(result => {
          if (result.status == 200) {
            this.items = result.res;
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
