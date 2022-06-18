<template>
  <div id="sidebar">
    <avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记"><i class="iconfont el-icon-notebook-2"></i></router-link>
      <router-link to="/notebooklist" title="笔记本"><i class="iconfont el-icon-s-order"></i></router-link>
      <router-link to="/trash" title="回收站"><i class="iconfont el-icon-delete-solid"></i></router-link>
    </div>
    <div class="logout">
      <i class="iconfont el-icon-s-fold" @click="onLogout"></i>
    </div>
  </div>
</template>

<script>

import avatar from '@/components/Avatar.vue';
import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  components: {
    avatar
  },

  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['setCurBook']),
    onLogout() {
      this.$confirm('确认要退出登录吗？', '退出登录', {
        distinguishCancelAndClose: true,
        confirmButtonText: '退出',
        cancelButtonText: '取消'
      })
          .then(() => {
            this.logout({path: '/login'});
            location.reload();
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消'
            });
          });
    }

  }
};


</script>


<style lang="scss" scoped>
#sidebar {
  position: relative;
  width: 56px;
  height: 100%;
  text-align: center;
  background-color: #2c333c;
}

.icons {
  margin-top: 15px;
  font-size: 18px;

  a {
    padding: 6px 0;
    display: block;
  }
}

.icons .router-link-active {
  background-color: #5e6266;
}

.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
}

.iconfont {
  color: #fff;
}
</style>