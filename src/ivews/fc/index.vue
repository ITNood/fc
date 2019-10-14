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
          <router-link to="">流通FC>></router-link>
        </el-col>
        <el-col
          :span="12"
          class="fc"
        >
          <h5>{{closeFC}}</h5>
          <router-link to="">锁定FC>></router-link>
        </el-col>
      </el-row>

    </div>
    <!--fc-->
    <div class="fcList">
      <div class="operate">
        <ul class="clear">
          <li
            v-for="(item,index) in items"
            :key="index"
          >
            <router-link :to="item.url">
              <span
                class="icon iconfont"
                :class="item.iconClass"
              ></span>
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!--list-->
      <div class="salary">
        <ul>
          <li v-for="(list,index) in lists" :key="index">
            <h5>{{list.date}}<span>{{list.state}}</span></h5>
            <div class="data">
              <div class="progressSet">
                <el-progress type="circle" :width="100" :stroke-width="3" :show-text="false" color="#0ebcf9" :percentage="list.prcent"></el-progress>
                <div class="progressData">
                  <h6>{{list.number}}</h6>
                  <p>剩余周数</p>
                </div>
              </div>
              <div class="result">
                <p>薪资总额：<span>{{list.total}}</span></p>
                <p>薪资标准：<span>{{list.pay}}</span></p>
                <p>待结算周：<span>{{list.week}}</span></p>
                <p>已结算周：<span>{{list.end}}</span></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "../../components/nav";
export default {
  components: { Footer },
  data() {
    return {
      FC: "100.00",
      closeFC: "100.00",
      items: [
        { url: "", iconClass: "icon-anshengxupailie", name: "增值" },
        { url: "", iconClass: "icon-jixuduihuan", name: "兑换" },
        { url: "", iconClass: "icon-qianbao", name: "薪酬" },
        { url: "", iconClass: "icon-xunhuanxuyuezhuanzhang", name: "回购" }
      ],
      lists:[
        {date:'2018/10/12',state:'进行中',prcent:50,number:8,total:100,pay:100,week:100,end:100},
        {date:'2018/10/12',state:'进行中',prcent:50,number:8,total:100,pay:100,week:100,end:100},
        {date:'2018/10/12',state:'进行中',prcent:50,number:8,total:100,pay:100,week:100,end:100}
      ]
    };
  }
};
</script>

<style scoped>
</style>
