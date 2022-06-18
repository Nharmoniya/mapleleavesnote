<template>
  <div id="trash">
    <Slider></Slider>
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="notedetail">
      <div class="note-head">
        <span v-if="!this.curTrashNote.createdAtFriendly">创建日期:无</span>
        <span v-if="this.curTrashNote.createdAtFriendly">创建日期：{{ this.curTrashNote.createdAtFriendly }}</span>
        <span> | </span>
        <span v-if="!this.curTrashNote.updatedAtFriendly"> 更新日期:无</span>
        <span v-if="this.curTrashNote.updatedAtFriendly"> 更新日期: {{ this.curTrashNote.updatedAtFriendly }}</span>
        <span> | </span>
        <span v-if="!this.belongTo"> 所属笔记本:无</span>
        <span v-if="this.belongTo"> 所属笔记本: {{ this.belongTo }}</span>
        <span class="btn-trash">
          <el-button v-if="this.belongTo" type="success" @click="onRevert">恢复</el-button>
          <el-button v-if="this.belongTo" type="success" @click="onDelete">彻底删除</el-button>
        </span>
      </div>
      <hr/>
      <div class="note-title">
        <span><strong>{{this.curTrashNote.title}}</strong></span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>

  </div>

</template>


<script>
import MarkdownIt from 'markdown-it';
import {mapGetters, mapMutations, mapActions} from 'vuex';
import Slider from '@/components/Slider';

let md = new MarkdownIt();

export default {
  data() {
    return {};
  },
  components: {Slider},
  created() {
    this.checkLogin({path: '/login'});
    this.getAll();
    this.getTrashNotes()
        .then(() => {
          this.setCurTrashNote({curTrashNoteId: this.$route.query.noteId});
          this.$router.replace({
            path: '/trash',
            query: { noteId: this.curTrashNote.id }
          })
        });
  },
  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
    ]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || '');
    }
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),

    ...mapActions([
      'checkLogin',
      'deleteTrashNote',
      'revertTrashNote',
      'getTrashNotes',
      'getAll'
    ]),

    onDelete() {
      this.$confirm('删除后将无法恢复', '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.deleteTrashNote({ noteId: this.curTrashNote.id })
      }).then(() => {
        console.log('delete success')
        this.setCurTrashNote()
        console.log(1111+this.curTrashNote.id)
        this.$router.replace({
          path: '/trash',
          query: { noteId: this.curTrashNote.id }
        })
      })
    },

    onRevert() {
      this.revertTrashNote({noteId: this.curTrashNote.id})
          //这一步是重置vuex状态，因为当删除后，需要去set一下当前的TrashNote，然后再路透代替一下。
          .then(() => {
            this.setCurTrashNote()
            this.$router.replace({
              path: '/trash',
              query: { noteId: this.curTrashNote.id }
            })
          });
    }

  },
  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({curTrashNoteId: to.query.noteId});
    next();
  }
};
</script>

<style lang="scss" scoped>
#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  flex-direction: row;

  .notedetail {
    height: 100%;
    width: calc(100% - 10px);
    .note-head {
      width: 100%;
      padding: 4px 20px;
      span {
        font-size: 12px;
        color: #999;
        margin-right: 4px;

      }

      .btn-trash {
        float: right;
        .el-button{
          right: 5px;
          top: 12px;
          color: white;
          font-size: 14px;
          padding: 2px 4px;
          box-shadow: 0px 0px 2px 0px #ccc;
          border: none;
          z-index: 1;
        }
      }
    }
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    .note-title{
      width: 100%;
      border: none;
      outline: none;
      font-size: 10px;
      padding: 6px 16px;
    }
    .editor{
      height: 90%;
      overflow: auto;
      position: relative;
      textarea, .preview {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 20px;
      }
    }
  }

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
    }
  }
}

.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;
  overflow: auto;

  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
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

      &:last-child {
        border-right: none;
      }
    }

    .iconfont {
      font-size: 10px;
    }
  }

  .notes {
    li {

      &:nth-child(odd) {
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