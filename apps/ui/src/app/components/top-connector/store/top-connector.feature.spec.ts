import { Action } from '@ngrx/store';
import { TopConnectorActions } from './top-connector.actions';
import { initialState, topConnectorFeature } from './top-connector.feature';

describe('TopConnector Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as Action;

    const result = topConnectorFeature.reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  describe(TopConnectorActions.connected.type, () => {
    it('should set the connected flag to true', () => {
      const action = TopConnectorActions.connected({ userId: '1' });

      const result = topConnectorFeature.reducer(initialState, action);

      expect(result.userId).toBe('1');
      expect(result.connected).toBeTrue();
    });
  });

  describe(TopConnectorActions.connectionFailed.type, () => {
    it('should set the connected flag to false', () => {
      const action = TopConnectorActions.connectionFailed({ email: '1' });

      const result = topConnectorFeature.reducer(initialState, action);

      expect(result.connected).toBeFalse();
    });
  });
});
