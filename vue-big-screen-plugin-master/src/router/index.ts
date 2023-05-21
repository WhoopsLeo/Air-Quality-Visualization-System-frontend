import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index2 from '../views/index/index2.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/index2',
    name: 'Index2',
    component: Index2
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
