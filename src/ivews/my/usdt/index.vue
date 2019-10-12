<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
        <div class="bind">
            <p>USDT地址</p>
            <el-input type="textarea" v-model="address" placeholder="请输入或长按粘贴您的USDT地址"></el-input>
            <el-button class="submit" style="margin-top:80px;">确认</el-button>
        </div>
        <div class="tips" style="color:#999">
                <p>温馨提示：</p>
                <p>平台只允许TRC20协议发行的USDT地址</p>
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
        msg:'USDT绑定',
        address:''
    };
  }
};
</script>

<style scoped>
</style>
