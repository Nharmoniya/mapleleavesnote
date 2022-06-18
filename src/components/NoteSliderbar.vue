<template>
  <div class="note-sidebar">
    <el-button v-if="curBook.id" class="btn add-note" @click="onAddNote" type="success" title="添加笔记">+添加笔记</el-button>
    <span v-if="!curBook.id" class="notebook-title">无笔记本</span>
    <el-dropdown v-if="curBook.id" class="notebook-title" @command="handleCommand" placement="bottom" trigger="click">
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown-menu">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">{{
            notebook.title
          }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id" @click="getContent">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions, mapState} from 'vuex';

export default {
  created() {
    this.getAll()
        .then(() => {
          this.setCurBook({curBookId: this.$route.query.notebookId});
          return this.getNotes({notebookId: this.curBook.id});
        }).then(() => {
      this.setCurNote({curNoteId: this.$route.query.noteId});
    });
    console.log(this.notes);
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook',
      'curNote',
      'noteid',
    ]),
    ...mapState([
      'curNoteId'
    ])
  },
  methods: {
    ...mapActions([
      'getAll',
      'getNotes',
      'addNote',
      'checkLogin'
    ]),
    ...mapMutations([
      'setCurBook',
      'setCurNote',
    ]),
    onAddNote() {
      console.log(this.curBook.id);
      this.addNote({notebookId: this.curBook.id});
    },
    handleCommand(notebookId) {
      if (notebookId == 'trash') {
        return this.$router.push({path: '/trash'});
      }
      this.$store.commit('setCurBook', {curBookId: notebookId});
      // console.log(this.notes.id+"   1111   "+notebookId)
      this.$router.push(`/note?notebookId=${notebookId}`);
      this.getNotes({notebookId});
      console.log(this.notes);
    },
    getContent() {
      //当路由重置后去获取noteid然后赋值给curnoteid
      this.setCurNote({curNoteId: this.$route.query.noteId})
      this.$store.commit('setCurBook', {curBookId: this.$route.query.notebookId});
      console.log(this.noteid)
      console.log(this.curBook.id)
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu::v-deep {
  height: 400px;
  overflow: auto;
}

.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;
  overflow:auto;
  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: white;
    font-size: 14px;
    padding: 2px 4px;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    z-index: 1;
  }

  .notebook-title {
    font-size: 18px;
    font-weight: normal;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    width: 200px;
  }


  .menu {
    display: flex;

    div {
      font-size: 12px;
      padding: 2px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &
      :last-child {
        border-right: none;
      }

    }

    .iconfont {
      font-size: 10px;
    }

  }

  .notes {

    li {

      &
      :nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 3px 0;
        font-size: 12px;
        border: 2px solid transparent;
      }

      .router-link-exact-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }

    }
  }
}
</style>