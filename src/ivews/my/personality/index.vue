<template>
  <div>
    <Top :title="msg" />
    <div class="layout">
      <div class="personality">
        <div class="center">
          <div class="photo">
            <div class="selectPhoto">
              <el-avatar icon="el-icon-user-solid" :src="imageUrl" :size="70"></el-avatar>
            </div>

            <ul class="picter-list clear">
              <li
                v-for="(picter,index) in picters"
                :key="index"
              >
                <img
                  :src="picter.list"
                  @click="selectPhoto($event)"
                >
              </li>
              <!--添加头像-->
              <li>
                <div class="addAvatar">
                  <input
                    type="file"
                    name="avatar"
                    style="opacity:0"
                    @change="uploadChange($event)"
                  >
                  <i class="el-icon-camera-solid"></i>
                </div>
              </li>
            </ul>

            <!--设置名称-->

            <el-form
              :rules="rules"
              :model="ruleForm"
              ref="ruleForm"
              class="demo-ruleForm"
            >

              <el-form-item
                class="text"
                prop="nickname"
                :label="$t('message.nicknames')"
              >
                <el-input
                  class="seting"
                  v-model="ruleForm.nickname"
                  :placeholder="$t('message.nickname')"
                  maxlength="6"
                  minlength="2"
                >
                </el-input>
              </el-form-item>
            </el-form>

            <el-button
              class="submit"
              @click="submitName('ruleForm')"
            >{{$t('message.confirm')}}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../../../components/top";
import api from '../../../API/index'
export default {
  components: { Top },
  data() {
    return {
      msg: this.$t('message.character'),
      imageUrl: require('../../../assets/image/1.png'),
      picters: [
        { list: require("../../../assets/image/1.png") },
        { list: require("../../../assets/image/2.png") },
        { list: require("../../../assets/image/3.png") },
        { list: require("../../../assets/image/4.png") },
        { list: require("../../../assets/image/5.png") },
        { list: require("../../../assets/image/6.png") },
        { list: require("../../../assets/image/7.png") },
        { list: require("../../../assets/image/8.png") },
        { list: require("../../../assets/image/9.png") },
        { list: require("../../../assets/image/10.png") },
        { list: require("../../../assets/image/11.png") }
      ],
      ruleForm: {
        nickname: "",
        avatar: ""
      },
      rules: {
        username: [
          { required: true, message: this.$t('message.nickname'), trigeger: "blur" }
        ]
      }
    };
  },
  mounted() {
      this.getUser()
  },
  methods: {
      //个人信息
    getUser() {
      let that = this;
      api.choices("api/user/info")
        .then(response => {
          if (response.status == 200) {
            that.imageUrl = response.res.user.avatar;
            that.ruleForm.nickname = response.res.user.nickname;
          }
        })
        .catch(err => {
          alert(err.msg);
        });
    },
    //上传图片
    uploadChange(ev) {
      var file = ev.target.files[0];
      let that = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function(e) {
          that.imageUrl = e.target.result;
        };
      }
    },

    //选择头像
    selectPhoto(ev) {
      let url = ev.target.currentSrc;
      console.log(url);
      var image = new Image();
      image.src = url;
      var base64 = getBase64Image(image);
      this.imageUrl = base64;
    },
    

    //提交设置
    submitName(ruleForm) {
      let that = this;
      let data = this.ruleForm;
      console.log(this.imageUrl);
      let avatar = this.imageUrl; //获取头像
      console.log(avatar);
      this.ruleForm.avatar = avatar;
      api.choices("api/user/changeAttr", data)
        .then(response => {
          if (response.status == 200) {
            alert(response.msg);
            this.$router.push("/my/index");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  var dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
}
</script>

<style scoped>
</style>
