import * as types from './actionTypes';

export function loadHolderSuccess(holder) {
  return {type: types.LOAD_HOLDER_SUCCESS, holder};
}

export function addHolderSuccess(holder) {
  return {type: types.ADD_HOLDER_SUCCESS, holder};
}

export function loadHolder() {
  return function(dispatch) {
    return Promise.resolve([1, 2, 3])
      .then((data) => {
        dispatch(loadHolderSuccess(data));
      }).catch((error) => {
        throw(error);
      });
  };
}

export function addHolder() {
  return function(dispatch, getState) {
    return Promise.resolve([1, 2, 3, 4, 5, 6])
      .then((data) => {
        dispatch(addHolderSuccess(data));
      }).catch((error) => {
        throw(error);
      });
  };
}

