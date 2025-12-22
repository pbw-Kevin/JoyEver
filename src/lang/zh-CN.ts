export default {
  site: {
    title: '永乐大典',
  },
  lang: {
    title: '语言',
    name: '简体中文',
    followSystem: '跟随系统',
  },
  developing: {
    title: '开发中。',
  },
  user: {
    title: '用户',
    tags: {
      user: '用户',
      admin: '管理员',
      superAdmin: '超级管理员',
      siteOwner: '站长',
      banned: '已封禁',
    },
  },
  hint: {
    title: '你知道吗？',
  },
  announcement: {
    title: '公告',
    tags: {
      official: '官方公告',
    },
    new: {
      title: '新公告',
    },
    no: {
      title: '暂无公告',
    },
  },
  message: {
    title: '消息',
    tips: {
      chatDisabledBeforeLogin: '登录后方可与好友聊天！',
    },
  },
  chat: {
    title: '聊天',
    titleInTopAppBar: '聊天：{user}',
    message: {
      no: {
        title: '暂无消息',
      },
    },
    operation: {
      send: '发送消息',
    },
  },
  search: {
    title: '搜索',
  },
  menu: {
    title: '菜单',
  },
  home: {
    title: '首页',
    disc: '欢迎来到永乐大典在线游戏！',
    options: {
      title: '你可以：',
      startGame: {
        pre: '立刻',
        title: '开始游戏',
        suf: '',
      },
      viewWiki: {
        pre: '在线查看',
        title: '永乐大典（Wiki）',
        suf: '',
      },
      login: {
        title: '登录账号',
        disc: '（推荐，登录后可以查看历史对局，启用聊天功能）',
      },
    },
  },
  game: {
    title: '游戏',
    room: {
      title: '房间',
      titleInTopAppBar: '房间：{room}',
      list: {
        title: '房间列表',
      },
    },
    history: {
      title: '历史对局',
      my: {
        title: '我的历史对局',
      },
    },
  },
  wiki: {
    title: '大典',
    home: {
      title: '你可以访问：',
      test: {
        pre: '大典不能解决的困惑，可以在',
        suf: '中自行尝试。',
      },
    },
    online: {
      title: '在线大典',
    },
    docx: {
      title: '大典 Docx',
      visitOnline: {
        title: '在线访问 Docx 版永乐大典',
        disc: '链接：',
      },
      about: {
        title: '关于',
        disc: "由 {'@'}syq 制作。",
      },
    },
    test: {
      title: '试验',
    },
  },
  account: {
    title: '账号',
    operation: {
      login: '登录',
      register: '注册',
      logout: '登出',
      resetPassword: '重置密码',
      emailVerify: '邮箱验证',
    },
    my: {
      title: '我的账号',
    },
    view: {
      visitor: '访客视角',
      my: '个人视角',
    },
    email: {
      title: '邮箱',
    },
    login: {
      title: '登录',
      usernameEmail: {
        title: '用户名（邮箱）',
      },
      password: {
        title: '密码',
      },
      tips: {
        noAccount: '还没有账号？',
        forgotPassword: '忘记密码？',
      },
      message: {
        success: '登录成功！',
        emptyUsernameEmail: '用户名（邮箱）不能为空。',
        invalidUsernameEmail:
          '不是有效的用户名或邮箱。用户名的长度应在 2 到 16 个字符之间，且只能包含字母、数字和下划线，其中第一个字符必须是字母。',
        emptyPassword: '密码不能为空。',
        invalidPassword: '密码格式不正确。密码的长度应至少为 8 个字符，且不为空白字符。',
        unverifiedEmail: '尚未验证邮箱。验证邮箱以获得更安全的账号体验。转到“设置”以验证。',
        cannotFindEmailUser: '找不到邮箱对应的用户。',
        mismatchUsernamePassword: '用户名和密码不匹配。',
        cannotFindUser: '找不到用户。',
        unknownError:
          '登录失败。错误码：{code}。错误信息：{message}。如必要，请联系管理员以获取帮助。',
      },
    },
  },
  setting: {
    title: '设置',
    operation: {
      save: '保存设置',
    },
    message: {
      failedAutoSave: '自动保存设置时出现问题。请检查网络连接。',
      failedSave: '保存时出现问题。',
      saved: '保存成功！',
      incorrectEmailFormat: '邮箱格式不正确。',
      emailSaved: '邮箱已保存！',
      emailUsed: '邮箱已被使用。请尝试其他邮箱。',
      failedEmailSave: '保存邮箱时出现问题。',
      emailPublicChanged: '邮箱隐私设置已更新！',
      failedChangeEmailPublic: '更新邮箱隐私设置时出现问题。',
      emptyPassword: '请填写密码。',
      incorrectPasswordFormat: '密码格式不正确。密码的长度应至少为 8 个字符，且不为空白字符。',
      differentPassword: '两次输入的密码不一致。',
      failedLoadBackgroundImage: '无法加载背景图片。可能是跨域问题或图片不存在。',
    },
    global: {
      title: '全局设置',
      username: {
        title: '用户名',
      },
      nickname: {
        title: '昵称',
      },
      email: {
        title: '邮箱',
        operation: {
          save: '保存邮箱',
          madePublic: '公开邮箱',
          verify: '邮箱验证',
        },
        status: {
          title: '邮箱状态：{status}',
          unverified: '未验证 ❌',
          verified: '已验证 ✔',
          message: {
            clicked: '验证邮件已发送。',
            failed: '发送验证邮件失败。',
          },
        },
      },
    },
    security: {
      title: '安全',
      password: {
        title: '密码',
        change: {
          title: '修改密码',
        },
        new: {
          title: '新密码',
        },
        ensureNew: {
          title: '确认新密码',
        },
        operation: {
          change: '修改密码',
        },
        message: {
          changed: '密码已更改。请重新登录。',
        },
      },
    },
    game: {
      title: '游戏设置',
      madeHistoryPublic: {
        title: '公开历史对局',
      },
      autoDisableUnavailableSkill: {
        title: '自动禁用不可用手势',
      },
      customSkill: {
        title: '自定义手势',
        disc: '自定义手势会被自动判定为爆盾。',
      },
    },
    appearance: {
      title: '外观',
      theme: {
        title: '主题',
        select: {
          title: '选择主题',
        },
        type: {
          title: '主题类型',
          general: '系统主题',
          custom: '自定义主题',
        },
        applied: {
          title: '已应用 ✔',
        },
        name: {
          title: '主题名称',
        },
        lightDark: {
          title: '深色/浅色模式',
          light: '浅色模式',
          dark: '深色模式',
          auto: '跟随系统',
        },
        backgroundImage: {
          title: '背景图片 URL',
        },
        colorScheme: {
          title: '配色方案：',
          getColorFromImage: '从背景图片中提取',
          error: '提取失败。错误：{colorErrorInfo}',
        },
        opacity: {
          backgroundImage: '背景图片不透明度：',
          sidebar: '侧边栏不透明度：',
        },
        operation: {
          apply: '应用该主题',
          delete: '删除主题',
          save: '保存主题',
          saveAs: '另存为新的主题',
        },
      },
    },
  },
  admin: {
    title: '管理',
  },
  ticket: {
    title: '工单',
    new: {
      title: '新工单',
    },
  },
  changelog: {
    title: '更新日志',
  },
  about: {
    title: '关于',
  },
}
