import request from '@/helpers/requests';
import {friendlyDate} from '@/helpers/util.js';

const URL={
  GET:'/notes/trash',
  REVERT:'/notes/:noteId/revert',
  DELETE:'/notes/:noteId/confirm'
}

export default {
  getTrash() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.sort((note1, note2) => note1.createdAt < note2.createdAt)
        res.data.forEach(note => {
          note.createdAtFriendly = friendlyDate(note.createdAt)
          note.updatedAtFriendly = friendlyDate(note.updatedAt)
        })
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },

}