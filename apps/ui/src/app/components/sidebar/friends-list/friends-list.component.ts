import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FriendListItemComponent } from '@app/components/sidebar/friends-list/friend-list-item/friend-list-item.component';
import { FriendsListActions } from '@app/components/sidebar/friends-list/store/friends-list.actions';
import { selectFriends } from '@app/components/sidebar/friends-list/store/friends-list.selectors';
import { User } from '@app/core/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [NgIf, AsyncPipe, FriendListItemComponent],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss',
})
export class FriendsListComponent {
  friends$: Observable<User[]> = this.store.select(selectFriends);

  constructor(private readonly store: Store) {}

  onFriendSelected(friendId: string): void {
    this.store.dispatch(FriendsListActions.friendSelected({ friendId }));
  }
}
