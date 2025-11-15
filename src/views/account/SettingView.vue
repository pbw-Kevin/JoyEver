<script setup lang="ts">
import '@mdui/icons/keyboard-arrow-down.js'
import '@mdui/icons/settings.js'
import '@mdui/icons/security.js'
import '@mdui/icons/videogame-asset.js'
import '@mdui/icons/palette.js'

import { computed, onUnmounted, ref, watch } from 'vue'
import { confirm, prompt, getColorFromImage, throttle } from 'mdui'
import {
  requireLogin,
  getUser,
  myInfoObject,
  isFormattedPassword,
  isEmail,
} from '@/assets/account.ts'
import {
  appearanceSettingList,
  fetched,
  getAppearance,
  setAppearance,
} from '@/assets/appearance.ts'
import { AV } from '@/assets/main.ts'
import { sendNoti } from '@/assets/notifications.ts'

requireLogin()

var user = getUser()
var username = user.getUsername()
var userInfo = new AV.Object('UserInfo')
var nickname = ref('')
var email = ref(user.get('email'))
var hasEmail = ref(!!email.value)
var emailInfo = new AV.Object('Email')
var isPublicEmail = ref(false)
var isVerifiedEmail = ref(user.get('emailVerified'))
var verifyEmailClicked = ref(false)
var verifyEmailFailed = ref(false)
myInfoObject.get('userInfo').then((tmpUserInfo) => {
  if (!tmpUserInfo) return
  userInfo = tmpUserInfo
  nickname.value = userInfo.get('nickname')
})
myInfoObject.get('email').then((tmpEmailInfo) => {
  if (!tmpEmailInfo) return
  emailInfo = tmpEmailInfo
  isPublicEmail.value = tmpEmailInfo.getACL().getPublicReadAccess()
})

watch(nickname, (newNickname) => {
  userInfo.set('nickname', newNickname)
})

var emailErrorInfo = ref('')

function saveEmail() {
  emailErrorInfo.value = ''
  if (email.value && !isEmail(email.value)) {
    emailErrorInfo.value = '邮箱格式不正确。'
    return
  }
  user.setEmail(email.value)
  user
    .save()
    .then((user) => {
      isVerifiedEmail.value = user.get('emailVerified')
      hasEmail.value = !!email.value
      return emailInfo.set('email', email.value)
    })
    .then(() => {
      sendNoti('邮箱已保存！', true)
    })
    .catch((error) => {
      if (error.code == 203) {
        emailErrorInfo.value = '邮箱已被使用。请尝试其他邮箱。'
        return
      }
      emailErrorInfo.value = '保存邮箱时出现问题。'
    })
  verifyEmailClicked.value = false
  verifyEmailFailed.value = false
}

watch(email, () => {
  emailErrorInfo.value = ''
})

function updateIsPublicEmail(newValue: boolean) {
  isPublicEmail.value = newValue
  emailInfo.getACL().setPublicReadAccess(newValue)
  emailInfo
    .save()
    .then(() => {
      sendNoti('邮箱隐私设置已更新！', true)
    })
    .catch((error) => {
      sendNoti('更新邮箱隐私设置时出现问题。', true)
    })
}

function sendEmailVerification() {
  AV.User.requestEmailVerify(email.value)
    .then(() => {
      verifyEmailClicked.value = true
    })
    .catch((error) => {
      verifyEmailFailed.value = true
    })
}

var pass = ref('')
var passAgain = ref('')

var passErrorInfo = ref({
  password: '',
  passwordAgain: '',
})
var passwordChanged = ref(false)

function savePassword() {
  passErrorInfo.value = {
    password: '',
    passwordAgain: '',
  }
  passwordChanged.value = false
  if (!pass.value) {
    passErrorInfo.value.password = '请填写密码。'
    return
  } else if (!isFormattedPassword(pass.value)) {
    passErrorInfo.value.password = '密码格式不正确。密码的长度应至少为 8 个字符，且不为空白字符。'
    return
  } else if (pass.value !== passAgain.value) {
    passErrorInfo.value.passwordAgain = '两次输入的密码不一致。'
    return
  } else {
    user.setPassword(pass.value)
    passwordChanged.value = true
  }
}

