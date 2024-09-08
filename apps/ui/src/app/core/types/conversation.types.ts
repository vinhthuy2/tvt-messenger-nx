import { ChatMessage } from './message.types';
import { User } from './user.types';

export interface Conversation {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  lastMessage: ChatMessage | null;
  unreadMessageCount: number;
  isArchived: boolean;
  isMuted: boolean;
  isPinned: boolean;
  isGroup: boolean;
  name: string;
  avatar: string | undefined;
  avatarAlt: string;
}

export interface UserConversations {
  userId: string;
  items: ConversationSummary[];
  total: number;
  page: number;
  pageSize: number;
}

export type ConversationSummary = ConversationSummaryDto;

export interface UserConversationsDto {
  userId: string;
  items: ConversationSummaryDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ConversationSummaryDto {
  id: string;
  name: string;
  avatar: string;
  lastMessage: {
    content: string;
    timestamp: Date;
  } | null;
  isArchived: boolean;
  isMuted: boolean;
  isPinned: boolean;
  isGroup: boolean;
  participantIds: string[];
}

export interface CreateConversationRequestDto {
  name?: string;
  participantIds: string[];
}
