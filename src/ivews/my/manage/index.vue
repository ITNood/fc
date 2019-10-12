<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <div class="rank">
            <el-row :gutter="15">
                <el-col :span="8" class="manage">
                    <h5>{{allPartner}}</h5>
                    <p>全部伙伴</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{one}}</h5>
                    <p>一级伙伴</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{two}}</h5>
                    <p>二级伙伴</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{three}}</h5>
                    <p>三级伙伴</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{four}}</h5>
                    <p>四级伙伴</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{five}}</h5>
                    <p>五级伙伴</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{rank}}</h5>
                    <p>当前有效级别</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{direct}}</h5>
                    <p>昨日有效直推</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{team}}</h5>
                    <p>昨日有效团队</p>
                </el-col>
            </el-row>
        </div>

        <!--直邀伙伴-->
        <div class="partner">
            <h5>直邀伙伴</h5>
            <div class="partnerList">
                <ul>
                    <li v-for="(item,index) in items" :key="index">
                        <img :src="item.img">
                        <p>{{item.name}}</p>
                        <span>{{item.amount}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:'直接管理',
        allPartner:0,
        one:0,
        two:0,
        three:0,
        four:0,
        five:0,
        rank:0,
        direct:0,
        team:0,
        items:[
            {img:require('../../../assets/image/avatar.png'),name:'1651515',amount:'100.00'},
            {img:require('../../../assets/image/avatar.png'),name:'1651515',amount:'100.00'}

        ]
    };
  }
};
</script>

<style scoped>
</style>
