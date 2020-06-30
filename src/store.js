import { createStore, applyMiddleware, compose } from "redux";
import persistState from "redux-sessionstorage";
import thunk from "redux-thunk";
import reducer from "./reducers";
const initialState = {};
let composedEnhancers = compose(applyMiddleware(thunk), persistState());

let store = createStore(reducer, initialState, composedEnhancers);

export default store;
