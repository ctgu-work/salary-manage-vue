<template>
  <div id="poster">
    <el-form ref="form" :model="form" :rules="rule" class="login-box">
      <h3 class="login-title">{{$t('login.formtitle')}}</h3>
      <el-form-item prop="username">
        <el-input
          suffix-icon="el-icon-user-solid"
          type="text"
          :placeholder="this.$i18n.t('login.username')"
          v-model="form.username"
          :validate-event="false"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          suffix-icon="el-icon-lock"
          type="password"
          :placeholder="this.$i18n.t('login.password')"
          v-model="form.password"
          :validate-event="false"
        ></el-input>
      </el-form-item>
      <p v-if="msg != ''" class="error_msg">{{$t('login.msg.wronglogin')}}</p>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="onSubmit(form)"
          >{{$t('login.subbtn')}}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setToken } from "@/utils/common";
import { login } from "@/api/login/login";
// import { Notification, Loading } from "element-ui";
export default {
  data() {
    return {
      msg: "",
      form: {
        username: "",
        password: "",
      },
      rule: {
        username: [{ required: true, message: this.$i18n.t('login.msg.nullusername') }],
        password: [
          { required: true, message: this.$i18n.t('login.msg.nullpassword') },
          { min: 6, max: 10, message: this.$i18n.t('login.msg.illegalpassword') },
        ],
      },
    };
  },
  methods: {
    login() {
      // setToken("HJDF844GDFG5D8J7FGHFG5");
      this.$router.push("/");
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 向后台发送请求
          login(this.form)
            .then((r) => {
              // console.log(r);
              setToken(r.Token);
              this.$router.push("/");
            })
            .catch((e) => {
              // Notification({
              //   title: "账号或密码错误",
              //   message: "请重试",
              //   type: "warning",
              // });
              console.log(e);
            });
        } else {
          //就像用户提示发生错误的消息
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#poster {
  background: url("../../assets/images/login_background.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.login-box {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-button {
  width: 100%;
  background: #505458;
  border: none;
  margin-top: 10px;
}
.error_msg {
  color: #f56c6c;
  font-size: 14px;
}
</style>
