<template>
  <div id="poster">
    <el-form ref="form" :model="form" class="login-box">
      <h3 class="login-title">登录系统</h3>
      <el-form-item label="">
        <el-input
          suffix-icon="el-icon-user-solid"
          type="text"
          placeholder="账号"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input
          suffix-icon="el-icon-view"
          type="password"
          placeholder="密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <p v-if="msg!=''" class="error_msg">用户名或密码错误！</p>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setToken } from "@/utils/common";
export default {
  data() {
    return {
      msg: "test",
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      setToken("HJDF844GDFG5D8J7FGHFG5");
      this.$router.push("/");
    },
    onSubmit() {
      console.log("submit!");
    }
  }
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
.error_msg{
  color: #F56C6C;
  font-size: 14px;
}
</style>