var appearanceSetting = getAppearance()
var appearanceList = ref(appearanceSettingList)
var activeAppearance = ref({ ...getAppearance().value })
var activeAppearanceName = ref(activeAppearance.value.name)
var appliedAppearanceName = ref(activeAppearance.value.name)
var appearanceChanged = computed(() => {
  return (
    JSON.stringify(
      appearanceList.value.find((setting) => setting.name === activeAppearanceName.value),
    ) !== JSON.stringify(activeAppearance.value)
  )
})

watch(fetched, (fetched) => {
  if (fetched) {
    appearanceList.value = appearanceSettingList
    activeAppearance.value = { ...getAppearance().value }
    activeAppearanceName.value = activeAppearance.value.name
    appliedAppearanceName.value = activeAppearance.value.name
  }
})

var tmpImg = ref(activeAppearance.value.backgroundImage)

watch(activeAppearanceName, (newName) => {
  var newAppearance = appearanceList.value.find((setting) => setting.name === newName)
  if (newAppearance) {
    activeAppearance.value = { ...newAppearance }
    tmpImg.value = newAppearance.backgroundImage
  }
})

watch(
  activeAppearance,
  (newAppearance) => {
    appearanceSetting.value = { ...newAppearance }
  },
  { deep: true },
)

var throttledSetImage = throttle((image: string) => {
  activeAppearance.value.backgroundImage = image
}, 1000)

watch(tmpImg, (newImage, oldImage) => {
  if (!newImage) {
    activeAppearance.value.backgroundImageOpacity = 0
    activeAppearance.value.sidebarOpacity = 1
  } else if (!oldImage) {
    activeAppearance.value.backgroundImageOpacity = 0.3
    activeAppearance.value.sidebarOpacity = 0.7
    activeAppearance.value.backgroundImage = newImage
  } else throttledSetImage(newImage)
})

var colorErrorInfo = ref('')

function getColor() {
  colorErrorInfo.value = ''
  var image = new Image()
  image.src = activeAppearance.value.backgroundImage
  image.crossOrigin = 'anonymous'
  image.onload = () => {
    getColorFromImage(image)
      .then((val) => {
        activeAppearance.value.colorScheme = val
      })
      .catch((error) => {
        colorErrorInfo.value = error.message
      })
  }
  image.onerror = (error) => {
    colorErrorInfo.value = '无法加载背景图片。可能是跨域问题或图片不存在。'
  }
}

var savingErrorInfo = ref('')

function saveAppearance() {
  savingErrorInfo.value = ''
  var existingAppearance = appearanceList.value.find(
    (setting) => setting.name === activeAppearanceName.value,
  )
  if (existingAppearance) {
    var tmpAppearance = appearanceList.value.find(
      (setting) => setting.name === activeAppearance.value.name,
    )
    if (tmpAppearance && tmpAppearance !== existingAppearance) {
      savingErrorInfo.value = '主题名已存在'
      return
    }
    Object.assign(existingAppearance, { ...activeAppearance.value })
  } else {
    appearanceList.value.push({ ...activeAppearance.value })
  }
  if (appliedAppearanceName.value === activeAppearanceName.value) {
    appliedAppearanceName.value = activeAppearance.value.name
  }
  activeAppearanceName.value = activeAppearance.value.name
}

function saveAsNewAppearance() {
  prompt({
    headline: '另存为新的主题',
    description: '在此处键入主题名',
    confirmText: '完成',
    cancelText: '取消',
    onConfirm: (value) => {
      if (!value) {
        savingErrorInfo.value = '主题名不能为空'
        return
      }
      if (appearanceList.value.some((setting) => setting.name === value)) {
        savingErrorInfo.value = '主题名已存在。'
        return
      }
      var newAppearance = { ...activeAppearance.value, name: value, isGeneral: false }
      appearanceList.value.push(newAppearance)
      activeAppearanceName.value = value
    },
  })
}

function applyAppearance() {
  appliedAppearanceName.value = activeAppearanceName.value
  setAppearance(activeAppearance.value)
}

