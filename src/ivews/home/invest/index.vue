<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-top:70px;margin-bottom:20px;"
    >
      <div class="invest">
        <h6>链类型：<span>{{erc}}</span></h6>
        <img :src="code">
        <el-button class="hold" @click="hold()">保存二维码到相册</el-button>
        <p>充币地址</p>
        <div class="address">{{address}}</div>
        <el-button
          ref="copy"
          id="copy"
          :data-clipboard-text="address"
          @click="copy()"
        >复制</el-button>
      </div>
      <div class="investTips">
          <h6>充值提示：</h6>
          <p>*本次充值仅支持ERC20(即ETH层层协议)，先自行确认否则资产不能到帐且无法退回；</p>
          <p>*请勿向上述地址充值任何非USDT资产，否则资产将不可找回；</p>
          <p>*您充值至上述地址后，需要整个网络节点的确认，网络确认后到帐，即可正确使用；</p>
          <p>*最小充值金额为：1 USDT，小于最小金额的充值将不能上帐且无法退回。</p>
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
      msg: "USDT充值",
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
