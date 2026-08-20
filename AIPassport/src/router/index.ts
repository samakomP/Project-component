import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/user/MainUser.vue'
import UserProfile from '@/views/user/UserProfile.vue'
import UserBadge from '@/views/user/events/UserBadge.vue'
import UserDetail from '@/views/user/events/UserDetail.vue'
import UserDetailEdit from '@/views/user/events/UserDetailEdit.vue'
import UserHistExam from '@/views/user/events/HistoryExam.vue'
import UserService from '@/views/user/events/UserServices.vue'
import LearningView from '@/views/user/LearningView.vue'
import LevelNBenefit from '@/views/user/LevelBenefit.vue'
import PrepExam from '@/views/user/PrepExam.vue'
import ExamView from '@/views/user/ExamView.vue'
import ResultView from '@/views/user/ResultView.vue'
import AdminHomePage from '@/views/Admin/HomePage.vue'

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
      path: '/admin/:id',
      name: 'admin-home-view',
      component: AdminHomePage,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true }
    },
    {
      path: '/exam/:id/:level?',
      name: 'exam-view',
      component: PrepExam,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/exam/:id/:level/take',
      name: 'take-exam-view',
      component: ExamView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/exam/:id/:level/result',
      name: 'result-view',
      component: ResultView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/e-learning/:id',
      name: 'learning-view',
      component: LearningView,
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
    },
    {
      path: '/levelNbenefit/:id',
      name: 'levelBenefit-view',
      component: LevelNBenefit,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        userStore.setUser(Number(to.params.id))
      }
    }
],
})

export default router
