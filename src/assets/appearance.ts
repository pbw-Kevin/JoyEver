/*
  Asset for appearance service of JoyEver
*/

import { ref, watch } from 'vue'
import { setColorScheme, setTheme, breakpoint, observeResize } from 'mdui'
import type { Theme } from 'mdui/internal/theme'
import { AV } from './main.ts'
import { sendNoti } from './notifications.ts'

var generalAppearanceQuery = new AV.Query('GeneralAppearance')

var theme: Theme = 'auto'
var colorScheme = '#63ebb5'
var backgroundImage = ''
var backgroundImageOpacity = 0
var sidebarOpacity = 1

var localGeneralAppearance = {
  name: '',
  theme: theme || 'auto',
  colorScheme: colorScheme || '#ffffff',
  backgroundImage: backgroundImage || '',
  backgroundImageOpacity: backgroundImageOpacity || 0,
  sidebarOpacity: sidebarOpacity || 1,
}

var appearanceSetting = ref(localGeneralAppearance)

var appearanceSettingList = [localGeneralAppearance]

export function fetchAppearance() {
  var rawLocalAppearance = sessionStorage.getItem('appearance')
  if (rawLocalAppearance) {
    appearanceSetting.value = JSON.parse(rawLocalAppearance)
  }
  generalAppearanceQuery.find().then(
    (list) => {
      appearanceSettingList = []
      list.forEach((item) => {
        var itemJSON = {
          name: item.get('name') || '',
          theme: item.get('theme') || 'auto',
          colorScheme: item.get('colorScheme') || '#ffffff',
          backgroundImage: item.get('backgroundImage') || '',
          backgroundImageOpacity: item.get('backgroundImageOpacity') || 0,
          sidebarOpacity: item.get('sidebarOpacity') || 1,
        }
        if (item.get('isDefault') && !rawLocalAppearance) {
          appearanceSetting.value = itemJSON
          sessionStorage.setItem('appearance', JSON.stringify(itemJSON))
        }
        appearanceSettingList.push(itemJSON)
      })
    },
    (error) => {
      sendNoti('获取默认外观列表失败', true)
    },
  )
}

export function getAppearance() {
  return appearanceSetting
}

export function setAppearance(appe: typeof localGeneralAppearance) {
  sessionStorage.setItem('appearance', JSON.stringify(appe))
  appearanceSetting.value = appe
}

export var isDesktop = ref(breakpoint().up('md'))

export var backgroundImageLoaded = ref(false)

const observer = observeResize(document.body, function (entry, observer) {
  isDesktop.value = breakpoint().up('md')
})

watch(
  appearanceSetting,
  (val) => {
    setTheme(val.theme)
    setColorScheme(val.colorScheme)
    document
      .querySelector('body')
      ?.style.setProperty('--sidebar-opacity', val.sidebarOpacity.toString())
  },
  { immediate: true },
)
