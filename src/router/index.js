import { createRouter, createWebHistory } from 'vue-router'
import AccountLog from '@/pages/AccountLog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AccountLog
    },
    {
      path: '/accountlog',
      component: AccountLog
    }
  ]
})

export default router
