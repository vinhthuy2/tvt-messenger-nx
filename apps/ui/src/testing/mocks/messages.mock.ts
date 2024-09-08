import { ChatMessage } from '@core/types';
import { mockUser1, mockUser2 } from './users.mock';

export const mockMessage1: ChatMessage = {
  id: '1',
  content: 'Hello, User',
  from: mockUser1.id,
  isDelivered: true,
  isRead: false,
  to: mockUser2.id,
  timestamp: new Date(),
};

export const mockMessage2: ChatMessage = {
  id: '2',
  content: 'Hello, User',
  from: mockUser2.id,
  isDelivered: true,
  isRead: false,
  to: mockUser1.id,
  timestamp: new Date(),
};
