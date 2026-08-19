import { createRouter, createWebHistory } from 'vue-router'
import UserServices from '@/services/UserServices'


import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/user/MainUser.vue'
import UserProfile from '@/views/user/UserProfile.vue'
import UserBadge from '@/views/user/UserBadge.vue'
import UserDetail from '@/views/user/UserDetail.vue'
import UserDetailEdit from '@/views/user/UserDetail.vue'
import UserHistExam from '@/views/user/HistoryExam.vue'
import UserService from '@/views/user/UserServices.vue'


import LearningView from '@/views/LoginView.vue'
import CardBase from '@/components/CardBase.vue'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types'



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
        const id = to.params.id as string
        const userStore = useUserStore()
        return UserServices.getUser(id).then(response => {
          if (response.data && response.data.length > 0) userStore.setUser(response.data[0])
        })
      }
    },
    {
      path: '/UserProfile/:id',
      name: 'userprofile-view',
      component: UserProfile,
      props: true,
      beforeEnter: (to) => {
        const id = to.params.id as string
        const userStore = useUserStore()
        return UserServices.getUser(id)
          .then((response) => {
            if (response.data && Object.keys(response.data).length === 0) {
              console.log(response.data)
              return { name: '404-resource', params: { resource: 'user' } }
            } else {
              userStore.setUser(response.data[0])
            }
          })
          .catch((error) => {
            console.error('Error fetching user', error)
            if (error.response && error.response.status === 404) {
              return { name: '404-resource', params: { resource: 'user' } }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          redirect: { name: 'userdetail-view' }
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
