import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      //重定向login
      redirect: '/login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/notebooks',
      component: () => import('@/components/NotebookList.vue'),
    },
    {
      path: '/note/:noteId',
      component: () => import('@/components/NoteDetail.vue'),
    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail.vue'),
    },
    {
      path:'*',
      component: () => import('@/views/Login/Login.vue'),
    }
  ]
});

export default router