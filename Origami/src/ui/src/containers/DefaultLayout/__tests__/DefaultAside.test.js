import React from 'react';
import ReactDOM from 'react-dom';
import DefaultAside from '../DefaultAside';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <DefaultAside />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
