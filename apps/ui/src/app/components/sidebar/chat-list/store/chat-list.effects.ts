import { inject } from '@angular/core';
import { ChatListActions } from '@app/components/sidebar/chat-list/store/chat-list.actions';
import { selectChatList } from '@app/components/sidebar/chat-list/store/chat-list.selectors';
import { TopConnectorActions } from '@app/components/top-connector/store/top-connector.actions';
import { selectUserId } from '@app/components/top-connector/store/top-connector.selectors';
import { HttpService } from '@app/http/http.service';
import { CreateConversationRequestDto } from '@core/types';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

export const userConnected = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(TopConnectorActions.connected),
      map((userId) => ChatListActions.loadChatList(userId))
    ),
  {
    functional: true,
  }
);

export const loadChatList = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) =>
    actions$.pipe(
      ofType(ChatListActions.loadChatList),
      exhaustMap(({ userId }) =>
        httpService.getConservationListByUserId(userId).pipe(
          map((chatList) =>
            ChatListActions.loadChatListSuccess({ chatList: chatList.items })
          ),
          catchError(() => of(ChatListActions.loadChatListFailed()))
        )
      )
    ),
  {
    functional: true,
  }
);

export const onFindPrivateChatByFriendId = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(ChatListActions.findPrivateChatByFriendId),
      concatLatestFrom(() => store.select(selectChatList)),
      map(([{ friendId }, chatList]) => {
        const chat = chatList.find(
          (c) => !c.isGroup && c.participantIds.includes(friendId)
        );
        console.log('chatList', chatList);

        return chat
          ? ChatListActions.selectChat({ chatId: chat.id })
          : ChatListActions.createPrivateChat({ friendId });
      })
    ),
  {
    functional: true,
  }
);

export const createPrivateChat = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    httpService = inject(HttpService)
  ) =>
    actions$.pipe(
      ofType(ChatListActions.createPrivateChat),
      concatLatestFrom(() => store.select(selectUserId)),
      exhaustMap(([{ friendId }, userId]) => {
        const conversationRequest: CreateConversationRequestDto = {
          participantIds: [userId, friendId],
        };

        return httpService.createConversation(conversationRequest).pipe(
          map((chat) =>
            ChatListActions.createPrivateChatSuccess({ conversation: chat })
          ),
          catchError(() => of(ChatListActions.createPrivateChatFailed()))
        );
      })
    ),
  {
    functional: true,
  }
);

export const createdChatSuccessfully = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(ChatListActions.createPrivateChatSuccess),
      mergeMap(({ conversation }) => [
        ChatListActions.addToChatList({ conversation }),
        ChatListActions.selectChat({ chatId: conversation.id }),
      ])
    ),
  {
    functional: true,
  }
);
