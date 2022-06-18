import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { loginReducer } from "./Login/reducer";

import { searchReducer } from "./Search/reducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  search: searchReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
