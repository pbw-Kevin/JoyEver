import { ref } from 'vue'

type localInfoType = {
  lastReadAnnouncement: Date
  lastReadMessage: {
    id: string
    time: Date
  }[]
}

var localInfoEmpty: localInfoType = {
  lastReadAnnouncement: new Date('2000-01-01 00:00:00'),
  lastReadMessage: [],
}

export var localInfo = ref(localInfoEmpty)

export function getLocalInfo() {
  try {
    var rawLocalInfo = localStorage.getItem('local-info')
    if (rawLocalInfo == null) return localInfo
    var tmpLocalInfo = JSON.parse(rawLocalInfo)
    localInfo.value.lastReadAnnouncement =
      new Date(tmpLocalInfo?.lastReadAnnouncement) || new Date('2000-01-01 00:00:00')
    localInfo.value.lastReadMessage = []
    tmpLocalInfo?.lastReadMessage?.forEach((lRM: { id?: string; time?: string }) => {
      localInfo.value.lastReadMessage.push({
        id: lRM.id || '',
        time: new Date(lRM.time || '2000-01-01 00:00:00'),
      })
    })
    return localInfo
  } catch (err) {
    return localInfo
  }
}

export function saveLocalInfo(info: localInfoType = localInfo.value) {
  localStorage.setItem('local-info', JSON.stringify(info))
}
