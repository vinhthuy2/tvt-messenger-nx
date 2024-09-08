import { ConversationSummary } from '@core/types';
import { mapToConversationSummaryDto } from '@core/types/conversation.mappers';
import {
  mockConversation1,
  mockConversationList,
} from '@testing/mocks/conversations.mock';
import { ChatListActions } from './chat-list.actions';
import {
  ChatListFeature,
  chatListFeatureKey,
  ChatListState,
} from './chat-list.reducer';

describe(`${chatListFeatureKey} chat list reducer`, () => {
  it('should update the state with the provided chat list on ChatListActions.loadChatListSuccess', () => {
    const initialState: ChatListState = {
      chatList: [],
      activeChatId: null,
    };

    const chatList: ConversationSummary[] = mockConversationList.map(
      mapToConversationSummaryDto
    );

    const state = ChatListFeature.reducer(
      initialState,
      ChatListActions.loadChatListSuccess({ chatList })
    );

    const expected: ChatListState = {
      ...initialState,
      chatList,
    };

    expect(state).toEqual(expected);
  });

  it('should update the state with the provided chat id on ChatListActions.selectChat', () => {
    const initialState: ChatListState = {
      chatList: mockConversationList.map(mapToConversationSummaryDto),
      activeChatId: null,
    };

    const chatId = 'chatId';

    const action = ChatListActions.selectChat({ chatId });

    const state = ChatListFeature.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      activeChatId: chatId,
    });
  });

  it('should not change the chat list when selecting a chat on ChatListActions.selectChat', () => {
    const initialState: ChatListState = {
      chatList: mockConversationList.map(mapToConversationSummaryDto),
      activeChatId: null,
    };

    const chatId = 'chatId';

    const action = ChatListActions.selectChat({ chatId });

    const state = ChatListFeature.reducer(initialState, action);

    expect(state.chatList).toEqual(
      mockConversationList.map(mapToConversationSummaryDto)
    );
  });

  it('should add new chat to the chat list on ChatListActions.addChat', () => {
    const initialState: ChatListState = {
      chatList: [],
      activeChatId: null,
    };

    const newChat: ConversationSummary =
      mapToConversationSummaryDto(mockConversation1);

    const action = ChatListActions.addToChatList({ conversation: newChat });

    const state = ChatListFeature.reducer(initialState, action);

    expect(state.chatList).toEqual([newChat]);
  });
});
