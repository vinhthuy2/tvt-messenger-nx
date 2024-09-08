import { ConversationSummary } from '@core/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ChatListActions } from './chat-list.actions';

export const chatListFeatureKey = 'chatList';

export interface ChatListState {
  chatList: ConversationSummary[];
  activeChatId: string | null;
}

export const chatListInitialState: ChatListState = {
  chatList: [],
  activeChatId: null,
};

const reducer = createReducer(
  chatListInitialState,
  on(ChatListActions.loadChatListSuccess, (state, { chatList }) => ({
    ...state,
    chatList,
  })),
  on(ChatListActions.addToChatList, (state, { conversation }) => ({
    ...state,
    chatList: [...state.chatList, conversation],
  })),
  on(ChatListActions.selectChat, (state, { chatId }) => ({
    ...state,
    activeChatId: chatId,
  }))
);

export const ChatListFeature = createFeature({
  name: chatListFeatureKey,
  reducer,
});
