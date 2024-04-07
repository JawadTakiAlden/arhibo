import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./i18n";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();
root.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
