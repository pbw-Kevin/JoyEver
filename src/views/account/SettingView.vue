<script setup lang="ts">
import '@mdui/icons/keyboard-arrow-down'
import '@mdui/icons/settings'
import '@mdui/icons/security'
import '@mdui/icons/videogame-asset'
import '@mdui/icons/palette'

import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { confirm, prompt, getColorFromImage } from 'mdui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import {
  requireLogin,
  getUser,
  myInfoObject,
  isFormattedPassword,
  isEmail,
  logout,
} from '@/assets/account'
import {
  appearanceSetting,
  appearanceSettingList,
  setAppearance,
  type AppearanceSetting,
  fetched as appearanceFetched
} from '@/assets/appearance'
import { AV, debounce } from '@/assets/main'
import { sendNoti } from '@/assets/notifications'
import UserTag from '@/components/account/UserTag.vue'

requireLogin()

var user = getUser()
var username = user.getUsername()
var userInfo = new AV.Object('UserInfo')
var emailInfo = new AV.Object('Email')
var privateUserInfo = new AV.Object('PrivateUserInfo')

const localSetting = reactive({
  nickname: '',
  email: (user.get('email') as string | undefined) || '',
  hasEmail: !!user.get('email'),
  emailChanged: false,
  isPublicEmail: false,
  isVerifiedEmail: (user.get('emailVerified') as boolean) || false,
  verifyEmailClicked: false,
  verifyEmailFailed: false,
  emailErrorInfo: '',
})

var appearanceList = reactive(appearanceSettingList)
var activeAppearance = ref(appearanceSetting.value)
var activeAppearanceName = ref(appearanceSetting.value.name)

myInfoObject.get('userInfo').then((tmpUserInfo) => {
  if (!tmpUserInfo) return
  userInfo = tmpUserInfo
  localSetting.nickname = userInfo.get('nickname')
})
myInfoObject.get('email').then((tmpEmailInfo) => {
  if (!tmpEmailInfo) return
  emailInfo = tmpEmailInfo
  localSetting.isPublicEmail = tmpEmailInfo.getACL()?.getPublicReadAccess()
})
myInfoObject.get('privateUserInfo').then((tmpPrivate) => {
  if (!tmpPrivate) return
  privateUserInfo = tmpPrivate
})

function failedAutoSave() {
  sendNoti(t('setting.message.failedAutoSave'), true)
}

watch(
  () => localSetting.nickname,
  debounce((newNickname: string) => {
    if (!newNickname) return
    userInfo.set('nickname', newNickname)
    userInfo.save().catch(() => {
      failedAutoSave()
    })
  }, 1000),
)

watch(
  () => localSetting.email,
  (newEmail) => {
    localSetting.emailErrorInfo = ''
    localSetting.hasEmail = !!newEmail
    localSetting.emailChanged = newEmail !== (user.get('email') as string | undefined)
    if (newEmail && !isEmail(newEmail)) {
      localSetting.emailErrorInfo = t('setting.message.incorrectEmailFormat')
    }
  },
)

function saveEmail() {
  localSetting.emailErrorInfo = ''
  if (localSetting.email && !isEmail(localSetting.email)) {
    localSetting.emailErrorInfo = t('setting.message.incorrectEmailFormat')
    return
  }
  user.setEmail(localSetting.email)
  user
    .save()
    .then((user) => {
      localSetting.isVerifiedEmail = user.get('emailVerified')
      return emailInfo.set('email', localSetting.email)
    })
    .then(() => {
      localSetting.emailChanged = false
      sendNoti(t('setting.message.emailSaved'), true)
    })
    .catch((error) => {
      if (error.code == 203) {
        localSetting.emailErrorInfo = t('setting.message.emailUsed')
        return
      }
      localSetting.emailErrorInfo = t('setting.message.failedSaveEmail')
    })
  localSetting.verifyEmailClicked = false
  localSetting.verifyEmailFailed = false
}

function updateIsPublicEmail(newValue: boolean) {
  localSetting.isPublicEmail = newValue
  emailInfo.getACL().setPublicReadAccess(newValue)
  emailInfo
    .save()
    .then(() => {
      sendNoti(t('setting.message.emailPublicChanged'), true)
    })
    .catch((error) => {
      sendNoti(t('setting.message.failedChangeEmailPublic'), true)
    })
}

