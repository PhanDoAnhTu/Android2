
import { thunk } from "redux-thunk";
import reducers from "./reducers/index";
import { createStore, applyMiddleware } from "redux";

export const store = createStore(reducers,{}, applyMiddleware(thunk));
