/*
  Asset for appearance service of JoyEver
*/

import { ref, watch } from 'vue'
import { setColorScheme, setTheme, breakpoint, observeResize } from 'mdui'
import type { Theme } from 'mdui/internal/theme'
import { AV } from './main'
import { sendNoti } from './notifications'
import { myInfoObject } from './account'

var generalAppearanceQuery = new AV.Query('GeneralAppearance')

var theme: Theme = 'auto'
var colorScheme = '#63ebb5'
var backgroundImage = ''
var backgroundImageOpacity = 0
var sidebarOpacity = 1

export function proceedOpacity(opa: any) {
  if (opa === 0) return 0
  return opa || 1
}

const localGeneralAppearance = {
  name: '',
  isGeneral: true,
  theme: (theme as Theme) || 'auto',
  colorScheme: colorScheme || '#ffffff',
  backgroundImage: backgroundImage || '',
  backgroundImageOpacity: proceedOpacity(backgroundImageOpacity),
  sidebarOpacity: proceedOpacity(sidebarOpacity),
}

export var appearanceSetting = ref(localGeneralAppearance)

export var appearanceSettingList = [localGeneralAppearance]

export var fetched = ref(false)

export async function fetchAppearance(force = false) {
  var activeAppearance = localGeneralAppearance
  var rawLocalAppearance = sessionStorage.getItem('appearance')
  if (rawLocalAppearance) {
    activeAppearance = JSON.parse(rawLocalAppearance)
    appearanceSetting.value = activeAppearance
  }
  if (!fetched.value || force) {
    await generalAppearanceQuery.find().then(
      (list) => {
        appearanceSettingList = []
        list.forEach((item) => {
          var itemJSON = {
            name: item.get('name') || '',
            isGeneral: true,
            theme: item.get('theme') || 'auto',
            colorScheme: item.get('colorScheme') || '#ffffff',
            backgroundImage: item.get('backgroundImage') || '',
            backgroundImageOpacity: proceedOpacity(item.get('backgroundImageOpacity')),
            sidebarOpacity: proceedOpacity(item.get('sidebarOpacity')),
          }
          if (item.get('isDefault') && !rawLocalAppearance) {
            activeAppearance = itemJSON
          }
          appearanceSettingList.push(itemJSON)
        })
      },
      (error) => {
        sendNoti('获取默认外观列表失败', true)
      },
    )
    await myInfoObject.get('privateUserInfo').then((userInfo) => {
      if (!userInfo) return
      if (userInfo.get('customAppearance')) {
        var customAppearance = userInfo.get('customAppearance')
        customAppearance.forEach(
          (item: {
            name?: string
            theme?: Theme
            colorScheme?: string
            backgroundImage?: string
            backgroundImageOpacity?: number
            sidebarOpacity?: number
          }) => {
            var itemJSON = {
              name: item.name || '',
              isGeneral: false,
              theme: item.theme || 'auto',
              colorScheme: item.colorScheme || '#ffffff',
              backgroundImage: item.backgroundImage || '',
              backgroundImageOpacity: proceedOpacity(item.backgroundImageOpacity),
              sidebarOpacity: proceedOpacity(item.sidebarOpacity),
            }
            appearanceSettingList.push(itemJSON)
          },
        )
      }
      if (userInfo.get('activeAppearance')) {
        var activeAppearanceName = userInfo.get('activeAppearance')
        var activeAppearanceItem = appearanceSettingList.find(
          (item) => item.name === activeAppearanceName,
        )
        if (activeAppearanceItem) {
          activeAppearance = { ...activeAppearanceItem }
        }
      }
    })
    appearanceSetting.value = activeAppearance
    sessionStorage.setItem('appearance', JSON.stringify(activeAppearance))
    fetched.value = true
  }
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
  (val, oldVal) => {
    if (val.backgroundImage !== oldVal?.backgroundImage) {
      backgroundImageLoaded.value = false
    }
    setTheme(val.theme)
    setColorScheme(val.colorScheme)
    document
      .querySelector('body')
      ?.style.setProperty('--sidebar-opacity', val.sidebarOpacity.toString())
  },
  { immediate: true, deep: true },
)
