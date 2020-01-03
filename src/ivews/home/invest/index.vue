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
import * as http from '../../../public/index'
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
        .choices(http.INVEST)
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
      let code = this.code; 
      if (code) {
        download(this.code, "code.png", "png/png");
      } else {
        alert(this.$t('message.picter'));
      }
    },
    //复制
    copy() {
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
