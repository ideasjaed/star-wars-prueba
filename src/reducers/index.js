import { combineReducers } from "redux";
import naves from "./naves.reducer";
import pages from "./pages.reducer";
const appReducer = combineReducers({ naves, pages });

export default appReducer;
