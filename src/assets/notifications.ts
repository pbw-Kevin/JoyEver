/*
  Asset for side notification service of JoyEver
*/

import { snackbar } from 'mdui'

type Noti = {
  message: string
}

type Notis = Array<Noti>

let notiList: Notis = []

export function dispNoti() {
  let curNotiList = notiList
  notiList = []
  curNotiList.forEach((curNoti) => {
    snackbar({
      message: curNoti.message,
      closeable: true,
      placement: 'bottom-start',
    })
  })
}

export function sendNoti(msg: string, displayImmediately: boolean = false) {
  notiList.push({ message: msg })
  if (displayImmediately) dispNoti()
}
