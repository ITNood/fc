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
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <li
            v-for="(item,index) in items"
            :key="index"
            class="list-item"
          >
            <p>{{item.date}}</p>
            <span>{{item.text}}</span>
            <h6 v-if="item.state==1" style="color:#12c02f">+{{item.amount}}</h6>
            <h6 v-else style="color:#d91717">-{{item.amount}}</h6>
          </li>
        </ul>
        <p v-if="loading"><i class="el-icon-loading"></i>加载中...</p>
        <p v-if="noMore">- - - - 没有更多数据了 - - - -</p>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: "USDT明细",
      count: 20,
      loading: false,
      items: [
          {date:'2019/10/12 15:00',text:'usdt提现',state:1,amount:'100.14'},
          {date:'2019/10/12 15:00',text:'usdt提现',state:2,amount:'100.14'},
          {date:'2019/10/12 15:00',text:'usdt提现',state:2,amount:'100.14'},
          {date:'2019/10/12 15:00',text:'usdt提现',state:2,amount:'100.14'},
          {date:'2019/10/12 15:00',text:'usdt提现',state:2,amount:'100.14'},
          {date:'2019/10/12 15:00',text:'usdt提现',state:1,amount:'100.14'},
          {date:'2019/10/12 15:00',text:'usdt提现',state:2,amount:'100.14'}
      ],
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
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.page++;
        //this.itmes;
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style scoped>
</style>
