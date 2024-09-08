import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ChatHeaderComponent } from '@app/components/chat-box/chat-header/chat-header.component';
import { selectChatBoxFeature } from '@app/components/chat-box/store/chat-box.selectors';
import { Store } from '@ngrx/store';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [ChatPanelComponent, ChatHeaderComponent, AsyncPipe],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss',
})
export class ChatBoxComponent {
  conversation$ = this.store.select(selectChatBoxFeature);

  constructor(private readonly store: Store) {}
}
