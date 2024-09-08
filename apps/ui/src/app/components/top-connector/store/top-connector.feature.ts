import { createFeature, createReducer, on } from '@ngrx/store';
import { TopConnectorActions } from './top-connector.actions';

export const topConnectorFeatureKey = 'topConnector';

export interface TopConnectorState {
  userId: string;
  connected: boolean;
}

export const initialState: TopConnectorState = {
  userId: '',
  connected: false,
};

export const reducer = createReducer<TopConnectorState>(
  initialState,
  on(TopConnectorActions.connected, (state, { userId }) => ({
    ...state,
    userId,
    connected: true,
  })),
  on(TopConnectorActions.connectionFailed, (state) => ({
    ...state,
    connected: false,
  }))
);

export const topConnectorFeature = createFeature({
  name: topConnectorFeatureKey,
  reducer,
});
