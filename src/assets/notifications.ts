import { snackbar } from 'mdui'

type noti = {
  message: string
}

type notis = Array<noti>

let notiList: notis = []

export function sendNoti(msg: string) {
  notiList.push({ message: msg })
}

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
