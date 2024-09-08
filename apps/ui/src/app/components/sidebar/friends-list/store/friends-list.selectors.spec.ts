import { TestBed } from '@angular/core/testing';
import { FriendsListState } from '@app/components/sidebar/friends-list/store/friends-list.reducer';
import {
  selectFriends,
  selectFriendsListState,
} from '@app/components/sidebar/friends-list/store/friends-list.selectors';
import { User } from '@core/types';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockUser1, mockUser2 } from '@testing/mocks/users.mock';
import { hot } from 'jasmine-marbles';

describe('FriendsList Selectors', () => {
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);
  });
  it('should select the feature state', () => {
    store.overrideSelector(selectFriendsListState, {} as FriendsListState);

    const result = selectFriendsListState({});

    expect(result).toEqual({} as FriendsListState);
  });

  it('should select friends', () => {
    const friends: User[] = [mockUser1, mockUser2];

    store.overrideSelector(selectFriendsListState, { items: friends });

    const result = store.select(selectFriends);

    const expected = hot('a', { a: friends });

    expect(result).toBeObservable(expected);
  });
});
