import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import emp from "./reducer";

export default createStore(emp, applyMiddleware(thunk));