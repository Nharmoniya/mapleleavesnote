import request from '@/helpers/requests';
import {friendlyDate} from '@/helpers/util.js';


const URL = {
  NOTEBOOKS: '/notebooks',
  CREATE: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id',

};

export default {
  getNotebooks() {
    return new Promise((resolve, reject) => {
      request(URL.NOTEBOOKS).then(res => {
        res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt);
        res.data.forEach(notebook => {
          notebook.createdAtFriendly = friendlyDate(notebook.createdAt);
          notebook.updatedAtFriendly = friendlyDate(notebook.updateAt);
        });
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });

  },
  createNotebooks({title = ''} = {title: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.CREATE, 'POST', {title}).then(res => {
        res.data.createdAtFriendly = friendlyDate(res.data.createAt);
        res.data.updatedAtFriendly = friendlyDate(res.data.updateAt);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  },
  updateNotebooks(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title});
  },
  deleteNotebooks(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE');
  }

};