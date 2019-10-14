<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px;"
    >
      <el-tabs
        v-model="activeName"
        id="tabs"
      >
        <el-tab-pane label="我的消息" name="first">
            <div class="infinite-list-wrapper" style="overflow:auto;height:calc(100vh - 134px)" >
                <ul class="news" v-infinite-scroll="load" infinite-scroll-disabled="disabled" >
                <li v-for="(item,index) in items" :key="index" class="list-item" >
                    <router-link :to="{path:'/home/news/details/index',query:{id:item.id}}">
                            <p>{{item.date}}<span v-if="item.state==1"></span></p>
                            <h6>{{item.text}}</h6>
                            <i class="el-icon-arrow-right"></i>
                    </router-link>
                </li>
                </ul>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">- - - - 我也是有底线的 - - - -</p>
            </div>
        </el-tab-pane>
        <el-tab-pane
          label="平台公告"
          name="second"
        >
            <div class="infinite-list-wrapper" style="overflow:auto;height:calc(100vh - 134px)" >
                    <ul class="news" v-infinite-scroll="load" infinite-scroll-disabled="disabled" >
                        <li v-for="(item,index) in lists" :key="index" class="list-item" >
                            <router-link :to="{path:'/home/news/details/index',query:{id:item.id}}">
                                <p>{{item.date}}<span v-if="item.state==1"></span></p>
                                <h6>{{item.text}}</h6>
                                <i class="el-icon-arrow-right"></i>
                            </router-link>
                        </li>
                    </ul>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">- - - - 我也是有底线的 - - - -</p>
            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: "消息与公告",
      activeName: "first",
      count: 20,
      loading: false,
      items:[
          {date:'2019/10/14',state:1,text:'新闻内容',id:1}
      ],
      lists:[
          {date:'2019/10/14',state:1,text:'平台公告',id:1}
      ]
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
