/*
  Asset for language function of JoyEver
*/

import { updatePageTitle } from '@/router'
import { ref, watch } from 'vue'
import i18n, { getDefaultLanguage, type AvailableLang } from '@/lang'
import { isLoggedIn, myInfoObject } from './account'
export const _t = i18n.global

export var currentLanguage = ref('follow-system')

watch(currentLanguage, (newLang, oldLang) => {
  if (newLang == 'follow-system') {
    _t.locale.value = getDefaultLanguage()
  } else if (newLang) {
    _t.locale.value = newLang as AvailableLang
  } else {
    currentLanguage.value = oldLang
  }
  if (newLang) {
    updatePageTitle()
    if (isLoggedIn()) {
      myInfoObject.get('privateUserInfo').then((obj) => {
        if (obj) {
          obj.set('lang', newLang)
          obj.save()
        }
      })
    }
    localStorage.setItem('lang', newLang)
  }
})

export function updateLang() {
  var localLang = localStorage.getItem('lang')
  var finished = false
  if (isLoggedIn()) {
    myInfoObject.get('privateUserInfo').then((obj) => {
      if (obj) {
        currentLanguage.value = obj.get('lang') || localLang || 'follow-system'
        finished = true
      }
    })
  }
  if (!finished) {
    currentLanguage.value = localLang || 'follow-system'
  }
}
