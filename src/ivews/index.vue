<template>
  <div>
    <div id="lang">
      <el-radio-group v-model="radio1" class="selectlang">
        <el-radio-button label="1">简体中文<b @click="entry1()"></b></el-radio-button>
        <el-radio-button label="2">English<b @click="entry()"></b></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        radio1:'1'
    };
  },
  mounted() {
    let lang = window.localStorage.getItem("lang");
    console.log(lang);
    if (lang === "cn") {
      this.radio1 = "1";
    } else if (lang === "en") {
      this.radio1 = "2";
    }
    let token=localStorage.getItem('token')
    if(token){
        this.$router.push('/home/index')
    }
  },
  methods: {
    changeRadio() {
      console.log(this.radio1);
      let that = this;
      let number = that.radio1;
      if (number == 2) {
        window.localStorage.setItem("lang", "en");
        that.$i18n.locale = "en";
        that.radio1 = "2";
      } else {
        window.localStorage.setItem("lang", "cn");
        that.$i18n.locale = "cn";
        that.radio1 = "1";
      }
    },
    entry() {
      let that=this
      window.localStorage.setItem("lang", "en");
      that.$i18n.locale = "en";
      that.radio1 = "2";
      this.$router.push("/login");
    },
    entry1(){
      let that=this
      window.localStorage.setItem("lang", "cn");
        that.$i18n.locale = "cn";
        that.radio1 = "1";
        this.$router.push("/login");
    }
  },
  created() {
    localStorage.lang == undefined ? "cn" : localStorage.lang;
  }
};
</script>

<style scoped>
</style>
