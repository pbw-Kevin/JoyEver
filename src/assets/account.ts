import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendNoti } from './notifications.ts'
import { Query, Object, User } from './main.ts'
import { getError } from './error.ts'

export function getUser() {
  return User.current()
}

export var emailObject = new Object('Email')
export var emailQuery = new Query('Email')

export var userInfoObject = new Object('UserInfo')
export var userInfoQuery = new Query('UserInfo')

export var privateUserInfoObject = new Object('PrivateUserInfo')
export var privateUserInfoQuery = new Query('PrivateUserInfo')

export function isLoggedIn(): boolean {
  return Boolean(getUser()) && !getUser().isAnonymous()
}

export var isLoggedInStat = ref(isLoggedIn())

export function updateLoggedInStat() {
  isLoggedInStat.value = isLoggedIn()
}

export function isEmail(s: string) {
  return /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(s)
}

export function isFormattedUsername(name: string) {
  return /^[A-Za-z][\w]{4,15}$/.test(name)
}

export function isFormattedPassword(pass: string) {
  return /^[\S]{8,}$/.test(pass)
}

export async function login(name: string, pass: string) {
  let ret = { code: -1, message: 'Logging in' }
  if (!isFormattedPassword(pass)) return getError(3)
  if (isEmail(name)) {
    await User.loginWithEmail(name, pass).then(
      (user) => {
        ret = getError(0)
      },
      (error) => {
        ret.code = error.code
        ret.message = error.rawMessage
      },
    )
  } else {
    if (!isFormattedUsername(name)) {
      return getError(2)
    }
    await User.logIn(name, pass).then(
      (user) => {
        ret = getError(0)
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

export function requireUser() {
  if (!Boolean(getUser())) User.loginAnonymously()
}

export async function register(name: string, pass: string, passAgain: string, email: string) {
  let ret = { code: -1, message: 'Registering' }
  if (!isFormattedUsername(name)) {
    return getError(2)
  }
  if (!isFormattedPassword(pass)) {
    return getError(3)
  }
  if (isEmail(name)) {
    return getError(11)
  }
  if (pass != passAgain) {
    return getError(12)
  }
  if (email && !isEmail(email)) {
    return getError(13)
  }
  var user = new User()
  user.setUsername(name)
  user.setPassword(pass)
  if (email) user.setEmail(email)
  await user.signUp().then(
    (user) => {
      ret = getError(0)
      if (email) {
        emailObject.set('userId', getUser().get('objectId'))
        emailObject.save().then(
          (emailObject) => {},
          (error) => {
            ret = getError(15)
          },
        )
      }
    },
    (error) => {
      ret.code = error.code
      ret.message = error.rawMessage
    },
  )
  return ret
}
