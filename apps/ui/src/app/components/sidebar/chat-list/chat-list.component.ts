import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ChatListActions } from '@app/components/sidebar/chat-list/store/chat-list.actions';
import {
  selectActiveChatId,
  selectChatList,
} from '@app/components/sidebar/chat-list/store/chat-list.selectors';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ChatListItemComponent } from './chat-list-item/chat-list-item.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [ChatListItemComponent, AsyncPipe, NgIf, LetDirective],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  chats$ = this.store.select(selectChatList);
  activeChatId$ = this.store.select(selectActiveChatId);

  constructor(private readonly store: Store) {}

  onChatSelected(chatId: string): void {
    this.store.dispatch(ChatListActions.selectChat({ chatId: chatId }));
  }
}
