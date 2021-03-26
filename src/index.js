import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reduxStore from "./store/redux-store";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: "30px",
  transition: transitions.SCALE
};

ReactDOM.render(
  <Provider store={reduxStore}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
