import expect from 'expect';
import holderReducer from './holderReducer';
import * as actions from '../actions/holderActions';

describe('Holder Reducer', () => {
  it('sample holder reducer test', () => {
    const initialState = [1, 2, 3];
    const newEntry = [1, 2, 3, 4, 5, 6];
    const action = actions.addHolderSuccess(newEntry);

    const newState = holderReducer(initialState, action);

    expect(newState).toEqual([1, 2, 3, 1, 2, 3, 4, 5, 6]);
  });
});
