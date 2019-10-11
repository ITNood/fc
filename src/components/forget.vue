<template>
  <div>
    <el-dialog
      :visible.sync="forgetDialog"
      width="85%"
      center
      class="login"
    >
      <div class="otherlogin">
        <img :src="imgSrc">
        <h5>忘记密码</h5>
        <el-button
      class="submit"
      @click="forgetSub()"
    >登录</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["imgSrc"],
  name: "Forget",
  data() {
    return {
      forgetDialog:false
    };
  },
  updated() {
    console.log(this.forgetDialog);
  },
  methods: {
      close(){
          this.forgetDialog=!this.forgetDialog
      }
  },
};
</script>

<style scoped>
</style>
