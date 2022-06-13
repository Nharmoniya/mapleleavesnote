import Trash from '@/api/trash.js';
import {Message} from 'element-ui';

const state = {
  trashNotes: null,
  curTrashNoteId: null,
};

const getters = {
  //获取trashnotes，有数据时有，没有的话返回一个空的
  trashNotes: state => state.trashNotes || [],
  //获取当前回收站中的noteid，如果当前curtrashnoteid不为空返回trashnotes下标0的trashnote，否则为空
  curTrashNote: (state, getters) => {
    if (!state.curTrashNoteId) return getters.trashNotes[0] || {};
    //这里还要去查找一下note.id
    return state.trashNotes.find(note => note.id == state.curTrashNoteId) || {};
  },
  //获取当前的notebookid，随后返回notebook的title
  belongTo: (state, getters, rootState, rootGetters) => {
    let notebook = rootGetters.notebooks.find(notebook => notebook.id == getters.curTrashNote.notebookId) || {};
    return notebook.title || '';
  }
};

const mutations = {
  setTrashNotes(state, payload) {
    state.trashNotes = payload.trashNotes;
  },
  addTrashNotes(state, payload) {
    state.trashNotes = payload.trashNotes;
  },
  deleteTrashNote(state, payload) {
    state.trashNotes = state.trashNotes.filter(note => note.id != payload.noteId);
  },
  setCurTrashNote(state, payload) {
    state.curTrashNoteId = payload.curTrashNoteId;
  }
};

const actions = {
  getTrashNotes({commit}) {
    return Trash.getTrash().then(res => {
      commit('setTrashNotes', {trashNotes: res.data});
    });
  },
  deleteTrashNote({commit}, {noteId}) {
    return Trash.deleteNote({noteId}).then(res => {
      commit('deleteTrashNote', {noteId});
      Message.success(res.msg);
    });
  },
  revertTrashNote({commit}, {noteId}) {
    return Trash.revertNote({noteId}).then(res => {
      commit('deleteTrashNote', {noteId});
      Message.success('笔记还原成功');
    });
  }

};


export default {
  state,
  getters,
  mutations,
  actions
};