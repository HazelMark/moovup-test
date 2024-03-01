
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import dataReceiveReducer from "./dataReceiveSlice";
import requestContainerReducer from "./requestContainerSlice";

//import thunk from "redux-thunk";
//import { RootState, reducers } from "./";

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    data: dataReceiveReducer,
    container: requestContainerReducer,
    router: routerReducer
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);