import { ConversationSummary } from '@core/types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ChatListActions = createActionGroup({
  source: 'ChatList',
  events: {
    loadChatList: props<{ userId: string }>(),
    loadChatListSuccess: props<{ chatList: ConversationSummary[] }>(),
    loadChatListFailed: emptyProps(),
    selectChat: props<{ chatId: string }>(),
    findPrivateChatByFriendId: props<{ friendId: string }>(),
    createPrivateChat: props<{ friendId: string }>(),
    createPrivateChatFailed: emptyProps(),
    createPrivateChatSuccess: props<{ conversation: ConversationSummary }>(),
    addToChatList: props<{ conversation: ConversationSummary }>(),
  },
});
