<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">

    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:this.$t('message.about')
    };
  }
};
</script>

<style scoped>
</style>
