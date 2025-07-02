import { createRouter, createWebHistory } from 'vue-router'
import { dispNoti } from '../assets/notifications.ts'
import { updateLoggedInStat } from '../assets/account.ts'
import { breakpoint } from 'mdui'
import routes from './routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  updateLoggedInStat()
  next()
  dispNoti()
})

export default router
