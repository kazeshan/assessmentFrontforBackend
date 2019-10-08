import React, { Component } from "react";
import { render } from "react-dom";
import Master from "./containers/master";
import { Provider } from "react-redux";
import store from "./store";

import "./style.css";

class App extends Component {
  constructor() {
    super();
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
