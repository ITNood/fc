<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="newTreaty">
        <h5>{{$t('message.contractOUt')}}</h5>
        <ul>
          <li>
            <p>{{$t('message.contractdays')}}</p>
            <div class="daycontent">
              {{numday}} Day <span>+{{numpercent}}%</span>
            </div>
          </li>
          <li>
            <p>{{$t('message.currcontractamount')}}</p>
            <h4>{{price}}</h4>
          </li>
          <li>
            <p>{{$t('message.remainday')}}</p>
            <h4 style="color:black">{{surplus}} Day</h4>
          </li>
        </ul>
        <el-button
          class="submit"
          @click="submit1()"
        >{{$t('message.confirm')}}</el-button>
      </div>
    </el-dialog>
    <Pin
      @submit="submit"
      ref="child"
    />
  </div>
</template>

<script>
import * as http from '../public/index'
import api from '../API/index'
import Pin from "../components/pin";
export default {
  name: "Cheackout",
  components: { Pin },
  props:['numday','numpercent','price','surplus','checkid'],
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
      check(){
          this.dialogVisible=!this.dialogVisible
      },
      submit1(){
        this.$refs.child.open()
      },
      submit(pwd){
          api.choices(http.CHECKOUT,{id:this.checkid,safePwd: pwd}).then(result=>{
            if(result.status==200){
              alert(result.msg)
              window.location.reload()
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