function sendEmailVerification() {
  AV.User.requestEmailVerify(localSetting.email)
    .then(() => {
      localSetting.verifyEmailClicked = true
    })
    .catch((error) => {
      localSetting.verifyEmailFailed = true
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
    passErrorInfo.value.password = t('setting.message.emptyPassword')
    return
  } else if (!isFormattedPassword(pass.value)) {
    passErrorInfo.value.password = t('setting.message.incorrectPasswordFormat')
    return
  } else if (pass.value !== passAgain.value) {
    passErrorInfo.value.passwordAgain = t('setting.message.differentPassword')
    return
  } else {
    user.setPassword(pass.value)
    user
      .save()
      .then(() => {
        sendNoti(t('setting.security.password.message.changed'))
        logout(false)
        router.push({ name: 'Login' })
      })
      .catch(() => {
        passErrorInfo.value.password = t('setting.message.failedSave')
      })
  }
}

watch(appearanceFetched, (val) => {
  if (val) {
    appearanceList.splice(0, appearanceList.length, ...appearanceSettingList)
  }
})

var appearanceChanged = computed(() => 
  JSON.stringify(activeAppearance.value) !== JSON.stringify(
    appearanceList.find((setting: AppearanceSetting) => setting.name === activeAppearanceName.value)
  )
)

watch(activeAppearanceName, (newName, oldName) => {
  if (!newName) {
    activeAppearanceName.value = oldName
    return
  }
  var appe = appearanceList.find((setting) => setting.name === newName)
  if (!appe) return
  activeAppearance.value = appe
  appearanceSetting.value = { ...activeAppearance.value }
})

watch(activeAppearance, (appe) => {
  appearanceSetting.value = appe
})

watch(() => activeAppearance.value.backgroundImage, (newImage, oldImage) => {
  if (!newImage) {
    activeAppearance.value.backgroundImageOpacity = 0.3
    activeAppearance.value.sidebarOpacity = 0.7
  } else if (!oldImage) {
    activeAppearance.value.backgroundImageOpacity = 0.3
    activeAppearance.value.sidebarOpacity = 0.7
  }
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
    colorErrorInfo.value = t('setting.message.failedLoadBackgroundImage')
  }
}

var savingErrorInfo = ref('')

function saveAppearanceList(msg?: string) {
  privateUserInfo.set('customAppearance', appearanceList.filter((setting) => !setting.isGeneral ))
  privateUserInfo.save().catch(() => {
    if (msg) savingErrorInfo.value = msg
  })
}

function saveAppearance() {
  savingErrorInfo.value = ''
  var existingAppearance = appearanceList.find(
    (setting) => setting.name === activeAppearanceName.value,
  )
  if (existingAppearance) {
    var tmpAppearance = appearanceList.find(
      (setting) => setting.name === activeAppearance.value.name,
    )
    if (tmpAppearance && tmpAppearance !== existingAppearance) {
      savingErrorInfo.value = '主题名已存在。'
      return
    }
    Object.assign(existingAppearance, { ...activeAppearance.value })
  } else {
    appearanceList.push({ ...activeAppearance.value })
  }
  if (privateUserInfo.get('activeAppearance') === activeAppearanceName.value) {
    privateUserInfo.set('activeAppearance', activeAppearance.value.name)
  }
  saveAppearanceList('保存时出现问题。请检查网络连接。')
}

function saveAsNewAppearance() {
  savingErrorInfo.value = ''
  prompt({
    headline: '另存为新的主题',
    description: '在此处键入主题名。',
    confirmText: '完成',
    cancelText: '取消',
    onConfirm: (value) => {
      if (!value) {
        savingErrorInfo.value = '主题名不能为空。'
        return
      }
      if (appearanceList.some((setting) => setting.name === value)) {
        savingErrorInfo.value = '主题名已存在。'
        return
      }
      var newAppearance = { ...activeAppearance.value, name: value, isGeneral: false }
      appearanceList.push(newAppearance)
      activeAppearanceName.value = value
      saveAppearanceList('')
    },
  })
}

function applyAppearance() {
  savingErrorInfo.value = ''
  privateUserInfo.set('activeAppearance', activeAppearanceName.value)
  privateUserInfo.save().then(() => {
    setAppearance(activeAppearance.value)
  }).catch(() => {
    savingErrorInfo.value = '应用时出现问题。请检查网络连接。'
  })
}

function deleteAppearance() {
  savingErrorInfo.value = ''
  confirm({
    headline: '确认要删除主题吗？',
    description: '此操作不可撤销。',
    confirmText: '删除',
    cancelText: '取消',
    onConfirm: () => {
      appearanceList = appearanceList.filter(
        (setting) => setting.name !== activeAppearanceName.value,
      )
      if (activeAppearanceName.value == privateUserInfo.get('activeAppearance')) {
        privateUserInfo.set('activeAppearance',appearanceList.find((setting) => setting.isGeneral)?.name || '')
      }
      activeAppearanceName.value = privateUserInfo.get('activeAppearance')
      privateUserInfo.save().catch(() => {
        savingErrorInfo.value = '删除失败。请检查网络连接。'
      })
    },
  })
}

// var saving = ref(false)

// async function saveSetting() {
//   saving.value = true
//   var hasError = false
//   await user.save().catch((err) => {
//     hasError = true
//   })
//   await userInfo.save().catch((err) => {
//     hasError = true
//   })
//   await emailInfo.save().catch((err) => {
//     hasError = true
//   })
//   await myInfoObject.get('privateUserInfo').then(async (tmpUserInfo) => {
//     if (!tmpUserInfo) {
//       hasError = true
//       return
//     }
//     tmpUserInfo.set(
//       'customAppearance',
//       appearanceList.value
//         .filter((setting) => !setting.isGeneral)
//         .map((setting) => ({
//           name: setting.name,
//           theme: setting.theme,
//           backgroundImage: setting.backgroundImage,
//           colorScheme: setting.colorScheme,
//           backgroundImageOpacity: setting.backgroundImageOpacity,
//           sidebarOpacity: setting.sidebarOpacity,
//         })),
//     )
//     tmpUserInfo.set('activeAppearance', appliedAppearanceName.value)
//     await tmpUserInfo.save().catch((err) => {
//       hasError = true
//     })
//   })
//   if (hasError) sendNoti(t('setting.message.failedSave'), true)
//   else sendNoti(t('setting.message.saved'), true)
//   saving.value = false
// }
</script>

<template>
  <div class="content">
    <h1>{{ $t('setting.title') }}</h1>
    <!-- <mdui-button @click="saveSetting()" :disabled="saving">{{
      $t('setting.operation.save')
    }}</mdui-button> -->
    <mdui-tabs value="global" full-width variant="secondary">
      <mdui-tab value="global">
        {{ $t('setting.global.title') }}
        <mdui-icon-settings slot="icon"></mdui-icon-settings>
      </mdui-tab>
      <mdui-tab value="security">
        {{ $t('setting.security.title') }}
        <mdui-icon-security slot="icon"></mdui-icon-security>
      </mdui-tab>
      <mdui-tab value="game">
        {{ $t('setting.game.title') }}
        <mdui-icon-videogame-asset slot="icon"></mdui-icon-videogame-asset>
      </mdui-tab>
      <mdui-tab value="appearance">
        {{ $t('setting.appearance.title') }}
        <mdui-icon-palette slot="icon"></mdui-icon-palette>
      </mdui-tab>

      <mdui-tab-panel slot="panel" value="global">
        <h2>{{ $t('setting.global.title') }}</h2>
        <mdui-text-field
          :label="$t('setting.global.username.title')"
          variant="outlined"
          readonly
          :value="username"
        ></mdui-text-field>
        <mdui-text-field
          :label="$t('setting.global.nickname.title')"
          :value="localSetting.nickname"
          @input="localSetting.nickname = $event.target.value"
          required
        >
        </mdui-text-field>
        <h3>{{ $t('setting.global.email.title') }}</h3>
        <mdui-text-field
          type="email"
          :label="$t('setting.global.email.title')"
          :value="localSetting.email"
          @input="localSetting.email = $event.target.value"
        >
          <span slot="helper" class="error-info">{{ localSetting.emailErrorInfo }}</span>
        </mdui-text-field>
        <mdui-button :disabled="!localSetting.emailChanged" @click="saveEmail()">{{
          $t('setting.global.email.operation.save')
        }}</mdui-button>
        <mdui-checkbox
          v-if="localSetting.hasEmail"
          :checked="localSetting.isPublicEmail"
          @input="updateIsPublicEmail(!$event.target.checked)"
          >{{ $t('setting.global.email.operation.madePublic') }}</mdui-checkbox
        >
        <div v-if="localSetting.hasEmail">
          {{
            $t('setting.global.email.status.title', {
              status: localSetting.isVerifiedEmail
                ? $t('setting.global.email.status.verified')
                : $t('setting.global.email.status.unverified'),
            })
          }}
          <mdui-button
            v-if="!localSetting.isVerifiedEmail"
            @click="sendEmailVerification()"
            :disabled="
              !localSetting.emailChanged && localSetting.hasEmail && localSetting.verifyEmailClicked
            "
            >{{ $t('setting.global.email.operation.verify') }}</mdui-button
          >
          <span v-if="localSetting.verifyEmailClicked">{{
            $t('setting.global.email.status.message.clicked')
          }}</span>
          <span v-if="localSetting.verifyEmailFailed">{{
            $t('setting.global.email.status.message.failed')
          }}</span>
        </div>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="security">
        <h2>{{ $t('setting.security.title') }}</h2>
        <h3>{{ $t('setting.security.password.change.title') }}</h3>
        <mdui-text-field
          type="password"
          toggle-password
          :label="$t('setting.security.password.new.title')"
          :value="pass"
          @input="pass = $event.target.value"
        >
          <span slot="helper" class="error-info">{{ passErrorInfo.password }}</span>
        </mdui-text-field>
        <mdui-text-field
          type="password"
          toggle-password
          :label="$t('setting.security.password.ensureNew.title')"
          :value="passAgain"
          @input="passAgain = $event.target.value"
        >
          <span slot="helper" class="error-info">{{ passErrorInfo.passwordAgain }}</span>
        </mdui-text-field>
        <mdui-button @click="savePassword()">{{
          $t('setting.security.password.operation.change')
        }}</mdui-button>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="game">
        <h2>{{ $t('setting.game.title') }}</h2>
        <mdui-checkbox>{{ $t('setting.game.madeHistoryPublic.title') }}</mdui-checkbox>
        <br />
        <mdui-checkbox>{{ $t('setting.game.autoDisableUnavailableSkill.title') }}</mdui-checkbox>
        <h3>{{ $t('setting.game.customSkill.title') }}</h3>
        <p>{{ $t('setting.game.customSkill.disc') }}</p>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="appearance">
        <h2>{{ $t('setting.appearance.title') }}</h2>
        <h3>{{ $t('setting.appearance.theme.title') }}</h3>
        <mdui-select
          :label="$t('setting.appearance.theme.select.title')"
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
          <UserTag
            color="grey"
            :tag="
              activeAppearance.isGeneral
                ? $t('setting.appearance.theme.type.general')
                : $t('setting.appearance.theme.type.custom')
            "
          ></UserTag>
          <UserTag
            v-if="activeAppearanceName == privateUserInfo.get('activeAppearance')"
            color="green"
            :tag="$t('setting.appearance.theme.applied.title')"
          ></UserTag>
          <mdui-text-field
            :label="$t('setting.appearance.theme.name.title')"
            :value="activeAppearance.name"
            @input="activeAppearance.name = $event.target.value"
          ></mdui-text-field>
          <mdui-select
            :label="$t('setting.appearance.theme.lightDark.title')"
            :value="activeAppearance.theme"
            @change="activeAppearance.theme = $event.target.value"
          >
            <mdui-menu-item v-for="lightDark in ['auto', 'light', 'dark']" :value="lightDark">{{
              $t('setting.appearance.theme.lightDark.' + lightDark)
            }}</mdui-menu-item>
            <mdui-button-icon slot="end-icon">
              <mdui-icon-keyboard-arrow-down></mdui-icon-keyboard-arrow-down>
            </mdui-button-icon>
          </mdui-select>
          <mdui-text-field
            :label="$t('setting.appearance.theme.backgroundImage.title')"
            :value="activeAppearance.backgroundImage"
            @input="activeAppearance.backgroundImage = $event.target.value"
          ></mdui-text-field>
          <div class="color-scheme">
            {{ $t('setting.appearance.theme.colorScheme.title')
            }}<input type="color" v-model="activeAppearance.colorScheme" style="margin-left: 4px" />
            <mdui-button
              @click="getColor()"
              :disabled="!activeAppearance.backgroundImage"
              >{{ $t('setting.appearance.theme.colorScheme.getColorFromImage') }}</mdui-button
            >
          </div>
          <div class="error-info" v-if="colorErrorInfo">
            {{ $t('setting.appearance.theme.colorScheme.error', { colorErrorInfo }) }}
          </div>
          <div v-if="activeAppearance.backgroundImage">
            {{ $t('setting.appearance.theme.opacity.backgroundImage') }}
            <mdui-slider
              tickmarks
              max="10"
              step="1"
              :value="activeAppearance.backgroundImageOpacity * 10"
              @input="activeAppearance.backgroundImageOpacity = $event.target.value / 10"
            ></mdui-slider>
            {{ $t('setting.appearance.theme.opacity.sidebar') }}
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
            >{{ $t('setting.appearance.theme.operation.save') }}</mdui-button
          >
          <mdui-button @click="saveAsNewAppearance()">{{
            $t('setting.appearance.theme.operation.saveAs')
          }}</mdui-button>
          <mdui-button
            @click="applyAppearance()"
            :disabled="activeAppearanceName == privateUserInfo.get('activeAppearance')"
            >{{ $t('setting.appearance.theme.operation.apply') }}</mdui-button
          >
          <mdui-button
            @click="deleteAppearance()"
            :disabled="activeAppearance.isGeneral"
            :style="{
              backgroundColor: activeAppearance.isGeneral ? '' : 'rgb(var(--mdui-color-error))',
            }"
            >{{ $t('setting.appearance.theme.operation.delete') }}</mdui-button
          >
          <div class="error-info" v-if="savingErrorInfo">
            {{ $t('setting.appearance.theme.message.failedSave', { savingErrorInfo }) }}
          </div>
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
