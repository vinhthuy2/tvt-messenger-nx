import { TestBed } from '@angular/core/testing';
import { ChatListState } from '@app/components/sidebar/chat-list/store/chat-list.reducer';
import {
  selectActiveChatId,
  selectChatById,
  selectChatList,
  selectChatListState,
} from '@app/components/sidebar/chat-list/store/chat-list.selectors';
import { ConversationSummary } from '@core/types';
import { mapToConversationSummaryDto } from '@core/types/conversation.mappers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  mockConversation1,
  mockConversationList,
} from '@testing/mocks/conversations.mock';
import { hot } from 'jasmine-marbles';

describe('ChatList Selectors', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    store = TestBed.inject(MockStore);
  });

  it('should select the chat list', () => {
    const chatList: ConversationSummary[] = [
      mapToConversationSummaryDto(mockConversation1),
    ];

    const state: ChatListState = {
      chatList,
      activeChatId: mockConversation1.id,
    };

    store.overrideSelector(selectChatListState, state);

    const expected = hot('a', {
      a: chatList,
    });

    expect(store.select(selectChatList)).toBeObservable(expected);
  });

  it('should select the chat by id', () => {
    const chatId = mockConversation1.id;
    const chatList: ConversationSummary[] = mockConversationList.map(
      mapToConversationSummaryDto
    );

    const state: ChatListState = {
      chatList: chatList,
      activeChatId: mockConversation1.id,
    };

    store.overrideSelector(selectChatListState, state);

    const expected = hot('a', {
      a: mapToConversationSummaryDto(mockConversation1),
    });

    expect(store.select(selectChatById(chatId))).toBeObservable(expected);
  });

  it('should select active chat id', () => {
    const chatList: ConversationSummary[] = [
      mapToConversationSummaryDto(mockConversation1),
    ];

    const state: ChatListState = {
      chatList,
      activeChatId: mockConversation1.id,
    };

    store.overrideSelector(selectChatListState, state);

    const expected = hot('a', {
      a: mockConversation1.id,
    });

    expect(store.select(selectActiveChatId)).toBeObservable(expected);
  });
});
