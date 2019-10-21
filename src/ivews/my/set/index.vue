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
        msg:this.$t('message.security'),
        items:[
            {url:'/my/set/mobile/index',name:this.$t('message.mobile')},
            {url:'/my/set/password/index',name:this.$t('message.loginPwd')},
            {url:'/my/set/pin/index',name:this.$t('message.payPwd')}
        ]
    };
  }
};
</script>

<style scoped>
</style>
