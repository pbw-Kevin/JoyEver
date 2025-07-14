import { Query } from './main.ts'
import { getLocalInfo, saveLocalInfo } from './localInfo.ts'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

var localInfo = getLocalInfo()

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
    return announcement.time > localInfo.value.lastReadAnnouncement
  }).length
})

export function updateAnnouncement(visit: boolean = false) {
  if (visit) localInfo.value.lastReadAnnouncement = new Date()
  AnnouncementsQuery.find().then((announcements) => {
    AnnouncementList.value = []
    announcements.forEach((announcement) => {
      var tmpAnnouncement = { text: '', time: new Date() }
      tmpAnnouncement.text = announcement.get('text')
      tmpAnnouncement.time = announcement.get('updatedAt')
      AnnouncementList.value.push(tmpAnnouncement)
    })
  })
  saveLocalInfo()
}
