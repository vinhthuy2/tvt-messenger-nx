import { User } from '@core/types';
import { createActionGroup, props } from '@ngrx/store';

export const FriendsListActions = createActionGroup({
  source: 'FriendsList',
  events: {
    loadFriends: props<{ userId: string }>(),
    friendsLoaded: props<{ friends: User[] }>(),
    friendsLoadFailed: props<{ userId: string }>(),
    friendSelected: props<{ friendId: string }>(),
  },
});
