/*
  Asset for announcement service of JoyEver
*/

import { AV } from './main.ts'
import { ref, computed } from 'vue'
import { getPrivateUserInfo, isLoggedIn } from './account.ts'

export var localInfo = ref(
  new Date(localStorage.getItem('last-read-announcement') || '2000/01/01 00:00:00'),
)

if (isLoggedIn()) {
  getPrivateUserInfo().then((privateUserInfo) => {
    localInfo.value = privateUserInfo.get('lastReadAnnouncement') || localInfo.value
    localStorage.setItem('last-read-announcement', localInfo.value.toLocaleString('zh-CN'))
  })
}

var AnnouncementsQuery = new AV.Query('Announcement')

AnnouncementsQuery.ascending('updatedAt')

export var AnnouncementList = ref(
  [] as {
    text: string
    time: Date
  }[],
)

export var announcementMsgcnt = computed(() => {
  return AnnouncementList.value.filter((announcement) => {
    return announcement.time > localInfo.value
  }).length
})

export function updateAnnouncement(visit: boolean = false) {
  if (visit) {
    localInfo.value = new Date()
    localStorage.setItem('last-read-announcement', localInfo.value.toLocaleString('zh-CN'))
    if (isLoggedIn()) {
      getPrivateUserInfo().then((privateUserInfo) => {
        privateUserInfo.set('lastReadAnnouncement', localInfo.value)
        privateUserInfo.save()
      })
    }
  }
  AnnouncementsQuery.find().then((announcements) => {
    AnnouncementList.value = []
    announcements.forEach((announcement) => {
      var tmpAnnouncement = { text: '', time: new Date() }
      tmpAnnouncement.text = announcement.get('text')
      tmpAnnouncement.time = announcement.get('updatedAt')
      AnnouncementList.value.push(tmpAnnouncement)
    })
  })
}
