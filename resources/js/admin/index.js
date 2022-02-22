import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import "external-svg-loader";

import configureStore from "$admin/redux/configureStore";
import {UserProvider} from "./context/UserContext";
import App from "./App";

import "$admin/assets/scss/index.scss";

const { store, persistor } = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <UserProvider>
        <App />
      </UserProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
