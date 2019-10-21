<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
      <div class="selectLang">
        <el-radio-group
          v-model="radio1"
          @change="changeRadio()"
        >
          <el-radio
            label="1"
            border
          >English</el-radio>
          <el-radio
            label="2"
            border
          >简体中文</el-radio>
        </el-radio-group>
        <!-- <el-button class="submit" style="margin-top:120px;">确认</el-button> -->
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
      msg:'',
      radio1: ""
    };
  },
  mounted() {
    let lang = window.localStorage.getItem("lang");
    console.log(lang);
    if (lang === "cn") {
      this.radio1 = "2";
    } else if (lang === "en") {
      this.radio1 = "1";
    }
    this.msg=this.$t('message.language')
  },
  
  methods: {
    changeRadio() {
      //console.log(this.radio1)
      let that = this;
      let number = that.radio1;
      if (number == 1) {
        localStorage.setItem("lang", "en");
        that.$i18n.locale = "en";
      } else {
        localStorage.setItem("lang", "cn");
        that.$i18n.locale = "cn";
      }
      this.msg = this.$t("message.language");
    }
  },
  // created() {
  //   localStorage.lang == undefined ? "cn" : localStorage.lang;
  // }
};
</script>

<style scoped>
</style>
