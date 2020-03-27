<template>
  <div>
    <Footer />
    <div id="myPhoto">
      <div class="avatarPicter">
        <el-avatar
          icon="el-icon-user-solid"
          :src="avatar"
          :size="70"
          class="myAvatar"
        ></el-avatar>
      </div>
      <router-link
        to="/my/personality/index"
        class="icon iconfont icon-edit"
      ></router-link>
      <h5>{{username}}</h5>
      <p>ID:{{id}}</p>
    </div>
    <div class="myList">
      <div class="myContent">
        <!-- <ul>
          <li>
            <router-link to="">
              <i class="icon iconfont icon-jilu"></i>
              <span class="el-icon-arrow-right"></span>
              报单中心
            </router-link>
          </li>
          <li>
            <router-link to="">
              <i class="icon iconfont icon-fuwu"></i>
              <span class="el-icon-arrow-right"></span>
              服务中心
            </router-link>
          </li>
          <li>
            <router-link to="">
              <i class="icon iconfont icon-shopfill"></i>
              <span class="el-icon-arrow-right"></span>
              商家中心
            </router-link>
          </li>

        </ul> -->
        <ul>
           <li>
            <router-link to="/my/old/index">
             <img src="../../assets/image/16.png" alt="">
              <span class="el-icon-arrow-right"></span>
              原始会员
            </router-link>
          </li>
          <li>
            <router-link to="/fc/index">
            <img src="../../assets/image/fc.png">
              <span class="el-icon-arrow-right"></span>FC
            </router-link>
          </li>
          <li
            v-for="(item,index) in items"
            :key="index"
          >
            <router-link :to="item.url">
              <i
                class="icon iconfont"
                :class="item.iconClass"
              ></i>
              <span class="el-icon-arrow-right"></span>
              {{item.name}}
            </router-link>
          </li>
        </ul>
        <el-button
          class="submit"
          @click="exit()"
        >{{$t('message.exit')}}</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import * as http from "../../public/index";
import Footer from "../../components/nav";
import api from "../../API/index";
export default {
  components: { Footer },
  data() {
    return {
      avatar: "",
      username: "",
      id: "",
      items: [
        {
          url: "/my/invite/index",
          iconClass: "icon-yaoqingzhaobiao",
          name: this.$t("message.invite")
        },
        {
          url: "/my/manage/index",
          iconClass: "icon-yonghu2",
          name: this.$t("message.manage")
        },
        {
          url: "/my/usdt/index",
          iconClass: "icon-T",
          name: this.$t("message.bing")
        },
        {
          url: "/my/set/index",
          iconClass: "icon-ai-safe",
          name: this.$t("message.security")
        },
        {
          url: "/my/language/index",
          iconClass: "icon-yuyan",
          name: this.$t("message.language")
        },
        {
          url: "/my/about/index",
          iconClass: "icon-about_fill",
          name: this.$t("message.about")
        }
      ]
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices(http.USER)
        .then(result => {
          if (result.status == 200) {
            this.avatar = result.res.user.avatar;
            this.id = result.res.user.username;
            this.username = result.res.user.nickname;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //退出登录
    exit() {
      this.$confirm(this.$t("message.logOut") + "?", {
        confirmButtonText: this.$t("message.confirm"),
        cancelButtonText: this.$t("message.cancel")
      })
        .then(() => {
          api
            .choices(http.LOGINOUT)
            .then(result => {
              if (result.status == 200) {
                localStorage.removeItem("token");
                this.$router.push("/login");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>
