import { Query } from './main.ts'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export var localInfo = ref(
  new Date(localStorage.getItem('last-read-announcement') || '2000/01/01 00:00:00'),
)

var AnnouncementsQuery = new Query('Announcement')

AnnouncementsQuery.ascending('updatedAt')

export var AnnouncementList: Ref<
  {
    text: string
    time: Date
  }[]
> = ref([])

export var announcementMsgcnt = computed(() => {
  return AnnouncementList.value.filter((announcement) => {
    return announcement.time > localInfo.value
  }).length
})

export function updateAnnouncement(visit: boolean = false) {
  if (visit) {
    localInfo.value = new Date()
    localStorage.setItem('last-read-announcement', localInfo.value.toLocaleString('zh-CN'))
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
