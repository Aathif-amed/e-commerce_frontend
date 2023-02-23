import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//store setup
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

//persist store
const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate
        loading={
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
        persistor={persistedStore}
      >
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
