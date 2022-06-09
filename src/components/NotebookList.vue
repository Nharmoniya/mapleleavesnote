<template>
  <div class="notebooklist">
    <Slider></Slider>
    <main class="layout">
      <el-button type="success" class="addnote">+ 新建笔记</el-button>
      <hr/>
      <div class="main-form">
        <h3>笔记本列表（）</h3>
        <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="routeToNote" :key="notebook.id">
          <div class="book-list">
          <span class="no">
          <i class="el-icon-s-order"></i>
          <span class="tittle">{{notebook.title}}</span>
          <span class="noteCounts">{{notebook.noteCounts}}</span>
          </span>
            <span class="action">
          <span class="edit">编辑</span>
          <span class="delete">删除</span>
          <span class="createAt">{{notebook}}</span>
          </span>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import Slider from '@/components/Slider';
// import Auth from '@/api/loginApi.js';
// import notebooks from '@/api/notebookApi.js';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Login',
  components: {Slider},
  data() {
    return {
    };
  },
  created() {
    this.checkLogin({path: '/login'});
    this.getNotebooks();
  },
  computed: {
    ...mapGetters(['notebooks'])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
    ])
  },
};
</script>

<style lang="scss" scoped>
.notebooklist {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  cursor: auto;

  .layout {
    height: 100%;
    width: 100%;

    .addnote {
      margin-top: 25px;
      margin-left: 25px;
      margin-bottom: 25px;
    }

    .main-form {
      width: 75%;

      margin-left: 150px;
      margin-top: 25px;

      h3 {
        color: black;
        margin-left: 10px;
        margin-bottom: 3px;
      }

      .book-list:hover {
        background-color: #F2F6FC;
      }

      .book-list {
        height: 40px;
        background-color: white;
        border-radius: 3px;
        display: flex;
        padding: 18px;
        justify-content: space-between;
        margin-bottom: 1px;

        span {
          align-self: center;
        }

        .no {
          i {
            align-self: center;
            font-size: 18px;
          }

          .tittle {
            margin-left: 10px;
          }

          .noteCounts {
            margin-left: 5px;
          }
        }

        .action > .delete {
          margin-left: 10px;
          margin-right: 10px;
        }
      }
    }
  }

}
</style>