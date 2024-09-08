import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@app/http/http.service';
import { ENVIRONMENT_CONFIG, environmentConfig } from '@env/environment.config';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  executeObservableWithHttpRequest,
  executeObservableWithHttpRequestWithError,
} from '@testing/http/http-request-observables';
import { makeInternalApiUrl } from '@testing/http/url';
import { hot } from 'jasmine-marbles';

import { Observable } from 'rxjs';
import { TopConnectorActions } from './top-connector.actions';
import * as TopConnectorEffects from './top-connector.effects';

describe('TopConnectorEffects', () => {
  let actions$: Observable<Action>;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: ENVIRONMENT_CONFIG,
          useValue: environmentConfig,
        },
      ],
    });
    httpService = TestBed.inject(HttpService);
  });

  describe('connect button click', () => {
    it('should call api to load user and dispatch TopConnectorActions.connected', () => {
      const userId = '1';

      actions$ = hot('a', {
        a: TopConnectorActions.connect({ email: userId }),
      });

      const expected = hot('a', {
        a: TopConnectorActions.connected({ userId: '1' }),
      });

      const obs = executeObservableWithHttpRequest(
        TopConnectorEffects.loadUser(actions$, httpService),
        makeInternalApiUrl(`users/${userId}`),
        { id: userId }
      );

      expect(obs).toBeObservable(expected);
    });

    it('should call api to load user failed and dispatch TopConnectorActions.connectFailed', () => {
      const userId = '1';

      actions$ = hot('a', {
        a: TopConnectorActions.connect({ email: userId }),
      });

      const expected = hot('a', {
        a: TopConnectorActions.connectionFailed({ email: userId }),
      });

      const obs = executeObservableWithHttpRequestWithError(
        TopConnectorEffects.loadUser(actions$, httpService),
        makeInternalApiUrl(`users/${userId}`)
      );

      expect(obs).toBeObservable(expected);
    });
  });
});
