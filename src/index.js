import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IntlProvider } from "react-intl";
const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <IntlProvider locale={language}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
