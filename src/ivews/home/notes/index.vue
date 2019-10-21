<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px"
    >
      <div
        class="infinite-list-wrapper"
        style="overflow:auto;height:calc(100vh - 80px)"
      >
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <li
            v-for="(item,index) in items"
            :key="index"
            class="list-item"
          >
            <p>{{item.date}}</p>
            <span>{{item.name}}</span>
            <h6 v-if="item.state==1" style="color:#12c02f">+{{item.amount}}</h6>
            <h6 v-else style="color:#d91717">-{{item.amount}}</h6>
          </li>
        </ul>
        <p v-if="loading"><i class="el-icon-loading"></i>Loading...</p>
        <p v-if="noMore">- - - - {{$t('message.more')}} - - - -</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../API/index";
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t('message.arbitRecord'),
      count: 20,
      loading: false,
      items: [],
      page: 1
    };
  },
  computed: {
    noMore() {
      return this.count >= this.items.length;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices("api/home/algebraRecord")
        .then(result => {
          if (result.status == 200) {
            this.items = this.items.concat(result.res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.page++;
        api
          .choices("api/home/algebraRecord",{page:this.page})
          .then(result => {
            if (result.status == 200) {
              //console.log(this.items.push(result.res))
              this.items = this.items.concat(result.res);
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
</style>
