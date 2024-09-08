import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { ChatListFeature } from '@app/components/sidebar/chat-list/store/chat-list.reducer';
import { friendsListFeature } from '@app/components/sidebar/friends-list/store/friends-list.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  ENVIRONMENT_CONFIG,
  environmentConfig,
} from '../environments/environment.config';

import { routes } from './app.routes';
import * as ChatBoxEffects from './components/chat-box/store/chat-box.effects';
import { chatBoxFeature } from './components/chat-box/store/chat-box.reducer';
import * as ChatListEffects from './components/sidebar/chat-list/store/chat-list.effects';
import * as FriendListEffects from './components/sidebar/friends-list/store/friends-list.effects';
import * as TopConnectorEffects from './components/top-connector/store/top-connector.effects';
import { topConnectorFeature } from './components/top-connector/store/top-connector.feature';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ENVIRONMENT_CONFIG,
      useValue: environmentConfig,
    },
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideEffects(TopConnectorEffects),
    provideEffects(FriendListEffects),
    provideEffects(ChatListEffects),
    provideEffects(ChatBoxEffects),
    provideState(topConnectorFeature),
    provideState(chatBoxFeature),
    provideState(friendsListFeature),
    provideState(ChatListFeature),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
