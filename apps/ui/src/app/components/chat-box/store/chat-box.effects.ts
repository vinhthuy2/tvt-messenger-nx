import { inject } from '@angular/core';
import { ChatBoxActions } from '@app/components/chat-box/store/chat-box.actions';
import { ChatListActions } from '@app/components/sidebar/chat-list/store/chat-list.actions';
import { HttpService } from '@app/http/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const onSelectChat = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ChatListActions.selectChat),
      map(({ chatId }) =>
        ChatBoxActions.loadConversation({ conversationId: chatId })
      )
    );
  },
  {
    functional: true,
  }
);

export const onLoadConversation = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(ChatBoxActions.loadConversation),
      exhaustMap(({ conversationId }) => {
        return httpService.getConservationById(conversationId).pipe(
          map((conversation) =>
            ChatBoxActions.loadConversationSuccessfully({ conversation })
          ),
          catchError(() => of(ChatBoxActions.loadConversationFailed()))
        );
      })
    );
  },
  {
    functional: true,
  }
);
