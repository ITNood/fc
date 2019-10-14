<template>
  <div>
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px;"
    >
      <div class="news-title">
        <h5>{{newTitle}}</h5>
        <p>{{date}}</p>
      </div>
      <div
        class="newsContent"
        v-html="detail"
      >{{detail}}</div>
    </div>
  </div>
</template>

<script>
import Top from "../../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: "",
      newTitle: "新闻内容",
      date: "2019/10/14 10:00",
      detail:'11111111111111111111111111'
    };
  }
};
</script>

<style scoped>
</style>
