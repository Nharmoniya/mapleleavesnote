import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      //重进money
      redirect:'/login',
      component:()=>import('@/views/Login/Login.vue')
    },
    {
      path: '/notebooks',
      component: () => import('@/components/NotebookList.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/note/:noteId',
      component: () => import('@/components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail.vue')
    }
  ]
})