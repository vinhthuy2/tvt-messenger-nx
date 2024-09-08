import { User } from '@core/types';

export const mockUser1: User = {
  id: '1',
  name: 'User 1',
  isOnline: true,
  lastSeen: new Date(),
  email: 'user1@cc.c',
};

export const mockUser2: User = {
  id: '2',
  name: 'User 2',
  isOnline: false,
  lastSeen: new Date(),
  email: 'user2@cc.c',
};

export const mockUser3: User = {
  id: '3',
  name: 'User 3',
  isOnline: true,
  lastSeen: new Date(),
  email: 'user3@cc.c',
};

export const friendsListMock: User[] = [mockUser1, mockUser2, mockUser3];
