import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class CurrentUser {
  private currentUser: User;

  setValue(user: User) {
    this.currentUser = user;
  }

  get value(): User {
    return this.currentUser;
  }
}
