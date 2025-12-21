/*
  Asset for message service of JoyEver
*/

import { computed, ref } from 'vue'
import { announcementMsgcnt } from './announcement'

export type MessageChatListItemType = {
  username: string
  nickname?: string
  msgcnt?: number
}
export type MessageChatListType = Array<MessageChatListItemType>
export type MessageType = {
  nickname: string
  me: boolean
  messageType: string
  text: string
  time: string
}
export type MessageListType = Array<MessageType>

export var msgcnt = computed(() => {
  return announcementMsgcnt.value + friendMsgcnt.value
})

export var friendMsgcnt = ref(0)

// var chatListRaw: MessageChatListType = [
//   {
//     username: '123123',
//   },
//   {
//     username: '456456',
//   },
//   {
//     username: '789789',
//   },
//   {
//     username: 'lmx',
//   },
// ]

var chatListRaw: MessageChatListType = []

export var chatList = ref(chatListRaw)

// var messageListRaw: MessageListType = [
//   {
//     nickname: '123',
//     me: true,
//     messageType: 'text',
//     text: 'Hello! This is an example string in text.\nthisistoooooooooooooooooooooooooooooooooooooolongtobeinaline',
//     time: '2025-7-8 17:12:56',
//   },
//   {
//     nickname: 'admin',
//     me: false,
//     messageType: 'text',
//     text: 'Hello! This is an example string in text.',
//     time: '2025-7-8 17:12:56',
//   },
//   {
//     nickname: '123',
//     me: true,
//     messageType: 'text',
//     text: "Hello! This is an example string in text.\nHello! This is an even longer greeting I'd like to say",
//     time: '2025-7-8 17:12:56',
//   },
//   {
//     nickname: '123',
//     me: true,
//     messageType: 'text',
//     text: 'Hello! This is an example string in text.',
//     time: '2025-7-8 17:12:56',
//   },
//   {
//     nickname: '123',
//     me: true,
//     messageType: 'text',
//     text: 'Hello! This is an example string in text.',
//     time: '2025-7-8 17:12:56',
//   },
//   {
//     nickname: '123',
//     me: true,
//     messageType: 'text',
//     text: 'Hello! This is an example string in text.',
//     time: '2025-7-8 17:12:56',
//   },
//   {
//     nickname: '123',
//     me: true,
//     messageType: 'text',
//     text: 'Hello! This is an example string in text.',
//     time: '2025-7-8 17:12:56',
//   },
//   {
//     nickname: '123',
//     me: true,
//     messageType: 'text',
//     text: 'Hello! This is an example string in text.',
//     time: '2025-7-8 17:12:56',
//   },
// ]
var messageListRaw: MessageListType = []

export var messageList = ref(messageListRaw)

export function GotoBottom(query: string) {
  var elem = document.querySelector(query)
  if (elem) elem.scrollTop = elem.scrollHeight
}
