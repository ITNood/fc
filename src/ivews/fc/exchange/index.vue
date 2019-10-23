<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px">
        <el-tabs v-model="activeName" id="tabs">
            <el-tab-pane :label="$t('message.usdtWith')" name="first">
                <ul class="cash">
                    <li>
                        <p>我的流通FC</p>
                        <h5>{{fc}}</h5>
                    </li>
                    <li>
                        <p>我的锁定FC</p>
                        <h5>{{close}}</h5>
                    </li>
                    <li>
                        <p>流通FC兑换锁定FC</p>
                        <el-input v-model="amount" class="entry"></el-input>
                    </li>
                </ul>
                <el-button class="submit" style="margin-top:80px;" @click="submit1()">{{$t('message.confirm')}}</el-button>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.record')" name="second">
                <div class="cashList">
                    <ul>
                        <li v-for="(item,index) in items" :key="index">
                            <p>{{item.date}}</p>
                            <h5>{{item.name}}</h5>
                            <span v-if="item.state==0" style="color:#0fbcfa">{{item.amount}}</span>
                            <span v-else style="color:#999">{{item.amount}}</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
  </div>
</template>

<script>
import Pin from '../../../components/pin'
import Top from "../../../components/top";
export default {
  components: { Top,Pin },
  data() {
    return {
        msg:this.$t('message.exchange'),
        activeName:'first',
        show:false,
        fc:0,
        close:0,
        amount:'',
        items:[
            {date:'2019/10/23 10:00',name:'文本',amount:'2222',state:0}
        ],
    };
  },
  methods: {
      submit1(){
          this.$refs.child.open()
      },
      submit(pwd){

      }
  },
};
</script>

<style scoped>
</style>
