import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendNoti } from './notifications.ts'
import { Query, Object, User } from './main.ts'
import { getError } from './error.ts'

export function getUser(fetch = true) {
  if (User.current()) User.current().fetch()
  return User.current()
}

export var emailObject = new Object('Email')
export var emailQuery = new Query('Email')

export var userInfoObject = new Object('UserInfo')
export var userInfoQuery = new Query('UserInfo')

export var userRolesObject = new Object('UserRoles')
export var userRolesQuery = new Query('UserRoles')

export var privateUserInfoObject = new Object('PrivateUserInfo')
export var privateUserInfoQuery = new Query('PrivateUserInfo')

export function isLoggedIn(): boolean {
  return Boolean(getUser()) && !getUser().isAnonymous()
}

export var isLoggedInStat = ref(isLoggedIn())

export var curRole = ref([] as string[])

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

export async function getUserInfo(noti = true, name = '') {
  if (!name) requireLogin()
  userInfoQuery.equalTo('username', name || getUser().get('username'))
  var ret = new Object('UserInfo')
  await userInfoQuery.find().then((users) => {
    if (users.length > 1) {
      if (noti) sendNoti('该用户异常', true)
    } else if (users.length == 0) {
      if (name) {
        if (noti) sendNoti('该用户不存在', true)
      } else {
        userInfoObject = new Object('UserInfo')
        userInfoObject.set('nickname', getUser().get('username'))
        userInfoObject.set('username', getUser().get('username'))
        userInfoObject.save().then((userInfoObject) => {
          ret = userInfoObject
        })
      }
    } else {
      ret = users[0] as typeof ret
    }
  })
  return ret
}

export async function getEmail(noti = true, name = '') {
  if (!name) requireLogin()
  emailQuery.equalTo('username', name || getUser().get('username'))
  emailQuery.includeACL(true)
  var ret = new Object('Email')
  await emailQuery.find().then((emails) => {
    if (emails.length > 1) {
      if (noti) sendNoti('该用户异常', true)
    } else if (emails.length == 0) {
      if (name) {
        ret = new Object('email')
      } else {
        emailObject = new Object('email')
        emailObject.set('email', getUser().get('email'))
        emailObject.set('username', getUser().get('username'))
        var created = false
        emailObject.save().then(
          (emailObject) => {
            ret = emailObject
          },
          (error) => {},
        )
      }
    } else {
      if (emails[0].getACL().getPublicReadAccess()) ret = emails[0] as typeof ret
      else ret = new Object('email')
    }
  })
  return ret
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
        emailObject = new Object('Email')
        emailObject.set('userId', getUser().get('objectId'))
        emailObject.save().then(
          (emailObject) => {},
          (error) => {
            ret = getError(15)
          },
        )
      }
      userInfoObject = new Object('UserInfo')
      userInfoObject.set('nickname', name)
      userInfoObject.set('username', name)
      userInfoObject.save().then(
        (userInfoObject) => {},
        (error) => {
          ret = getError(15)
        },
      )
    },
    (error) => {
      ret.code = error.code
      ret.message = error.rawMessage
    },
  )
  return ret
}
