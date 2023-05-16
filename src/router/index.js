import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/Home.vue')
    },
    {
      path: '/invoice',
      component: () => import('../components/invoice.vue')
    }
  ]
})

export default router
