<template>
  <div>
    <el-header id="top" height="60px">
        <el-row :gutter="15">
            <el-col :span="6" class="center" style="height:60px;">
                <i class="el-icon-arrow-left back" @click="back()"></i>
            </el-col>
            <el-col :span="12" class="title">{{title}}</el-col>
        </el-row>
    </el-header>
  </div>
</template>

<script>
export default {
  props:["title"],
  name: "Top",
  data() {
    return {};
  },
  methods: {
      back(){
          this.$router.go(-1)
      }
  },
};
</script>

<style scoped>
</style>
