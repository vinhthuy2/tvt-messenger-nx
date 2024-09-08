import { FriendsListActions } from '@app/components/sidebar/friends-list/store/friends-list.actions';
import { User } from '@core/types';
import { createFeature, createReducer, on } from '@ngrx/store';

export const friendsListFeatureKey = 'friendsList';

export interface FriendsListState {
  items: User[];
}

export const initialState: FriendsListState = {
  items: [],
};

const reducer = createReducer(
  initialState,
  on(FriendsListActions.friendsLoaded, (state, { friends }) => ({
    ...state,
    items: friends,
  }))
);

export const friendsListFeature = createFeature({
  name: friendsListFeatureKey,
  reducer,
});
