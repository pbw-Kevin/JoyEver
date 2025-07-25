import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.ts'
import { dispNoti } from '../assets/notifications.ts'
import { updateLoggedInStat } from '../assets/account.ts'
import { updateAnnouncement } from '../assets/announcement.ts'
import { fetchAppearance } from '../assets/appearance.ts'
import { updateTopNotificationRef } from '../assets/topNotification.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  updateLoggedInStat()
  updateAnnouncement(false)
  updateTopNotificationRef()
  fetchAppearance()
  next()
  dispNoti()
})

export default router
