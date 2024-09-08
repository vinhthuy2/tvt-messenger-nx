import { Component } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { FriendsListComponent } from './friends-list/friends-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FriendsListComponent, ChatListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
