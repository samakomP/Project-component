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
import UserAService from '@/views/user/UserASesrvice.vue'
import AdminHomePage from '@/views/Admin/HomePage.vue'
import AdminLevel from '@/views/Admin/AdminLevel.vue'
import LevelDetail from '@/views/Admin/LevelDetail.vue'
import EditLevel from '@/views/Admin/events/EditLevel.vue'
import ExamDetail from '@/views/Admin/events/ExamDetail.vue'
import UserManage from '@/views/Admin/UserManage.vue'
import AdminUserProfile from '@/views/Admin/AdminUserProfile.vue'
import AdminUserDetail from '@/views/Admin/events/AdminUserDetail.vue'
import AdminUserHistory from '@/views/Admin/events/AdminUserHistory.vue'
import AdminEditview from '@/views/Admin/events/AdminEditview.vue'

import CardBase from '@/components/CardBase.vue'
import { useUserStore } from '@/stores/user'
import UserASesrvice from '@/views/user/UserASesrvice.vue'

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
      path: '/aservice',
      name: 'user-aservice',
      component: UserASesrvice
    },
    {
      path: '/home/:id',
      name: 'userhome-view',
      component: HomeView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/admin/:id',
      name: 'admin-home-view',
      component: AdminHomePage,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/:id/level',
      name: 'admin-level',
      component: AdminLevel,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/:id/level/:level',
      name: 'admin-level-detail',
      component: LevelDetail,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/:id/level/:level/edit',
      name: 'admin-edit-level',
      component: EditLevel,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/:id/level/:level/exam',
      name: 'admin-exam-detail',
      component: ExamDetail,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/:id/users',
      name: 'admin-management',
      component: UserManage,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/:id/users/:userId',
      name: 'admin-user-profile',
      component: AdminUserProfile,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      },
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          redirect: (to) => ({ name: 'admin-user-detail', params: to.params })
        },
        {
          path: 'detail',
          name: 'admin-user-detail',
          component: AdminUserDetail
        },
        {
          path: 'history',
          name: 'admin-user-history',
          component: AdminUserHistory
        },
        {
          path: 'edit',
          name: 'admin-detailEdit-view',
          component: AdminEditview
        },
      ]
    },
    {
      path: '/exam/:id/:level?',
      name: 'exam-view',
      component: PrepExam,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/exam/:id/:level/take',
      name: 'take-exam-view',
      component: ExamView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/exam/:id/:level/result',
      name: 'result-view',
      component: ResultView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/e-learning/:id',
      name: 'learning-view',
      component: LearningView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/UserProfile/:id',
      name: 'userprofile-view',
      component: UserProfile,
      props: true,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
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
      path: '/aservice/:id',
      name: 'user-aservice',
      component: UserAService,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      }
    },
    {
      path: '/levelNbenefit/:id',
      name: 'levelBenefit-view',
      component: LevelNBenefit,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.setUser(Number(to.params.id))
      }
    }
],
})

export default router
