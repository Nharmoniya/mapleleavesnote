<template>
  <div class="login_form">
    <el-input class="username_input"
              placeholder="请输入您的账号"
              v-model="register.username"
              clearable>
    </el-input>
    <el-input class="password_input"
              placeholder="请输入您的密码"
              v-model="register.password"
              show-password>
      密码：
    </el-input>
    <p v-bind:class="{error: register.isError}"> {{register.notice}}</p>
    <el-button type="success" class="confirm_login" @click="onRegister">注册</el-button>
  </div>
</template>

<script>

import {mapActions} from 'vuex';

export default {
  data() {
    return {
      isShowRegister: true,
      register:{
        username: '',
        password: '',
        notice: '创建账号后，请记住用户名和密码',
        isError: false
      }
    };
  },
  methods: {
    ...mapActions({
      registerUser: 'register',
    }),
    showRegister(){
      this.isShowLogin = false
      this.isShowRegister = true
    },
    onRegister(){
      if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)){
        this.register.isError = true
        this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if(!/^.{6,16}$/.test(this.register.password)){
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }

      this.registerUser({
        username: this.register.username,
        password: this.register.password
      }).then(() => {
        this.register.isError = false
        this.register.notice = ''
        this.$router.push({ path: 'notebooks' })
      }).catch(data => {
        this.register.isError = true
        this.register.notice = data.msg
      })
    },

  }
}
</script>

<style scoped lang="scss">
.login_form {

  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .username_input {
    width: 300px;
    margin-top: 30px;
    margin-left: 50px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .password_input {
    width: 300px;
    margin-top: 20px;
    margin-left: 50px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .confirm_login {
    width: 300px;
    margin-top: 60px;
    margin-left: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  p{
    color: red;
    margin-top: 10px;
    margin-left: 50px;
  }

}

</style>