import { inject } from '@angular/core';
import { HttpService } from '@app/http/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { TopConnectorActions } from './top-connector.actions';

export const loadUser = createEffect(
  (actions$ = inject(Actions), service = inject(HttpService)) => {
    return actions$.pipe(
      ofType(TopConnectorActions.connect),
      exhaustMap(({ email }) => {
        return service.getUser(email).pipe(
          map((user) => TopConnectorActions.connected({ userId: user.id })),
          catchError(() => [TopConnectorActions.connectionFailed({ email })])
        );
      })
    );
  },
  {
    functional: true,
  }
);
