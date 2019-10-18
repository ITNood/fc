<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
        <div class="set">
            <ul>
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="item.url">
                        {{item.name}}
                        <i class="el-icon-arrow-right"></i>
                    </router-link>
                </li>
            </ul>
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
        msg:'安全设置',
        items:[
            {url:'/my/set/mobile/index',name:'手机号码'},
            {url:'/my/set/password/index',name:'登录密码'},
            {url:'/my/set/pin/index',name:'支付密码'}
        ]
    };
  }
};
</script>

<style scoped>
</style>
