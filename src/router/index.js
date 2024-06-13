import { createRouter, createWebHistory } from 'vue-router'
import AccountLog from '@/pages/AccountLog.vue'
import Signin from '@/pages/Signin.vue';
import MyPage from '@/pages/MyPage.vue';
import UpdateProfile from '@/pages/UpdateProfile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MyPage
    },
    {
      path: '/accountlog',
      component: AccountLog
    },
    { path: '/signin', 
      component: Signin 
    },
    { path: '/mypage', 
      component: MyPage 
    },
    { path: '/updateprofile', 
      component: UpdateProfile 
    }
  ]
})

export default router
