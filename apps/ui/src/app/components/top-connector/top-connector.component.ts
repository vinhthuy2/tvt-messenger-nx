import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TopConnectorActions } from './store/top-connector.actions';
import { selectConnected } from './store/top-connector.selectors';

@Component({
  selector: 'app-top-connector',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './top-connector.component.html',
  styleUrl: './top-connector.component.scss',
})
export class TopConnectorComponent {
  userId = 'user1@mail.com';
  isConnected$ = this.store.select(selectConnected);

  // isConnectionFailed$ = this.store.select(s);

  constructor(private readonly store: Store) {}

  onConnect() {
    this.store.dispatch(TopConnectorActions.connect({ email: this.userId }));
  }
}
