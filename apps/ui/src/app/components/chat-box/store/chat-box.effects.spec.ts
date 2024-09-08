import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ChatBoxActions } from '@app/components/chat-box/store/chat-box.actions';
import { ChatListActions } from '@app/components/sidebar/chat-list/store/chat-list.actions';
import { HttpService } from '@app/http/http.service';
import { Conversation } from '@core/types';
import { ENVIRONMENT_CONFIG } from '@env/environment.config';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  executeObservableWithHttpRequest,
  executeObservableWithHttpRequestWithError,
} from '@testing/http/http-request-observables';
import { makeInternalApiUrl } from '@testing/http/url';
import { mockConversation1 } from '@testing/mocks/conversations.mock';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as ChatBoxEffects from './chat-box.effects';

describe('ChatBox Effects', () => {
  let actions$: Observable<Actions>;
  let httpService: HttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ENVIRONMENT_CONFIG,
          useValue: {
            apiBaseUrl: 'http://localhost:3000',
          },
        },
      ],
    });

    httpService = TestBed.inject(HttpService);
  });

  describe('onSelectChat', () => {
    it('should dispatch ChatBoxActions.loadConversation', () => {
      const chatId = 'chatId';
      actions$ = hot('a', {
        a: ChatListActions.selectChat({ chatId }),
      });

      const expected = hot('a', {
        a: ChatBoxActions.loadConversation({ conversationId: chatId }),
      });

      expect(ChatBoxEffects.onSelectChat(actions$)).toBeObservable(expected);
    });
  });

  describe('onLoadConversation', () => {
    it('should make api and dispatch load conversation successfully', () => {
      const conversationId = 'conversationId';
      const conversation: Conversation = {
        ...mockConversation1,
        id: conversationId,
      };

      actions$ = hot('a', {
        a: ChatBoxActions.loadConversation({ conversationId }),
      });

      const expected = hot('a', {
        a: ChatBoxActions.loadConversationSuccessfully({ conversation }),
      });

      const obs = executeObservableWithHttpRequest(
        ChatBoxEffects.onLoadConversation(actions$, httpService),
        makeInternalApiUrl(`conversations/${conversationId}`),
        conversation
      );

      expect(obs).toBeObservable(expected);
    });

    it('should call api and load conversation failed when conversation does not exist', () => {
      const conversationId = 'conversationId';

      actions$ = hot('a', {
        a: ChatBoxActions.loadConversation({ conversationId }),
      });

      const expected = hot('a', {
        a: ChatBoxActions.loadConversationFailed(),
      });

      const obs = executeObservableWithHttpRequestWithError(
        ChatBoxEffects.onLoadConversation(actions$, httpService),
        makeInternalApiUrl(`conversations/${conversationId}`),
        null
      );

      expect(obs).toBeObservable(expected);
    });
  });
});
