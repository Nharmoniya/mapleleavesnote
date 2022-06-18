import loginApi from '@/api/loginApi';
import router from '@/router';

window.router = router
const state = {
  user: null
};

const getters = {
  username: state => state.user === null ? '未登录' : state.user.username,
  slug: state => state.user === null ? '未' : state.user.username.charAt(0)
};
const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
};

const actions = {
  login({commit}, {username, password}) {
    return loginApi.login({username, password}).then(res => {
      console.log(res.data)
      commit('setUser', {user: res.data});
    });
  },
  register({commit}, {username, password}) {
    return loginApi.register({username, password}).then(res => {
      commit('setUser', {user: res.data});
    });
  },
  // logout({commit}, payload = {path: '/login'}) {
  //   // eslint-disable-next-line no-unused-vars
  //   return loginApi.logout().then(res => {
  //     commit('setUser',{user:null})
  //     router.push(payload)
  //   });
  // },

  checkLogin({ commit,state }, payload) {
    if(state.user !== null) return Promise.resolve()
    return loginApi.auth()
      .then(res => {
        if(!res.isLogin) {
          console.log('jump')
          router.push(payload)
        } else {
          commit('setUser', { user: res.data })
        }
      })
  },

  logout({ commit }, payload = { path: '/login' }) {
    return loginApi.logout()
      .then(() => {
        commit('setUser', { user: null })
        console.log(payload)
        console.log("222"+this.user)
        router.push(payload)
      })
  },

};


export default {
  state,
  getters,
  mutations,
  actions
};