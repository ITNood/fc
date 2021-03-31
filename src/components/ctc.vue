<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      class="login"
      :close-on-click-modal="false"
    >
      <div class="newTreaty">
        <ul>
          <li>
            <p>{{$t('message.myusdt')}}</p>
            <h4>{{amount}}</h4>
          </li>
          <li>
            <p>{{$t('message.available')}}</p>
            <h4>{{number}}</h4>
          </li>
          <li>
            <p>{{$t('message.subscription')}}</p>
            <el-input
              v-model="val"
              :placeholder="$t('message.needto')"
            ></el-input>
          </li>
          <li>
            <p>{{$t('message.totalsub')}}</p>
            <h4>{{total}}</h4>
          </li>
          <li>
            <p>{{$t('message.method')}}</p>
            <el-select
              v-model="value"
              @change="changId()"
            >               <el-option
                v-for="list in todos"
                :key="list.id"
                :value="list.id"
                :label="list.name"
              ></el-option>
            </el-select>
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
  name: "CTC",
  props: { todos: Array, amount: "", number: "", ids: "", price: "" },
  components: { Pin },
  data() {
    return {
      dialogVisible: false,
      value: "",
      val: "",
      total: ""
    };
  },
  updated() {
    this.total = (Math.floor(this.val * this.price*100)/100).toFixed(2);
    if (this.val > this.number) {
      this.val = this.number;
    }
  },
  methods: {
    changId() {
      console.log(this.value);
    },
    ctc() {
      this.dialogVisible = !this.dialogVisible;
    },
    submit1() {
      let val = this.val;
      let value = this.value;
      if (val && value) {
        this.$refs.child.open();
      } else {
        alert(this.$t("message.errtips"));
      }
    },
    submit(pwd) {
      api
        .choices(http.SUBMITCTC, {
          id: this.ids,
          pay_id: this.value,
          number: this.val,
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
