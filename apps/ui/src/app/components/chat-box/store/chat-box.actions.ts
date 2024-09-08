import { ChatMessage, Conversation } from '@core/types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ChatBoxActions = createActionGroup({
  source: 'ChatBox',
  events: {
    loadConversation: props<{ conversationId: string }>(),
    loadConversationSuccessfully: props<{ conversation: Conversation }>(),
    loadConversationFailed: emptyProps(),
    messageReceived: props<{ message: ChatMessage }>(),
    messageSent: props<{ messageId: string }>(),
    messageRead: props<{ messageId: string }>(),
    someoneTyping: props<{ sender: string }>(),
    sendMessage: props<{ message: ChatMessage }>(),
  },
});
