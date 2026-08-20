import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/user/MainUser.vue'
import UserProfile from '@/views/user/UserProfile.vue'
import UserBadge from '@/views/user/UserBadge.vue'
import UserDetail from '@/views/user/UserDetail.vue'
import UserDetailEdit from '@/views/user/UserDetailEdit.vue'
import UserHistExam from '@/views/user/HistoryExam.vue'
import UserService from '@/views/user/UserServices.vue'

import CardBase from '@/components/CardBase.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect:'/login'},
    { path: '/login',
      name: 'login-view', 
      component: LoginView},
    {
      path: '/register',
      name: 'register-view',
      component: RegisterView
    },
    {
      path: '/test',
      name: 'test-component',
      component: CardBase
    },
    {
      path: '/home/:id',
      name: 'userhome-view',
      component: HomeView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/UserProfile/:id',
      name: 'userprofile-view',
      component: UserProfile,
      props: true,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        userStore.setUser(Number(to.params.id))
      },
      children: [
        {
          path: '',
          redirect: (to) => ({ name: 'userdetail-view', params: to.params })
        },
        {
          path: 'UserDetail',
          name: 'userdetail-view',
          component: UserDetail
        },
        {
          path: 'UserDetailEdit',
          name: 'user-detailEdit-view',
          component: UserDetailEdit
        },
        {
          path: 'UserBadge',
          name: 'user-badge-view',
          component: UserBadge
        },
        {
          path: 'UserHistroyExam',
          name: 'user-history-view',
          component: UserHistExam
        },
        {
          path: 'UserService',
          name: 'user-service-view',
          component: UserService
        },
      ]
  }],
})

export default router
