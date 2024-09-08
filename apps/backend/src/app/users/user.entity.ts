import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { Message } from '../messages/message.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  isOnline: boolean;

  @Column()
  lastSeen: Date;

  @OneToMany(() => UserConversation, (uc) => uc.user)
  userConversations?: UserConversation[];

  @OneToMany(() => Message, (message) => message.from)
  sentMessages: any;

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable({
    name: 'friendship', // Custom name for the join table
    joinColumn: {
      name: 'user_id', // Name of the column in the join table that references the User
      referencedColumnName: 'id', // Name of the column in the User entity
    },
    inverseJoinColumn: {
      name: 'friend_id', // Name of the column in the join table that references the Friend
      referencedColumnName: 'id', // Name of the column in the User entity
    },
  })
  friends: User[];

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
}

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    isOnline: user.isOnline,
    lastSeen: user.lastSeen,
  };
}
