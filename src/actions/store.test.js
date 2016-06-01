import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as holderActions from '../actions/holderActions';

describe('Store Test', () => {
  it('should handle adding data to holder', () => {
    const store = createStore(rootReducer, initialState);
    const holderOne = [1, 2, 3];

    const addHolder = holderActions.addHolderSuccess(holderOne);
    store.dispatch(addHolder);

    const actualHolder = store.getState().holder;
    const expected = [1, 2, 3];
    expect(actualHolder).toEqual(expected);
  });
});
