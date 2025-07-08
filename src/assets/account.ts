import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendNoti } from './notifications.ts'
import { User } from './main.ts'

export function getUser() {
  return User.current()
}

export function isLoggedIn(): boolean {
  return Boolean(getUser()) && !getUser().isAnonymous()
}

export var isLoggedInStat = ref(isLoggedIn())

export function updateLoggedInStat() {
  isLoggedInStat.value = isLoggedIn()
}

export function isEmail(s: string) {
  return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(s)
}

export async function login(name: string, pass: string) {
  let ret = { code: -1, message: '' }
  if (isEmail(name)) {
    await User.loginWithEmail(name, pass).then(
      (user) => {
        ret.code = 0
        ret.message = 'Success!'
      },
      (error) => {
        ret.code = error.code
        ret.message = error.rawMessage
      },
    )
  } else {
    await User.logIn(name, pass).then(
      (user) => {
        ret.code = 0
        ret.message = 'Success!'
      },
      (error) => {
        ret.code = error.code
        ret.message = error.rawMessage
      },
    )
  }
  updateLoggedInStat()
  return ret
}

export async function logout() {
  if (!isLoggedIn()) return
  await User.logOut()
  User.loginAnonymously()
  updateLoggedInStat()
  sendNoti('登出成功！')
}

export var requireLogin = () => {
  var router = useRouter()
  if (!isLoggedIn()) {
    sendNoti('请先登录！')
    router.push({ name: 'Login' })
  }
}

if (!getUser()) User.loginAnonymously()
