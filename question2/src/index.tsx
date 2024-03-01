import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import axios from "axios";

// Get the application-wide store instance, prepopulating with state from the server where available.
import { store } from "./store/configureStore";

axios.interceptors.request.use(function (config) {
  let jwt = store.getState().data.token;
  if (jwt) {
    config.headers = config.headers ?? {};
    if (config.headers.IsAuthorization !== "true") {
      config.headers.Authorization = "Bearer " + jwt;
    }
  }
  else {    
    return Promise.reject("Session expired. Please refresh the page in web browser.");
  }

  return config;
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
