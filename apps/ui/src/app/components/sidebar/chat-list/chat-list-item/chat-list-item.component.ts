import { DatePipe, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ConversationSummary } from '@core/types';

@Component({
  selector: 'app-chat-list-item',
  standalone: true,
  imports: [NgClass, DatePipe, NgOptimizedImage],
  templateUrl: './chat-list-item.component.html',
  styleUrl: './chat-list-item.component.scss',
})
export class ChatListItemComponent {
  @Input() chat!: ConversationSummary;
  @Input() active = true;
}
