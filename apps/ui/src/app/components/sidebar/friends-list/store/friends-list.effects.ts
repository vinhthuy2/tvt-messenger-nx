import { inject } from '@angular/core';
import { ChatListActions } from '@app/components/sidebar/chat-list/store/chat-list.actions';
import { FriendsListActions } from '@app/components/sidebar/friends-list/store/friends-list.actions';
import { TopConnectorActions } from '@app/components/top-connector/store/top-connector.actions';
import { HttpService } from '@app/http/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const userConnected = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(TopConnectorActions.connected),
      exhaustMap(({ userId }) => of(FriendsListActions.loadFriends({ userId })))
    );
  },
  {
    functional: true,
  }
);

export const loadFriends = createEffect(
  (actions$ = inject(Actions), service = inject(HttpService)) => {
    return actions$.pipe(
      ofType(FriendsListActions.loadFriends),
      exhaustMap(({ userId }) => {
        return service.getFriends(userId).pipe(
          map((friends) => FriendsListActions.friendsLoaded({ friends })),
          catchError(() => [FriendsListActions.friendsLoadFailed({ userId })])
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const friendSelected = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(FriendsListActions.friendSelected),
      map(({ friendId }) =>
        ChatListActions.findPrivateChatByFriendId({ friendId })
      )
    ),
  {
    functional: true,
  }
);
