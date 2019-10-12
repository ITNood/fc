<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <el-tabs v-model="activeName" id="tabs">
            <el-tab-pane label="USDT提现" name="first">
                <ul class="cash">
                    <li>
                        <p>我的USDT</p>
                        <h5>$ {{usdt}}</h5>
                    </li>
                    <li>
                        <p>提现数量</p>
                        <el-input v-model="amount" placeholder="请输入100的倍数" class="entry"></el-input>
                    </li>
                </ul>
                <el-button class="submit" style="margin-top:80px;" @click="submit()">确认</el-button>
            </el-tab-pane>
            <el-tab-pane label="提现记录" name="second">
                <div class="cashList">
                    <ul>
                        <li v-for="(item,index) in items" :key="index">
                            <h5>{{item.amount}}USDT</h5>
                            <p>{{item.date}}</p>
                            <span v-if="item.state==1" style="color:#0fdc79">处理中</span>
                            <span v-else style="color:#999">已完成</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:'USDT提现',
        activeName:'first',
        usdt:'100.00',
        amount:'',
        items:[
            {amount:'100.00',date:'2019/10/12 15:00',state:1},
            {amount:'100.00',date:'2019/10/12 15:00',state:2}
        ]
    };
  }
};
</script>

<style scoped>
</style>
