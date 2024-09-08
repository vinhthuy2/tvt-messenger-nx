import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-block',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chat-block.component.html',
  styleUrl: './chat-block.component.scss',
})
export class ChatBlockComponent {
  @Input() message = '...';
  @Input() user: { name: string } = { name: 'You' };

  get isOwnMessage(): boolean {
    return this.user.name === 'You';
  }
}
