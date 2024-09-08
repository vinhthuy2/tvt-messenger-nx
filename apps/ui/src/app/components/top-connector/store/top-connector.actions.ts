import { createActionGroup, props } from '@ngrx/store';

export const TopConnectorActions = createActionGroup({
  source: 'TopConnector',
  events: {
    connect: props<{ email: string }>(),
    connected: props<{ userId: string }>(),
    connectionFailed: props<{ email: string }>(),
    loadFriends: props<{ userId: string }>(),
    loadConversations: props<{ userId: string }>(),
  },
});
