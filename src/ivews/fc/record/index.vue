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
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-immediate='false'
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
        <p v-if="loading" ><i class="el-icon-loading"></i>Loading...</p>
        <p v-if="noMore">- - - - {{$t('message.more')}} - - - -</p>
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
      msg: "锁定FC记录",
      count: false,
      loading: false,
      items: [],
      page: 1,
      show:true
    };
  },
  computed: {
    noMore() {
      return this.count;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  created() {
    this.getdata();
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.page++;
        api
          .choices("api/home/algebraRecord", { page: this.page })
          .then(result => {
            if (result.status == 200) {
              if (result.res.length == 0 || result.res.length < 20) {
                this.count = true;
                this.loading = false;
              }
              this.items = this.items.concat(result.res);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 1000);
      console.log(this.loading);
    },
    getdata() {
      api
        .choices("api/home/algebraRecord")
        .then(result => {
          if (result.status == 200) {
            if (result.res.length == 0 || result.res.length < 20) {
              this.count = true;
              this.loading = false;
            }
            this.items = this.items.concat(result.res);
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
