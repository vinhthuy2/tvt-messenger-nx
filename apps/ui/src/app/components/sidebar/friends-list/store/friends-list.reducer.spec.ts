import { initialState } from '@app/components/sidebar/friends-list/store/friends-list.reducer';
import { Action } from '@ngrx/store';
import { friendsListFeature } from './friends-list.reducer';

describe('FriendsList Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = friendsListFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
