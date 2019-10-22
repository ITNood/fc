<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <div class="about">
        <div class="aboutContent">
            <div class="aboutfont">
                <img src="../../../assets/image/logo.png">
                <p>After one hundred, when art historians research in the 21st century, in the currency of the encryption image is likely to be an integral part of their discussion. In the discussion, the currency and its ubiquitous icon will become an important topic. The COINS to the encrypted currency world, basic equivalent to $to the mainstream of the global economic system.</p>
                <div class="downloadCode"><img :src="code" ></div>
                <div class="codefont">{{$t('message.download')}}</div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import api from '../../../API/index'
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:this.$t('message.about'),
        code:''
    };
  },
  mounted() {
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices('api/home/uploadAddress').then(result=>{
              if(result.status==200){
                  this.code=result.res.img
              }
          }).catch(err=>{
              console.log(err)
          })
      }
  },
};
</script>

<style scoped>
</style>
