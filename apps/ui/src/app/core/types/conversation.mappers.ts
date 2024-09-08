import {
  Conversation,
  ConversationSummaryDto,
} from '@core/types/conversation.types';

export const mapToConversationSummaryDto = (
  conversation: Conversation
): ConversationSummaryDto => {
  return {
    id: conversation.id,
    name: conversation.name,
    avatar: conversation.avatar || '',
    lastMessage: conversation.lastMessage
      ? {
          content: conversation.lastMessage.content,
          timestamp: conversation.lastMessage.timestamp,
        }
      : null,
    isArchived: conversation.isArchived,
    isMuted: conversation.isMuted,
    isPinned: conversation.isPinned,
    isGroup: conversation.isGroup,
    participantIds: conversation.participants.map((p) => p.id),
  };
};
