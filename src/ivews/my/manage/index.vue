<template>
  <div>
    <Top :title="msg" />
    <div class="layout" style="margin-bottom:20px;">
        <div class="rank">
            <el-row :gutter="15">
                <el-col :span="8" class="manage">
                    <h5>{{allPartner}}</h5>
                    <p>{{$t('message.allPertner')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{one}}</h5>
                    <p>{{$t('message.level_1')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{two}}</h5>
                    <p>{{$t('message.level_2')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{three}}</h5>
                    <p>{{$t('message.level_3')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{four}}</h5>
                    <p>{{$t('message.level_4')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{five}}</h5>
                    <p>{{$t('message.level_5')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{rank}}</h5>
                    <p>{{$t('message.current')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{direct}}</h5>
                    <p>{{$t('message.yesterday')}}</p>
                </el-col>
                <el-col :span="8" class="manage">
                    <h5>{{team}}</h5>
                    <p>{{$t('message.team')}}</p>
                </el-col>
            </el-row>
        </div>

        <!--直邀伙伴-->
        <div class="partner">
            <h5>{{$t('message.invitePartner')}}</h5>
            <div class="partnerList">
                <ul>
                    <li v-for="(item,index) in items" :key="index" class="clear">
                        <img :src="item.avatar">
                        <p>{{item.username}}</p>
                        <p>{{item.total_amount}}</p>
                        <span>{{item.yesterday_amount}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import * as http from '../../../public/index'
import api from '../../../API/index'
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
        msg:this.$t('message.manage'),
        allPartner:'',
        one:'',
        two:'',
        three:'',
        four:'',
        five:'',
        rank:'',
        direct:'',
        team:'',
        items:[]
    };
  },
  created() {
      this.getdata()
  },
  methods: {
      getdata(){
          api.choices(http.MANAGE).then(result=>{
              if(result.status==200){
                  this.items=this.items.concat(result.res.child)
                  this.allPartner=result.res.all
                  this.one=result.res.one
                  this.two=result.res.two
                  this.three=result.res.three
                  this.four=result.res.four
                  this.five=result.res.five
                  this.rank=result.res.level
                  this.direct=result.res.yestDirect
                  this.team=result.res.yestTeam
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
