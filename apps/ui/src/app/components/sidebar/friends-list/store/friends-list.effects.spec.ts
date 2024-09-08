import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ChatListActions } from '@app/components/sidebar/chat-list/store/chat-list.actions';
import { TopConnectorActions } from '@app/components/top-connector/store/top-connector.actions';
import { HttpService } from '@app/http/http.service';
import { User } from '@core/types';
import { ENVIRONMENT_CONFIG } from '@env/environment.config';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { executeObservableWithHttpRequest } from '@testing/http/http-request-observables';
import { makeInternalApiUrl } from '@testing/http/url';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { FriendsListActions } from './friends-list.actions';
import * as FriendListEffects from './friends-list.effects';

describe('FriendsListEffects', () => {
  let actions$: Observable<Action>;
  let httpService: HttpService;

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
  });

  describe('on user connected', () => {
    it('should dispatch FriendsListActions.loadFriends', () => {
      const userId = '1';

      actions$ = hot('a', {
        a: TopConnectorActions.connected({ userId }),
      });

      const expected = hot('a', {
        a: FriendsListActions.loadFriends({ userId: '1' }),
      });

      expect(FriendListEffects.userConnected(actions$)).toBeObservable(
        expected
      );
    });

    it('should call api to load friend list successful and dispatch FriendsListActions.friendsLoaded', () => {
      const userId = '1';

      const friends: User[] = [
        {
          id: '2',
          name: 'John Doe',
          email: 'asd@asdsd.com',
          avatar: 'avatar',
          lastSeen: new Date(),
          isOnline: true,
        },
      ];

      actions$ = hot('a', {
        a: FriendsListActions.loadFriends({ userId }),
      });

      const expected = hot('a', {
        a: FriendsListActions.friendsLoaded({ friends }),
      });

      const obs = executeObservableWithHttpRequest(
        FriendListEffects.loadFriends(actions$, httpService),
        makeInternalApiUrl(`users/${userId}/friends`),
        friends
      );

      expect(obs).toBeObservable(expected);
    });
  });

  describe('on friend selected', () => {
    it('should dispatch findChatByFriendId', () => {
      actions$ = hot('a', {
        a: FriendsListActions.friendSelected({ friendId: '1' }),
      });

      const expected = hot('a', {
        a: ChatListActions.findPrivateChatByFriendId({ friendId: '1' }),
      });

      expect(FriendListEffects.friendSelected(actions$)).toBeObservable(
        expected
      );
    });
  });
});
