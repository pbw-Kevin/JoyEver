/*
  Asset for language function of JoyEver
*/

import { updatePageTitle } from '@/router'
import { ref, watch } from 'vue'
import i18n, { getDefaultLanguage, type AvailableLang } from '@/lang'
import { isLoggedIn, myInfoObject } from './account'
export const _t = i18n.global

export var currentLanguage = ref(localStorage.getItem('lang') || 'follow-system')

watch(
  currentLanguage,
  (newLang, oldLang) => {
    if (newLang == 'follow-system') {
      _t.locale.value = getDefaultLanguage()
    } else if (newLang) {
      _t.locale.value = newLang as AvailableLang
    } else if (oldLang) {
      currentLanguage.value = oldLang
    }
    if (oldLang && newLang != oldLang) {
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
  },
  { immediate: true },
)

export function updateLang() {
  var localLang = localStorage.getItem('lang') || 'follow-system'
  if (isLoggedIn()) {
    myInfoObject.get('privateUserInfo').then((obj) => {
      if (obj) {
        currentLanguage.value = obj.get('lang') || localLang
      } else {
        currentLanguage.value = localLang
      }
    })
  } else {
    currentLanguage.value = localLang
  }
}
