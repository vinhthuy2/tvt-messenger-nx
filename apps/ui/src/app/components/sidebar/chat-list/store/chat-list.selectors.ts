import {
  chatListFeatureKey,
  ChatListState,
} from '@app/components/sidebar/chat-list/store/chat-list.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectChatListState =
  createFeatureSelector<ChatListState>(chatListFeatureKey);

export const selectChatList = createSelector(
  selectChatListState,
  (state) => state.chatList
);

export const selectChatById = (chatId: string) =>
  createSelector(selectChatList, (chatList) =>
    chatList.find((chat) => chat.id === chatId)
  );

export const selectActiveChatId = createSelector(
  selectChatListState,
  (state) => state.activeChatId
);
