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
          
          <div>
              <div style="height:28px;color:#999">{{item.date}}</div>
              <div  style="height:20px"> 转至12312313</div>

          </div>
          <div class="contentRight">
            <p style="color:#fff">USDT</p>
            <span
              v-if="item.state==1"
              style="color:#0fbcfa"
            >{{$t('message.ongoing')}}</span>
            <span
              v-else-if="item.state==2"
              style="color:#e01d43"
            >{{$t('message.failed')}}</span>
            <span
              v-else
              style="color:#999"
            >{{$t('message.successful')}}</span>
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
      msg: "转账记录",
      items: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices(http.INVESRECORD)
        .then(result => {
          if (result.status == 200) {
            this.items = result.res.data;
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
