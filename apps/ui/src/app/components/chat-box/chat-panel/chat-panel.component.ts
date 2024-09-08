import { Component } from '@angular/core';
import { ChatBlockComponent } from './chat-block/chat-block.component';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [ChatBlockComponent],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.scss',
})
export class ChatPanelComponent {}
