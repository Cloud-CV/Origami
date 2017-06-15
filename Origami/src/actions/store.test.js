import expect from "expect";
import { createStore } from "redux";
import rootReducer from "../reducers";
import initialState from "../reducers/initialState";
import { enableLoginSuccess, disableLoginSuccess } from "./loginActions";

describe("Store Test", () => {
  it("doing Login should set the state: login to true", () => {
    const store = createStore(rootReducer, initialState);
    const login = false;

    store.dispatch(enableLoginSuccess());

    const loginLater = store.getState().login;
    expect(login).toEqual(!loginLater);
  });

  it("doing Logout should set the state: login to false", () => {
    const store = createStore(rootReducer, initialState);
    const login = true;

    store.dispatch(disableLoginSuccess());

    const loginLater = store.getState().login;
    expect(login).toEqual(!loginLater);
  });
});
