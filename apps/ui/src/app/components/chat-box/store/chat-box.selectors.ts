import { CHAT_BOX_FEATURE_KEY } from '@app/components/chat-box/store/chat-box.reducer';
import { Conversation } from '@core/types';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectChatBoxFeature =
  createFeatureSelector<Conversation>(CHAT_BOX_FEATURE_KEY);

export const selectHeaderData = createSelector(
  selectChatBoxFeature,
  (state) => ({
    name: state.name,
    avatar: state.avatar,
  })
);

export const selectChatSelected = createSelector(
  selectChatBoxFeature,
  (state) => state.name !== ''
);
