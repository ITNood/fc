<template>
  <div>
    <el-header
      id="top"
      height="60px"
    >
      <el-row :gutter="15">
        <el-col
          :span="6"
          class="center"
          style="height:60px;"
        >
          <i
            class="el-icon-arrow-left back"
            @click="back()"
          ></i>
        </el-col>
        <el-col
          :span="12"
          class="title"
        >{{title}}</el-col>
        <el-col
          :span="6"
          style="position:relative;height:60px;"
        >
          <router-link
            to="/home/invest/histry/index"
            class="histry"
          ><i class="icon iconfont icon-jilu1"></i></router-link>
        </el-col>
      </el-row>
    </el-header>
    <div
      class="layout"
      style="margin-top:70px;margin-bottom:20px;"
    >
      <div class="invest">
        <h6>{{$t('message.type')}}：<span>{{erc}}</span></h6>
        <img :src="code">
        <el-button
          class="hold"
          @click="hold()"
        >{{$t('message.save')}}</el-button>
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
const fs = require('fs');
const path = require('path');
import download from "../../../assets/js/download";
import api from "../../../API/index";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      title: this.$t("message.usdtRecharge"),
      erc: "",
      code: "",
      address: ""
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getdata() {
      api
        .choices("api/user/myEthAddress")
        .then(result => {
          if (result.status == 200) {
            this.address = result.res.address;
            this.code = result.res.img;
            this.erc = result.res.type;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    downloadIamge (imgsrc, name) {
          const url = imgsrc
          this.convertUrlToBase64(url).then((base64) => {
            const blob = this.convertBase64UrlToBlob(base64)
            if (getBrowser() === 'IE' || getBrowser() === 'Edge') {
              window.navigator.msSaveBlob(blob, name)
            } else {
              const a = document.createElement('a')
              const body = document.querySelector('body')
              a.download = name || 'image'
              a.href = URL.createObjectURL(blob)
              a.style.display = 'none'
              body.appendChild(a)
              a.click()
              body.removeChild(a)
              window.URL.revokeObjectURL(a.href)
            }
          })
        },
    //保存图片
    hold() {
        let sUrl= this.code
    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device does not support files downloading. Please try again in desktop browser.');
        return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_self');
    return true;
    },
    copy(){
      let address = this.address;
      if (address) {
        var _this = this;
        var clipboard = new Clipboard("#copy");
        clipboard.on("success", e => {
          alert(this.$t("message.copied"));
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
      } else {
        alert(this.$t("message.noCentent"));
      }
    }
  }
};
</script>

<style scoped>
</style>
