import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import todoReducer from "./reducers/todoReducer";

export const store = createStore(todoReducer, composeWithDevTools());
