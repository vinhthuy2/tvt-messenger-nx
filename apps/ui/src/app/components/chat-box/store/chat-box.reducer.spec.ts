import { ChatBoxActions } from '@app/components/chat-box/store/chat-box.actions';
import {
  chatBoxFeature,
  initialChatBoxState,
} from '@app/components/chat-box/store/chat-box.reducer';
import { Conversation } from '@core/types';
import { mockConversation1 } from '@testing/mocks/conversations.mock';

describe('chat-box reducer', () => {
  it('should return state correctly on conversationLoaded', () => {
    const conversation = mockConversation1;

    const action = ChatBoxActions.loadConversationSuccessfully({
      conversation,
    });

    const state = chatBoxFeature.reducer(initialChatBoxState, action);
    const expectedState: Conversation = {
      ...initialChatBoxState,
      ...conversation,
    };

    expect(state).toEqual(expectedState);
  });
});
