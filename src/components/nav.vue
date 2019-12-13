<template>
  <div>
    <el-footer  height="60px" id="nav">
      <el-row :gutter="15">
        <el-col :span="8" v-for="(item,index) in nav" :key="index">
          <router-link :to="item.url" active-class="active">
            <i class="icon iconfont" :class="item.iconClass"></i>
            <p>{{item.text}}</p>
          </router-link>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      nav:[
        {url:'/home/index',text:this.$t('message.arbitrage'),iconClass:'icon-jibenzhexiantu'},
        //{url:'/contract/index',text:this.$t('message.contract'),iconClass:"icon-icon-"},
        {url:'/fc/index',text:'FC',iconClass:'icon-shuju'},
        {url:'/my/index',text:this.$t('message.me'),iconClass:'icon-user'}
      ]
    };
  }
};
</script>

<style scoped>
</style>
