import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '@core/types';

@Component({
  selector: 'app-friend-list-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './friend-list-item.component.html',
  styleUrl: './friend-list-item.component.scss',
})
export class FriendListItemComponent {
  @Input() data: User | undefined;
}
