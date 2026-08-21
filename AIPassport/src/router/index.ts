import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAdmin?: boolean
    validate?: (to: RouteLocationNormalized) => Promise<true | RouteLocationRaw>
  }
}

import NotFoundView from '@/views/NotfoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
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
import UserApi from '@/services/UserService'
import LevelService from '@/services/LevelService'
import { useAuthStore } from '@/stores/Auth'

const notFound = (resource: string) => ({
  name: '404-resource-view',
  params: { resource },
})

const networkError = { name: 'network-error-view' }

const requireUser = async (to: RouteLocationNormalized) => {
  const userStore = useUserStore()
  try {
    const found = await userStore.setUser(Number(to.params.id))
    return found ? true : notFound('user')
  } catch {
    return networkError
  }
}

const requireUserAndLevel = async (to: RouteLocationNormalized) => {
  const userCheck = await requireUser(to)
  if (userCheck !== true) return userCheck

  if (!to.params.level) return true

  try {
    const response = await LevelService.getLevels()
    const levels = response.data as { levelNumber: number }[]
    const exists = levels.some(level => level.levelNumber === Number(to.params.level))
    return exists ? true : notFound('level')
  } catch {
    return networkError
  }
}

const requireUserAndTargetUser = async (to: RouteLocationNormalized) => {
  const userCheck = await requireUser(to)
  if (userCheck !== true) return userCheck

  try {
    const response = await UserApi.getUserById(Number(to.params.userId))
    return response.data.length > 0 ? true : notFound('user')
  } catch {
    return networkError
  }
}

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
      meta: { validate: requireUser }
    },
    {
      path: '/admin/:id',
      name: 'admin-home-view',
      component: AdminHomePage,
      meta: { requiresAdmin: true, validate: requireUser }
    },
    {
      path: '/admin/:id/level',
      name: 'admin-level',
      component: AdminLevel,
      meta: { requiresAdmin: true, validate: requireUser }
    },
    {
      path: '/admin/:id/level/:level',
      name: 'admin-level-detail',
      component: LevelDetail,
      meta: { requiresAdmin: true, validate: requireUserAndLevel }
    },
    {
      path: '/admin/:id/level/:level/edit',
      name: 'admin-edit-level',
      component: EditLevel,
      meta: { requiresAdmin: true, validate: requireUserAndLevel }
    },
    {
      path: '/admin/:id/level/:level/exam',
      name: 'admin-exam-detail',
      component: ExamDetail,
      meta: { requiresAdmin: true, validate: requireUserAndLevel }
    },
    {
      path: '/admin/:id/users',
      name: 'admin-management',
      component: UserManage,
      meta: { requiresAdmin: true, validate: requireUser }
    },
    {
      path: '/admin/:id/users/:userId',
      name: 'admin-user-profile',
      component: AdminUserProfile,
      meta: { requiresAdmin: true, validate: requireUserAndTargetUser },
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
      meta: { validate: requireUserAndLevel }
    },
    {
      path: '/exam/:id/:level/take',
      name: 'take-exam-view',
      component: ExamView,
      meta: { validate: requireUserAndLevel }
    },
    {
      path: '/exam/:id/:level/result',
      name: 'result-view',
      component: ResultView,
      meta: { validate: requireUserAndLevel }
    },
    {
      path: '/e-learning/:id',
      name: 'learning-view',
      component: LearningView,
      meta: { validate: requireUser }
    },
    {
      path: '/UserProfile/:id',
      name: 'userprofile-view',
      component: UserProfile,
      props: true,
      meta: { validate: requireUser },
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
      meta: { validate: requireUser }
    },
    {
      path: '/levelNbenefit/:id',
      name: 'levelBenefit-view',
      component: LevelNBenefit,
      meta: { validate: requireUser }
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found-view',
      component: NotFoundView
    }
],
})

const publicRoutes = ['login-view', 'register-view', 'network-error-view']

router.beforeEach(async (to) => {
  NProgress.start()

  const authStore = useAuthStore()

  if (!publicRoutes.includes(String(to.name)) && !authStore.user) {
    return { name: 'login-view' }
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
    return { name: 'userhome-view', params: { id: authStore.user?.id } }
  }

  if (to.meta.validate) {
    return await to.meta.validate(to)
  }

  return true
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(() => {
  NProgress.done()
})

export default router
