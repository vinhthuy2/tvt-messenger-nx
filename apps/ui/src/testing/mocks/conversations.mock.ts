import {
  Conversation,
  ConversationSummaryDto,
  UserConversationsDto,
} from '@core/types';
import { mockMessage1, mockMessage2 } from './messages.mock';
import { mockUser1, mockUser2, mockUser3 } from './users.mock';

export const mockConversation1: Conversation = {
  id: '1',
  participants: [mockUser1, mockUser2],
  lastMessage: mockMessage1,
  isArchived: false,
  isGroup: false,
  isMuted: false,
  isPinned: false,
  name: `${mockUser1.name}, ${mockUser2.name}`,
  avatarAlt: '',
  avatar: '',
  messages: [],
  unreadMessageCount: 0,
};

export const mockConversation2: Conversation = {
  id: '2',
  name: `${mockUser1.name}, ${mockUser3.name}`,
  avatar: '',
  avatarAlt: '',
  participants: [mockUser1, mockUser3],
  lastMessage: mockMessage2,
  isArchived: false,
  isGroup: false,
  isMuted: false,
  isPinned: false,
  messages: [],
  unreadMessageCount: 0,
};

export const mockConversationSummary1: ConversationSummaryDto = {
  id: '1',
  name: `${mockUser1.name}, ${mockUser2.name}`,
  avatar: '',
  lastMessage: {
    content: mockMessage1.content,
    timestamp: mockMessage1.timestamp,
  },
  isArchived: false,
  isGroup: false,
  isMuted: false,
  isPinned: false,
  participantIds: [mockUser1.id, mockUser2.id],
};

export const mockConversationSummary2: ConversationSummaryDto = {
  id: '2',
  name: `${mockUser1.name}, ${mockUser3.name}`,
  avatar: '',
  lastMessage: {
    content: mockMessage2.content,
    timestamp: mockMessage2.timestamp,
  },
  isArchived: false,
  isGroup: false,
  isMuted: false,
  isPinned: false,
  participantIds: [mockUser1.id, mockUser3.id],
};

export const mockUserConversationsDto: UserConversationsDto = {
  userId: '1',
  items: [mockConversationSummary1, mockConversationSummary2],
  page: 1,
  pageSize: 10,
  total: 2,
};

export const mockConversationList = [mockConversation1, mockConversation2];
