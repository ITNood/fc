<template>
  <div>
    <Footer />
    <div id="myPhoto">
      <div class="avatarPicter">
        <el-avatar icon="el-icon-user-solid" :src="avatar" :size="70" class="myAvatar"></el-avatar>
      </div>
      <router-link to="" class="icon iconfont icon-edit"></router-link>
      <h5>{{username}}</h5>
      <p>ID:{{id}}</p>
    </div>
    <div class="myList">
      <div class="myContent">
        <!-- <ul>
          <li>
            <router-link to="">
              <i class="icon iconfont icon-jilu"></i>
              <span class="el-icon-arrow-right"></span>
              报单中心
            </router-link>
          </li>
          <li>
            <router-link to="">
              <i class="icon iconfont icon-fuwu"></i>
              <span class="el-icon-arrow-right"></span>
              服务中心
            </router-link>
          </li>
          <li>
            <router-link to="">
              <i class="icon iconfont icon-shopfill"></i>
              <span class="el-icon-arrow-right"></span>
              商家中心
            </router-link>
          </li>
          <li>
            <router-link to="">
              <i class="icon iconfont icon-shanchujiedian"></i>
              <span class="el-icon-arrow-right"></span>
              超级节点
            </router-link>
          </li>
        </ul> -->
        <ul>
          <li v-for="(item,index) in items" :key="index">
            <router-link :to="item.url">
              <i class="icon iconfont" :class="item.iconClass"></i>
              <span class="el-icon-arrow-right"></span>
              {{item.name}}
            </router-link>
          </li>
        </ul>
        <el-button class="submit" style="margin-top:10px;">退出登录</el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import Footer from "../../components/nav";
export default {
  components: { Footer },
  data() {
    return {
      avatar:require('../../assets/image/avatar.png'),
      username:'Boy',
      id:'0001',
      items:[
        {url:'/my/invite/index',iconClass:'icon-yaoqingzhaobiao',name:'邀请伙伴'},
        {url:'/my/manage/index',iconClass:'icon-yonghu2',name:'直接管理'},
        {url:'/my/usdt/index',iconClass:'icon-T',name:'USDT绑定'},
        {url:'/my/set/index',iconClass:'icon-ai-safe',name:'安全设置'},
        {url:'',iconClass:'icon-yuyan',name:'语言设置'},
        {url:'',iconClass:'icon-about_fill',name:'关于我们'}
      ]
    };
  },
};
</script>

<style scoped>
</style>
