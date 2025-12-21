import { ref, watch } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
import { dispNoti } from '@/assets/notifications'
import { myInfoObject, isLoggedIn, updateLoggedInStat } from '@/assets/account'
import { updateAnnouncement } from '@/assets/announcement'
import { fetchAppearance } from '@/assets/appearance'
import { updateTopNotificationRef } from '@/assets/topNotification'
import { _t, updateLang } from '@/assets/lang'

const router = createRouter({
  history: (import.meta.env.VITE_IS_GH_PAGES ? createWebHashHistory : createWebHistory)(
    import.meta.env.BASE_URL,
  ),
  routes,
})

var title = ref('')

export function updatePageTitle(newTitle = title.value) {
  if (!newTitle) return
  document.title = _t.t(newTitle) + ' - ' + _t.t('site.title')
}

watch(title, updatePageTitle)

router.beforeEach((to, from, next) => {
  title.value = to.meta.title as string
  updateLoggedInStat()
  updateAnnouncement(false)
  updateTopNotificationRef()
  updateLang()
  fetchAppearance()
  if (isLoggedIn()) myInfoObject.get('userRoles')
  next()
  dispNoti()
})

export default router
