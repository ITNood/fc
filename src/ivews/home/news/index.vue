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
        <el-tab-pane :label="$t('message.mynews')" name="first">
            <div class="infinite-list-wrapper" style="overflow:auto;height:calc(100vh - 134px)" >
                <ul class="news" >
                <li v-for="(item,index) in items" :key="index" class="list-item" >
                    <router-link :to="{path:'/home/news/details/index',query:{id:item.id}}">
                            <p>{{item.date}}<span v-if="item.isCheck==true"></span></p>
                            <h6>{{item.title}}</h6>
                            <i class="el-icon-arrow-right"></i>
                    </router-link>
                </li>
                </ul>
                <!-- <p v-if="loading"><i class="el-icon-loading"></i>加载中...</p>
                <p v-if="noMore">- - - - 没有更多数据了 - - - -</p> -->
            </div>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('message.notice')"
          name="second"
        >
            <div class="infinite-list-wrapper" style="overflow:auto;height:calc(100vh - 134px)" >
                    <ul class="news">
                        <li v-for="(item,index) in lists" :key="index" class="list-item" >
                            <router-link :to="{path:'/home/news/details/index',query:{id:item.id}}">
                                <p>{{item.date}}<span v-if="item.isCheck==true"></span></p>
                                <h6>{{item.title}}</h6>
                                <i class="el-icon-arrow-right"></i>
                            </router-link>
                        </li>
                    </ul>
                    <!-- <p v-if="loading"><i class="el-icon-loading"></i>加载中...</p>
                    <p v-if="noMore">- - - - 没有更多数据了 - - - -</p> -->
            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
import api from '../../../API/index'
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t('message.News'),
      activeName: "first",
      items:[],
      lists:[]
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata(){
      api.choices('api/msg/index').then(result=>{
        if(result.status==200){
          this.items=this.items.concat(result.res.msg)
          this.lists=this.lists.concat(result.res.notice)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  }
};
</script>

<style scoped>
</style>
