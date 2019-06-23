import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Axios from "./axios";

// set the default api url
// Axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

// set the headers globally
// Axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
// Axios.defaults.headers.common["Content-Type"] = "application/json";

// for handling requests and errors globally
Axios.interceptors.request.use(
  request => {
    // console.log(request);
    // Edit Request Config
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// for handling responses globally
Axios.interceptors.response.use(
  response => {
    // console.log(response);
    // Edit response config
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
