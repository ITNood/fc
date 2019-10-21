<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-top:70px;margin-bottom:20px;"
    >
      <div class="invest">
        <h6>{{$t('message.type')}}：<span>{{erc}}</span></h6>
        <img :src="code">
        <el-button class="hold" @click="hold()">{{$t('message.save')}}</el-button>
        <p>{{$t('message.fill')}}</p>
        <div class="address">{{address}}</div>
        <el-button
          ref="copy"
          id="copy"
          :data-clipboard-text="address"
          @click="copy()"
        >{{$t('message.copy')}}</el-button>
      </div>
      <div class="investTips">
          <h6>{{$t('message.rechargeTips')}}：</h6>
          <p>*{{$t('message.return')}}；</p>
          <p>*{{$t('message.deposit')}}；</p>
          <p>*{{$t('message.use')}}；</p>
          <p>*{{$t('message.min')}}。</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../API/index'
import Top from "../../../components/top";
import Clipboard from "clipboard";
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t('message.usdtRecharge'),
      erc: "",
      code: '',
      address: ""
    };
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata(){
      api.choices('api/user/myEthAddress').then(result=>{
        if(result.status==200){
          this.address=result.res.address
          this.code=result.res.img
          this.erc=result.res.type
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //保存图片
    hold() {
      //console.log('下载图片')
      let a = document.createElement("a");
      a.download = name || "pic"; // 设置图片地址
      a.href = this.code;
      a.click();
    },
    copy() {
      var _this = this;
      var clipboard = new Clipboard("#copy");

      clipboard.on("success", e => {
        alert("已复制充币地址");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Message({
          message: "该浏览器不支持自动复制",
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>

<style scoped>
</style>
