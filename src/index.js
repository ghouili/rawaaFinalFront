import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProvideContext } from "./hooks/context/GeneralContext";
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ProvideContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideContext>
    </ThemeProvider>
  </React.StrictMode>
);