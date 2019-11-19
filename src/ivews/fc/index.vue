<template>
  <div>
    <Footer />
    <div
      class="layout"
      style="margin:20px;"
    >
      <el-row :gutter="15">
        <el-col
          :span="12"
          class="fc"
        >
          <h5>{{FC}}</h5>
          <router-link to="/fc/record/index?id=15">{{$t('message.criculation')}}>></router-link>
        </el-col>
        <el-col
          :span="12"
          class="fc"
        >
          <h5>{{closeFC}}</h5>
          <router-link to="/fc/record/index?id=16">{{$t('message.lock')}}>></router-link>
        </el-col>
      </el-row>

    </div>
    <!--fc-->
    <div class="fcList">
      <div class="operate">
        <ul class="clear">
          <li>
            <a @click="openValue()">
              <span class="icon iconfont icon-anshengxupailie"></span>
                 <p>{{$t('message.valueAdd')}}</p>
            </a>
          </li>
          <li>
            <router-link to="/fc/exchange/index">
              <span class="icon iconfont icon-jixuduihuan"></span>
                 <p>{{$t('message.exchange')}}</p>
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/fc/compensation/index">
              <span class="icon iconfont icon-qianbao"></span>
                 <p>{{$t('message.compensation')}}</p>
            </router-link>
          </li> -->
          <li>
            <router-link to="/fc/recycling/index">
              <span class="icon iconfont icon-xunhuanxuyuezhuanzhang"></span>
                 <p>{{$t('message.appointment')}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!--list-->
      <div class="salary">
        <ul>
          <li v-for="(list,index) in lists" :key="index">
            <h5>{{list.date}}<span v-if="list.state==0">{{$t('message.ongoing')}}</span><span v-else>{{$t('message.end')}}</span></h5>
            <div class="data">
              <div class="progressSet">
                <el-progress type="circle" :width="100" :stroke-width="3" :show-text="false" color="#0ebcf9" :percentage="list.percent"></el-progress>
                <div class="progressData">
                  <h6>{{list.number}}</h6>
                  <p>{{$t('message.week')}}</p>
                </div>
              </div>
              <div class="result">
                <p>{{$t('message.total')}}：<span>{{list.total_amount}}</span></p>
                <p>{{$t('message.salary')}}：<span>{{list.every_amount}}</span></p>
                <p>{{$t('message.forWeek')}}：<span>{{list.number}}</span></p>
                <p>{{$t('message.settlement')}}：<span>{{list.complete_number}}</span></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Value :dialogVisible="show" :FC="closeFC" :ratio="num" ref="child"/>
  </div>
</template>

<script>
import *as http from '../../public/index'
import api from '../../API/index'
import Footer from "../../components/nav";
import Value from '../../components/value'
export default {
  components: { Footer ,Value},
  data() {
    return {
      FC: "",
      closeFC: "",
      show:true,
      amount:0,
      num:0,
      // items: [
      //   { url: "", iconClass: "icon-anshengxupailie", name: this.$t('message.valueAdd') },
      //   { url: "", iconClass: "icon-jixuduihuan", name: this.$t('message.exchange') },
      //   { url: "", iconClass: "icon-qianbao", name: this.$t('message.compensation') },
      //   { url: "", iconClass: "icon-xunhuanxuyuezhuanzhang", name: this.$t('message.repo') }
      // ],
      lists:[]
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    openValue(){
      //this.
      this.$refs.child.opening()
    },
    getdata(){
      api.choices(http.FC).then(result=>{
        if(result.status==200){
          this.FC=result.res.flowFc
          this.closeFC=result.res.lockFc
          this.num=result.res.ratio
          this.lists=this.lists.concat(result.res.order)
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
