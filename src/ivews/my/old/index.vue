<template>
  <div class="oldhuiyuan">
    <Top :title="msg" />
    <div
      class="layout"
      style="margin-bottom:20px"
    >
      <div class="income" >
        <p>{{$t('message.today')}}</p>
        <ul style="padding:30px 20px ">
          <li>
            <h5 style="color:#000">{{share}}</h5>
            <span>U锁仓钱包（ lock ）</span>
          </li>
          <li>
            <h5 style="color:#000">{{leader}}</h5>
            <span>兑冲钱包（ Hedge ） </span>
          </li>
        </ul>
      </div>
    <div class="oldmoney">
        <div class="title">
            <el-row>
            <el-col :span="12"><h5>兑冲钱包转账</h5></el-col>
            <el-col :span="12"><router-link to="message"> <div class="right"><h5>转账记录 <i style="color:#999" class="el-icon-arrow-right back"></i></h5></div> </router-link></el-col>
            </el-row>
        </div>
            <div class="otherlogin">
          <el-form
            :model="forgetForm"
            ref="forgetForm"
            class="loginWay"
          >
            <el-form-item
              :label="$t('message.account')"
              prop="username"
            >
              <el-input
                v-model="forgetForm.username"
                placeholder="请输入您需转账的伙伴帐号"
              ></el-input>
            </el-form-item>
             <el-form-item
              label="转账数量"
              prop="username"
            >
              <el-input
                v-model="forgetForm.number"
                placeholder="请输入您需转账的数量"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            class="submit"
            @click="submit()"
            style="margin-top:140px;width"
          >{{$t('message.confirm')}}</el-button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import * as http from '../../../public/index'
import api from "../../../API/index";
import Top from "../../../components/top";
export default {
  components: { Top },
  data() {
    return {
      msg: "原始会员",
      share: 0,
      leader: 0,
      forgetForm:{username:"",number:""}
    };
  },
  created() {
    this.getdata()
  },

  methods: {
      getdata() {
        // api
        //     .choices(http.FINANCIAL)
        //     .then(result => {
               
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }
  }
};
</script>

<style scoped>


</style>
