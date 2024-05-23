import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import New from '../views/new.vue'
import Speed from '../views/speed.vue'
import Yana from '../views/main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: Yana
  },
  {
    path: '/coding',
    name: 'new',
    component: New
  },
  {
    path: '/yozish',
    name: 'speed',
    component: Speed
  },
  {
    path: '/havo',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
