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
          <li>
            <router-link to="">
              <i class="icon iconfont icon-shanchujiedian"></i>
              <span class="el-icon-arrow-right"></span>
              超级节点
            </router-link>
          </li>
        </ul> -->
        <ul>
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
        >退出登录</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import Footer from "../../components/nav";
import api from "../../API/index";
export default {
  components: { Footer },
  data() {
    return {
      avatar: require("../../assets/image/avatar.png"),
      username: "",
      id: "",
      items: [
        {
          url: "/my/invite/index",
          iconClass: "icon-yaoqingzhaobiao",
          name: "邀请伙伴"
        },
        {
          url: "/my/manage/index",
          iconClass: "icon-yonghu2",
          name: "直接管理"
        },
        { url: "/my/usdt/index", iconClass: "icon-T", name: "USDT绑定" },
        { url: "/my/set/index", iconClass: "icon-ai-safe", name: "安全设置" },
        {
          url: "/my/language/index",
          iconClass: "icon-yuyan",
          name: "语言设置"
        },
        { url: "", iconClass: "icon-about_fill", name: "关于我们" }
      ]
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      api
        .choices("api/user/info")
        .then(result => {
          if (result.status == 200) {
            this.avatar = result.res.user.avatar;
            this.id = result.res.user.username;
            this.username = result.res.user.nickname;
          }
        })
        .catch(err => {
          consolr.log(err);
        });
    },
    //退出登录
    exit() {
      let that=this
      that
        .$confirm("是否退出登录?", {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          api
            .choices("api/login/loginOut")
            .then(result => {
              if (result.status == 200) {
                this.$store.commit("setToken", "");
                this.$router.push("/");
              } else if (result.status == 400) {
                alert(result.msg);
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
