<template>
  <div id="loginBody">
    <div class="loginFrame">
      <div class="Type">
        <span class="loginitem" :class="r==='-'&& 'selected'" @click="selectType('-')">登录账号</span>
        <span class="registeritem" :class="r==='+' && 'selected'" @click="selectType('+')">注册账号</span>
      </div>
      <div class="Form">
        <Login class="login_form" :class="r==='-'&& 'selected'" @click="selectType('-')"/>
        <Register class="register_form" :class="r==='+' && 'selected'" @click="selectType('+')"/>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Register from '@/components/Register';

export default {

  data() {
    return {
      r: '-',

    };
  },
  methods: {
    selectType(r) {
      if (r !== '-' && r !== '+') {
        throw new Error('type is unknown');
      }
      this.r = r;
    },
  },
  components: {
    Login,
    Register
  }

};
</script>

<style scoped lang="scss">
#loginBody {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .loginFrame {
    margin-top: 80px;
    width: 400px;
    height: 500px;
    background-color: white;
    border: 1px solid #eee;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .Type {
      height: 80px;
      width: 100%;
      flex: 1;
      text-align: center;
      line-height: 69px;
      font-size: 20px;
      color: #808083;
      cursor: pointer;

      .loginitem {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-color: #eee;

        &.selected {
          background-color: white;
        }
      }

      .registeritem {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-color: #eee;

        &.selected {
          background-color: white;
        }
      }
    }

    .Form {
      .login_form {
        display: none;

        &.selected {
          display: block;
        }
      }

      .register_form {
        display: none;

        &.selected {
          display: block;
        }
      }
    }
  }
}


</style>