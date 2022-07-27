import { createStore, applyMiddleware } from "redux";
import rootReducers from "./Reducers/Reducers";
import thunk from "redux-thunk";
export const store = createStore(rootReducers, applyMiddleware(thunk));
