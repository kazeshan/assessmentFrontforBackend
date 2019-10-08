import React, { Component } from "react";
import { render } from "react-dom";
import Master from "./containers/master";
import { Provider } from "react-redux";
import store from "./store";

import "./style.css";

class App extends Component {
  constructor() {
    super();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Master />
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
