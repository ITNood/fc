<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="newTreaty">
        <h5>{{$t('message.creatContract')}}</h5>
        <ul>
          <li>
            <p>{{$t('message.selectday')}}</p>
            <el-select
              v-model="value"
              @change="changId()"
            >
              <el-option
                v-for="list in todos"
                :key="list.id"
                :value="list.id"
                :label="list.day+' Day '+list.multiple+' %'"
              ></el-option>
            </el-select>
          </li>
          <li>
            <p>{{$t('message.myusdt')}}</p>
            <h4>{{amount}}</h4>
          </li>
          <li>
            <p>{{$t('message.treatryAmount')}}</p>
            <el-input
              v-model="total"
              :placeholder="$t('message.enter100')+number+$t('message.times')"
            ></el-input>
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
import * as http from "../public/index";
import api from "../API/index";
import Pin from "../components/pin";
export default {
  name: "Treaty",
  props: { todos: Array, amount: "", number: "" },
  components: { Pin },
  data() {
    return {
      dialogVisible: false,
      value: "",
      total: ""
    };
  },
  mounted() {
   setTimeout(() => {
      // console.log(this.todos[0].id);
        this.value = this.todos[0].id;
   }, 1000);
  },
  methods: {
    changId() {
      console.log(this.value);
    },
    treaty() {
      this.dialogVisible = !this.dialogVisible;
    },
    submit1() {
      let val = this.value;
      if (val) {
        this.$refs.child.open();
      } else {
        alert(this.$t('message.pleaseamount'));
      }
    },
    submit(pwd) {
      api
        .choices(http.CREATECONTRACT, {
          id: this.value,
          amount: this.total,
          safePwd: pwd
        })
        .then(result => {
          if (result.status == 200) {
            alert(result.msg);
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
