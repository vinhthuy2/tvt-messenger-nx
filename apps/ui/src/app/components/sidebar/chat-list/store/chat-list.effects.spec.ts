import { HttpRequest, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ChatListActions } from '@app/components/sidebar/chat-list/store/chat-list.actions';
import { selectChatList } from '@app/components/sidebar/chat-list/store/chat-list.selectors';
import { selectUserId } from '@app/components/top-connector/store/top-connector.selectors';
import { HttpService } from '@app/http/http.service';
import {
  Conversation,
  ConversationSummary,
  CreateConversationRequestDto,
} from '@core/types';
import { mapToConversationSummaryDto } from '@core/types/conversation.mappers';
import { ENVIRONMENT_CONFIG } from '@env/environment.config';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  executeObservableWithHttpRequest,
  executeObservableWithHttpRequestWithError,
} from '@testing/http/http-request-observables';
import { makeInternalApiUrl } from '@testing/http/url';
import {
  mockConversation1,
  mockConversationSummary1,
  mockConversationSummary2,
  mockUserConversationsDto,
} from '@testing/mocks/conversations.mock';
import { mockUser1, mockUser2, mockUser3 } from '@testing/mocks/users.mock';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as ChatListEffects from './chat-list.effects';

describe('ChatListEffects', () => {
  let actions$: Observable<Action>;
  let httpService: HttpService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        {
          provide: ENVIRONMENT_CONFIG,
          useValue: {
            apiBaseUrl: 'http://localhost:3000',
          },
        },
      ],
    });

    httpService = TestBed.inject(HttpService as Type<HttpService>);
    store = TestBed.inject<Store>(MockStore) as MockStore;
  });

  describe('on ChatListEffects.loadChatList', () => {
    it('should call api to load chatList', () => {
      actions$ = hot('a', {
        a: ChatListActions.loadChatList({ userId: '1' }),
      });

      const expected = hot('a', {
        a: ChatListActions.loadChatListSuccess({
          chatList: [mockConversationSummary1, mockConversationSummary2],
        }),
      });

      const obs = executeObservableWithHttpRequest(
        ChatListEffects.loadChatList(actions$, httpService),
        makeInternalApiUrl('users/1/conversations'),
        mockUserConversationsDto
      );

      expect(obs).toBeObservable(expected);
    });
  });

  describe('on ChatListActions.findPrivateChatByFriendId', () => {
    it('should be dispatch ChatListActions.selectChat when private chat exists', () => {
      const friendId = 'friendId';
      const chatId = 'chatId';

      const chatList: ConversationSummary[] = [
        {
          ...mockConversation1,
          isGroup: false,
          id: chatId,
          participants: [
            ...mockConversation1.participants,
            { ...mockConversation1.participants[0], id: friendId },
          ],
        },
        {
          ...mockConversation1,
          id: 'chatId2',
          isGroup: true,
          participants: [mockUser1, mockUser2, { ...mockUser3, id: friendId }],
        },
      ].map(mapToConversationSummaryDto);

      store.overrideSelector(selectChatList, chatList);

      actions$ = hot('a', {
        a: ChatListActions.findPrivateChatByFriendId({ friendId }),
      });

      const expected = hot('a', {
        a: ChatListActions.selectChat({ chatId }),
      });

      expect(
        ChatListEffects.onFindPrivateChatByFriendId(actions$, store)
      ).toBeObservable(expected);
    });

    it('should dispatch ChatListActions.createPrivateChat when private chat does not exist', () => {
      const friendId = 'friendId';

      const chatList: ConversationSummary[] = [];

      store.overrideSelector(selectChatList, chatList);

      actions$ = hot('a', {
        a: ChatListActions.findPrivateChatByFriendId({ friendId }),
      });

      const expected = hot('a', {
        a: ChatListActions.createPrivateChat({ friendId }),
      });

      expect(
        ChatListEffects.onFindPrivateChatByFriendId(actions$, store)
      ).toBeObservable(expected);
    });
  });

  describe('on ChatListActions.createPrivateChat', () => {
    it('should dispatch ChatListActions.CreateConversationSuccess when create successfully', () => {
      const friendId = 'friendId';
      const userId = 'userId';
      const chatId = 'chatId';

      const createConversationRequest: CreateConversationRequestDto = {
        isGroup: false,
        participants: [userId, friendId],
      };

      store.overrideSelector(selectChatList, []);
      store.overrideSelector(selectUserId, userId);

      actions$ = hot('a', {
        a: ChatListActions.createPrivateChat({ friendId }),
      });

      const conversation: Conversation = {
        id: chatId,
        isGroup: false,
        isPinned: false,
        isMuted: false,
        messages: [],
        name: '',
        avatar: '',
        avatarAlt: '',
        lastMessage: null,
        isArchived: false,
        unreadMessageCount: 0,
        participants: [userId, friendId].map((id) => ({
          id,
          name: '',
          isOnline: true,
          email: '',
          lastSeen: new Date(),
        })),
      };

      const mockConversationSummary = mapToConversationSummaryDto(conversation);

      const expected = hot('a', {
        a: ChatListActions.createPrivateChatSuccess({
          conversation: mockConversationSummary,
        }),
      });

      const obs = executeObservableWithHttpRequest(
        ChatListEffects.createPrivateChat(actions$, store, httpService),
        makeInternalApiUrl('conversations'),
        mockConversationSummary,
        undefined,
        (req: HttpRequest<CreateConversationRequestDto>) => {
          expect(req.body).toEqual(createConversationRequest);

          return true;
        }
      );

      expect(obs).toBeObservable(expected);
    });

    it('should dispatch ChatListActions.CreateConversationFailed when create failed', () => {
      const friendId = 'friendId';
      const userId = 'userId';

      store.overrideSelector(selectChatList, []);
      store.overrideSelector(selectUserId, userId);

      actions$ = hot('a', {
        a: ChatListActions.createPrivateChat({ friendId }),
      });

      const expected = hot('a', {
        a: ChatListActions.createPrivateChatFailed(),
      });

      const obs = executeObservableWithHttpRequestWithError(
        ChatListEffects.createPrivateChat(actions$, store, httpService),
        makeInternalApiUrl('conversations'),
        undefined
      );

      expect(obs).toBeObservable(expected);
    });
  });

  describe('on ChatListActions.createdChatSuccessfully', () => {
    it('should dispatch ChatListActions.SelectChat when create successfully', () => {
      const friendId = 'friendId';
      const userId = 'userId';
      const chatId = 'chatId';

      const conversation: Conversation = {
        id: chatId,
        isGroup: false,
        isPinned: false,
        isMuted: false,
        messages: [],
        name: '',
        avatar: '',
        avatarAlt: '',
        lastMessage: null,
        isArchived: false,
        unreadMessageCount: 0,
        participants: [userId, friendId].map((id) => ({
          id,
          name: '',
          isOnline: true,
          email: '',
          lastSeen: new Date(),
        })),
      };

      actions$ = hot('a', {
        a: ChatListActions.createPrivateChatSuccess({
          conversation: mapToConversationSummaryDto(conversation),
        }),
      });

      const expected = hot('(ab)', {
        a: ChatListActions.addToChatList({
          conversation: mapToConversationSummaryDto(conversation),
        }),
        b: ChatListActions.selectChat({ chatId }),
      });

      expect(ChatListEffects.createdChatSuccessfully(actions$)).toBeObservable(
        expected
      );
    });
  });
});
