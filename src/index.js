import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { CartProvider } from "./contexts/cart.context";
import { store } from "./store/store";

import "./index.scss";

const container = document.getElementById("root");
// Create a root.
const root = ReactDOMClient.createRoot(container);
// Initial render: Render an element to the root.

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
