<template>
  <div class="notebooklist">
    <Slider></Slider>
    <main class="layout">
      <el-button type="success" class="addnote" @click="addnote">+ 新建笔记</el-button>
      <hr/>
      <div class="main-form">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="routeToNote"
                     :key="notebook.id">
          <div class="book-list">
          <span class="no">
          <i class="el-icon-s-order"></i>
            <span class="tittle"><strong>{{ notebook.title }}</strong></span>
          <span class="noteCounts">{{ notebook.noteCounts }}</span>
          </span>
            <span class="action">
              <span class="createAt">{{ notebook.createdAtFriendly }}</span>
          <span class="edit" @click.stop.prevent="editnote(notebook)">编辑</span>
          <span class="delete" @click.stop.prevent="deletenote(notebook)">删除</span>
          </span>
          </div>
        </router-link>
      </div>
      <footer class="foot"></footer>
    </main>
  </div>
</template>

<script>
import Slider from '@/components/Slider';
import {mapActions, mapGetters} from 'vuex';


export default {
  name: 'Login',
  components: {Slider},
  data() {
    return {};
  },
  created() {
    this.checkLogin({path: '/login'});
    this.getNotebooks();
    console.log(this.notebooks);
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
      'checkLogin',
      'login'
    ]),
    addnote(){
      this.$prompt('请输入笔记本名', '新建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        this.addNotebook({title:value})
        this.$message({
          type: 'success',
          message: '你笔记本名 ' + value
        });
        location. reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    editnote(notebook){
      this.$prompt('输入新的笔记本名', '新笔记本名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        this.updateNotebook({notebookId:notebook.id,title:value})
        this.$message({
          type: 'success',
          message: '你新笔记本名 ' + value
        });
        location. reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    deletenote(notebook){
      this.$confirm('此操作将永久删除该笔记本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({notebookId: notebook.id})
        setTimeout(()=>{
          location. reload()
        },1000)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
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
    overflow: auto;

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
            font-size: 14px;
          }

          .noteCounts {
            margin-left: 5px;
            color: #b3c0c8;
          }
        }
        .action{
          color: #b3c0c8;
          >.delete:hover{
            color: black;
          }
          >.edit:hover{
            color: black;
          }
        }
        .action > .delete {
          margin-left: 10px;
          margin-right: 10px;
        }
        .action > .createAt{
          margin-right: 10px;
        }
      }
    }
  }

  .foot {
    width: 100%;
    height: 35px;
  }
}
</style>