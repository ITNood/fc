<template>
  <div>
    <el-dialog :visible.sync="centerDialogVisible" width="100%" center id="pin">
      <div class="pay-tool">
        <div class="pay-tool-title border-bottom">
          <span class="icon1 icon-back"></span>
        </div>
        <!--密码输入框-->
        <div class="pay-tool-content">
          <div class="pay-tool-inputs">
            <div class="item" v-for="i in items" :key="i">
              <span class="icon_dot" v-if="password[i]"></span>
            </div>
          </div>
        </div>
        <!--键盘-->
        <div class="pay-tool-keyboard">
          <ul>
            <li @click="keyUpHandle($event)" v-for="val in keys" :key="val">{{ val }}</li>
            <li class="del" @click="delHandle">
              <span class="icon-del el-icon-back"></span>
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0];
export default {
  name: "Pin",
  data() {
    return {
      centerDialogVisible: false,
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: []
    };
  },
  methods: {
    open(flag) {
      this.centerDialogVisible = !this.centerDialogVisible;
      this.clearPasswordHandle();
    },
    ajaxData() {
      if (this.password.length >= 6) {
        let password = this.password.join("");
        //提交方法传给父组件
        this.$emit("submit", password);
        this.centerDialogVisible = !this.centerDialogVisible;
        this.clearPasswordHandle();
      }
      return false;
    },
    keyUpHandle(e) {
      let text = e.currentTarget.innerText;
      let len = this.password.length;
      if (!text || len >= 6) return;
      this.password.push(text);
      this.ajaxData();
    },
    //删除密码
    delHandle() {
      if (this.password.length <= 0) return false;
      this.password.shift();
    },

    //清空密码
    clearPasswordHandle() {
      this.password = [];
    }
  }
};
</script>

<style scoped>
</style>
