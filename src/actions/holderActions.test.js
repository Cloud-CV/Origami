import expect from 'expect';
import * as holderActions from './holderActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockstore = configureMockStore(middleware);

describe('Simulate async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('should create a LOAD_HOLDER_SUCCESS when loading the holder', (done) => {
    // nock('http://localhost:3000/')
    //   .get('/holder')
    //   .reply(200, {body: {holder: [1, 2, 3]}});

    const expectedActions = [
      {type: types.LOAD_HOLDER_SUCCESS}
    ];

    const store = mockstore({holder: []}, expectedActions);
    store.dispatch(holderActions.loadHolder()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.LOAD_HOLDER_SUCCESS);
    });
    done();
  });
});
