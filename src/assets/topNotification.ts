/*
  Asset for top notification service of JoyEver
*/

import { ref } from 'vue'

var notiContent = ''
export var notiContentRef = ref('')

export function setTopNotification(content: string) {
  notiContent = content
}

export function getTopNotification(): string {
  var ret = notiContent
  notiContent = ''
  return ret
}

export function updateTopNotificationRef() {
  notiContentRef.value = getTopNotification()
}
