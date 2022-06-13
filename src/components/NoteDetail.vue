<template>
  <div id="note-detail">
    <slider></slider>
    <div class="main-form">
      <NoteSliderbar @update:notes="val => notes = val "></NoteSliderbar>
      <div class="note-empty" v-show="!curNote.id">请选择或创建笔记</div>
      <div class="note-detail" v-show="curNote.id">
        <header class="datemodel">
          <span class="datemodel_date">
          <span> 创建日期:{{ curNote.createdAtFriendly }}</span>
          <span> 更新日期:{{ curNote.updatedAtFriendly }} </span>
          <span> {{ statusText }} </span>
            </span>
          <span class="icon-form">
          <span class="iconfont el-icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont el-icon-view" @click="isShowPreview = !isShowPreview"></span>
          </span>
        </header>
        <hr/>
        <main class="note">
          <div class="note-title">
            <strong>标题:</strong>
            <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'"
                   placeholder="输入标题"/>
          </div>

          <div class="editor">
            <textarea v-show="isShowPreview" v-model:value="curNote.content" @input="onUpdateNote"
                      @keydown="statusText='正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>
            <div class="preview markdown-body" v-html="previewContent" v-show="!isShowPreview">
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider';
import NoteSliderbar from '@/components/NoteSliderbar';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import {mapGetters, mapMutations, mapActions} from 'vuex';

let md = new MarkdownIt();

export default {
  name: 'Login',
  components: {Slider, NoteSliderbar},

  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false,
    };
  },
  created() {
    this.checkLogin({path: '/login'});
  },
  computed: {
    ...mapGetters([
      'curNote',
      'notes',
      'noteid'
    ]),
    previewContent() {
      return md.render(this.curNote.content || '');
    }
  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    onDeleteNote() {
      console.log(this.curNote.id)
      this.deleteNote({noteId: this.curNote.id}).then(() => {
        this.$router.replace({path: '/note'});
      });
    },
    beforeRouteUpdate(to, from, next) {
      this.setCurNote({curNoteId: to.query.noteId});
      next();
    },
    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId: this.noteid, title: this.curNote.title, content: this.curNote.content})
          .then(() => {
            this.statusText = '已保存';
          }).catch(() => {
        this.statusText = '保存出错';
      });
    }, 300),
  }
};
</script>

<style lang="scss" scoped>
#note-detail {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.main-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: white;

  .note-detail-ct {
    height: 100%;
  }

  .note-empty {
    font-size: 50px;
    color: #ccc;
    position: absolute;
    margin-left: 50%;
    margin-right: 50%;
    text-align: center;
    margin-top: 70px;
  }

  input, span {
    border: none;
    outline: none;
    font-size: 20px;
  }

  .note-title {
    font-size: 20px;
  }

  .note-detail {
    width: 100%;

    .datemodel {
      padding: 4px 20px;
      border-bottom: 1px solid #eee;

      .datemodel_date {

      }

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      span {
        font-size: 12px;
        color: #999;
        margin-right: 4px;
      }

      .icon-form {
        float: right;

      }

      .iconfont {
        margin-left: 4px;
        font-size: 24px;
        cursor: pointer;
        align-self: end;
      }
    }
  }
  .note {
    height: 90%;
  }

  .editor {
    height: calc(100% - 70px);
    width: 100%;
    position: relative;
    padding: 20px;
  }

  textarea, .preview {
    width: 95%;
    height: 90%;
    position: absolute;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
  }
}
</style>