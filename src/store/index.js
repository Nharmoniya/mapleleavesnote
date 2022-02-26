import Vue from 'vue'
import Vuex from 'vuex'
import note from '@/store/modules/note.js'
import notebook from '@/store/modules/notebook.js'
import trash from '@/store/modules/trash.js'
import user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    note,
    notebook,
    trash,
    user,
  }
})