function deleteAppearance() {
  confirm({
    headline: '确认要删除主题吗？',
    description: '此操作不可撤销',
    confirmText: '删除',
    cancelText: '取消',
    onConfirm: () => {
      appearanceList.value = appearanceList.value.filter(
        (setting) => setting.name !== activeAppearanceName.value,
      )
      if (activeAppearanceName.value == appliedAppearanceName.value) {
        appliedAppearanceName.value =
          appearanceList.value.find((setting) => setting.isGeneral)?.name || ''
      }
      activeAppearanceName.value = appliedAppearanceName.value
    },
  })
}

async function saveSetting() {
  var hasError = false
  await user.save().catch((err) => {
    hasError = true
  })
  await userInfo.save().catch((err) => {
    hasError = true
  })
  await emailInfo.save().catch((err) => {
    hasError = true
  })
  await myInfoObject.get('privateUserInfo').then(async (tmpUserInfo) => {
    if (!tmpUserInfo) {
      hasError = true
      return
    }
    tmpUserInfo.set(
      'customAppearance',
      appearanceList.value
        .filter((setting) => !setting.isGeneral)
        .map((setting) => ({
          name: setting.name,
          theme: setting.theme,
          backgroundImage: setting.backgroundImage,
          colorScheme: setting.colorScheme,
          backgroundImageOpacity: setting.backgroundImageOpacity,
          sidebarOpacity: setting.sidebarOpacity,
        })),
    )
    tmpUserInfo.set('activeAppearance', appliedAppearanceName.value)
    await tmpUserInfo.save().catch((err) => {
      hasError = true
    })
  })
  if (hasError) sendNoti('保存时出现问题。', true)
  else sendNoti('保存成功！', true)
}

onUnmounted(() => {
  saveSetting() // Should have better solution
  // Solution: Remind user with unsaved setting
})
</script>

