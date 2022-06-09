<template>
  <div class="login_form">
    <el-input class="username_input"
              placeholder="请输入您的账号"
              v-model="register.username"
              prefix-icon="el-icon-user"
              clearable>
    </el-input>
    <el-input class="password_input"
              placeholder="请输入您的密码"
              v-model="register.password"
              prefix-icon="el-icon-coin"
              show-password>
      密码：
    </el-input>
    <div class="notice_box"><p v-bind:class="{error: register.isError}"> {{register.notice}}</p></div>
    <el-button type="success" class="confirm_login" @click="onRegister">注册</el-button>
  </div>
</template>

<script>

import {mapActions} from 'vuex';
import {Message} from 'element-ui';

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
        Message.success('恭喜你，注册成功！')
        this.$router.push({ path: 'notebooklist' })
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
    margin-top: 70px;
    margin-left: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .notice_box {
    width: 398px;
    height: 50px;
    border: 1px solid white;
    p {
      display: none;
      margin-top: 10px;
      margin-left: 50px;
      font-size: 14px;
    }
    .error {
      display: block;
      color: red;
    }
  }
}

</style>