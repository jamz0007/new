import { createRouter, createWebHistory } from 'vue-router'
import useExcusesStore from '../stores/excuses.store'

const routes = [
  {
    path: '/',
    name: 'DevExcuses',
    component: () => import('../views/DevExcuses.vue')
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  },
  {
    name: 'LostPage',
    path: '/lost',
    component: () => import('../views/LostPage.vue')
  },
  {
    path: '/:http_code(\\d+)',
    name: 'http_code',
    component: () => import('../views/HttpCode.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.name === 'DevExcuses' || to.name === 'http_code') {
    const store = useExcusesStore()
    await store.getExcuses()
    if (to.name === 'http_code') {
      const http_code = to.params.http_code
      const excuses = store.excuses
      const httpCodeExist = excuses.find((excuse) => excuse.http_code == http_code)
      if (!httpCodeExist) {
        next({ name: 'NotFound' })
        return
      }
    }
  }
  next()
})

router.afterEach((to) => {
  if (to.name === 'LostPage') {
    setTimeout(() => {
      router.push({ name: 'DevExcuses' })
    }, 5000)
  }
})

export default router
