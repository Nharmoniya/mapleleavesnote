import request from '@/helpers/requests';
import {friendlyDate} from '@/helpers/util.js';

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
};

export default {
  //获取回收站中的笔记
  getTrash() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.sort((note1, note2) => note1.createdAt < note2.createdAt);
        res.data.forEach(note => {
          note.createdAtFriendly = friendlyDate(note.createdAt);
          note.updatedAtFriendly = friendlyDate(note.updatedAt);
        });
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  },
  //删除笔记
  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE');
  },
  //还原笔记
  revertNote({noteId}) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH');
  }
};