import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ruleta from '../views/Ruleta.vue'
import Michi from '../views/Michi.vue'
import PPT from '../views/PPT.vue'
import Adivina from '../views/Adivina.vue'
import Sobrevive from '../views/Sobrevive.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/ruleta',
    component: Ruleta,
  },
  {
    path: '/michi',
    component: Michi,
  },
  {
    path: '/ppt',
    component: PPT,
  },
  {
    path: '/adivina',
    component: Adivina,
  },
  {
    path: '/sobrevive',
    component: Sobrevive,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
