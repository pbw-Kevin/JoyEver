/*
  Asset for hint component of JoyEver
*/

import { AV } from './main'

var hints = [
  '登录账号后可以在“我的账号” > “设置” > “外观”中更改自己喜欢的主题样式！',
  '永乐大典游戏在传播的过程中出现了许多解释上的分歧。可以在“大典” > “试验”中尝试出我们是如何做的',
  '在线永乐大典的第一段代码是在 2025 年 6 月 7 日创建的！',
  '永乐大典游戏是 TYZX S21 的同学发明的！',
  '永乐大典基础版有 16 个技能',
  '永乐大典共有 17 个旧职，73 个新职。其中我们分别实现了 16 个和 60 个！',
  '永乐大典中还有 NBA 版，三国杀版，以及王者荣耀版，但我们并没有装载',
  '优先级决定了技能的生效顺序，有时可以救命！',
  '可以在工单中进行滥用举报、Bug 反馈，提出改进建议、申诉，联系管理等等！（不登录也可以使用）',
  '登录后可以自定义手势！（效果即爆盾）',
  '点击“你知道吗”卡片的任意位置可以刷新里面的内容！',
]

var fetched = false

export function fetchHints(force = false) {
  if (fetched && !force) return
  var hintQuery = new AV.Query('Hint')
  hintQuery.find().then(
    (tmpHints) => {
      hints = tmpHints.map((tmpHint) => {
        return tmpHint.get('hint')
      })
      fetched = true
    },
    (error) => {
      fetched = false
    },
  )
}

export function getHint(): string {
  fetchHints()
  return hints[Math.floor(Math.random() * hints.length)] as string
}
