import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { selectHeaderData } from '@app/components/chat-box/store/chat-box.selectors';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [LetDirective, NgOptimizedImage],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  data$ = this.store.select(selectHeaderData);

  constructor(private readonly store: Store) {}
}
