export interface UserConversationSummaryDto {
  conversationId: string;
  conversationName: string;
  avatar: string;
  lastMessage: {
    content: string;
    timestamp: Date;
  };
  unreadMessageCount: number;
  isArchived: boolean;
  isMuted: boolean;
  isPinned: boolean;
}
