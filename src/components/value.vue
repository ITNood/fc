<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <ul class="cash">
        <li>
          <p>当前锁定FC</p>
          <h5>{{FC}}</h5>
        </li>
        <li>
          <p>增值金额</p>
          <el-input
            v-model="amount"
            placeholder="请输入增值金额"
            class="entry"
          ></el-input>
        </li>
        <li>
          <p>最终获得</p>
          <el-input
            v-model="number"
            class="entry"
          ></el-input>
        </li>
      </ul>
      <el-button
        class="submit"
        style="margin-top:80px;"
        @click="submit1()"
      >{{$t('message.confirm')}}</el-button>
    </el-dialog>
    <Pin
      @submit="submit"
      ref="child"
      :centerDialogVisible="show"
    />
  </div>
</template>

<script>
import Pin from "../components/pin";
export default {
  components: { Pin },
  props: ["FC",'number'],
  name: "Value",
  data() {
    return {
      dialogVisible: false,
      show:false,
      amount:'',
      get:''
    };
  },
  methods: {
    opening() {
      this.dialogVisible = !this.dialogVisible;
    },
    submit1(){
        this.dialogVisible = !this.dialogVisible;
        this.$refs.child.open()
    },
    submit(pwd){

    }
  }
};
</script>

<style scoped>
</style>
