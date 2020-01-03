<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px"
    >
      <div class="income">
        <p>{{$t('message.today')}}</p>
        <ul>
          <li>
            <h5>{{share}}</h5>
            <span>{{$t('message.rewards')}}</span>
          </li>
          <li>
            <h5>{{leader}}</h5>
            <span>{{$t('message.award')}}</span>
          </li>
        </ul>
      </div>
      <div class="income">
        <p>{{$t('message.weekincome')}}</p>
        <ul>
          <li>
            <h5>{{share1}}</h5>
            <span>{{$t('message.rewards')}}</span>
          </li>
          <li>
            <h5>{{leader1}}</h5>
            <span>{{$t('message.award')}}</span>
          </li>
        </ul>
      </div>
      <div class="shareHistry">
        <h5>{{$t('message.incomerecord')}}</h5>
        <div class="shareList">
          <ul>
            <li
              v-for="(item,index) in items"
              :key="index"
            >
              <el-row :gutter="10">
                <el-col :span="8">{{item.text}}</el-col>
                <el-col
                  :span="8"
                  style="text-align:center"
                >{{item.amount}}</el-col>
                <el-col
                  :span="8"
                  style="text-align:right"
                >{{item.date}}</el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as http from '../../../public/index'
import api from "../../../API/index";
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t("message.detail"),
      share: 0,
      leader: 0,
      share1: 0,
      leader1: 0,
      items: []
    };
  },
  created() {
    this.getdata()
  },

  methods: {
      getdata() {
        api
            .choices(http.FINANCIAL)
            .then(result => {
                if (result.status == 200) {
                    this.share = result.res.today.share;
                    this.leader = result.res.today.leader;
                    this.share1 = result.res.week.share;
                    this.leader1 = result.res.week.leader;
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
