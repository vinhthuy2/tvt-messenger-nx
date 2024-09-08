import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  friendsListFeatureKey,
  FriendsListState,
} from './friends-list.reducer';

export const selectFriendsListState = createFeatureSelector<FriendsListState>(
  friendsListFeatureKey
);
export const selectFriends = createSelector(
  selectFriendsListState,
  (state) => state.items
);
