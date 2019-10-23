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
        <el-col :span="6">
          <router-link
            to=""
            class="take"
          >取出记录</router-link>
        </el-col>
      </el-row>
    </el-header>
    <div class="layout">
      <div id="waveEchart" ref='waveEchart' ></div>
      <ul class="compensation">
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pin from "../../../components/pin";
export default {
  components: { Pin },
  data() {
    return {
      title: "薪酬"
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
