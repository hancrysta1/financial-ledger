import { createRouter, createWebHistory } from 'vue-router'
import AccountLog from '@/pages/AccountLog.vue'
import Signin from '@/pages/Signin.vue';
import MyPage from '@/pages/MyPage.vue';
import UpdateProfile from '@/pages/UpdateProfile.vue';
import GridContainer from '@/components/GridContainer.vue';
import App from '@/App.vue';
import DealCreate from '@/pages/DealCreate.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   component: Signin
    // },
    {
      path: '/',
      component: GridContainer
    },
    {
      path: '/accountlog',
      component: AccountLog
    },
    { path: '/signin', 
      component: Signin 
    },
    { path: '/mypage', 
      component: MyPage,
      name: 'MyPage' 
    },
    { path: '/updateprofile', 
      component: UpdateProfile,
      name : 'UpdateProfile'
    },
    { path: '/create', 
      component: DealCreate,
      name : 'create'
    }
  ]
})

export default router
