import { messageType } from 'leancloud-realtime'
import { ref } from 'vue'

export type MessageChatListItemType = {
  username: string,
  nickname?: string,
  msgcnt?: number
}
export type MessageChatListType = Array<MessageChatListItemType>
export type MessageType = {
  nickname: string,
  me: boolean,
  messageType: string,
  text: string
}
export type MessageListType = Array<MessageType>

export var msgcnt = ref(2)

export var announcementMsgcnt = ref(1)

var chatListRaw: MessageChatListType = [{
  username: '123123',
  msgcnt: 1
},{
  username: '456456'
},{
  username: '789789'
},{
  username: 'lmx'
}]

export var chatList = ref(chatListRaw)

var messageListRaw: MessageListType = [{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.\nthisistoooooooooooooooooooooooooooooooooooooolongtobeinaline'
},{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.'
},{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.'
},{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.'
},{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.'
},{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.'
},{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.'
},{
  nickname: '123',
  me: true,
  messageType: 'text',
  text: 'Hello! This is an example string in text.'
},]

export var messageList = ref(messageListRaw)