<template>
  <div class="content">
    <h1>设置</h1>
    <mdui-button @click="saveSetting()">保存设置</mdui-button>
    <mdui-tabs value="global" full-width variant="secondary">
      <mdui-tab value="global">
        全局设置
        <mdui-icon-settings slot="icon"></mdui-icon-settings>
      </mdui-tab>
      <mdui-tab value="security">
        安全
        <mdui-icon-security slot="icon"></mdui-icon-security>
      </mdui-tab>
      <mdui-tab value="game">
        游戏设置
        <mdui-icon-videogame-asset slot="icon"></mdui-icon-videogame-asset>
      </mdui-tab>
      <mdui-tab value="appearance">
        外观
        <mdui-icon-palette slot="icon"></mdui-icon-palette>
      </mdui-tab>

      <mdui-tab-panel slot="panel" value="global">
        <h2>全局设置</h2>
        <mdui-text-field
          label="用户名"
          variant="outlined"
          readonly
          :value="username"
        ></mdui-text-field>
        <mdui-text-field label="昵称" v-model="nickname"></mdui-text-field>
        <h3>邮箱</h3>
        <mdui-text-field type="email" label="邮箱" v-model="email">
          <span slot="helper" class="error-info">{{ emailErrorInfo }}</span>
        </mdui-text-field>
        <mdui-button @click="saveEmail()">保存邮箱</mdui-button>
        <div v-if="hasEmail">
          <mdui-checkbox
            :checked="isPublicEmail"
            @input="updateIsPublicEmail(!$event.target.checked)"
            >公开邮箱</mdui-checkbox
          >
          邮箱状态：<span v-if="isVerifiedEmail">已验证✔</span><span v-else>未验证❌</span>
          <mdui-button
            v-if="!isVerifiedEmail"
            @click="sendEmailVerification()"
            :disabled="verifyEmailClicked"
            >邮箱验证</mdui-button
          >
          <span v-if="verifyEmailClicked">验证邮件已发送</span>
          <span v-if="verifyEmailFailed">发送验证邮件失败</span>
        </div>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="security">
        <h2>安全</h2>
        <h3>修改密码</h3>
        <mdui-text-field type="password" toggle-password label="新密码" v-model="pass">
          <span slot="helper" class="error-info">{{ passErrorInfo.password }}</span>
        </mdui-text-field>
        <mdui-text-field type="password" toggle-password label="确认新密码" v-model="passAgain">
          <span slot="helper" class="error-info">{{ passErrorInfo.passwordAgain }}</span>
        </mdui-text-field>
        <mdui-button @click="savePassword()">更改密码</mdui-button>
        <span v-if="passwordChanged">密码已更改！</span>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="game">
        <h2>游戏设置</h2>
        <mdui-checkbox>公开历史记录</mdui-checkbox>
        <br />
        <mdui-checkbox>自动禁用不可用手势</mdui-checkbox>
        <h3>自定义手势</h3>
        <p>自定义手势会被自动判定为爆盾。</p>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="appearance">
        <h2>外观</h2>
        <h3>主题</h3>
        <mdui-select
          label="选择主题"
          :value="activeAppearanceName"
          @change="activeAppearanceName = $event.target.value"
        >
          <mdui-menu-item v-for="setting in appearanceList" :value="setting.name">{{
            setting.name
          }}</mdui-menu-item>
          <mdui-button-icon slot="end-icon">
            <mdui-icon-keyboard-arrow-down></mdui-icon-keyboard-arrow-down>
          </mdui-button-icon>
        </mdui-select>
        <mdui-card class="appearance-card" v-if="activeAppearanceName">
          <span v-if="activeAppearance.isGeneral">系统主题</span>
          <span v-else>自定义主题</span>
          <span v-if="activeAppearanceName == appliedAppearanceName">&nbsp;已应用✔</span>
          <mdui-text-field label="主题名称" v-model="activeAppearance.name"></mdui-text-field>
          <mdui-select
            label="深色/浅色模式"
            :value="activeAppearance.theme"
            @change="activeAppearance.theme = $event.target.value"
          >
            <mdui-menu-item value="auto">跟随系统</mdui-menu-item>
            <mdui-menu-item value="light">浅色模式</mdui-menu-item>
            <mdui-menu-item value="dark">深色模式</mdui-menu-item>
            <mdui-button-icon slot="end-icon">
              <mdui-icon-keyboard-arrow-down></mdui-icon-keyboard-arrow-down>
            </mdui-button-icon>
          </mdui-select>
          <mdui-text-field
            label="背景图片URL"
            :value="tmpImg"
            @input="tmpImg = $event.target.value"
          ></mdui-text-field>
          <div class="color-scheme">
            配色方案：<input type="color" v-model="activeAppearance.colorScheme" />
            <mdui-button @click="getColor()" :disabled="!activeAppearance.backgroundImage"
              >从背景图片中提取</mdui-button
            >
          </div>
          <div class="error-info" v-if="colorErrorInfo">提取失败。错误：{{ colorErrorInfo }}</div>
          <div v-if="tmpImg">
            背景图片不透明度：
            <mdui-slider
              tickmarks
              max="10"
              step="1"
              :value="activeAppearance.backgroundImageOpacity * 10"
              @input="activeAppearance.backgroundImageOpacity = $event.target.value / 10"
            ></mdui-slider>
            侧边栏不透明度：
            <mdui-slider
              tickmarks
              max="10"
              step="1"
              :value="activeAppearance.sidebarOpacity * 10"
              @input="activeAppearance.sidebarOpacity = $event.target.value / 10"
            ></mdui-slider>
          </div>
          <mdui-button
            @click="saveAppearance()"
            :disabled="!appearanceChanged || activeAppearance.isGeneral"
            >保存主题</mdui-button
          >
          <mdui-button @click="saveAsNewAppearance()">另存为新的主题</mdui-button>
          <mdui-button
            @click="applyAppearance()"
            :disabled="activeAppearanceName == appliedAppearanceName"
            >应用该主题</mdui-button
          >
          <mdui-button @click="deleteAppearance()" :disabled="activeAppearance.isGeneral"
            >删除主题</mdui-button
          >
          <div class="error-info" v-if="savingErrorInfo">保存失败。{{ savingErrorInfo }}</div>
        </mdui-card>
      </mdui-tab-panel>
    </mdui-tabs>
  </div>
</template>

<style scoped>
mdui-text-field,
mdui-checkbox,
mdui-select,
mdui-button,
mdui-card,
.color-scheme {
  margin: 5px 0;
  vertical-align: middle;
}

mdui-button {
  margin: 5px;
}

.appearance-card {
  width: 100%;
  padding: 10px;
}

.color-scheme {
  display: flex;
  align-items: center;
}

.error-info {
  color: rgb(var(--mdui-color-error));
  margin: 5px 0;
}
</style>
