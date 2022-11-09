import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import styled, { ThemeProvider } from "styled-components";
import "./globalStyles.css";

import "./lib/i18n"
import App from "./components/App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

const theme = {
  primary: {
    color: "white",
    backgroundColor: "#591bc5"
  },
  secondary: {
    color: "grey"
  }
};

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <div className="wrapper-bubbles">
        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </ThemeProvider>
  </StrictMode>
);
